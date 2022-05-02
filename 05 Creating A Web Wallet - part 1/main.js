console.log("hello world");

/* NOTE 1
The Moralis Authentication has now changed
You need to use Moralis.start

Previously it was just this:
Moralis.initialize("APP ID");
Moralis.serverURL = "SERVER URL";

*/
// MY SERVER

const serverUrl = "https://kifjfvdkitxz.usemoralis.com:2053/server";
const appId = "d4EcChMiNg483XTzbzoDrAWJHgYHnKtaoZEmb20o";
Moralis.start({ serverUrl, appId });

let homepage =
  "http://127.0.0.1:5501/05%20Creating%20A%20Web%20Wallet%20-%20part%201/index.html";
let dashboard =
  "http://127.0.0.1:5501/05%20Creating%20A%20Web%20Wallet%20-%20part%201/dashboard.html";

/* NOTE 2
If you find the application is continually flashing, it's because there is a redirect function
You need to copy your homepage link and dashboard link above and then refresh the app
*/

// REDIRECT USER BASED ON STATUS
if (Moralis.User.current() == null && window.location.href != homepage) {
  document.querySelector("body").style.display = "none";
  window.location.href = "index.html";
}

//HELPER FUNCTIONS
login = async () => {
  await Moralis.Web3.authenticate().then(async function (user) {
    let _username = document.getElementById("user-username").value;
    let _email = document.getElementById("user-email").value;
    if (_username != "" || _email != "") {
      if (_username != "") {
        user.set("name", _username);
      }
      if (_email != "") {
        user.set("email", _email);
      }
      await user.save();
    }
    window.location.href = "dashboard.html";
  });
};

if (Moralis.User.current() != null && window.location.href == homepage) {
  window.location.href = "dashboard.html";
}

logout = async () => {
  await Moralis.User.logOut();
  window.location.href = "index.html";
};

renderContent = (element) => {
  let elements = [
    "#transferETH",
    "#transferERC20",
    "#transferNFTs",
    "#transactionsSection",
    "#balancesSection",
    "#nftSection",
    "#starter",
  ];
  elements.forEach((e) => {
    hideContent(e);
  });
  showContent(element);
};

hideContent = (el) => {
  let element = el;
  document.querySelector(element).style.display = "none";
};

showContent = (el) => {
  let element = el;
  document.querySelector(element).style.display = "block";
};

millisecondsToTime = (ms) => {
  let minutes = Math.floor(ms / (1000 * 60));
  let hours = Math.floor(ms / (1000 * 60 * 60));
  let days = Math.floor(ms / (1000 * 60 * 60 * 24));

  if (days < 1) {
    if (hours < 1) {
      if (minutes < 1) {
        return `less than a minute ago`;
      } else return `${minutes} minutes(s) ago`;
    } else return `${hours} hours(s) ago`;
  } else return `${days} days(s) ago`;
};

fixURL = (url) => {
  if (url.startsWith("ipfs")) {
    return (
      "https://ipfs.moralis.io:2053/ipfs/" + url.split("ipfs://").slice(-1)
    );
  } else {
    return url + "?format=json";
  }
};

clearContent = (id) => {
  let _id = `#${id}`;
  document.querySelector(_id).innerHTML = "";
};

getERC20Metadata = async () => {
  let _symbol = document.querySelector("#ERC20MetadataSymbol").value;
  let _chain = document.querySelector("#ERC20MetadataChain").value;
  let tokens = await Moralis.Web3API.account.getTokenBalances({
    chain: _chain,
  });
  tokens.forEach((e, i) => {
    if (e.symbol == _symbol) {
      document.querySelector("#ERC20TransferContract").value = e.token_address;
      document.querySelector("#ERC20TransferDecimals").value = e.decimals;
    }
  });
};

//WEB3API FUNCTIONS
getTransactions = async () => {
  // The transactions are hardcoded to retrieve only rinkeby transactions.
  // you can change that here:
  const options = { chain: "rinkeby" };
  const transactions = await Moralis.Web3API.account.getTransactions(options);

  if (transactions.total > 0) {
    let table = `
        <table class="table">
        <thead>
        <tr>
        <th scope="col">Transaction</th>
        <th scope="col">Block Number</th>
        <th scope="col">Age</th>
        <th scope="col">Type</th>
        <th scope="col">Fee</th>
        <th scope="col">Value</th>
            </tr>
        </thead>
        <tbody id="theTransactions">
        </tbody>
        </table>
        `;
    document.querySelector("#table-of-fransactions").innerHTML = table;

    transactions.result.forEach((t) => {
      let content = `
            <tr>
                <td><a href='https://rinkeby.etherscan.io/tx/${
                  t.hash
                }' target="_blank" rel="noopener noreferrer">${t.hash}</a></td>
                <td><a href='https://rinkeby.etherscan.io/block/${
                  t.block_number
                }' target="_blank" rel="noopener noreferrer">${
        t.block_number
      }</a></td>
                <td>${millisecondsToTime(
                  Date.parse(new Date()) - Date.parse(t.block_timestamp)
                )}</td>
                <td>${
                  t.from_address == Moralis.User.current().get("ethAddress")
                    ? "Outgoing"
                    : "Incoming"
                }</td>
                <td>${((t.gas * t.gas_price) / 1e18).toFixed(5)} ETH</td>
                <td>${(t.value / 1e18).toFixed(5)} ETH</td>
            </tr>
            `;
      theTransactions.innerHTML += content;
    });
  }
};

getNativeBalances = async () => {
  const ethBalance = await Moralis.Web3API.account.getNativeBalance();
  const ropstenBalance = await Moralis.Web3API.account.getNativeBalance({
    chain: "ropsten",
  });
  const rinkebyBalance = await Moralis.Web3API.account.getNativeBalance({
    chain: "rinkeby",
  });

  let content = (document.querySelector("#userBalances").innerHTML = `
    <table class="table">
        <thead>
            <tr>
                <th scope="col">Chain</th>
                <th scope="col">Balance</th>

            </tr>
        </thead>
        <tbody>
            <tr>
                <th>Ether</th>
                <td>${(ethBalance.balance / 1e18).toFixed(5)} ETH</td>
            </tr>
            <tr>
                <th>Ropsten</th>
                <td>${(ropstenBalance.balance / 1e18).toFixed(5)} ETH</td>
            </tr>
            <tr>
                <th>Rinkeby</th>
                <td>${(rinkebyBalance.balance / 1e18).toFixed(5)} ETH</td>
            </tr>
        </tbody>
    </table>
    `);
};
getERC20Balances = async () => {
  let ethTokens = await Moralis.Web3API.account.getTokenBalances();
  let ropstenTokens = await Moralis.Web3API.account.getTokenBalances({
    chain: "ropsten",
  });
  let rinkebyTokens = await Moralis.Web3API.account.getTokenBalances({
    chain: "rinkeby",
  });

  let otherBalancesContent = document.querySelector("#otherBalances");
  otherBalancesContent.innerHTML = "";

  if (ethTokens.length > 0) {
  }
  if (ropstenTokens.length > 0) {
  }
  if (rinkebyTokens.length > 0) {
    let tokenBalanceContent = "";

    rinkebyTokens.forEach((e, i) => {
      let content = `
    
                <tr>
                <td>${e.name}</td>
                <td>${e.symbol}</td>
                <td>${e.balance / ("1e" + e.decimals)} ETH</td>
                <td>${e.decimals}</td>
                <td>${e.token_address}</td>
                </tr>
    
                `;
      tokenBalanceContent += content;
    });
    otherBalancesContent.innerHTML += tokenBalanceContent;
  }
};

getNFTs = async () => {
  let _chain = document.querySelector("#nft-chain").value;
  if (_chain == "none") {
    return alert("Choose a chain from the dropdown list");
  }

  let nfts = await Moralis.Web3API.account.getNFTs({ chain: _chain });
  let tableOfNFTs = document.querySelector("#tableOfNFTs");
  tableOfNFTs.innerHTML = "";

  if (nfts.result.length > 0) {
    nfts.result.forEach((nft) => {
      let url = nft.token_uri;
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          let content = `
                    <div class="card col-md-4" 
                                data-id="${nft.token_id}" 
                                data-address="${nft.token_address}" 
                                data-type="${nft.contract_type}">
                        <img src="${fixURL(
                          data.image_url
                        )}" class="card-img-top" height=300>
                            <div class="card-body">
                            <h5 class="card-title">${data.name}</h5>
                            <p class="card-text">${data.description}</p>
                            <h6 class="card-title">Token Address</h6>
                            <p class="card-text">${nft.token_address}</p>
                            <h6 class="card-title">Token ID</h6>
                            <p class="card-text">${nft.token_id}</p>
                            <h6 class="card-title">Contract Type</h6>
                            <p class="card-text">${nft.contract_type}</p>
                        </div>
                    </div>
                    `;
          tableOfNFTs.innerHTML += content;
        });
    });
  } else
    tableOfNFTs.innerHTML += `<p class="h5 m-3 text-center">You have no nfts to display from on the ${_chain} chain</p>`;
};

getTransferNFTs = async () => {
  alert("This feature is coming soon");
};

// DISPLAY FUNCTIONS
tokenBalanceLoop = (tokens) => {
  let tokenBalanceContent = "";

  tokens.forEach((e, i) => {
    let content = `

            <tr>
            <td>Token: ${e.name}</td>
            <td>Symbol: ${e.symbol}</td>
            <td>Balance: ${e.balance / "1e" + e.decimals} ETH</td>
            <td>Decimals: ${e.decimals}</td>
            <td>Contract Address: ${e.token_address}</td>
            </tr>

            `;
    tokenBalanceContent += content;
  });
  return tokenBalanceContent;
};
displayTransactions = () => {
  renderContent("#transactionsSection");
};
displayTransactions2 = () => {
  renderContent("#tableOfNFTs2");
};
displayBalances = () => {
  renderContent("#balancesSection");
};
displayNFTs = () => {
  renderContent("#nftSection");
};
displayTransferETH = () => {
  renderContent("#transferETH");
};
displaytransferERC20 = () => {
  renderContent("#transferERC20");
};
displaytransferNFTs = () => {
  renderContent("#transferNFTs");
};

// TRANSFER FUNCTIONS
transferETH = async () => {
  let _amount = String(document.querySelector("#amountOfETH").value);
  let _address = document.querySelector("#addressToReceive").value;

  const options = {
    type: "native",
    amount: Moralis.Units.ETH(_amount),
    receiver: _address,
  };
  let result = await Moralis.transfer(options);
  alert(
    `transferring ${_amount} ETH to your requested address. Please allow some time to process your transaction.`
  );
};

transferERC20 = async () => {
  let _amount = String(document.querySelector("#ERC20TransferAmount").value);
  let _decimals = String(
    document.querySelector("#ERC20TransferDecimals").value
  );
  let _address = String(document.querySelector("#ERC20TransferAddress").value);
  let _contract = String(
    document.querySelector("#ERC20TransferContract").value
  );

  const options = {
    type: "erc20",
    amount: Moralis.Units.Token(_amount, _decimals),
    receiver: _address,
    contract_address: _contract,
  };
  let result = await Moralis.transfer(options);
  console.log(result);
};

getTransferERC20Balances = async () => {
  let ethTokens = await Moralis.Web3API.account.getTokenBalances();
  let ropstenTokens = await Moralis.Web3API.account.getTokenBalances({
    chain: "ropsten",
  });
  let rinkebyTokens = await Moralis.Web3API.account.getTokenBalances({
    chain: "rinkeby",
  });

  let balancesContent = document.querySelector("#transferERC20Balances");
  balancesContent.innerHTML = "";

  if (ethTokens.length > 0) {
    // Enter your ETH mainnet code here - I only worked with rinkeby (see below)
  }
  if (ropstenTokens.length > 0) {
    // Enter your ropsten testnet code here - I only worked with rinkeby (see below)
  }
  if (rinkebyTokens.length > 0) {
    let tokenBalanceContent = "";

    rinkebyTokens.forEach((e, i) => {
      let content = `
    
                <tr>
                <td>${e.name}</td>
                <td>${e.symbol}</td>
                <td>${e.balance / ("1e" + e.decimals)} </td>
                <td>${e.decimals}</td>
                <td>${e.token_address}</td>
                <td><button class="btn btn-primary transfer-button col-md-12" data-decimals="${
                  e.decimals
                }" data-address="${e.token_address}">Transfer ${
        e.symbol
      }</button></td>
                </tr>
    
                `;
      tokenBalanceContent += content;
    });
    balancesContent.innerHTML += tokenBalanceContent;

    setTimeout(function () {
      let theBalances = document.getElementsByClassName("transfer-button");

      for (let i = 0; i <= theBalances.length - 1; i++) {
        theBalances[i].onclick = function () {
          document.querySelector("#ERC20TransferDecimals").value =
            theBalances[i].attributes[1].value;
          document.querySelector("#ERC20TransferContract").value =
            theBalances[i].attributes[2].value;
        };
      }
    }, 1000);
  }
};

transferNFTs = async () => {
  alert("This feature is coming soon");
};

// DASHBOARD LISTENERS
if (window.location.href == dashboard) {
  document.querySelector("#btn-logout").onclick = logout;

  document.querySelector("#get-transactions-link").onclick =
    displayTransactions;
  document.querySelector("#btn-get-transactions").onclick = getTransactions;

  document.querySelector("#get-balances-link").onclick = displayBalances;
  document.querySelector("#btn-get-native-balances").onclick =
    getNativeBalances;

  document.querySelector("#btn-get-erc20-balances").onclick = getERC20Balances;
  document.querySelector("#ERC20MetadataSearch").onclick = getERC20Metadata;

  document.querySelector("#get-nfts-link").onclick = displayNFTs;
  document.querySelector("#btn-get-nfts").onclick = getNFTs;

  document.querySelector("#transfer-ETH").onclick = displayTransferETH;
  document.querySelector("#ETHTransferButton").onclick = transferETH;

  document.querySelector("#transfer-ERC20").onclick = displaytransferERC20;
  document.querySelector("#ERC20TransferButton").onclick = transferERC20;

  document.querySelector("#transfer-nfts").onclick = displaytransferNFTs;
  document.querySelector("#btn-get-transactions2").onclick = getTransferNFTs;

  document.querySelector("#btn-transfer-selected-nft").onclick = transferNFTs;

  document.querySelector("#transferERC20GetBalances").onclick =
    getTransferERC20Balances;

  // Class listeners
  let buttons = document.getElementsByClassName("clearButton");
  for (var i = 0; i <= buttons.length - 1; i += 1) {
    buttons[i].onclick = function (e) {
      clearContent(this.name);
    };
  }
}

// HOMEPAGE LISTENERS
if (window.location.href == homepage) {
  document.querySelector("#btn-login").onclick = login;
}

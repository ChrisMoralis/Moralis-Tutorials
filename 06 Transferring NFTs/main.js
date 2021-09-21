// Moralis.initialize("ENTER YOUR APP ID");
// Moralis.serverURL = "ENTER YOUR SERVER URL";

// let subdirectory = "/wallet-1/";
let subdirectory = "/";
let loginPage = `${subdirectory}index.html`;
let dashboard = `${subdirectory}dashboard.html`;

// REDIRECT USER BASED ON STATUS
(function(){
    // If they are NOT authenticated and NOT on the login page
    if (Moralis.User.current() == null && window.location.pathname != loginPage) {
        document.querySelector('body').style.display = 'none';
        window.location.href = loginPage;
    }
    if (Moralis.User.current() != null && (window.location.pathname == loginPage || window.location.pathname == subdirectory)) {
        window.location.href = dashboard;
    }
})();

//HELPER FUNCTIONS
login = async () => {
    await Moralis.Web3.authenticate()
    .then(async function (user) {
        let _username = document.getElementById('user-username').value;
        let _email = document.getElementById('user-email').value;
        if(_username != '' || _email != ''){
            if(_username != ''){user.set("name", _username);}
            if(_email != ''){user.set("email", _email);}
            await user.save();
        }
        window.location.href = dashboard;
    })
}

logout = async () => {
    await Moralis.User.logOut();
    window.location.href = loginPage;
}

fixURL = (url) => {
    if (url.startsWith("ipfs")) {
        return "https://ipfs.moralis.io:2053/ipfs/" + url.split("ipfs://").slice(-1)
    }
    else {
        return url + "?format=json"
    }
}

//WEB3API FUNCTIONS

getTransferNFTs = async () => {
    let _chain = document.querySelector('#nft-chain2').value;
    if(_chain == "empty"){alert("Choose a chain");
    }else{
        await Moralis.Web3API.account.getNFTs({ chain: _chain })
        .then((nfts) => getNFTs2(nfts));
    }
}

getNFTs2 = async (nfts) => {
    let tableOfNFTs = document.querySelector('#NFTtable2');
    tableOfNFTs.innerHTML = "<div class='col-md-12'><p>Click on an NFT below to get the metadata into the search above.</p></div>";
        if (nfts.result.length > 0) {
            for(eachnft of nfts.result){
                let metadata = JSON.parse(eachnft.metadata);
                let content = `
                    <div class="card col-md-4 nfts" data-id="${eachnft.token_id}" data-address="${eachnft.token_address}" data-type="${eachnft.contract_type}">
                        <img src="${fixURL(metadata.image_url)}" class="card-img-top" height=200>
                            <div class="card-body">
                            <h5 class="card-title">${metadata.name}</h5>
                            <p class="card-text">${metadata.description}</p>
                            <h6 class="card-title">Token Address</h6>
                            <p class="card-text">${eachnft.token_address}</p>
                            <h6 class="card-title">Token ID</h6>
                            <p class="card-text">${eachnft.token_id}</p>
                            <h6 class="card-title">Contract Type</h6>
                            <p class="card-text">${eachnft.contract_type}</p>
                            <h6 class="card-title">Available Balance</h6>
                            <p class="card-text">${eachnft.amount}</p>
                        </div>
                    </div>
                    `
                    tableOfNFTs.innerHTML += content;
            }
        }

        setTimeout(function(){
            let theNFTs = document.getElementsByClassName('nfts');
            for (let i = 0; i <= theNFTs.length - 1; i ++) {
                console.log(theNFTs[i].attributes);
                theNFTs[i].onclick = function() {
                    document.querySelector('#nft-transfer-token-id').value = theNFTs[i].attributes[1].value;
                    document.querySelector('#nft-transfer-type').value = (theNFTs[i].attributes[3].value).toLowerCase();
                    document.querySelector('#nft-transfer-contract-address').value = theNFTs[i].attributes[2].value;
                };
            }
        }, 1000);
}

// PART 2: THE TRANSFER FUNCTION

transferNFTs = async () => {
    console.log('transferring NFTs');
   
    let _type = document.querySelector('#nft-transfer-type').value
    let _receiver = document.querySelector('#nft-transfer-receiver').value
    let _address = document.querySelector('#nft-transfer-contract-address').value
    let _id = document.querySelector('#nft-transfer-token-id').value
    let _amount =  document.querySelector('#nft-transfer-amount').value

    const options = {type: _type,  
                 receiver: _receiver,
                 contract_address: _address,
                 token_id: _id,
                 amount: _amount}
    let result = await Moralis.transfer(options)
    console.log('NFT Transferred');
}

// DASHBOARD LISTENERS
if (window.location.pathname == dashboard){
    document.querySelector('#btn-logout').onclick = logout;

    // Side Menu Part 2
    document.querySelector('#btn-get-transactions2').onclick = getTransferNFTs;   
    document.querySelector('#btn-transfer-selected-nft').onclick = transferNFTs;
}

// LOGIN PAGE LISTENER
if (window.location.pathname == loginPage){
    document.querySelector('#btn-login').onclick = login;
}
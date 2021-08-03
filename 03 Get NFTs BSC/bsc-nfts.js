
// connect to Moralis server
Moralis.initialize("ENTER APP ID");
Moralis.serverURL = "YOUR SERVER ID";

async function getNFT(){
  let searchAddress = document.getElementById('inputAddress').value;

  // get BSC NFTs for address
  const options = { chain: 'bsc', address: searchAddress };
  const BSCNFTs = await Moralis.Web3.getNFTs(options);
  console.log(BSCNFTs);
}

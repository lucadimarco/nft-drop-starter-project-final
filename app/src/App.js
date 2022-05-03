import React, {useEffect, useState} from "react";
import "./App.css";
import twitterLogo from "./assets/twitter-logo.svg";
import CandyMachine from "./CandyMachine";

// Constants
const TWITTER_HANDLE = "_buildspace";
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;

const App = () => {
	const [walletAddress, setWalletAddress] = useState(null);

	const checkIfWalletIsConnected = async() => {
		try{
		  const {solana} = window
		  if(solana){
			if(solana.isPhantom){
			  console.log("pahntom wallet found!");
			  const response = await solana.connect({
				  onlyTrusted: true
			  });
			  console.log(`connect with ${response.publicKey.toString()}`);
			  setWalletAddress(response.publicKey.toString());
			}
		  }else{
			alert("solana object not found! get phantom wallet")
		  }
		} catch (error) {
		  console.log(error);
		}
	  };

	  const connectWallet = async( ) => {
		  const {solana} = window
		  if(solana){
			  const response = await solana.connect();
			  console.log(`connect with public key`, response.publicKey.toString())
		  }

	  }
	  const renderNotConnectedContainer = () => {
		 <button className="cta-button connect-wallet-button" 
		 onClick={connectWallet}>
			 Connect wallet
		 </button>
	  }

	  useEffect(() => {
		const onLoad = async() => {
		  await checkIfWalletIsConnected()
		}
		window.addEventListener('load',onLoad)
		return () => window.removeEventListener('load',onLoad);
	  },[])

	return (
		<div className="App">
			<div className="container">
				<div className="header-container">
					<p className="header">🍭 Candy Drop</p>
					<p className="sub-text">NFT drop machine with fair mint</p>
					{!walletAddress && renderNotConnectedContainer()}
				</div>
				{walletAddress && (
				 <CandyMachine walletAddress={window.solana}/>
				)
				 }
				<div className="footer-container">
					<img
						alt="Twitter Logo"
						className="twitter-logo"
						src={twitterLogo}
					/>
					<a
						className="footer-text"
						href={TWITTER_LINK}
						target="_blank"
						rel="noreferrer"
					>{`Adapted from @${TWITTER_HANDLE}`}</a>
				</div>
			</div>
		</div>
	);
};

export default App;

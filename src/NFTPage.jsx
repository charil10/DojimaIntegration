import { useState } from 'react';
import { ethers } from 'ethers';
import DojimaNFTAbi from './DojimaNFTAbi.json'; 

const NFTPage = () => {
  const [tokenURI, setTokenURI] = useState('');
  const [nftOwner, setNftOwner] = useState('');
  const [error, setError] = useState(null);

  const contractAddress = '0xB0f41B04912df0D46cA0cDCB13FA505DF0dd7A26'; 

  // Function to mint NFT
  const mintNFT = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, DojimaNFTAbi, signer);

      const tx = await contract.safeMint(signer.getAddress(), tokenURI);
      await tx.wait();
      alert('NFT minted successfully!');
    } catch (err) {
      console.error(err);
      setError('Failed to mint NFT');
    }
  };

  // Function to fetch owner
  const fetchOwner = async (tokenId) => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(contractAddress, DojimaNFTAbi, provider);

      const owner = await contract.ownerOf(tokenId);
      setNftOwner(owner);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch owner');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>NFT Minting and Management</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Mint NFT */}
      <div>
        <h3>Mint NFT</h3>
        <input
          type="text"
          placeholder="Enter Token URI"
          value={tokenURI}
          onChange={(e) => setTokenURI(e.target.value)}
        />
        <button onClick={mintNFT}>Mint NFT</button>
      </div>

      {/* Fetch NFT Owner */}
      <div>
        <h3>Fetch NFT Owner</h3>
        <button onClick={() => fetchOwner(1)}>Fetch Owner of Token 1</button>
        {nftOwner && <p>Owner: {nftOwner}</p>}
      </div>
    </div>
  );
};

export default NFTPage;

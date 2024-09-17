List of 3 tasks required to be completed :

Task 1: Frontend Application to Connect MetaMask and Retrieve Dojima Stagenet User Details
●	Objective: Create a frontend React or Next.js application to connect to MetaMask and retrieve user information from Dojima Stagenet.
●	Task Details:
1.	Implement MetaMask wallet connection functionality.
2.	Retrieve and display the user's wallet address.
3.	Fetch and display the Dojima (DOJ) balance using the Dojima Stagenet RPC endpoint:
■	RPC URL: https://rpc-d11k.dojima.network
■	Chain ID: 187
■	Currency Symbol: DOJ
4.	Implement error handling for cases such as network mismatches, rejected connections, etc.
●	Skills Evaluated: MetaMask integration, RPC calls, React/Next.js, error handling, basic blockchain knowledge.
●	Bonus: Provide a button to switch to the Dojima Stagenet network in MetaMask if not already connected.
Task 2: Display Ethereum Sepolia Testnet Transaction List with Pagination
●	Objective: Build a React or Next.js application to display a list of transactions for a given Ethereum Sepolia testnet address and provide pagination.
●	Task Details:
1.	Fetch the list of transactions for the provided Ethereum Sepolia address: 0x0577e1E35C4f30cA8379269B7Fd85cBCE7F084f4.
2.	Display the transactions in a paginated list (15 transactions per page).
3.	Show transaction details including hash, from, to, value, and gas used for each transaction.
4.	Use an Ethereum API or Web3 provider to fetch transaction data from the Sepolia testnet.
5.	Implement error handling for invalid or unavailable data.
●	Skills Evaluated: API integration with Ethereum (Web3.js/ethers.js), pagination, React/Next.js, handling blockchain data, REST/GraphQL usage.



Task 3: Create an NFT Marketplace with IPFS Integration
●	Objective: Set up a basic NFT marketplace where users can view, add, and delete NFTs stored on IPFS. Each NFT should have details such as name, description, and image.
Task Details:
1.	Setup Smart Contract for NFTs:
○	Implement and deploy an ERC-721 NFT smart contract on an EVM-compatible testnet (e.g., Ethereum Goerli, Sepolia).
○	The contract should allow users to mint new NFTs, transfer ownership, and burn NFTs.
2.	NFT Metadata on IPFS:
○	Use IPFS to store NFT metadata (name, description, image URL).
The metadata should be formatted in JSON, including fields like:
{
  "name": "NFT Name",
  "description": "NFT Description",
  "image": "ipfs://<ipfs-hash>"
}
○	Provide functionality to upload an image to IPFS and generate the corresponding URL for storage in the contract.
3.	Frontend Application:
○	Display NFTs: Create a React or Next.js frontend to fetch and display a user's NFTs (retrieved from the smart contract).
■	Display each NFT's name, description, and image from the metadata stored on IPFS.
○	Add New NFT: Allow users to upload an image, add a name and description, and mint a new NFT. The image and metadata should be uploaded to IPFS before minting.
○	Delete NFT: Allow users to burn/delete an NFT from their collection (trigger burn function in the smart contract).
○	Bonus: Implement transfer functionality to transfer NFTs between users.
4.	Integration:
○	Integrate the smart contract with the frontend using ethers.js or Web3.js.
○	Ensure users can connect their wallets (e.g., via MetaMask) and interact with the contract (mint, view, transfer, burn NFTs).
5.	Error Handling:
○	Handle common errors like connection issues, failed transactions, or invalid IPFS uploads.
Skills Evaluated:
●	Solidity smart contract development (ERC-721 standard).
●	IPFS integration for metadata and image storage.
●	Frontend interaction with smart contracts (ethers.js or Web3.js).
●	React/Next.js development with blockchain functionalities.
●	Error handling and user-friendly interface design.




Final :
●	The entire application should be added to a Git repository.
●	Create a README file in the repository with detailed instructions on how to clone the repository, install dependencies, and run the application locally.
●	Ensure that anyone following the instructions can test the application without any issues.
●	Create a 5-10 min tutorial video explaining the flow of above tasks.


API Key: 798fa4a9c9f50c28282d
API Secret: 925acbc94d6694504e92d22ac096a472563c7df74bf0aa9e9e5a41c8a6713dc4
JWT: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIyZDQ0YzBlNC05MDRiLTQyMWEtODVhOS02NzQ4YTJlMzUyMGYiLCJlbWFpbCI6InZlZm90OTQ4MDFAYm9uZ2NzLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6IkZSQTEifSx7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6Ik5ZQzEifV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiI3OThmYTRhOWM5ZjUwYzI4MjgyZCIsInNjb3BlZEtleVNlY3JldCI6IjkyNWFjYmM5NGQ2Njk0NTA0ZTkyZDIyYWMwOTZhNDcyNTYzYzdkZjc0YmYwYWE5ZTllNWE0MWM4YTY3MTNkYzQiLCJleHAiOjE3NTgxMzM3NTd9.vuFq_wX-lzqpiomNwfb_BT-RkwkwQymaW9ygf7mT7ls

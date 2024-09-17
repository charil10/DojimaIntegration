// import { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
// import NFTPage from './NFTPage'; // Import the new NFT page component
// import { ethers } from 'ethers';
// import Modal from 'react-modal';
// import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const App = () => {
//   const [account, setAccount] = useState(null);
//   const [balance, setBalance] = useState(null);
//   const [error, setError] = useState(null);
//   const [network, setNetwork] = useState(null);
//   const [transactions, setTransactions] = useState([]);
//   const [modalIsOpen, setModalIsOpen] = useState(false);
  
//   const dojimaRpcUrl = 'https://rpc-d11k.dojima.network';
//   const chainId = '0xBB'; // Dojima Stagenet Chain ID
//   const symbol = 'DOJ';

//   const transactionsPerPage = 15;
//   const [currentPage, setCurrentPage] = useState(1);

//   const customStyles = {
//     content: {
//       backgroundColor: 'white',
//       color: 'black',
//       width: '80%',
//       margin: 'auto',
//       borderRadius: '10px',
//       padding: '20px',
//     },
//   };

//   // Fetch Transactions from Etherscan
//   const fetchTransactionsFromEtherscan = async () => {
//     const url = `https://api-sepolia.etherscan.io/api?module=account&action=txlist&address=0x0577e1E35C4f30cA8379269B7Fd85cBCE7F084f4&startblock=0&endblock=99999999&page=${currentPage}&offset=100&sort=asc`;

//     try {
//       const response = await axios.get(url);
//       if (response.data.status === '1') {
//         const transactions = response.data.result;
//         setTransactions(transactions);
//         toast.success('Transactions fetched successfully!');
//       } else {
//         setError('No transactions found.');
//         toast.error('No transactions found.');
//       }
//     } catch (err) {
//       console.error('Error fetching transactions:', err);
//       setError('Failed to fetch transactions.');
//       toast.error('Failed to fetch transactions.');
//     }
//   };

//   useEffect(() => {
//     if (window.ethereum) {
//       window.ethereum.on('accountsChanged', handleAccountChange);
//       window.ethereum.on('chainChanged', handleNetworkChange);
      
//       return () => {
//         window.ethereum.removeListener('accountsChanged', handleAccountChange);
//         window.ethereum.removeListener('chainChanged', handleNetworkChange);
//       };
//     }
//   }, [account]);

//   const handleAccountChange = (accounts) => {
//     if (accounts.length === 0) {
//       setError('Disconnected. Please connect again.');
//       disconnectWallet();
//     } else {
//       setAccount(accounts[0]);
//       getBalance(accounts[0]);
//       toast.info('Account changed. Wallet connected.');
//     }
//   };

//   const handleNetworkChange = (newChainId) => {
//     if (newChainId !== chainId) {
//       setError('Wrong network. Please switch to Dojima Stagenet.');
//       disconnectWallet();
//       toast.error('Please switch to Dojima Stagenet.');
//     } else {
//       setNetwork('Dojima Stagenet');
//       setError(null);
//       getBalance(account);
//       toast.success('Connected to Dojima Stagenet.');
//     }
//   };

//   const connectWallet = async () => {
//     if (window.ethereum) {
//       try {
//         const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
//         setAccount(accounts[0]);
//         const currentChainId = await window.ethereum.request({ method: 'eth_chainId' });
//         if (currentChainId !== chainId) {
//           await switchNetwork();
//         }
//         getBalance(accounts[0]);
//         toast.success('MetaMask connected successfully!');
//       } catch (err) {
//         setError('MetaMask connection failed.');
//         toast.error('MetaMask connection failed.');
//       }
//     } else {
//       setError('MetaMask is not installed.');
//       toast.error('MetaMask is not installed.');
//     }
//   };

//   const switchNetwork = async () => {
//     try {
//       if(window.ethereum.chainId=='0xbb'){
//         toast.success("your already on correct network")
//       }
//       await window.ethereum.request({
//         method: 'wallet_addEthereumChain',
//         params: [{
//           chainId: chainId,
//           chainName: 'Dojima Stagenet',
//           rpcUrls: [dojimaRpcUrl],
//           nativeCurrency: {
//             name: 'Dojima',
//             symbol: symbol,
//             decimals: 18,
//           },
//         }],
//       });
//     } catch (err) {
//       setError('Network switch failed.');
//       toast.error('Network switch failed.');
//     }
//   };

//   const getBalance = async (account) => {
//     try {
//       const provider = new ethers.providers.JsonRpcProvider(dojimaRpcUrl);
//       const balance = await provider.getBalance(account);
//       setBalance(ethers.utils.formatEther(balance));
//     } catch (err) {
//       setError('Failed to retrieve balance.');
//     }
//   };

//   const openModal = () => {
//     setModalIsOpen(true);
//     fetchTransactionsFromEtherscan();
//   };

//   const closeModal = () => setModalIsOpen(false);

//   const indexOfLastTransaction = currentPage * transactionsPerPage;
//   const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
//   const currentTransactions = transactions.slice(indexOfFirstTransaction, indexOfLastTransaction);

//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   return (
//     <div style={{ padding: '20px' }}>
//       <h1>Dojima Stagenet Wallet</h1>
//       {error && <p style={{ color: 'red' }}>{error}</p>}
//       {!account ? (
//         <button onClick={connectWallet}>Connect MetaMask</button>
//       ) : (
//         <div>
//           <p>Connected Account: {account}</p>
//           {/* <p>Network: {network || 'Unknown'}</p> */}
//           <p>Balance: {balance} {symbol}</p>
//           <button onClick={openModal}>View Sepolia Transactions</button>
//           <button onClick={() => setAccount(null)}>Disconnect</button>
//           <button onClick={switchNetwork}>Switch Network</button>
//         </div>
//       )}

//       {/* Toast Container for notifications */}
//       <ToastContainer />

//       {/* Modal for Transaction List */}
//       <Modal
//         isOpen={modalIsOpen}
//         onRequestClose={closeModal}
//         style={customStyles}
//       >
//         <h2 style={{ color: 'black' }}>Sepolia Testnet Transactions</h2>
//         {currentTransactions.length > 0 ? (
//           <div>
//             <table style={{ width: '100%', border: '1px solid black' }}>
//               <thead>
//                 <tr>
//                   <th>Hash</th>
//                   <th>From</th>
//                   <th>To</th>
//                   <th>Value</th>
//                   <th>Gas Used</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {currentTransactions.map((tx, index) => (
//                   <tr key={index}>
//                     <td>{tx.hash || 'NA'}</td>
//                     <td>{tx.from || 'NA'}</td>
//                     <td>{tx.to || 'NA'}</td>
//                     <td>{Number(ethers.utils.formatEther(tx.value)).toFixed(4) || 0} ETH</td>
//                     <td>{tx.gas || 'NA'}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>

//             {/* Pagination */}
//             <div style={{ marginTop: '20px' }}>
//               {Array.from({ length: Math.ceil(transactions.length / transactionsPerPage) }, (_, i) => (
//                 <button key={i} onClick={() => paginate(i + 1)}>
//                   {i + 1}
//                 </button>
//               ))}
//             </div>
//           </div>
//         ) : (
//           <p>No transactions found or loading...</p>
//         )}
//         <button onClick={closeModal}>Close</button>
//       </Modal>
//     </div>
//   );
// };

// export default App;

import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import NFTPage from './NFTPage';
// import NFTPage from './NFTPage.jsx'; // Import the new NFT page component
import { ethers } from 'ethers';
import Modal from 'react-modal';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState(null);
  const [error, setError] = useState(null);
  const [network, setNetwork] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const dojimaRpcUrl = 'https://rpc-d11k.dojima.network';
  const chainId = '0xBB'; // Dojima Stagenet Chain ID
  const symbol = 'DOJ';

  const transactionsPerPage = 15;
  const [currentPage, setCurrentPage] = useState(1);

  const customStyles = {
    content: {
      backgroundColor: 'white',
      color: 'black',
      width: '80%',
      margin: 'auto',
      borderRadius: '10px',
      padding: '20px',
    },
  };

  // Fetch Transactions from Etherscan
  const fetchTransactionsFromEtherscan = async () => {
    const url = `https://api-sepolia.etherscan.io/api?module=account&action=txlist&address=0x0577e1E35C4f30cA8379269B7Fd85cBCE7F084f4&startblock=0&endblock=99999999&page=${currentPage}&offset=100&sort=asc`;

    try {
      const response = await axios.get(url);
      if (response.data.status === '1') {
        const transactions = response.data.result;
        setTransactions(transactions);
        toast.success('Transactions fetched successfully!');
      } else {
        setError('No transactions found.');
        toast.error('No transactions found.');
      }
    } catch (err) {
      console.error('Error fetching transactions:', err);
      setError('Failed to fetch transactions.');
      toast.error('Failed to fetch transactions.');
    }
  };

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', handleAccountChange);
      window.ethereum.on('chainChanged', handleNetworkChange);
      
      return () => {
        window.ethereum.removeListener('accountsChanged', handleAccountChange);
        window.ethereum.removeListener('chainChanged', handleNetworkChange);
      };
    }
  }, [account]);

  const handleAccountChange = (accounts) => {
    if (accounts.length === 0) {
      setError('Disconnected. Please connect again.');
      disconnectWallet();
    } else {
      setAccount(accounts[0]);
      getBalance(accounts[0]);
      toast.info('Account changed. Wallet connected.');
    }
  };

  const handleNetworkChange = (newChainId) => {
    if (newChainId !== chainId) {
      setError('Wrong network. Please switch to Dojima Stagenet.');
      disconnectWallet();
      toast.error('Please switch to Dojima Stagenet.');
    } else {
      setNetwork('Dojima Stagenet');
      setError(null);
      getBalance(account);
      toast.success('Connected to Dojima Stagenet.');
    }
  };

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAccount(accounts[0]);
        const currentChainId = await window.ethereum.request({ method: 'eth_chainId' });
        if (currentChainId !== chainId) {
          await switchNetwork();
        }
        getBalance(accounts[0]);
        toast.success('MetaMask connected successfully!');
      } catch (err) {
        setError('MetaMask connection failed.');
        toast.error('MetaMask connection failed.');
      }
    } else {
      setError('MetaMask is not installed.');
      toast.error('MetaMask is not installed.');
    }
  };

  const switchNetwork = async () => {
    try {
      if(window.ethereum.chainId=='0xbb'){
        toast.success("You're already on the correct network.")
      }
      await window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [{
          chainId: chainId,
          chainName: 'Dojima Stagenet',
          rpcUrls: [dojimaRpcUrl],
          nativeCurrency: {
            name: 'Dojima',
            symbol: symbol,
            decimals: 18,
          },
        }],
      });
    } catch (err) {
      setError('Network switch failed.');
      toast.error('Network switch failed.');
    }
  };

  const getBalance = async (account) => {
    try {
      const provider = new ethers.providers.JsonRpcProvider(dojimaRpcUrl);
      const balance = await provider.getBalance(account);
      setBalance(ethers.utils.formatEther(balance));
    } catch (err) {
      setError('Failed to retrieve balance.');
    }
  };

  const openModal = () => {
    setModalIsOpen(true);
    fetchTransactionsFromEtherscan();
  };

  const closeModal = () => setModalIsOpen(false);

  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = transactions.slice(indexOfFirstTransaction, indexOfLastTransaction);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Router>
      <div style={{ padding: '20px' }}>
        <h1>Dojima Stagenet Wallet</h1>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {!account ? (
          <button onClick={connectWallet}>Connect MetaMask</button>
        ) : (
          <div>
            <p>Connected Account: {account}</p>
            <p>Balance: {balance} {symbol}</p>
            <button onClick={openModal}>View Sepolia Transactions</button>
            <button onClick={() => setAccount(null)}>Disconnect</button>
            <button onClick={switchNetwork}>Switch Network</button>
          </div>
        )}

        {/* Navigate to NFT Marketplace */}
        <Link to="/nft">
          <button>Go to NFT Marketplace</button>
        </Link>

        {/* Toast Container for notifications */}
        <ToastContainer />

        {/* Modal for Transaction List */}
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
        >
          <h2 style={{ color: 'black' }}>Sepolia Testnet Transactions</h2>
          {currentTransactions.length > 0 ? (
            <div>
              <table style={{ width: '100%', border: '1px solid black' }}>
                <thead>
                  <tr>
                    <th>Hash</th>
                    <th>From</th>
                    <th>To</th>
                    <th>Value</th>
                    <th>Gas Used</th>
                  </tr>
                </thead>
                <tbody>
                  {currentTransactions.map((tx, index) => (
                    <tr key={index}>
                      <td>{tx.hash || 'NA'}</td>
                      <td>{tx.from || 'NA'}</td>
                      <td>{tx.to || 'NA'}</td>
                      <td>{Number(ethers.utils.formatEther(tx.value)).toFixed(4) || 0} ETH</td>
                      <td>{tx.gas || 'NA'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Pagination */}
              <div style={{ marginTop: '20px' }}>
                {Array.from({ length: Math.ceil(transactions.length / transactionsPerPage) }, (_, i) => (
                  <button key={i} onClick={() => paginate(i + 1)}>
                    {i + 1}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <p>No transactions found or loading...</p>
          )}
          <button onClick={closeModal}>Close</button>
        </Modal>

        {/* Define Routes */}
        <Routes>
          <Route path="/nft" element={<NFTPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

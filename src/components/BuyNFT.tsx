import React from 'react';

const BuyNFT: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6">Buy NFT to Access Services</h2>
      <div className="bg-white shadow-md rounded-lg p-6">
        <p className="mb-4">You need to purchase our NFT to access the dashboard and analytics services.</p>
        <button className="bg-purple-600 text-white font-bold py-2 px-6 rounded-full hover:bg-purple-700 transition duration-300">
          Purchase NFT
        </button>
      </div>
    </div>
  );
};

export default BuyNFT;
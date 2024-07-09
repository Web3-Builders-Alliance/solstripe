import React from 'react';

const Features: React.FC = () => {
  const features = [
    { title: 'Decentralized Technology', description: 'Leverage the power of Solana blockchain for secure and transparent analytics.' },
    { title: 'AI-Powered Analysis', description: 'Get sentiment analysis and insights on your holdings using advanced AI algorithms.' },
    { title: 'Daily Reports', description: 'Receive comprehensive daily reports on your portfolio performance and market trends.' },
    { title: 'Wallet Integration', description: 'Seamlessly connect your Solana wallet for instant access to your holdings.' },
  ];

  return (
    <section className="py-20 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
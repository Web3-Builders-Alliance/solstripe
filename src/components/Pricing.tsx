import React from 'react';

const Pricing: React.FC = () => {
  const plans = [
    { name: 'Basic', price: '0.3 SOL', features: ['Daily reports', 'Basic sentiment analysis', 'Wallet integration'] },
    { name: 'Pro', price: '0.5 SOL', features: ['Everything in Basic', 'Advanced AI insights', 'Priority support'] },
    { name: 'Enterprise', price: 'Custom', features: ['Everything in Pro', 'Dedicated account manager', 'Custom integrations'] },
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Pricing</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div key={index} className="bg-white p-8 rounded-lg shadow-md text-center">
              <h3 className="text-2xl font-bold mb-4">{plan.name}</h3>
              <p className="text-4xl font-bold text-purple-600 mb-6">{plan.price}</p>
              <ul className="mb-8">
                {plan.features.map((feature, fIndex) => (
                  <li key={fIndex} className="mb-2">{feature}</li>
                ))}
              </ul>
              <button className="bg-purple-600 text-white font-bold py-2 px-6 rounded-full hover:bg-purple-700 transition duration-300">
                Get Started
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
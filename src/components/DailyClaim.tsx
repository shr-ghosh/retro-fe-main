import React, { useState } from 'react';
import { FiClock, FiGift } from 'react-icons/fi';

const DailyClaim = () => {
  const [claimed, setClaimed] = useState(false);
  const [timeLeft, setTimeLeft] = useState('23:59:59');

  const handleClaim = () => {
    setClaimed(true);
    // Here you would typically call an API to record the claim
    // and start a timer for the next claim period
  };

  return (
    <div className="w-full max-w-sm bg-primary-light text-white rounded-lg shadow-lg overflow-hidden">
      <div className="p-4 border-b border-gray-800">
        <h2 className="text-xl font-semibold text-secondary">Daily Claim</h2>
        <p className="text-sm text-gray-400">Claim your daily bonus!</p>
      </div>
      <div className="p-6 flex flex-col items-center space-y-4">
        <div className="text-6xl text-secondary">
          <FiGift />
        </div>
        {!claimed ? (
          <p className="text-sm text-gray-300">Your daily reward is ready to claim!</p>
        ) : (
          <div className="flex items-center space-x-2 text-gray-300">
            <FiClock size={16} />
            <p className="text-sm">Next claim available in: {timeLeft}</p>
          </div>
        )}
      </div>
      <div className="p-4 bg-primary">
        <button 
          onClick={handleClaim} 
          disabled={claimed}
          className="w-full p-2 bg-secondary hover:bg-secondary-light text-white rounded-sm shadow-sm transition text-sm disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {claimed ? 'Claimed' : 'Claim Now'}
        </button>
      </div>
    </div>
  );
};

export default DailyClaim;
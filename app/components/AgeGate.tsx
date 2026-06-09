'use client';

import React, { useState, useEffect } from 'react';

interface AgeGateProps {
  children: React.ReactNode;
}

export default function AgeGate({ children }: AgeGateProps) {
  const [isVerified, setIsVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const verified = localStorage.getItem('kronnoisseur-age-verified') === 'true';
    setIsVerified(verified);
    setIsLoading(false);
  }, []);

  const handleEnter = () => {
    localStorage.setItem('kronnoisseur-age-verified', 'true');
    setIsVerified(true);
  };

  const handleExit = () => {
    window.location.href = 'https://www.cdc.gov/marijuana/';
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#050a08]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#d4af37] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#d4af37] tracking-widest text-sm">THE KRONNOISSEUR</p>
        </div>
      </div>
    );
  }

  if (isVerified) {
    return <>{children}</>;
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#050a08] px-6">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <img 
            src="/brand/logo-master.jpg" 
            alt="The Kronnoisseur" 
            className="w-40 h-40 mx-auto object-contain opacity-95" 
          />
        </div>

        <p className="text-[#d4af37] text-xs tracking-[4px] mb-3">21+ ONLY</p>
        <h1 className="text-4xl font-semibold tracking-tight mb-4">Are you 21 or older?</h1>
        <p className="text-white/70 text-lg mb-8">
          This site features premium cannabis lifestyle apparel, media, and information intended for adults of legal age.
        </p>

        <div className="space-y-3">
          <button
            onClick={handleEnter}
            className="w-full py-4 bg-[#d4af37] text-[#050a08] font-semibold rounded-full text-lg hover:bg-[#f0d78c] transition"
          >
            YES, I AM 21 OR OLDER
          </button>
          <button
            onClick={handleExit}
            className="w-full py-4 border border-white/30 text-white/80 font-medium rounded-full text-lg hover:bg-white/5 transition"
          >
            NO, I AM UNDER 21
          </button>
        </div>

        <p className="mt-8 text-xs text-white/40">
          By entering you confirm you are of legal age to view cannabis-related content.
        </p>
      </div>
    </div>
  );
}

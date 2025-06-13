'use client';
import React from 'react';

const AuthStyles = () => {
    return (
        <style jsx>{`
      @keyframes float {
        0% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
        100% { transform: translateY(0px); }
      }
      @keyframes fade-in {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
      }
      @keyframes fade-in-delayed {
        0% { opacity: 0; transform: translateY(10px); }
        50% { opacity: 0; transform: translateY(10px); }
        100% { opacity: 1; transform: translateY(0); }
      }
      @keyframes scroll-up {
        0% { transform: translateY(0); }
        100% { transform: translateY(-50%); }
      }
      @keyframes scroll-down {
        0% { transform: translateY(-50%); }
        100% { transform: translateY(0); }
      }
      .animate-float {
        animation: float 3s ease-in-out infinite;
      }
      .animate-fade-in {
        animation: fade-in 0.6s ease-out forwards;
      }
      .animate-fade-in-delayed {
        animation: fade-in-delayed 1s ease-out forwards;
      }
      .animate-fade-in-up {
        animation: fade-in 0.8s ease-out forwards;
      }
    `}</style>
    );
};

export default AuthStyles;

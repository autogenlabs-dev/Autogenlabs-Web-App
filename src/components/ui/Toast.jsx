'use client';
import { useState, useEffect } from 'react';
import { CheckCircleIcon, XCircleIcon, ExclamationTriangleIcon, InformationCircleIcon, XMarkIcon } from '@heroicons/react/24/solid';

const Toast = ({ message, type = 'info', duration = 4000, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  const getStyles = () => {
    switch (type) {
      case 'success':
        return {
          icon: <CheckCircleIcon className="h-5 w-5 text-white" />,
          bg: 'bg-green-500',
          border: 'border-green-600'
        };
      case 'error':
        return {
          icon: <XCircleIcon className="h-5 w-5 text-white" />,
          bg: 'bg-red-500', 
          border: 'border-red-600'
        };
      case 'warning':
        return {
          icon: <ExclamationTriangleIcon className="h-5 w-5 text-white" />,
          bg: 'bg-yellow-500',
          border: 'border-yellow-600'
        };
      default:
        return {
          icon: <InformationCircleIcon className="h-5 w-5 text-white" />,
          bg: 'bg-blue-500',
          border: 'border-blue-600'
        };
    }
  };

  const styles = getStyles();

  return (
    <div className={`
      transform transition-all duration-300 ease-in-out
      ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}
    `}>
      <div className={`
        flex items-center min-w-80 max-w-md px-4 py-3 rounded-lg shadow-lg
        ${styles.bg} ${styles.border} border
      `}>
        <div className="flex-shrink-0">
          {styles.icon}
        </div>
        <div className="ml-3 flex-1">
          <p className="text-sm font-medium text-white">
            {message}
          </p>
        </div>
        <button
          onClick={handleClose}
          className="ml-3 flex-shrink-0 text-white/80 hover:text-white transition-colors"
        >
          <XMarkIcon className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default Toast;


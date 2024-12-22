import React from 'react';

const LoadingSpinner = () => {
    return (
        <div className='w-screen h-screen flex items-center justify-center'> 
            <span className="loading loading-dots loading-lg"></span>
        </div>
    );
};

export default LoadingSpinner;
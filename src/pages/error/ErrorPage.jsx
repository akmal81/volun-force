import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
    return (
        <div className='min-w-full min-h-screen flex items-center justify-center'>
            <div className='w-fit h-fit space-y-8 text-center'>

            <h2 className='text-5xl text-center'>404 Page Not Found</h2>
            <Link to='/' className='btn text-center'>Back To Home</Link>
            </div>
        </div>
    );
};

export default ErrorPage;
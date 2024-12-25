import React from 'react';

const PageHeader = ({image, title}) => {
    return (
        <div className={`${image} bg-no-repeat bg-cover bg-center brightness-75 h-[20rem] flex flex-col  items-center justify-center`}>
                <h2 className='text-5xl font-bold text-white p-3 rounded-lg backdrop-brightness-50 '>{title}</h2>
               
            </div>
    );
};

export default PageHeader;
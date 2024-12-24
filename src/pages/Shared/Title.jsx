import React from 'react';

const Title = ({st1,title}) => {
    return (
        <div>
            <h2 className="text-5xl font-bold"><span className='text-primary'>{st1}</span> {title}</h2>
        </div>
    );
};

export default Title;
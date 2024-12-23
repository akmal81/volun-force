import React from 'react';
import { Link, useLoaderData } from 'react-router-dom';

const VolunteerPostDetails = () => {
    const post = useLoaderData();

    const {_id, thumbnail, postTitle, description, category, location, volunteersNeeded, deadline, organizerName, organizerEmail}=post;
    
    return (
        <div className="hero bg-base-200 ">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <img
            src={thumbnail}
            className="max-w-sm rounded-lg shadow-2xl" />
          <div>
            <h1 className="text-5xl font-bold">{postTitle}</h1>
            <div className='space-y-2 mt-6'>
            <p className="">
             {description}
            </p>
            <p className="">
             Apply Befor: {deadline}
            </p>
            <p className="">
             Apply Befor: {volunteersNeeded}
            </p>
            <p className="">
            Category: {category}
            </p>
            <p className="">
             Location: {location}
            </p>
            </div>
            <Link to={`/beAVolunteer/${_id}`} className="btn bg-primary text-white text-lg mt-8">Be a Volunteer</Link>
          </div>
        </div>
      </div>
    );
};

export default VolunteerPostDetails;
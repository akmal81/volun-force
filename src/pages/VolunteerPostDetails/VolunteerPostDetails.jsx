import axios from 'axios';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useParams } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';

const VolunteerPostDetails = () => {
  const {id}= useParams()
  const [post, setPost] = useState(null);

  useEffect(()=>{
    const fetchPost =  ()=>{
      try{
        axios.get(`${import.meta.env.VITE_api_url}/post/${id}`, {withCredentials: true})
        .then(res=>setPost(res.data))

      }catch(err){

      }
      
    }
    fetchPost()
  },[id])
  
  if (!post) return <LoadingSpinner/>;
  


  const { _id, thumbnail, postTitle, description, category, location, volunteersNeeded, deadline, } = post;
  const formattedDeadline = deadline && !isNaN(new Date(deadline)) ? format(new Date(deadline), 'dd/MM/yyyy') : 'Invalid date';

  return (
    <div className="hero bg-base-200 ">
      <Helmet>
            <title>Details Post | VF</title>
        </Helmet>
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
              {/* Apply Befor: {format(new Date(deadline), 'dd/MM/yyyy')} */}
              {formattedDeadline}
            </p>
            <p className="">
              Volunteers Needed: {volunteersNeeded}
            </p>
            {
              !volunteersNeeded && <p className='text-red-700'>All needed Volunteers taken</p>
            }
            <p className="">
              Category: {category}
            </p>
            <p className="">
              Location: {location}
            </p>
          </div>

          <Link to={`/beAVolunteer/${_id}`}
            className={`btn bg-primary ${!volunteersNeeded && 'btn-disabled'} text-white text-lg mt-8`}>
            Be a Volunteer</Link>
        </div>
      </div>
    </div>
  );
};

export default VolunteerPostDetails;
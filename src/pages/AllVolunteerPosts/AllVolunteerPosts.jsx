import axios from 'axios';
import React, { useEffect, useState } from 'react';
import VolunteerPostCard from '../components/VolunteerPostCard';
import { Helmet } from 'react-helmet';
import LoadingSpinner from '../components/LoadingSpinner';

const AllVolunteerPosts = () => {

    const [posts, setPosts] = useState([]);
    const [search, setSearch] = useState('')

    useEffect(() => {
        const fetchAllPosts = async () => {
            const { data } = await axios.get(
                `${import.meta.env.VITE_api_url
                }/all-posts?search=${search}`
                
            )
            setPosts(data);
        }
        fetchAllPosts()
    }, [search])
   
    if(!posts) return<LoadingSpinner></LoadingSpinner>

    return (
        <section className='mt-6'>
            <Helmet><title>All Volunteer Posts</title></Helmet>


            <div className='bg-allpost bg-no-repeat bg-cover bg-center  h-[20rem] flex flex-col gap-6 items-center justify-center' >
                <h2 className='text-5xl font-bold text-white p-3 rounded-lg backdrop-brightness-50 '>All Volunteer Posts</h2>
                <label 
                className="input input-bordered flex w-2/3 md:w-2/5 items-center gap-2">
                    <input 
                    type="text" 
                    onChange={e=>setSearch(e.target.value)}
                    className="grow " 
                    placeholder="Search" />
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="h-4 w-4 opacity-70">
                        <path
                            fillRule="evenodd"
                            d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                            clipRule="evenodd" />
                    </svg>
                </label>
            </div>
          
            <div className="w-8/12 md:w-10/12  mx-auto mt-32 space-y-16">
          
            <div className="grid grid-cols-1 
            md:grid-cols-2 
            xl:grid-cols-3 
            xl:w-10/12 
            gap-10
             mx-auto mt-">
                {
                    posts.map(post => <VolunteerPostCard key={post._id} post={post}></VolunteerPostCard>)
                }

            </div>
            </div>


        </section>
    );
};

export default AllVolunteerPosts;
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import VolunteerPostCard from '../components/VolunteerPostCard';
import { Helmet } from 'react-helmet';
import LoadingSpinner from '../components/LoadingSpinner';
import TabeLayout from './TabeLayout';
import { FaThList } from "react-icons/fa";
import { IoGrid } from "react-icons/io5";

const AllVolunteerPosts = () => {

    const [posts, setPosts] = useState([]);
    const [search, setSearch] = useState('');
    const [layOut, setLayOut] = useState(true);


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

    if (!posts) return <LoadingSpinner></LoadingSpinner>

    return (
        <section className=''>
            <Helmet><title>All Volunteer Posts</title></Helmet>
            <div className=' bg-allpost bg-no-repeat bg-cover bg-center h-[20rem] flex flex-col gap-6 items-center justify-center' >
                <h2 className='text-5xl font-bold text-white p-3 rounded-lg backdrop-brightness-50 '>All Volunteer Posts</h2>
                <label
                    className="input input-bordered flex w-2/3 md:w-2/5 items-center gap-2">
                    <input
                        type="text"
                        onChange={e => setSearch(e.target.value)}
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

            <div className="w-10/12 lg:w-8/12 md:w-10/12  mx-auto my-32 space-y-16">
                <div className='flex   mx-auto  items-center gap-2'>

                    <button onClick={() => setLayOut(!layOut)} className='flex gap-2'>
                        {layOut ? <FaThList className='text-2xl text-primary' /> : <IoGrid className='text-2xl text-primary' />}
                    <span>Change Layout</span>
                    </button>
                </div>

                {
                    layOut ?
                        <div className="grid grid-cols-1 
                                        md:grid-cols-2 
                                        xl:grid-cols-3 
                                        
                                        gap-10
                                        mx-auto mt-">
                            {
                                posts.map(post => <VolunteerPostCard key={post._id} post={post}></VolunteerPostCard>)
                            }
                        </div>
                        :
                        <div className="  mx-auto my-32 space-y-16">
                            <div className="container p-2 mx-auto sm:p-4 dark:text-gray-800">
                                <h2 className="mb-4 text-2xl font-semibold leading-tight"></h2>
                                <div className="overflow-x-auto">
                                    <table className="min-w-full text-xs">
                                        <colgroup>
                                            <col />
                                            <col />
                                            <col />
                                            <col />
                                            <col />
                                            <col />
                                        </colgroup>
                                        <thead className="bg-primary">
                                            <tr className="text-left text-white">
                                                <th className="p-3">Thumbnail</th>
                                                <th className="p-3">Title</th>
                                                <th className="p-3">Category</th>
                                                <th className="p-3">Deadline</th>
                                                <th className="p-3">Volunteer Needed</th>
                                                <th className="p-3">Organizer</th>
                                                <th className="p-3 text-right">Details</th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                            {
                                                posts.map(post => <TabeLayout key={post._id} post={post}></TabeLayout>)
                                            }

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                }
            </div>
        </section>
    );
};

export default AllVolunteerPosts;
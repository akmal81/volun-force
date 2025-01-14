import React, { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet';
import LoadingSpinner from '../components/LoadingSpinner';
import PageHeader from '../Shared/PageHeader';
import { MdDelete } from "react-icons/md";
import { GrUpdate } from "react-icons/gr";

const ManageMyVolunteers = () => {

    const [myPosts, setMyPosts] = useState([]);
    const { user } = useAuth();


    useEffect(() => {

        fetchMyVolunteersPosts()
    }, [user]);


    const fetchMyVolunteersPosts = async () => {
        const { data } = await axios.get(
            `${import.meta.env.VITE_api_url
            }/myVolunteersPosts/${user?.email}`, { withCredentials: true }
        )
        setMyPosts(data)
    }

if(!myPosts) return <LoadingSpinner/>

    const handleDeletePost = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {

                try {
                    const { data } = await axios.delete(`${import.meta.env.VITE_api_url
                        }/deletePost/${id}`, {withCredentials: true})
                    fetchMyVolunteersPosts()

                } catch (err) {
                    toast.error(err.message)
                }

                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                });
            }
        });

    }

    return (
        <div className='mt-6'>
            <Helmet>
            <title>My Posts | VF</title>
        </Helmet>

        <PageHeader image={'bg-manage'} title={'Manage Volunteer Need Posts'} ></PageHeader>

        <section className='w-10/12 xl:w-8/12 mx-auto my-32'>
            {myPosts && myPosts.length > 0 ? (
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead className='bg-primary text-white '>
                            <tr>
                                <th>SL.</th>
                                <th>Post Title</th>
                                <th>Category</th>
                                <th>Dead Line</th>
                                <th>Volunteers Needed</th>
                                <th><h2 className='flex justify-end'>Action</h2></th>
                            </tr>
                        </thead>
                        <tbody className='text-base'>
                            {myPosts.map((post, idx) => (
                                <tr key={post._id || idx}>
                                    <th>{idx + 1}</th>
                                    <td>{post.postTitle}</td>
                                    <td>{post.category}</td>
                                    <td>
                                        {format(new Date(post.deadline), 'dd/MM/yyyy')}
                                    </td>
                                    <td>{post.volunteersNeeded}</td>
                                    <td className='text-left flex gap-2 justify-end'>
                                        <Link to={`/updateMyPost/${post._id}`} className="btn bg-primary text-white text-2xl"><GrUpdate /></Link>
                                        <button onClick={() => handleDeletePost(post?._id)} className="btn bg-red-700 text-2xl text-white"><MdDelete /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className='min-h-screen min-w-screen flex items-center justify-center'>No data found</div>
            )}
            </section>
        </div>
    );
};

export default ManageMyVolunteers;
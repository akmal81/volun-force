import React, { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';

const ManageMyVolunteers = () => {

    const [myPosts, setMyPosts] = useState([]);
    const { user } = useAuth();


    useEffect(() => {

        fetchMyVolunteersPosts()
    }, [user]);


    const fetchMyVolunteersPosts = async () => {
        const { data } = await axios.get(
            `${import.meta.env.VITE_api_url
            }/myVolunteersPosts/${user?.email}`
        )
        setMyPosts(data)
    }


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
                        }/deletePost/${id}`)
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
        <div>
            {myPosts && myPosts.length > 0 ? (
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>SL.</th>
                                <th>Post Title</th>
                                <th>Dead Line</th>
                                <th>Volunteers Needed</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {myPosts.map((post, idx) => (
                                <tr key={post._id || idx}>
                                    <th>{idx + 1}</th>
                                    <td>{post.postTitle}</td>
                                    <td>
                                        {format(new Date(post.deadline), 'P')}
                                    </td>
                                    <td>{post.volunteersNeeded}</td>
                                    <td>
                                        <Link to={`/updateMyPost/${post._id}`} className="btn bg-primary text-white">Update</Link>
                                        <button onClick={() => handleDeletePost(post?._id)} className="btn bg-red-700 text-white">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className='min-h-screen min-w-screen flex items-center justify-center'>No data found</div>
            )}
        </div>
    );
};

export default ManageMyVolunteers;
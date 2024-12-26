import axios from 'axios';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import useAuth from '../../hooks/useAuth';
import { Helmet } from 'react-helmet';
import PageHeader from '../Shared/PageHeader';

const MyVolunteerRequest = () => {

    const [request, setRequest] = useState([]);
    const { user } = useAuth()

    useEffect(() => {

        fetchAllRequest()
    }, [])

    const fetchAllRequest = async () => {
        const { data } = await axios.get(
            `${import.meta.env.VITE_api_url}/requests/${user.email}`, {withCredentials: true}
        )
        setRequest(data);
    }

    const handleDeleteRequest = (id) => {
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
                        }/deleteRequest/${id}`, {withCredentials:true})
                    fetchAllRequest()

                } catch (err) {
                    toast.error(err.message)
                }

                Swal.fire({
                    title: "Deleted!",
                    text: "Your Request has been deleted.",
                    icon: "success"
                });
            }
        });

    }



    return (
        <div className='mt-6 min-h-screen'>
            <Helmet>
            <title>My request | VF</title>
        </Helmet>
        <PageHeader image={'bg-addpost'} title={'My volunteer request'} ></PageHeader>
        <section className='w-10/12 xl:w-8/12 mx-auto my-32'>
            {
                request && request?.length > 0 ?
                    <div className="overflow-x-auto">
                        <table className="table">
                            {/* head */}
                            <thead className='bg-primary text-white'>
                                <tr>
                                    <th>Sl.</th>
                                    <th>Post Title</th>
                                    <th>Dead Line</th>
                                    <th>Organizer</th>
                                    <th className='flex justify-end '>Action</th>
                                </tr>
                            </thead>
                            <tbody className='text-base'>
                                {/* row 1 */}

                                {
                                    request && request.map((requ, idx) =>

                                        <tr key={requ?._id || idx}>
                                            <th>{idx + 1}</th>
                                            <td>{requ?.postTitle}</td>
                                            <td>{format(new Date(requ?.deadline), "dd/MM/yyyy")}</td>
                                            <td>{requ?.organizerName}</td>
                                            <td className='flex justify-end '>
                                                <button
                                                    onClick={() => handleDeleteRequest(requ?._id)}
                                                    className='btn bg-red-700 text-white'>Cancle</button>
                                            </td>
                                        </tr>
                                    )
                                }

                            </tbody>
                        </table>
                    </div>

                    :
                    <div>No data Found</div>
            }
            </section>
        </div>
    );
};

export default MyVolunteerRequest;
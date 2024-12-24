import axios from 'axios';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import useAuth from '../../hooks/useAuth';
import { Helmet } from 'react-helmet';

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
                        }/deleteRequest/${id}`)
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
        <div>
            <Helmet>
            <title>My request | VF</title>
        </Helmet>
            <h2>My Volunteer Request</h2>
            {
                request && request?.length > 0 ?
                    <div className="overflow-x-auto">
                        <table className="table">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th>Sl.</th>
                                    <th>Post Title</th>
                                    <th>Dead Line</th>
                                    <th>Organizer</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* row 1 */}

                                {
                                    request && request.map((requ, idx) =>

                                        <tr key={requ?._id || idx}>
                                            <th>{idx + 1}</th>
                                            <td>{requ?.postTitle}</td>
                                            <td>{format(new Date(requ?.deadline), "dd/MM/yyyy")}</td>
                                            <td>{requ?.organizerName}</td>
                                            <td>
                                                <button
                                                    onClick={() => handleDeleteRequest(requ?._id)}
                                                    className='btn bg-red-700 text-white'>Cancle Request</button>
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
        </div>
    );
};

export default MyVolunteerRequest;
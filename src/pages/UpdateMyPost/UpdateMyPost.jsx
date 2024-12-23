import { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import LoadingSpinner from '../components/LoadingSpinner';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet';

const UpdateMyPost = () => {

    const { user } = useAuth();
    const { id } = useParams();
    const navigate = useNavigate()
    const [myPosts, setMyPosts] = useState([]);
    const [postdeadline, setPostDeadline] = useState(new Date())

    useEffect(() => {
        const fetchPostByID = async () => {
            const { data } = await axios.get(
                `${import.meta.env.VITE_api_url
                }/post/${id}`
            )
            if (!data) {
                <LoadingSpinner></LoadingSpinner>
                return
            }
            setMyPosts(data);
            setPostDeadline(new Date(data.deadline))
        }
        fetchPostByID()
    }, [user])

    const handleSubmitUpdate = async (e) => {
        e.preventDefault();
        const form = e.target;
        const thumbnail = form.thumbnail.value;
        const postTitle = form.postTitle.value;
        const description = form.description.value;
        const category = form.category.value;
        const location = form.location.value;
        const volunteersNeeded = form.volunteersNeeded.value;
        const deadline = postdeadline;
        const organizerName = form.organizerName.value;
        const organizerEmail = form.organizerEmail.value;

        const updatedData = {thumbnail, postTitle, description, category, location, volunteersNeeded, deadline, organizerName, organizerEmail}
        console.table({updatedData})


        try{

            await axios.put(
                `${import.meta.env.VITE_api_url}/updatePost/${id}`, updatedData
            )
            form.reset();
            toast.success('Data Updated Successfully!!!')
            navigate('/managePost')

        }
        catch(err){
            toast.error(err.message)
        }
        

    }


    return (

        <div>
            <Helmet>
            <title>Update My Post | VF</title>
        </Helmet>
            <div className="">
                <div className=' space-y-4'>
                    <form onSubmit={handleSubmitUpdate} className="card-body">

                        {/* thumbnail */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Thumbnail</span>
                            </label>
                            <input type="url"
                                name='thumbnail'
                                placeholder=""
                                defaultValue={myPosts.thumbnail}

                                className="input input-bordered"
                                required />
                        </div>
                        {/* post Title */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Post Title</span>
                            </label>
                            <input type="text"
                                name='postTitle'
                                placeholder=""
                                defaultValue={myPosts.postTitle}

                                className="input input-bordered"
                                required />
                        </div>

                        {/* description */}

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Description</span>
                            </label>
                            <input type="text"
                                name='description'
                                placeholder=""
                                defaultValue={myPosts.description}

                                className="input input-bordered"
                                required />
                        </div>

                        {/* category */}

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Category</span>
                            </label>
                            <input type="text"
                                name='category'
                                placeholder=""
                                defaultValue={myPosts.category}

                                className="input input-bordered"
                                required />
                        </div>

                        {/* Location */}

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Location</span>
                            </label>
                            <input type="text"
                                name='location'
                                placeholder=""
                                defaultValue={myPosts.location}

                                className="input input-bordered"
                                required />
                        </div>

                        {/* No of volunteers needed */}

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">No of volunteers needed</span>
                            </label>
                            <input type="text"
                                name='volunteersNeeded'
                                placeholder=""
                                defaultValue={myPosts.volunteersNeeded}

                                className="input input-bordered"
                                required />
                        </div>

                        {/* Deadline */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Deadline</span>
                            </label>
                            <DatePicker
                                selected={postdeadline}
                                onChange={data => setPostDeadline(data)}
                                className="input input-bordered"
                            />
                        </div>

                        {/* Organizer name */}

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Organizer name</span>
                            </label>
                            <input type="text"
                                name='organizerName'
                                placeholder=""
                                defaultValue={myPosts.organizerName}
                                readOnly
                                className="input input-bordered"
                                required />
                        </div>

                        {/* Organizer email*/}

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Organizer email</span>
                            </label>
                            <input type="text"
                                name='organizerEmail'
                                placeholder=""
                                defaultValue={myPosts.organizerEmail}
                                readOnly
                                className="input input-bordered"
                                required />
                        </div>


                        <div className="form-control mt-6">
                            <button className="btn bg-primary text-white">Update Post</button>
                        </div>
                    </form>

                </div>

            </div>
        </div>
    );
};

export default UpdateMyPost;
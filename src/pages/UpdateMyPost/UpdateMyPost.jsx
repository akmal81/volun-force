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
import PageHeader from '../Shared/PageHeader';

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
                }/post/${id}`, { withCredentials: true }
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
        const volunteersNeeded = parseInt(form.volunteersNeeded.value);
        const deadline = postdeadline;
        const organizerName = form.organizerName.value;
        const organizerEmail = form.organizerEmail.value;

        const updatedData = { thumbnail, postTitle, description, category, location, volunteersNeeded, deadline, organizerName, organizerEmail }

        try {

            await axios.put(
                `${import.meta.env.VITE_api_url}/updatePost/${id}`, updatedData, {withCredentials: true}
            )
            form.reset();
            toast.success('Data Updated Successfully!!!')
            navigate('/managePost')

        }
        catch (err) {
            toast.error(err.message)
        }
    }

    return (

        <div className='mt-6'>
            <Helmet>
                <title>Update My Post | VF</title>
            </Helmet>
            <PageHeader image={'bg-update'} title={'Update Volunteer Need Post'} ></PageHeader>
            <div className='w-8/12 md:w-10/12  mx-auto my-32'>
                <div className='lg:w-8/12 md:w-full mx-auto shadow-lg'>
                    <form onSubmit={handleSubmitUpdate} className="card-body">

                        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                            {/* thumbnail */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-base">Thumbnail</span>
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
                                    <span className="label-text text-base">Post Title</span>
                                </label>
                                <input type="text"
                                    name='postTitle'
                                    placeholder=""
                                    defaultValue={myPosts.postTitle}

                                    className="input input-bordered"
                                    required />
                            </div>
                        </div>
                        {/* description */}

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-base">Description</span>
                            </label>
                            <textarea type="text"
                                name='description'
                                placeholder=""
                                rows={4}
                                defaultValue={myPosts.description}
                                className="textarea textarea-bordered resize"
                                required />

                        </div>
                        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                            {/* category */}

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-base">Category</span>
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
                                    <span className="label-text text-base">Location</span>
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
                                    <span className="label-text text-base">No of volunteers needed</span>
                                </label>
                                <input type="number"
                                    name='volunteersNeeded'
                                    placeholder=""
                                    defaultValue={myPosts.volunteersNeeded}

                                    className="input input-bordered"
                                    required />
                            </div>
                        </div>
                        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>

                            
                            {/* Deadline */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-base">Deadline</span>
                                </label>
                                <DatePicker
                                    selected={postdeadline}
                                    onChange={data => setPostDeadline(data)}
                                    className="input input-bordered w-full"
                                />
                            </div>

                            {/* Organizer name */}

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-base">Organizer name</span>
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
                                    <span className="label-text text-base">Organizer email</span>
                                </label>
                                <input type="text"
                                    name='organizerEmail'
                                    placeholder=""
                                    defaultValue={myPosts.organizerEmail}
                                    readOnly
                                    className="input input-bordered"
                                    required />
                            </div>
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
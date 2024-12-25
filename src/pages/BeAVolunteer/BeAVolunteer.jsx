import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import axios from 'axios';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import { format } from 'date-fns';
import DatePicker from 'react-datepicker';
import LoadingSpinner from '../components/LoadingSpinner';
import { Helmet } from 'react-helmet';
import PageHeader from '../Shared/PageHeader';

const BeAVolunteer = () => {
    const { user } = useAuth();
    // const post = useLoaderData();
    const navigate = useNavigate()

    const { id } = useParams()
    const [post, setPost] = useState(null);

    useEffect(() => {
        const fetchPost = () => {
            try {
                axios.get(`${import.meta.env.VITE_api_url}/post/${id}`, { withCredentials: true })
                    .then(res => setPost(res.data))

            } catch (err) {

            }

        }
        fetchPost()
    }, [id])

    if (!post) return <LoadingSpinner />;



    const { thumbnail, postTitle, description, category, location, volunteersNeeded, deadline, organizerName, organizerEmail } = post;

    const handleSubmitRequest = (e) => {
        e.preventDefault();
        const form = e.target;
        const thumbnail = form.thumbnail.value;
        const postTitle = form.postTitle.value;
        const description = form.description.value;
        const category = form.category.value;
        const location = form.location.value;
        const volunteersNeeded = parseInt(form.volunteersNeeded.value);
        const deadline = post.deadline;
        const organizerName = form.organizerName.value;
        const organizerEmail = form.organizerEmail.value;

        const volunteerName = form.volunteerName.value;
        const volunteerEmail = form.volunteerEmail.value;
        const suggestion = form.suggestion.value;
        const status = form.status.value;

        const formData = {
            thumbnail, postTitle, description, category, location, volunteersNeeded, deadline, organizerName, organizerEmail, volunteerName, volunteerEmail, suggestion, status
        }



        const volunteer_postId = post._id;

        const allData = { volunteer_postId, ...formData };



        axios.post(`${import.meta.env.VITE_api_url}/volunteerRequest`, allData)
            .then((response) => {
                const insertedId = response.data.insertedId;
                if (insertedId) {
                    Swal.fire('Request Sent Successful!!');
                    navigate('/myVolunteerRequest')
                }
            })
            .catch((error) => {
                //    error?.status && toast(error.)
                toast.error(error.response.data)

            })
    }


    return (
        <div className=" mt-8">
            <Helmet><title>Be a Volunteer</title></Helmet>
            <PageHeader image={'bg-addpost'} title={'Be a volunteer'} ></PageHeader>
            <div className='w-8/12 md:w-10/12  mx-auto my-32'>
                <div className='lg:w-8/12 md:w-full mx-auto shadow-lg rounded-xl bg-white'>
                    <form onSubmit={handleSubmitRequest} className="card-body">

                        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                            {/* thumbnail */}
                            <div className="form-control">
                                <label className="label ">
                                    <span className="label-text text-base text-secondary">Thumbnail</span>
                                </label>
                                <input type="url"
                                    name='thumbnail'
                                    placeholder=""
                                    defaultValue={thumbnail}
                                    readOnly
                                    className="input bg-slate-50 outline-none focus:outline-none focus:border-none font-light"
                                    required />
                            </div>
                            {/* post Title */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-base text-secondary">Post Title</span>
                                </label>
                                <input type="text"
                                    name='postTitle'
                                    placeholder=""
                                    defaultValue={postTitle}
                                    readOnly
                                    className="input bg-slate-50 outline-none focus:outline-none focus:border-none font-light"
                                    required />
                            </div>
                        </div>

                        {/* description */}

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-base text-secondary">Description</span>
                            </label>
                            <input type="text"
                                name='description'
                                placeholder=""
                                defaultValue={description}
                                readOnly
                                className="input bg-slate-50 outline-none focus:outline-none focus:border-none font-light"
                                required />
                        </div>

                        {/* category */}
                        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-base text-secondary">Category</span>
                                </label>
                                <input type="text"
                                    name='category'
                                    placeholder=""
                                    defaultValue={category}
                                    readOnly
                                    className="input bg-slate-50 outline-none focus:outline-none focus:border-none font-light"
                                    required />
                            </div>

                            {/* Location */}

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-base text-secondary">Location</span>
                                </label>
                                <input type="text"
                                    name='location'
                                    placeholder=""
                                    defaultValue={location}
                                    readOnly
                                    className="input bg-slate-50 outline-none focus:outline-none focus:border-none font-light"
                                    required />
                            </div>

                            {/* No of volunteers needed */}

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-base text-secondary">No of volunteers needed</span>
                                </label>
                                <input type="number"
                                    name='volunteersNeeded'
                                    placeholder=""
                                    defaultValue={volunteersNeeded}
                                    readOnly
                                    className="input bg-slate-50 outline-none focus:outline-none focus:border-none font-light"
                                    required />
                            </div>

                        </div>

                        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                            {/* Deadline */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-base text-secondary">Deadline</span>
                                </label>
                                <DatePicker type="date"
                                    name='deadline'
                                    placeholder=""
                                    // defaultValue={deadline}
                                    value={format(new Date(deadline), 'P')}
                                    readOnly
                                    className="input bg-slate-50 w-full outline-none focus:outline-none focus:border-none font-light"
                                    required />
                            </div>

                            {/* Organizer name */}

                            <div className="form-control text-base">
                                <label className="label">
                                    <span className="label-text text-base text-secondary">Organizer name</span>
                                </label>
                                <input type="text"
                                    name='organizerName'
                                    placeholder=""
                                    defaultValue={organizerName}
                                    readOnly
                                    className="input bg-slate-50 outline-none focus:outline-none focus:border-none font-light"
                                    required />
                            </div>

                            {/* Organizer email*/}

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-base text-secondary">Organizer email</span>
                                </label>
                                <input type="text"
                                    name='organizerEmail'
                                    placeholder=""
                                    defaultValue={organizerEmail}
                                    readOnly
                                    className="input bg-slate-50 outline-none focus:outline-none focus:border-none font-light"
                                    required />
                            </div>

                        </div>

                        {/* input */}
                        <div className='grid grid-cols-1 md:grid-cols-3  gap-6'>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-base text-secondary">Your Email</span>
                                </label>
                                <input
                                    name='volunteerEmail'
                                    type="email"
                                    placeholder="email"
                                    defaultValue={user?.email} readOnly
                                    className="input bg-slate-50 outline-none focus:outline-none focus:border-none font-light" 
                                    required />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-base text-secondary">Your Name</span>
                                </label>
                                <input
                                    name='volunteerName'
                                    type="text"
                                    placeholder=""
                                    defaultValue={user?.displayName} readOnly
                                    className="input bg-slate-50 outline-none focus:outline-none focus:border-none font-light"
                                     required />
                            </div>


                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-base text-secondary">Status</span>
                                </label>
                                <select name="status" id="" defaultValue='Requested' className="input bg-slate-50 input-bordered font-light">
                                    <option value="requested">Requested</option>

                                </select>

                            </div>
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-base text-secondary">Your Suggestion</span>
                                </label>
                                <textarea
                                    name='suggestion'
                                    type="text"
                                    placeholder="Write your suggestion"
                                    rows={4}
                                    className="textarea bg-slate-50 text-secondary textarea-bordered text-base" >
                                </textarea>
                            </div>
                        

                        <div className="form-control mt-6">
                            <button className="btn bg-primary text-white">Send Request</button>
                        </div>
                    </form>

                </div></div>

        </div>
    );
};

export default BeAVolunteer;
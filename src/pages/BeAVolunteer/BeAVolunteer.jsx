import React from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import axios from 'axios';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import { format } from 'date-fns';
import DatePicker from 'react-datepicker';

const BeAVolunteer = () => {
    const { user } = useAuth();
    const post = useLoaderData();
    const navigate = useNavigate()
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
        
        const allData = {volunteer_postId, ...formData};

     

            axios.post(`${import.meta.env.VITE_api_url}/volunteerRequest`, allData)
            .then((response)=>{
                const insertedId = response.data.insertedId;
                if(insertedId){
                    Swal.fire('Request Sent Successful!!');
                    navigate('/myVolunteerRequest')
                }
            })
            .catch((error)=>{
            //    error?.status && toast(error.)
            toast.error(error.response.data)

            })
    }


    return (
        <div className="">
            <div className=' space-y-4'>
                <form onSubmit={handleSubmitRequest} className="card-body">

                    {/* thumbnail */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Thumbnail</span>
                        </label>
                        <input type="url"
                            name='thumbnail'
                            placeholder=""
                            defaultValue={thumbnail}
                            readOnly
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
                            defaultValue={postTitle}
                            readOnly
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
                            defaultValue={description}
                            readOnly
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
                            defaultValue={category}
                            readOnly
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
                            defaultValue={location}
                            readOnly
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
                            defaultValue={volunteersNeeded}
                            readOnly
                            className="input input-bordered"
                            required />
                    </div>
                    
                       
                    

                    {/* Deadline */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Deadline</span>
                        </label>
                        <DatePicker type="date"
                            name='deadline'
                            placeholder=""
                            // defaultValue={deadline}
                            value={format(new Date(deadline), 'P')}
                            readOnly
                            className="input input-bordered w-full"
                            required />
                    </div>

                    {/* Organizer name */}

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Organizer name</span>
                        </label>
                        <input type="text"
                            name='organizerName'
                            placeholder=""
                            defaultValue={organizerName}
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
                            defaultValue={organizerEmail}
                            readOnly
                            className="input input-bordered"
                            required />
                    </div>

                    {/* input */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Your Email</span>
                        </label>
                        <input
                            name='volunteerEmail'
                            type="email"
                            placeholder="email"
                            defaultValue={user?.email} readOnly
                            className="input input-bordered" required />
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Your Name</span>
                        </label>
                        <input
                            name='volunteerName'
                            type="text"
                            placeholder=""
                            defaultValue={user?.displayName} readOnly
                            className="input input-bordered" required />
                    </div>


                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Your Suggestion</span>
                        </label>
                        <textarea
                            name='suggestion'
                            type="text"
                            placeholder=""

                            className="input input-bordered" >
                        </textarea>
                    </div>


                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Status</span>
                        </label>
                        <select name="status" id="" defaultValue='Requested' className="input input-bordered">
                            <option value="requested">Requested</option>

                        </select>

                    </div>
                    <div className="form-control mt-6">
                        <button className="btn bg-primary text-white">Request</button>
                    </div>
                </form>

            </div>

        </div>
    );
};

export default BeAVolunteer;
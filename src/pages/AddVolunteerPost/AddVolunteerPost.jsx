import { useState } from 'react';
import DatePicker from 'react-datepicker';
import useAuth from '../../hooks/useAuth';
import { format } from 'date-fns';
import axios from 'axios';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import PageHeader from '../Shared/PageHeader';


const AddVolunteerPost = () => {
  const { user } = useAuth();
  const navigate = useNavigate()
  const [postDeadline, setPostDeadline] = useState(new Date());
  const formatedDate = format(new Date(postDeadline), 'dd/MM/yyyy');


  // date validation

  if (postDeadline < new Date()) {
    setPostDeadline(new Date());
    
  }
  const handleAddPost = async (e) => {
    e.preventDefault();
    const form = e.target;
    const thumbnail = form.thumbnail.value;
    const postTitle = form.postTitle.value;
    const description = form.description.value;
    const category = form.category.value;
    const location = form.location.value;
    const volunteersNeeded = parseInt(form.volunteersNeeded.value);
    const deadline = postDeadline;
    const organizerName = user?.displayName;
    const organizerEmail = user?.email;

    const addPostData = { thumbnail, postTitle, description, category, location, volunteersNeeded, deadline, organizerName, organizerEmail }


    try {
      await axios.post(`${import.meta.env.VITE_api_url}/posts`, addPostData, { withCredentials: true }
      )
      form.reset();
      Swal.fire('Volunteer Need Post added Successfully!!!')
      navigate('/managePost')

    } catch (err) {
      toast.error(err.message)
    }
  }

  return (
    <div className='mt-6'>
      <Helmet><title>Add Post</title></Helmet>
      <PageHeader image={'bg-addpost'} title={'Add Volunteer Need Post'} ></PageHeader>
      <section className='w-8/12 md:w-10/12  mx-auto my-32'>
        <div className='lg:w-8/12 md:w-full mx-auto shadow-lg' >
          <form onSubmit={handleAddPost} className="card-body shadow-lg">

            {/* thumbnail */}

            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>


              <div className="form-control">
                <label className="label">
                  <span className="label-text text-base">Thumbnail</span>
                </label>
                <input type="url"
                  name='thumbnail'
                  placeholder="Photo url"


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
                  placeholder="Post Title"
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
                placeholder="Description"
                rows={4}
                className="textarea textarea-bordered"
                required > </textarea>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
              {/* category */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-base">Category</span>
                </label>
                <input type="text"
                  name='category'
                  placeholder="Category"
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
                  placeholder="Location"
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
                  placeholder="Please input a numeric value"
                  className="input input-bordered"
                  required />
              </div>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
              {/* Deadline */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-base">Deadline <em>Please select valid date</em></span>
                </label>
                <DatePicker
                  name='deadline'
                  value={formatedDate}
                  onChange={(date, e) => { e.preventDefault(); setPostDeadline(date) }}
                  dateFormat="dd/MM/yyyy"
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
                  defaultValue={user.displayName}
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
                  defaultValue={user.email}
                  readOnly
                  className="input input-bordered"
                  required />
              </div>
            </div>
            <div className="form-control mt-6">
              <button className="btn bg-primary text-white">Add Post</button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default AddVolunteerPost;
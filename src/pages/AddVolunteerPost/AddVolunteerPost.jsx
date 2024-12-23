import { useState } from 'react';
import DatePicker from 'react-datepicker';
import useAuth from '../../hooks/useAuth';
import { format } from 'date-fns';
import axios from 'axios';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const AddVolunteerPost = () => {
  const { user } = useAuth();
  const navigate = useNavigate()
  const [postDeadline, setPostDeadline] = useState(new Date());
  const formatedDate = format(new Date(postDeadline), 'dd/MM/yyyy');

  // date validation
 
  if (postDeadline < new Date()) {
    setPostDeadline(new Date())
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
      await axios.post(`${import.meta.env.VITE_api_url}/posts`, addPostData
      )
      form.reset();
      Swal.fire('Volunteer Need Post added Successfully!!!')
      navigate('/managePost')

    } catch (err) {
      toast.error(err.message)
    }
  }

  return (
    <div>
      <h2>AddVolunteerPost</h2>
      <div className=' space-y-4'>
        <form onSubmit={handleAddPost} className="card-body">

          {/* thumbnail */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Thumbnail</span>
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
              <span className="label-text">Post Title</span>
            </label>
            <input type="text"
              name='postTitle'
              placeholder="Post Title"
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
              placeholder="Description"


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
              placeholder="Category"
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
              placeholder="Location"
              className="input input-bordered"
              required />
          </div>

          {/* No of volunteers needed */}

          <div className="form-control">
            <label className="label">
              <span className="label-text">No of volunteers needed</span>
            </label>
            <input type="number"
              name='volunteersNeeded'
              placeholder="please input a numeric value"
              className="input input-bordered"
              required />
          </div>

          {/* Deadline */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Deadline <em>Please select valid date</em></span>
            </label>
            <DatePicker
              name='deadline'
              value={formatedDate}
              onChange={date => setPostDeadline(date)}
              dateFormat="dd/MM/yyyy"
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
              defaultValue={user.displayName}
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
              defaultValue={user.email}
              readOnly
              className="input input-bordered"
              required />
          </div>
          <div className="form-control mt-6">
            <button className="btn bg-primary text-white">Add Post</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddVolunteerPost;
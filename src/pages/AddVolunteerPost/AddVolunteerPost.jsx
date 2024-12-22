
const AddVolunteerPost = () => {
   

    return (
        <form className="card-body">

        {/* thumbnail */}
      <div className="form-control">
        <label className="label">
          <span className="label-text">Thumbnail</span>
        </label>
        <input type="url"
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
        <input type="date"
         placeholder="" 
         defaultValue={deadline}
         readOnly
         className="input input-bordered" 
         required />
      </div>

      {/* Organizer name */}

      <div className="form-control">
        <label className="label">
          <span className="label-text">Organizer name</span>
        </label>
        <input type="text"
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
         placeholder="" 
         defaultValue={organizerEmail}
         readOnly
         className="input input-bordered" 
         required />
      </div>
      
      <div className="form-control mt-6">
        <button className="btn bg-primary text-white text-lg">Request</button>
      </div>
    </form>
    );
};

export default AddVolunteerPost;
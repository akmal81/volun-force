import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const VolunteerPostCard = ({ post }) => {
   
    const { _id, thumbnail, postTitle, category, deadline, } = post;

    return (
        <div className="card   shadow-xl bg-white">
            <div>
                <img className="w-full rounded-t-xl" src={thumbnail} alt="" />
            </div>
            <div className="card-body text-secondary">
                <h2 className="card-title">{postTitle}</h2>
                <div className="badge  border-primary text-primary badge-outline">{category}</div>
                <p></p>
                <p>Apply Before: {deadline}</p>
                <div className="card-actions">
                    <Link to={`/postDetails/${_id}`} className="btn bg-primary text-white border-none">View Details</Link>
                </div>
            </div>
        </div>
    );
};
// PropTypes Validation
VolunteerPostCard.propTypes = {
    post: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        thumbnail: PropTypes.string,
        postTitle: PropTypes.string.isRequired,
        category: PropTypes.string,
        deadline: PropTypes.string,
    }).isRequired,
};
export default VolunteerPostCard;
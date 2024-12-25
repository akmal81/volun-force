import { format } from "date-fns";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const VolunteerPostCard = ({ post }) => {
   
    const { _id, thumbnail, postTitle, category, deadline, volunteersNeeded} = post;

    const formatedDate =format(new Date(deadline), 'dd/MM/yyyy')
    const originDateFormate =new Date(post.deadline)
    const todayDate = new Date();
    return (
        <div className="card  border bg-white">
            <div>
                <img className="w-full rounded-t-xl" src={thumbnail} alt="" />
            </div>
            <div className="card-body text-secondary">
                <h2 className="card-title">{postTitle}</h2>
                <div className="badge  border-primary text-primary badge-outline">{category}</div>
                <p></p>
                <p className=""><strong>Will Expire:</strong> <span
                 className={`
                 ${todayDate > originDateFormate ? 'text-red-700' : 'text-primary'}
                 `}>{format(new Date(deadline), 'dd/MM/yyyy')}</span></p>
                <div className="card-actions">
                    <Link to={`/postDetails/${_id}`} 
                    className="btn bg-primary hover:bg-secondary text-white border-none"
                    
                    >View Details</Link>
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
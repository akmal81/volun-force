import { format } from "date-fns";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const VolunteerPostCard = ({ post }) => {
   
    const { _id, thumbnail, postTitle, category, deadline, volunteersNeeded} = post;

    const formatedDate =format(new Date(deadline), 'dd/MM/yyyy')
    const originDateFormate =new Date(post.deadline)
    const todayDate = new Date();
    return (
        <div className="card  border p-4 bg-white">
            <div className="flex gap-4 items-start justify-between ">
                <img className="w-20 rounded" src={thumbnail} alt="" />
                
            <span className="badge  border-primary text-xs text-primary no whitespace-nowrap badge-outline">{category}</span>
            </div>

            <h2 className=" font-bold text-xl text-slate-950 mt-10">{postTitle}</h2>
            <div className="card-body items-end flex-row justify-center mt-4 text-secondary p-0">
                <p className="text-sm">Deadline: <span
                 className={`
                 ${todayDate > originDateFormate ? 'text-red-700' : 'text-primary'}
                 `}>{format(new Date(deadline), 'dd/MM/yyyy')}</span></p>
                <div className="card-actions">
                    <Link to={`/postDetails/${_id}`} 
                    className=" whitespace-nowrap border px-2 py-2 rounded-lg border-primary text-slate-950 hover:bg-primary hover:text-white "
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
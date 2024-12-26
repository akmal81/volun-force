import { format } from 'date-fns';
import React from 'react';
import { Link } from 'react-router-dom';

const TabeLayout = ({ post }) => {
    const formatedDate = format(new Date(post.deadline), 'dd/MM/yyyy');
    const originDateFormate =new Date(post.deadline)
    const todayDate = new Date();


    return (
        <tr className="border-b border-opacity-20 text-base dark:border-gray-300 dark:bg-gray-50">
            <td className="p-3">
                <img src={post.thumbnail}  className='w-20 rounded-lg' alt="" />
            </td>
            <td className="p-3 font-semibold">
                <p>{post.postTitle}</p>
            </td>
            <td className="p-3">
                <p>{post.category}</p>
            </td>
            <td className="p-3">
                <p
                    className={`${todayDate > originDateFormate ? 'text-red-700' : ''}`}

                >{format(new Date(post.deadline), 'dd/MM/yyyy')}</p>

            </td>
            <td className="p-3 text-center">
                <p
                    // className={`${post.volunteersNeeded ===0 ? 'text-red-700':'' }`}
                    className={`${post.volunteersNeeded < 1 ? 'text-red-700' : ''}`}

                >{post.volunteersNeeded}</p>

            </td>
            <td className="p-3">
                <p>{post.organizerName}</p>
            </td>
            <td className="p-3 text-right">
                <Link to={`/postDetails/${post?._id}`}>
                    <span className=" whitespace-nowrap border px-2 py-2 rounded-lg border-green-600/25 hover:bg-primary hover:text-white">
                        <span>View</span>
                    </span>
                </Link>
            </td>
        </tr>
    );
};

export default TabeLayout;
import axios from "axios";

import Banner from "../components/Banner";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import VolunteerPostCard from "../components/VolunteerPostCard";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

const Home = () => {
    const [posts, setPosts] = useState([]);
    const [err, setErr] = useState('')

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_api_url}/posts`);
                setPosts(response.data);
            } catch (error) {
                setErr(error);
                toast.error(err)
            }
        };

        fetchPosts();
    }, []);



    return (
        <>
        <Helmet>
            <title>Home | VF</title>
        </Helmet>
            <Banner />
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 xl:w-10/12 gap-10 mx-auto mt-40">
                {
                    posts.map(post => <VolunteerPostCard key={post._id} post={post}></VolunteerPostCard>)
                }
               
            </div>
            <div className="text-center mt-16">
                <Link to='/allPosts' className="btn bg-primary text-lg text-white">See All</Link>
            </div>

            <div>2 extra section pending</div>        
            </>
    );
};

export default Home;
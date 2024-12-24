import axios from "axios";

import Banner from "../components/Banner";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import VolunteerPostCard from "../components/VolunteerPostCard";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import LoadingSpinner from "../components/LoadingSpinner";
import Title from "../Shared/Title";
import Subscribe from "./Subscribe";
import ConnectWithUs from "./ConnectWithUs";

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

    if (!posts) return <LoadingSpinner></LoadingSpinner>

    return (
        <>
            <Helmet>
                <title>Home | VF</title>
            </Helmet>

            <Banner />
            <section className="w-8/12 md:w-10/12 lg:w-8/12 mx-auto mt-32 space-y-16">


                <Title st1={'Recent'} title={'Volunteer Need Post'} />

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-16 xl:gap-10 gp mx-auto">

                    {
                        posts.map(post => <VolunteerPostCard key={post._id} post={post}></VolunteerPostCard>)
                    }

                </div>
            </section>
            <div className="text-center mt-20 mb-40">
                <Link to='/allPosts' type="button" className="px-8 py-3 font-semibold rounded-lg bg-primary hover:bg-secondary dark:text-white">See All</Link>
            </div>
            <Subscribe/>
            <ConnectWithUs/>
        </>
    );
};

export default Home;
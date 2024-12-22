import axios from "axios";

import Banner from "../components/Banner";
import { useEffect, useState } from "react";

const Home = () => {
    const [posts, setPosts] = useState([]);
 

    useEffect(()=>{
        const postsData =  axios.get(`${import.meta.env.VITE_api_url}/posts`)
        setPosts(postsData.data)

    },[])
      
    
    console.log(posts);


    return (
        <div>
            <Banner/>
          
        </div>
    );
};

export default Home;
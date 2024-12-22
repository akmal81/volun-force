import { createBrowserRouter } from "react-router-dom";
import MainLayouts from "../layouts/MainLayouts";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Home from "../pages/Home/Home";
import AllVolunteerPosts from "../pages/AllVolunteerPosts/AllVolunteerPosts";
import PrivateRoute from "./PrivateRoute";
import AddVolunteerPost from "../pages/AddVolunteerPost/AddVolunteerPost";
import VolunteerPostDetails from "../pages/VolunteerPostDetails/VolunteerPostDetails";
import BeAVolunteer from "../pages/BeAVolunteer/BeAVolunteer";

const router = createBrowserRouter(
    [
        {
            path:'/',
            element: <MainLayouts/>,
            errorElement:<h2>404 page not found</h2>,
            children:[
                {
                    path:'/',
                    element:<Home/>
                },
                {
                    path:'/postDetails/:id',
                    element:<PrivateRoute>
                    <VolunteerPostDetails/>
                    </PrivateRoute>,
                    loader: ({params}) => fetch(`http://localhost:5000/post/${params.id}`)
                   

                },

                {
                    path:'/beAVolunteer/:id',
                    element:<PrivateRoute>
                        <BeAVolunteer/>
                    </PrivateRoute>,
                     loader: ({params}) => fetch(`http://localhost:5000/post/${params.id}`)
                   

                },
                {
                    path:'/allPosts',
                    element:<AllVolunteerPosts/>

                },
                {
                    path:'/addPost',
                    element:<PrivateRoute>
                        <AddVolunteerPost/>
                    </PrivateRoute>
                },
                {
                    path:'/login',
                    element:<Login/>
                },
                {
                    path:'/register',
                    element:<Register/>
                }
            ]
            
        }
    ]
)


export default router;
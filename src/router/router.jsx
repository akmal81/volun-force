import { createBrowserRouter } from "react-router-dom";
import MainLayouts from "../layouts/MainLayouts";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";

const router = createBrowserRouter(
    [
        {
            path:'/',
            element: <MainLayouts/>,
            errorElement:<h2>404 page not found</h2>,
            children:[
                {
                    path:'/',
                    element:<h2>Home</h2>
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
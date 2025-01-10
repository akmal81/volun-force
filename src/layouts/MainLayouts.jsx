import { Outlet } from "react-router-dom";
import Navbar from "../pages/Shared/Navbar";
import Footer from "../pages/Shared/Footer";
import { Helmet } from "react-helmet-async";



const MainLayouts = () => {
    return (
        <>
         <Helmet><title>VH | Home</title></Helmet>
        <header className="">    
            <Navbar/>
            
        </header>
        
        <main className="mt-12">
            <Outlet/>
        </main>
        <footer className="w-full bg-secondary">
            <Footer/>
        </footer>
        </>
    );
};

export default MainLayouts;
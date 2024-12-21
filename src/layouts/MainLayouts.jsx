import { Outlet } from "react-router-dom";
import Navbar from "../pages/Shared/Navbar";
import Footer from "../pages/Shared/Footer";


const MainLayouts = () => {
    return (
        <>
        <header className="w-11/12 xl:w-8/12 mx-auto">    
            <Navbar/>
        </header>
        <main className="w-11/12 xl:w-8/12 mx-auto min-h-screen">
            <Outlet/>
        </main>
        <footer className="w-11/12 xl:w-8/12 mx-auto">
            <Footer/>
        </footer>
        </>
    );
};

export default MainLayouts;
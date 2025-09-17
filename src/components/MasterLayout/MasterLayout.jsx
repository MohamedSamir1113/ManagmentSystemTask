import SideBar from '../SideBar/SideBar';
import { Outlet } from 'react-router-dom';
import NavBar from '../NavBar/NavBar';
import { useState } from 'react';


const MasterLayout = () => {
    const [isCollapsed, setIsCollapsed] = useState(true);
    return <>
        
            <div className="d-flex">
                <div className="">
                    <SideBar setIsCollapsed={setIsCollapsed} isCollapsed={isCollapsed}/>
                </div>
                <div className="w-100" style={{backgroundColor:"#F8F8F8"}}>
                    <NavBar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed}/>
                    <Outlet />
                </div>
            </div>
    </>
}

export default MasterLayout;



import { Outlet } from 'react-router-dom';
import MainNavigation from '../components/UI/Navbar/MainNavigation';

function RootLayout() {
    return (
        <>
            <MainNavigation />
            <Outlet />
        </>
    );
}

export default RootLayout;

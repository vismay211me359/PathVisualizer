import React, { useState, useEffect } from 'react'
import MobileNav from './MobileNav';
import LargeNav from './LargeNav';

const NavBar = () => {
    const [isMobile, setIsMobile] = useState(false);

    const handleResize = () => {
        setIsMobile(window.innerWidth < 1250);
    };

    useEffect(() => {
        handleResize();

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className='border-b-2 border-white'>
            {isMobile ? <MobileNav /> : <LargeNav />}
        </div>
    )
}

export default NavBar

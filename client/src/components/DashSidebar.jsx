// import { Sidebar } from 'flowbite-react';
// import { HiUser, HiArrowSmRight, } from 'react-icons/hi';
// import { useEffect, useState } from 'react';
// import { useLocation, useNavigate, Link } from 'react-router-dom';
// import { useSelector } from 'react-redux';

// export default function DashSidebar() {
//     const location = useLocation();
//     const navigate = useNavigate();
//     const { currentUser } = useSelector((state) => state.user);
//     const [tab, setTab] = useState('');

//     useEffect(() => {
//         const urlParams = new URLSearchParams(location.search);
//         const tabFromUrl = urlParams.get('tab');
//         if (tabFromUrl) {
//             setTab(tabFromUrl);
//         }
//     }, [location.search]);

//     const handleNavigation = (path) => {
//         navigate(path);
//     };

//     return (
//         <Sidebar className='w-full md:w-56'>
//             <Sidebar.Items>
//                 <Sidebar.ItemGroup>
//                   <Link to='/dashboard?tab=profile'>
//                             <Sidebar.Item
//                             active={tab === 'profile'}
//                             icon={HiUser}
//                             // label={currentUser.isAdmin ? 'Admin' : 'User'}
//                             label='User'
//                             labelColor='dark'
//                             as='div'
//                             >
//                             Profile
//                             </Sidebar.Item>
//                         </Link>
//                     {/* {currentUser.isAdmin && ( */}
//                         <Link to='/dashboard?tab=posts'>
//                         <Sidebar.Item
//                             active={tab === 'posts'}
//                             icon={HiDocumentText}
//                             as='div'
//                         >
//                             Posts
//                         </Sidebar.Item>
//                         </Link>
//                     {/* )} */}
//                     <Sidebar.Item 
//                         icon={HiArrowSmRight} 
//                         className='cursor-pointer'
//                         onClick={() => handleNavigation('/sign-out')}
//                     >
//                         Sign Out
//                     </Sidebar.Item>
//                 </Sidebar.ItemGroup>
//             </Sidebar.Items>
//         </Sidebar>
//     );
// }
import { Sidebar } from 'flowbite-react';
import { HiUser, HiArrowSmRight, HiDocumentText } from 'react-icons/hi';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function DashSidebar() {
    const location = useLocation();
    const navigate = useNavigate();
    const {currentUser}=useSelector(state=> state.user);
    const [tab, setTab] = useState('');

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const tabFromUrl = urlParams.get('tab');
        if (tabFromUrl) {
            setTab(tabFromUrl);
        }
    }, [location.search]);

    const handleNavigation = (path) => {
        navigate(path);
    };

    return (
        <Sidebar className='w-full md:w-56'>
            <Sidebar.Items>
                <Sidebar.ItemGroup>
                  <Link to='/dashboard?tab=profile'>
                            <Sidebar.Item
                            active={tab === 'profile'}
                            icon={HiUser}
                            label={currentUser?.isAdmin ? 'Admin' : 'User'}
                            labelColor='dark'
                            as='div'
                            >
                            Profile
                            </Sidebar.Item>
                        </Link>
                      
                    {/* {currentUser.isAdmin && ( */}
                        <Link to='/dashboard?tab=posts'>
                        <Sidebar.Item
                            active={tab === 'posts'}
                            icon={HiDocumentText}
                            as='div'
                        >
                            Posts
                        </Sidebar.Item>
                        </Link>
                    {/* )} */}
                    <Sidebar.Item 
                        icon={HiArrowSmRight} 
                        className='cursor-pointer'
                        onClick={() => handleNavigation('/sign-out')}
                    >
                        Sign Out
                    </Sidebar.Item>
                </Sidebar.ItemGroup>
            </Sidebar.Items>
        </Sidebar>
    );
}
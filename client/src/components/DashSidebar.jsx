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
<<<<<<< HEAD
import { HiUser, HiArrowSmRight, HiDocumentText } from 'react-icons/hi';
=======
import { HiUser, HiArrowSmRight, HiOutlineUserGroup } from 'react-icons/hi';
>>>>>>> 4638a41c5a2f3262e85fa6bee454bbe658e7a2e9
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { signoutSuccess } from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';

export default function DashSidebar() {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {currentUser}=useSelector(state=> state.user);
    const [tab, setTab] = useState('');

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const tabFromUrl = urlParams.get('tab');
        if (tabFromUrl) {
            setTab(tabFromUrl);
        }
    }, [location.search]);

    const handleSignout = async ()=>{
        try{
            const res = await fetch('/api/user/signout', {
                method: 'POST',
            });
            const data = await res.json();
            if(!res.ok){
                console.log(data.messege);
            } else{
                dispatch(signoutSuccess());
            }
        }catch(error){
            console.log(error.message);
        }
    };

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
<<<<<<< HEAD
                    {/* )} */}
=======
                    )}
                    {currentUser.isAdmin && (
                        <Link to='/dashboard?tab=users'>
                        <Sidebar.Item
                            active={tab === 'users'}
                            icon={HiOutlineUserGroup}
                            as='div'
                        >
                            Users
                        </Sidebar.Item>
                        </Link>
                    )}
>>>>>>> 4638a41c5a2f3262e85fa6bee454bbe658e7a2e9
                    <Sidebar.Item 
                        icon={HiArrowSmRight} 
                        className='cursor-pointer'
                         onClick = {handleSignout}
{/*                         onClick={() => handleNavigation('/sign-out')} */}
                    >
                        Sign Out
                    </Sidebar.Item>
                </Sidebar.ItemGroup>
            </Sidebar.Items>
        </Sidebar>
    );
}

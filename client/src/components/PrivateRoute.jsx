// Make the Dashboard Private:
// can only redirect after sign-up

import { useSelector} from 'react-redux'
import  { Outlet, Navigate } from 'react-router-dom'

export default function PrivateRoute(){
    const { currentUser } = useSelector((state) => state.user)
    return currentUser ? <Outlet/> :<Navigate to='/sign-in' />
        
}
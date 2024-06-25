import { Button } from 'flowbite-react';
import { AiFillGoogleCircle } from 'react-icons/ai';
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';


export default function OAuth() {
    const auth = getAuth(app)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleGoogleClick = async () =>{
        const provider = new GoogleAuthProvider()
        provider.setCustomParameters({ prompt: 'select_account' })
        try {
            const resultsFromGoogle = await signInWithPopup(auth, provider)
            const res = await fetch('/api/auth/google', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: resultsFromGoogle.user.displayName,
                    email: resultsFromGoogle.user.email,
                    googlePhotoUrl: resultsFromGoogle.user.photoURL,
                }),
                })
            const data = await res.json()
            if (res.ok){
                dispatch(signInSuccess(data))
                navigate('/')
            }
        } catch (error) {
            console.log(error);
        }
    } 
  return (
    // <Button type='button' className='
    //  hover:bg-gradient-to-r  from-pink-300 to-indigo-300 rounded-lg text-black border-2 border-grey-200/100 mt-3 pt-1 pb-1' outline onClick={handleGoogleClick}>
    //     <AiFillGoogleCircle className='w-6 h-6 mr-2 ' />
    //     Continue with Google
    // </Button>
  //   <Button 
  // type='button' 
  // className={'hover:bg-gradient-to-r from-pink-300 to-indigo-300 rounded-lg border-2 border-grey-200/100 mt-3 pt-1 pb-1 text-black'} 
  // outline 
  // onClick={handleGoogleClick}
<Button type="button" class="text-purple-700 hover:text-white border border-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-0.005 text-center me-2 mb-2 dark:border-purple-400 dark:text-purple-400 dark:hover:text-white dark:hover:bg-purple-500 dark:focus:ring-purple-900">
<svg class="w-2 h-1 me-11" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 19">
<path fill-rule="evenodd"  clip-rule="evenodd"/>
</svg>
  <AiFillGoogleCircle className='w-5 h-6 mr-2  ' />
  Continue with Google
</Button>
  );
}
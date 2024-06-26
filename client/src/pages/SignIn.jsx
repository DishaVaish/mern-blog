import React from 'react'
import { Link,useNavigate } from 'react-router-dom'
import{Alert,Spinner, Label,TextInput,Button} from 'flowbite-react'
import{ useState } from 'react';
import { useDispatch , useSelector} from 'react-redux';
import {signInStart ,signInSuccess, signInFailure} from '../redux/user/userSlice'
import OAuth from '../components/OAuth';

export default function SignIn() {
  const [formData, setFormData ] = useState({}) ;
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading ] = useState(false);
  // const {loading, error: errorMessage} = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
   const handleChange = (e) => {
      setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      if (!formData.email || !formData.password) {
        //  return setErrorMessage('Please fill out all fields.');
         return dispatch(signInFailure('Please fill all the fields'));
       }
      try {
        setLoading(true);
        // setErrorMessage(null);
        dispatch(signInStart());
        const res = await fetch('/api/auth/signin', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', },
          body: JSON.stringify(formData),
        });

        console.log("signin form",res);

        const data = await res.json();

        if (data.success === false) {
          alert(" invalid credential");
          dispatch(signInFailure(data.message));
          // return setErrorMessage(data.message);
        }
        //Check that setLoading should be set to false at each of the time !!

        setLoading(false);
        
        if (res.ok) {
          alert("login successful");
          dispatch(signInSuccess(data));
          //Path to dashboard or home page:
          navigate('/dashboard');
        // }
      }
        setLoading(false);
    }
      catch (error) {
        // setErrorMessage(error.message);
        setLoading(false);
        dispatch(signInFailure(error.message));
      }
    };

  return (
    <div className='min-h-screen mt-20'>
      <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-10'>
        {/* LEFT */}
          <div className='flex-1' >
          <Link to="/" className=' font-bold dark:text-white text-4xl  mr-4'>
          <span className= 'px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white ' >
            MNNIT</span>
        Blog
        </Link>
        <p className='text-sm mt-5'>
          This is a demo project. You can sign in with your email 
          and password
          or with Google

        </p>
          </div>
          {/* right */}
          <div className='flex-1'>
          <form  className='flex flex-col gap-4 w-full lg:w-75' onSubmit={handleSubmit}>
             <div>
                 <Label value='Your email' />
                 <TextInput type='email' placeholder='name@company.com' id='email'  onChange={handleChange} />
             </div>
             <div>
                 <Label value='Your password' />
                 <TextInput type='password' placeholder='**********' id='password'  onChange={handleChange} />
             </div>
             <Button className='btn flex items-center justify-center py-1.25  bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:to-pink-600 rounded-lg text-white mt-4 pt-0.5 pb-0.5' type='submit' disabled={loading} >
              {
                 loading ? (
                  <>
                 <Spinner size='sm'/>
                  <span className='pl-3'>Loading...</span>
                  </>
                 ) : ('Sign In'
               
           )}
             </Button>
             <OAuth />
          </form>
          <div className='flex gap-2 text-sm mt-4'> 
            <span>Don't Have an account?</span>
            <Link to='/sign-up' className='text-blue-500'>
              Sign Up
            </Link>
          </div>
          {errorMessage && (
            <Alert className='mt-5' color='failure'>
              {errorMessage}
            </Alert>
          )}
          </div>
      </div>
      </div>
  )
}

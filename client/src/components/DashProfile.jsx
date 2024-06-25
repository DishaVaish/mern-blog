import { Alert, Button, TextInput  } from 'flowbite-react';
import {useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage';
import { app } from '../firebase';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import {Link} from 'react-router-dom';

//Local Error: currentUser is not readable i.e also username/ profilepic etc. are not able to fetch
export default function DashProfile(){
    const {currentUser, error, loading} = useSelector(state => state.user);
    const [imageFile, setImageFile] = useState(null);
    const [imageFileUrl, setImageFileUrl] =useState(null);
    const [imageFileUploadProgress, setImageFileUploadProgress] =useState(null);
    const [imageFileUploadError, setImageFileUploadError] = useState(null);
    const filePickerRef = useRef();
    const handleImageChange =(e) =>{
        const file =e.target.files[0];
        if(file){
            setImageFile(file);
            setImageFileUrl(URL.createObjectURL(file));
        }    
    };
    useEffect(()=>{
        if (imageFile){
            uploadImage();
        }
    }, [imageFile]);

    const uploadImage = async () => { 
        //activating storage by firebase:
        // service firebase.storage {
        //     match /b/{bucket}/o {
        //       match /{allPaths=**} {
        //         allow read; 
        //         allow write: if 
        //         request.resource.size < 2 * 1024 * 1024 && 
        //         request.resource.contentType.matches('image/.*')
        //       }
        //     }
        //   }
        setImageFileUploadError(null);
        const storage = getStorage(app);
        const fileName = new Date().getTime() + imageFile.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, imageFile);
        uploadTask.on(
            'state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) *100;
                setImageFileUploadProgress(progress.toFixed(0));
            }, 
            (error) => {
                setImageFileUploadError('Could not upload image (File must be less then 2 MB)');
                setImageFileUploadProgress(null);
                setImageFile(null);
                setImageFileUrl(null);
            },
            ()=>{
                getDownloadURL (uploadTask.snapshot.ref).then((downloadURL) =>{
                    setImageFileUrl(downloadURL);
                });
            }

        );

    };
    return(
        <div className='max-w-lg mx-auto p-3 w-full'>
            <h1 className='my-7 text-center font-semibold text-3xl'>Profile</h1>
            <form className ='flex flex-col gap-4'>
                <input type= "file" accept='image/*' onChange={handleImageChange} ref={filePickerRef} hidden/>
                <div className="w-32 h-32 self-center cursor-pointer shadow-md 
                overflow-hidden rounded-full" onClick={()=>filePickerRef.current.click()}>
                    {imageFileUploadProgress && (
                        <CircularProgressbar value ={imageFileUploadProgress || 0} text = {`${imageFileUploadProgress}%`}
                        strokeWidth={5}
                        styles= {{
                            root:{
                               width: '100%',
                               height: '100%',
                               position: 'absolute',
                               top :0,
                               left: 0,
                            },
                            path:{
                                stroke: `rgba(62, 152, 199, ${imageFileUploadProgress /100})`,
                            }
                        }}
                    />)}
                <img src='{imageFileUrl || currentUser.profilePicture}' alt="user"
                className={`rounded-full w-full h-full object-cover border-8 border-[lightgray] $
                {imageFileUploadProgress && imageFileUploadProgress < 100 && 'opa }`} />
                </div>
                
                {imageFileUploadError && <Alert color='failure'>{imageFileUploadError}</Alert>}
                
                <TextInput type='text' id='username' placeholder='username' defaultValue={currentUser.username} />
                <TextInput type='email' id='email' placeholder='email' defaultValue={currentUser.email} />
                <TextInput type='password' id='password' placeholder='username'  />
                <Button type='submit'className='btn flex items-center justify-center py-1.25  bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:to-pink-600 rounded-lg text-white mt-4 pt-0.5 pb-0.5' outline disabled={loading || imageFileUploading}> {loading ? 'Loading...' : 'Update'} </Button>
                
                {/* currentUser.isAdmin && ( */}
                        <Link to={'/create-post'}>
                        <button class="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-30 py-2.5 text-center w-full me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800">Create a Post
                     </button>
                      </Link>
                      {/* )}; */}
                    
            </form>
            <div className="text-red-500 flex justify-between mt-5">
                <span className='cursor-pointer'>Delete Account</span>
                <span className='cursor-pointer'> Sign Out</span>
            </div>
        </div>
    );
}

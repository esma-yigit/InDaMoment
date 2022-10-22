import React ,{useEffect} from "react";
import {GoogleLogin,GoogleLogout} from "react-google-login";
import {useNavigate} from "react-router-dom";
import {FcGoogle} from "react-icons/fc";
import { gapi } from 'gapi-script';
import bgLogin from '../assets/bg-login.mp4'
import logoDark from '../assets/logo-dark.png'

import {client} from "../client";

const Login =()=>{
    useEffect(() => {
        function start() {
            gapi.client.init({
                clientId: process.env.REACT_APP_GOOGLE_API_TOKEN,
                scope: 'email',
            });
        }

        gapi.load('client:auth2', start);
    }, []);
    const navigate=useNavigate()



    const responseGoogle=(response)=>{
        console.log('responded',response)
        localStorage.setItem('user',JSON.stringify(response.profileObj))
        const {name,googleId,imageUrl}=response.profileObj
        const doc={
            _id:googleId,
            _type:'user',
            userName:name,
            image:imageUrl
        }
        client.createIfNotExists(doc).then(()=>{
            navigate('/',{replace:true})
        })
    }

    return (
        <div className='flex items-center justify-start flex-col h-screen'>
            <div className='relative w-full h-full'>
                <video src={bgLogin} type='video/mp4' autoPlay muted loop controls={false} className='w-full h-full object-cover'></video>
                <div className='absolute top-0 bottom-0 left-0 right-0 bg-blackOverlay flex items-center justify-center flex-col space-y-4'>
                    <div className='p-2'>
                        <img src={logoDark} alt="logo" width='250px'/>
                    </div>
                    <div className='flex items-center text-blue-700 text-xl  '>
                        <GoogleLogin clientId={process.env.REACT_APP_GOOGLE_API_TOKEN} render={(renderProps)=>(
                            <button  type='button' onClick={renderProps.onClick} disabled={renderProps.disabled} className='outline-none capitalize flex items-center bg-mainColor border-none px-3 py-5 rounded-lg  hover:bg-slate-300 cursor-pointer transition-all ease-in-out shadow-blue-300 shadow-inner font-btn'>
                                <FcGoogle className='mr-2'/> Sign in with your google account
                            </button>
                        )} onSuccess={responseGoogle} onFailure={responseGoogle}>

                        </GoogleLogin>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Login;
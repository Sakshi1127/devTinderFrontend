import {useState} from "react";
import  axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
    const[emailId,setEmailId]=useState("rohit@gmail.com");
    const[password,setPassword]=useState("Rohit@123");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin=async ()=>{
       try{
         const res= await axios.post(BASE_URL + "/login",{
            emailId,
            password
         },{withCredentials:true});
         dispatch(addUser(res.data));
         navigate("/")

       }catch(err){
        console.log("Error while logging in",err);
       }
    }

  return (
    <>
      <div className="flex items-center justify-center my-40">
        <div className="card card-dash bg-base-200 w-96 ">
          <div className="card-body flex items-center justify-center">
            <h2 className="card-title ">Login</h2>

            <fieldset className="fieldset w-3/4">
              <legend className="fieldset-legend">Email Id</legend>
              <input type="text" className="input" value={emailId} onChange={(e)=>setEmailId(e.target.value)}/>
            </fieldset>

            <fieldset className="fieldset w-3/4">
              <legend className="fieldset-legend">Password</legend>
              <input type="text" className="input" value={password} onChange={(e)=>setPassword(e.target.value)}/>
            </fieldset>

            <div className="card-actions justify-end">
              <button className="btn btn-primary" onClick={handleLogin}>Log In</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;

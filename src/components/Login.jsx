import {useState} from "react";
import  axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
    const[firstName,setFirstName]=useState("")
    const [lastName,setLastName]= useState("")
    const[emailId,setEmailId]=useState("");
    const[password,setPassword]=useState("");
    const [isloginForm,setIsLoginForm]= useState(true)
    const[error, setError]=useState("")
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin=async ()=>{
       try{
         const res= await axios.post(BASE_URL + "/login",{
            emailId,
            password
         },{withCredentials:true});
         dispatch(addUser(res.data?.data ?? res.data));
         navigate("/")

       }catch(err){
        setError(err?.response?.data || "Something went wrong");
        console.log("Error while logging in",err);
       }
    }

     const handleSignup = async ()=>{
       try{
         const res= await axios.post(BASE_URL + "/signup",{
            firstName,
            lastName,
            emailId,
            password
         },{withCredentials:true});
         dispatch(addUser(res.data?.data ?? res.data));
         navigate("/profile")
       }catch(err){
        setError(err?.response?.data || "Something went wrong");
        console.log("Error while logging in",err);
       }
    }

  return (
    <>
      <div className="flex items-center justify-center my-40">
        <div className="card card-dash bg-base-200 w-96 ">
          <div className="card-body flex items-center justify-center">

            <h2 className="card-title "> {isloginForm ? "Log In" : "Sign Up"}</h2>

             {!isloginForm &&(
              <>
             <fieldset className="fieldset w-3/4">
              <legend className="fieldset-legend">First Name</legend>
              <input type="text" className="input" value={firstName} onChange={(e)=>setFirstName(e.target.value)}/>
            </fieldset>

             <fieldset className="fieldset w-3/4">
              <legend className="fieldset-legend">Last Name</legend>
              <input type="text" className="input" value={lastName} onChange={(e)=>setLastName(e.target.value)}/>
            </fieldset>
            </>)
            }

            <fieldset className="fieldset w-3/4">
              <legend className="fieldset-legend">Email Id</legend>
              <input type="text" className="input" value={emailId} onChange={(e)=>setEmailId(e.target.value)}/>
            </fieldset>

            <fieldset className="fieldset w-3/4">
              <legend className="fieldset-legend">Password</legend>
              <input type="text" className="input" value={password} onChange={(e)=>setPassword(e.target.value)}/>
            </fieldset>
            {error && <p className="text-red-500">{error}</p>}
            <div className="card-actions justify-end">
              <button className="btn btn-primary" onClick={isloginForm? handleLogin : handleSignup}>{isloginForm ? "Log In" : "Sign Up"}</button>
            </div>

              <p className="mx-2 text-primary underline cursor-pointer" onClick={() => setIsLoginForm((value) => !value)}>{isloginForm ? " New User? Signup here" : " Existing User? Login here"}
              </p>

          </div>
        </div>
      </div>
    </>
  );
};

export default Login;

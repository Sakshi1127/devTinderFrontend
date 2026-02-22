import {useEffect} from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from './NavBar'
import Footer from './Footer'
import { BASE_URL } from '../utils/constants'
import { useDispatch } from 'react-redux'
import { addUser } from '../utils/userSlice'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store)=> store.user)

  const fetchUser = async ()=>{
    if(user) return; // If user data is already present in the store, no need to fetch again
    try{
       const res = await axios.get(BASE_URL + "/profile/view",{withCredentials:true})
       dispatch(addUser(res.data));
       navigate("/")
    }catch(error){
      if(error.response && error.response.status === 401){
        // If the error is due to unauthorized access, navigate to login page
        navigate("/login");
      }
      console.log("Error while fetching user data",error);
    }
  }

  useEffect (()=>{
    fetchUser();
  },[])
  return (
    <div>
      <NavBar/>
      <Outlet/>
      <Footer/>
    </div>
  )
}

export default Body

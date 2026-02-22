import {useEffect} from 'react'
import UserCard from  './UserCard'
import { BASE_URL } from '../utils/constants'
import axios from 'axios'
import { useDispatch,useSelector } from 'react-redux'
import {addFeed } from '../utils/feedSlice'

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store)=>store.feed);
  const fetchFeed= async()=>{
    try{
      const res = await axios.get(BASE_URL + '/feed',{withCredentials:true});
      dispatch(addFeed(res.data))
    }catch(err){
      console.log(err);
    }
  }

  useEffect(()=>{
    fetchFeed();
  },[])

  return feed &&(
    <div className='flex justify-center my-20'>
      <UserCard feed={feed[0]}/>
    </div>
  )
}

export default Feed

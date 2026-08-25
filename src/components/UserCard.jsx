import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import {removeUserFromFeed } from '../utils/feedSlice'

const UserCard = ({ feed }) => {
  const {_id,firstName, lastName, about, age, gender, photoUrl } = feed;
  const dispatch= useDispatch()

  const handleRequest =async(status, userId)=>{
    try{
      const res = await axios.post(BASE_URL + "/request/send/" + status + "/" + userId,{},{
        withCredentials:true
      })
      dispatch(removeUserFromFeed(userId))
    }catch(err){
      console.log(err)
    }
  }

  return (
    <div className="card bg-base-300 w-96 shadow-sm">
      <figure>
        <img src={photoUrl} alt="Shoes" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        {age && gender && (
          <p className="-mt-2">
            {age}, {gender}
          </p>
        )}
        <p>{about}</p>
        <div className="card-actions justify-center mt-4">
          <button className="btn btn-primary" onClick={()=>handleRequest("ignored",_id)}>Ignored</button>
          <button className="btn btn-secondary" onClick={()=>handleRequest("interested",_id)}>Interested</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;

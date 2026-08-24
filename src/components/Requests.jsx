import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests,removeRequests } from "../utils/requestsSlice";
import axios from "axios";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((state) => state.requests);


  const fetchRequests = async () => {
    try {

      const res = await axios.get(
        BASE_URL + "/user/requests/received",
        {
          withCredentials: true,
        }
      );

      dispatch(addRequests(res.data.data));
    } catch (err) {
      console.log(err);
    }
  };

  const reviewRequest=async(status, _id)=>{
    try{
      const res = await axios.post(BASE_URL + "/request/review/" + status + "/" + _id,{
      },{
        withCredentials:true
      })
      dispatch(removeRequests(_id))
    }catch(err){
      console.log(err)
    }
  }

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) return null;

  if (requests.length === 0) {
    return (
      <div className="text-center text-2xl mt-10">
        No Requests Found
      </div>
    );
  }

  return (
    <div>
      <div className="text-center font-bold text-3xl mt-10">
        Requests
      </div>

      {requests.map((request) => {
        return (
          <div
            key={request._id}
            className="w-1/2 mx-auto my-5"
          >
            <ul className="list bg-base-300 rounded-box shadow-md">
              <li className="list-row">
                {/* Profile Image */}
                <div>
                  <img
                    className="w-20 h-20 rounded-full"
                    src={request.fromUserId.photoUrl}
                    alt="Profile"
                  />
                </div>

                {/* User Details */}
                <div>
                  <div className="font-semibold">
                    {request.fromUserId.firstName +
                      " " +
                      request.fromUserId.lastName}
                  </div>

                  <div className="text-xs uppercase font-semibold opacity-60">
                    {request.fromUserId.age &&
                      request.fromUserId.gender &&
                      request.fromUserId.age +
                        ", " +
                        request.fromUserId.gender}
                  </div>

                  {/* About */}
                  <p className="list-col-wrap text-m mt-3">
                    {request.fromUserId.about}
                  </p>

                  {/* Accept / Reject Buttons */}
                  <div className="flex gap-3 mt-4">
                    <button className="btn btn-success btn-sm" onClick={()=>reviewRequest("accepted", request._id)}>
                      Accept
                    </button>

                    <button className="btn btn-error btn-sm" onClick={()=>reviewRequest("rejected", request._id)}>
                      Reject
                    </button>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        );
      })}
    </div>
  );
};

export default Requests;
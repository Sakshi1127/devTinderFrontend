import { useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionsSlice";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((state) => state.connections);
  const fetchConnection = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res.data.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchConnection();
  }, []);

  if (!connections) return;

  if (connections.length === 0) {
    return (
      <div className="text-center text-2xl mt-10">No Connections Found</div>
    );
  }

  return (
    <div>
      <div className="text-center font-bold text-3xl mt-10">Connections</div>

      {connections.map((connection) => {
        return (
          <div className="w-1/2 mx-auto my-5">
            <ul className="list bg-base-300 rounded-box shadow-md">
              <li className="list-row">
                <div>
                  <img
                    className="w-20 h-20 rounded-full"
                    src={connection.photoUrl}
                  />
                </div>
                <div>
                  <div>{connection.firstName + " " + connection.lastName}</div>
                  <div className="text-xs uppercase font-semibold opacity-60">
                    {connection.age && connection.gender && connection.age + ", " + connection.gender}
                  </div>
                    <p className="list-col-wrap text-m mt-3">
                 {connection.about}
                </p>
                </div>
              </li>
            </ul>
          </div>
        );
      })}
    </div>
  );
};

export default Connections;

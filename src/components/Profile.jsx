import { useState, useEffect } from "react";
import UserCard from "./UserCard";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";

const Profile = () => {
  const user = useSelector((store) => store?.user);
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [photoUrl, setphotoUrl] = useState(user?.photoUrl || "");
  const [age, setAge] = useState(user?.age || "");
  const [gender, setGender] = useState(user?.gender || "");
  const [about, setAbout] = useState(user?.about || "");
  const [skills, setSkills] = useState(user?.skills || []);
  const [skillInput, setSkillInput] = useState("");
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    setFirstName(user?.firstName || "");
    setLastName(user?.lastName || "");
    setphotoUrl(user?.photoUrl || "");
    setAge(user?.age || "");
    setGender(user?.gender || "");
    setAbout(user?.about || "");
    setSkills(user?.skills || []);
  }, [user]);

  const handleSaveProfile = async () => {
    setError("")
    try {
  const formattedData = {
      firstName,
      lastName,
      photoUrl,
      age: Number(age), // optional: convert to number
      gender: gender.toLowerCase(), // ✅ lowercase
      about,
      skills: skills.map((skill) => skill.trim()), // ✅ ensure clean array
    };
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        formattedData,
        { withCredentials: true },
      );
      dispatch(addUser(res.data?.data))
      setShowToast(true);

    setTimeout(() => {
      setShowToast(false);
    }, 3000);
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
      console.log("Error while logging in", err);
    }

    // Simulate saving profile logic
  };

  const handleAddSkill = () => {
    if (skillInput.trim() && !skills.includes(skillInput.trim())) {
      setSkills([...skills, skillInput.trim()]);
      setSkillInput("");
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove));
  };

  return (
    <>
      <div className="flex justify-center items-start gap-10 my-20">
        <div className="flex items-center justify-center">
          <div className="card card-dash bg-base-200 w-96 ">
            <div className="card-body flex items-center justify-center">
              <h2 className="card-title ">Edit Profile</h2>

              <fieldset className="fieldset w-3/4">
                <legend className="fieldset-legend">First Name</legend>
                <input
                  type="text"
                  className="input"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </fieldset>

              <fieldset className="fieldset w-3/4">
                <legend className="fieldset-legend">Last Name</legend>
                <input
                  type="text"
                  className="input"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </fieldset>

              <fieldset className="fieldset w-3/4">
                <legend className="fieldset-legend">Profile Picture</legend>
                <input
                  type="text"
                  className="input"
                  value={photoUrl}
                  onChange={(e) => setphotoUrl(e.target.value)}
                />
              </fieldset>

              <fieldset className="fieldset w-3/4">
                <legend className="fieldset-legend">Age</legend>
                <input
                  type="text"
                  className="input"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
              </fieldset>

              <fieldset className="fieldset w-3/4">
                <legend className="fieldset-legend">Gender</legend>
                <select
                  className="select select-bordered"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="o ther">Other</option>
                </select>
              </fieldset>

              <fieldset className="fieldset w-3/4">
                <legend className="fieldset-legend">Skills</legend>

                <div className="flex gap-2">
                  <input
                    type="text"
                    className="input input-bordered flex-1"
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    placeholder="Add skill"
                    onKeyDown={(e) => e.key === "Enter" && handleAddSkill()}
                  />
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleAddSkill}
                  >
                    Add
                  </button>
                </div>

                <div className="flex flex-wrap gap-2 mt-2">
                  {skills.map((skill, index) => (
                    <div key={index} className="badge badge-primary gap-2">
                      {skill}
                      <button
                        type="button"
                        onClick={() => handleRemoveSkill(skill)}
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              </fieldset>

              <fieldset className="fieldset w-3/4">
                <legend className="fieldset-legend">About</legend>
                <textarea
                  className="textarea textarea-bordered"
                  rows="3"
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                />
              </fieldset>

              {error && <p className="text-red-500">{error}</p>}
              <div className="card-actions justify-end">
                <button className="btn btn-primary" onClick={handleSaveProfile}>
                  Save Profile
                </button>
              </div>
            </div>
          </div>
        </div>
        <UserCard
          feed={{ firstName, lastName, about, age, gender, photoUrl }}
        />
      </div>
       {showToast && (
      <div className="toast toast-top toast-end z-50">
        <div className="alert alert-success">
          <span>Profile updated successfully 🎉</span>
        </div>
      </div>
    )}
    </>
  );
};

export default Profile;

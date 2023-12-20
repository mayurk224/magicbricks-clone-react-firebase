import React, { useState } from "react";
import {getAuth, updateProfile} from "firebase/auth";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import {db} from "../firebase"
import { updateDoc,doc } from "firebase/firestore";

export default function Profile() {
  const auth = getAuth();
  const navigate = useNavigate()
  const[changeDetails, setChangeDetail] = useState(false);
  const [formData,setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email
  });
  const { name, email } = formData;
  function onLogout(e){
    e.preventDefault();
    auth.signOut();
    navigate("/");
  }
  function onChange(e){
    e.preventDefault();
    setFormData((prevState)=>({
      ...prevState,
        [e.target.id]: e.target.value,
    }))
  }
  async function onSubmit(e){
    try {
      if(auth.currentUser.displayName!==name){
        await updateProfile(auth.currentUser,{
          displayName: name,
        })
        const docRef = doc(db,"users",auth.currentUser.uid)
        await updateDoc(docRef,{
          name
        }
          )
      }
      toast.success("Successfully updated")
    } catch (error) {
      toast.error("Can't submit")
    }
  }
  return (
    <div className="flex items-center justify-center">
      <form className="flex flex-col items-center justify-center lg:w-[450px] sm:w-[350px] py-7 gap-5">
        <label className="text-3xl font-semibold">Profile</label>
        <input type="text" id="name" value={name} disabled={!changeDetails} onChange={onChange} className={`rounded-xl w-full ${changeDetails && "bg-red-300"}`} />
        <input type="email" id="email" value={email} disabled={!changeDetails}  className="rounded-xl w-full" />
        <div className="flex items-center gap-8">
          <span onClick={()=>{changeDetails && onSubmit(); setChangeDetail((prevState)=>!prevState)}} className=" cursor-pointer text-red-600 ">{changeDetails ? "Save Change" : "Edit Profile"}</span>
          <span onClick={onLogout} className="text-green-600 cursor-pointer ">Log Out</span>
        </div>
      </form>
    </div>
  );
}

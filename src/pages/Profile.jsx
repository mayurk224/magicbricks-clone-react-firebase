import React, { useEffect, useState } from "react";
import { getAuth, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { db } from "../firebase";
import { updateDoc, doc, collection, getDocs, query, where, orderBy } from "firebase/firestore";
import { FcHome } from "react-icons/fc";
import { Link } from "react-router-dom";
import ListingItem from "../components/ListingItem";

export default function Profile() {
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(true);
  const auth = getAuth();
  const navigate = useNavigate();
  const [changeDetails, setChangeDetail] = useState(false);
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });
  const { name, email } = formData;
  function onLogout(e) {
    e.preventDefault();
    auth.signOut();
    navigate("/");
  }
  function onChange(e) {
    e.preventDefault();
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  }
  async function onSubmit(e) {
    try {
      if (auth.currentUser.displayName !== name) {
        await updateProfile(auth.currentUser, {
          displayName: name,
        });
        const docRef = doc(db, "users", auth.currentUser.uid);
        await updateDoc(docRef, {
          name,
        });
      }
      toast.success("Successfully updated");
    } catch (error) {
      toast.error("Can't submit");
    }
  }
  useEffect(() => {
    async function fetchUserListings() {
      const listingRef = collection(db, "listings");
      const q = query(
        listingRef,
        where("userRef", "==", auth.currentUser.uid),
        orderBy("timestamp", "desc")
      );
      const querySnap = await getDocs(q);
      let listings = [];
      querySnap.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      setListings(listings);
      setLoading(false);
    }
    fetchUserListings();
  }, [auth.currentUser.uid]);

  return (
    <div className="flex items-center flex-col justify-center">
      <form className="flex flex-col items-center justify-center lg:w-[450px] sm:w-[350px] py-7 gap-5">
        <label className="text-3xl font-semibold">Profile</label>
        <input
          type="text"
          id="name"
          value={name}
          disabled={!changeDetails}
          onChange={onChange}
          className={`rounded-xl text-center w-full ${changeDetails && "bg-red-300"}`}
        />
        <input
          type="email"
          id="email"
          value={email}
          disabled={!changeDetails}
          className="rounded-xl w-full text-center"
        />
        <div className="flex items-center gap-8">
          <span
            onClick={() => {
              changeDetails && onSubmit();
              setChangeDetail((prevState) => !prevState);
            }}
            className=" cursor-pointer text-red-600 "
          >
            {changeDetails ? "Save Change" : "Edit Profile"}
          </span>
          <span onClick={onLogout} className="text-green-600 cursor-pointer ">
            Log Out
          </span>
        </div>
      </form>
      <button
        type="submit"
        className="bg-blue-500 flex items-center rounded-3xl py-3 px-6 text-white"
      >
        <Link to="/create-listing" className="flex items-center justify-center gap-2 font-semibold">
          <FcHome className="text-xl" />
          Sell or Rent Your Home
        </Link>
      </button>
      <div className="mt-8 flex flex-col justify-center items-center">
      {!loading && listings.length > 0 && (
          <>
            <label className="text-2xl text-center font-semibold mb-6">
              My Listings
            </label>
            <ul className="flex gap-4 flex-wrap justify-center">
              {listings.map((listing)=>(
                <ListingItem key={listing.id}id={listing.id} listing={listing.data}/>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}

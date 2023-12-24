import React, { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { v4 as uuidv4 } from "uuid";
import { doc, getDoc, serverTimestamp, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate, useParams } from "react-router";

export default function EditListing() {
  const navigate = useNavigate();
  // const [geoLocationEnabled, setGeoLocationEnabled] = useState(true);
  const auth = getAuth();
  const [loading, setLoading] = useState(false);
  const [listing, setListing] = useState(null);
  const [formData, setFormData] = useState({
    type: "rent",
    name: "",
    bedrooms: 1,
    bathrooms: 1,
    parking: false,
    furnished: false,
    address: "",
    description: "",
    offers: true,
    price: 0,
    discount: 0,
    // latitude: 0,
    // longitude: 0,
    images: {},
  });
  const {
    type,
    name,
    bedrooms,
    bathrooms,
    parking,
    furnished,
    offers,
    address,
    description,
    price,
    discount,
    // latitude,
    // longitude,
    images,
  } = formData;
  const params = useParams();
  useEffect(() => {
    if (listing && listing.userRef !== auth.currentUser.uid) {
      toast.error("You can't edit this listing");
      navigate("/");
    }
  }, [auth.currentUser.uid, listing, navigate]);
  useEffect(() => {
    setLoading(true);
    async function fetchListing() {
      const docRef = doc(db, "listings", params.listingId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setListing(docSnap.data());
        setFormData({ ...docSnap.data() });
        setLoading(false);
      } else {
        navigate("/");
        toast.error("Listing does not exist");
      }
    }
    fetchListing();
  }, [navigate, params.listingId]);
  
  function onChange(e) {
    let boolean = null;
    if (e.target.value === "true") {
      boolean = true;
    }
    if (e.target.value === "false") {
      boolean = false;
    }
    if (e.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        images: e.target.files,
      }));
    }
    if (!e.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.id]: boolean ?? e.target.value,
      }));
    }
  }
  async function onSubmit(e) {
    e.preventDefault();
    setLoading(true);
    if (+discount >= +price) {
      setLoading(false);
      toast.error("Discount cant be greater than Price");
      return;
    }
    if (images.length > 6) {
      setLoading(false);
      toast.error("Please Select Only 6 images");
      return;
    }
    //This code is to fetch and display data in form of map onSite
    // let geoLocation = {};
    // let location;
    // if (geoLocationEnabled) {
    //   const response = await fetch(
    //     `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`
    //   );
    //   const data = await response.json();
    //   console.log(data);
    //   geoLocation.lat = data.result[0]?.geometry.location.lat ?? 0;
    //   geoLocation.lng = data.result[0]?.geometry.location.lng ?? 0;
    //   location = data.status === "ZERO_RESULTS" && undefined;
    //   if (location === undefined ) {
    //     setLoading(false);
    //     toast.error("Please Enter correct address");
    //     return;
    //   }
    // } else {
    //   geoLocation.lat = latitude;
    //   geoLocation.lan = longitude;
    // }
    function storeImage(image) {
      return new Promise((resolve, reject) => {
        const storage = getStorage();
        const filename = `${auth.currentUser.uid}-${image.name}-${uuidv4()}`;
        const storageRef = ref(storage, filename);
        const uploadTask = uploadBytesResumable(storageRef, image);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
            switch (snapshot.state) {
              case "paused":
                console.log("Upload is paused");
                break;
              case "running":
                console.log("Upload is running");
                break;
            }
          },
          (error) => {
            reject(error);
          },
          () => {
            // Upload completed successfully, now we can get the download URL
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              resolve(downloadURL);
            });
          }
        );
      });
    }
    const imgUrls = await Promise.all(
      [...images].map(async (image) => {
        try {
          return await storeImage(image);
        } catch (error) {
          console.error(`Error uploading image: ${image.name}`, error);
          throw error; // Rethrow the error to be caught by the outer catch block
        }
      })
    ).catch((error) => {
      setLoading(false);
      toast.error("Some images failed to upload");
      return;
    });
    const formDataCopy = {
      ...formData,
      imgUrls,//geoLocation,
      timestamp: serverTimestamp(),
      userRef: auth.currentUser.uid,
    }
    delete formDataCopy.images;
    !formDataCopy.offers && delete formDataCopy.discount;
    const docRef = doc(db, "listings",params.listingId)
    await updateDoc(docRef, formDataCopy);
    setLoading(false);
    toast.success("Listing edit successfully");
    navigate(`/category/${formDataCopy.type}/${docRef.id}`);
  }

  if (loading) {
    return <Spinner />;
  }
  return (
    <div className="flex items-center justify-center">
      <form
        onSubmit={onSubmit}
        className="p-8 flex flex-col lg:w-[500px] sm:w-96 gap-3"
      >
        <label className="text-3xl font-semibold">Edit Your Listing</label>
        <div className="flex flex-col gap-2 mt-5">
          <label className="text-2xl font-semibold">Sell / Rent</label>
          <div className="flex items-center justify-evenly">
            <button
              type="button"
              id="type"
              value="sell"
              onClick={onChange}
              className={`px-10 py-1  rounded-2xl ${
                type === "rent"
                  ? "bg-white text-black"
                  : "bg-slate-600 text-white"
              }`}
            >
              Sell
            </button>
            <button
              type="button"
              id="type"
              value="rent"
              onClick={onChange}
              className={`px-10 py-1  rounded-2xl  ${
                type === "sell"
                  ? "bg-white text-black"
                  : "bg-slate-600 text-white"
              }`}
            >
              Rent
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-2xl font-semibold">Name</label>
          <input
            type="text"
            name=""
            id="name"
            value={name}
            onChange={onChange}
            className="rounded-3xl"
            placeholder="Name"
            maxLength="32"
            minLength="10"
            required
          />
        </div>
        <div className="flex justify-evenly">
          <div className="flex flex-col items-center">
            <label className="text-2xl font-semibold">Beds</label>
            <input
              type="number"
              name=""
              id="bedrooms"
              value={bedrooms}
              onChange={onChange}
              min="1"
              max="10"
              required
              className="rounded-3xl w-28 text-center"
            />
          </div>
          <div className="flex items-center flex-col">
            <label className="text-2xl font-semibold">Baths</label>
            <input
              type="number"
              name=""
              id="bathrooms"
              value={bathrooms}
              onChange={onChange}
              required
              min="1"
              max="10"
              className="rounded-3xl w-28 text-center"
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-2xl font-semibold">Parking Spot</label>
          <div className="flex items-center justify-evenly">
            <button
              type="button"
              id="parking"
              value={true}
              onClick={onChange}
              className={`px-10 py-1  rounded-2xl ${
                !parking ? "bg-white text-black" : "bg-slate-600 text-white"
              }`}
            >
              Yes
            </button>
            <button
              type="button"
              id="parking"
              value={false}
              onClick={onChange}
              className={`px-10 py-1  rounded-2xl ${
                parking ? "bg-white text-black" : "bg-slate-600 text-white"
              }`}
            >
              No
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-2xl font-semibold">Furnished</label>
          <div className="flex items-center justify-evenly">
            <button
              type="button"
              id="furnished"
              value={true}
              onClick={onChange}
              className={`px-10 py-1  rounded-2xl ${
                !furnished ? "bg-white text-black" : "bg-slate-600 text-white"
              }`}
            >
              Yes
            </button>
            <button
              type="button"
              id="furnished"
              value={false}
              onClick={onChange}
              className={`px-10 py-1  rounded-2xl ${
                furnished ? "bg-white text-black" : "bg-slate-600 text-white"
              }`}
            >
              No
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-2xl font-semibold">Address</label>
          <textarea
            name=""
            id="address"
            value={address}
            onChange={onChange}
            cols="30"
            rows="2"
            className="rounded-2xl resize-y"
            placeholder="Address"
            required
          ></textarea>
          {/* This Section is to enable geo location map onSite
           {!geoLocationEnabled && (
            <div className="flex justify-evenly">
              <div className="flex flex-col items-center">
                <label className="text-2xl font-semibold">Latitude</label>
                <input
                  type="number"
                  name=""
                  id="latitude"
                  value={latitude}
                  onChange={onChange}
                  required
                  min="-90"
                  max="90"
                  className="rounded-3xl w-32 text-center"
                />
              </div>
              <div className="flex items-center flex-col">
                <label className="text-2xl font-semibold">Longitude</label>
                <input
                  type="number"
                  name=""
                  id="longitude"
                  value={longitude}
                  onChange={onChange}
                  required
                  min="-180"
                  max="180"
                  className="rounded-3xl w-32 text-center"
                />
              </div>
            </div>
          )} */}
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-2xl font-semibold">Description</label>
          <textarea
            name=""
            id="description"
            value={description}
            onChange={onChange}
            cols="30"
            rows="2"
            required
            className="rounded-2xl resize-y"
            placeholder="Description"
          ></textarea>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-2xl font-semibold">Offers</label>
          <div className="flex items-center justify-evenly">
            <button
              type="button"
              id="offers"
              value={true}
              onClick={onChange}
              className={`px-10 py-1  rounded-2xl ${
                !offers ? "bg-white text-black" : "bg-slate-600 text-white"
              }`}
            >
              Yes
            </button>
            <button
              type="button"
              id="offers"
              value={false}
              onClick={onChange}
              className={`px-10 py-1  rounded-2xl ${
                offers ? "bg-white text-black" : "bg-slate-600 text-white"
              }`}
            >
              No
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-2xl font-semibold">Price</label>
          <div className="flex items-center gap-3">
            <input
              type="number"
              name=""
              id="price"
              value={price}
              onChange={onChange}
              required
              min="50"
              max="400000000"
              className="rounded-3xl w-48 text-center"
            />
            {type === "rent" && (
              <p className="font-semibold text-lg">$ / Month</p>
            )}
          </div>
        </div>
        {offers && (
          <div className="flex flex-col gap-2">
            <label className="text-2xl font-semibold">Discount</label>
            <div className="flex items-center gap-3">
              <input
                type="number"
                name=""
                id="discount"
                value={discount}
                onChange={onChange}
                required={offers}
                min="50"
                max="400000000"
                className="rounded-3xl w-48 text-center"
              />
              {type === "rent" && (
                <p className="font-semibold text-lg">$ / Month</p>
              )}
            </div>
          </div>
        )}
        <div className="flex flex-col gap-2">
          <label className="text-2xl font-semibold">Upload Images</label>
          <input
            type="file"
            id="images"
            onChange={onChange}
            required
            multiple
            accept=".jpg,.png,.jpeg"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 w-full rounded-3xl py-2 mt-7 text-white"
        >
          Edit Listing
        </button>
      </form>
    </div>
  );
}

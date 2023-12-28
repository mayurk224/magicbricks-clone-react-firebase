import React from "react";
import { FaHome } from "react-icons/fa";
import { FaMapMarkedAlt } from "react-icons/fa";
import { MdLocalAtm } from "react-icons/md";
import { RxRulerSquare } from "react-icons/rx";
import { FaBed } from "react-icons/fa";
import { FaBath } from "react-icons/fa";
import { RiParkingBoxLine } from "react-icons/ri";
import { MdOutlineDeck } from "react-icons/md";
import { BiPurchaseTag } from "react-icons/bi";
import { MdContactPhone } from "react-icons/md";
import { FaRegQuestionCircle } from "react-icons/fa";
import { doc, getDoc } from "firebase/firestore";
import { useState } from "react";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import { db } from "../firebase";
import { getAuth } from "firebase/auth";
import Moment from "react-moment";
import { FaRegShareSquare } from "react-icons/fa";
import { FaRegNewspaper } from "react-icons/fa6";
import Contact from "../components/Contact"

export default function Listing() {
  const auth = getAuth();
  const params = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [shareLinkCopied, setShareLinkCopied] = useState(false);
  const [contactLandlord, setContactLandlord] = useState(false);
  useEffect(() => {
    async function fetchListing() {
      const docRef = doc(db, "listings", params.listingId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setListing(docSnap.data());
        setLoading(false);
      }
    }
    fetchListing();
  }, [params.listingId]);
  
  if (loading) {
    return <Spinner />;
  }

  return (
    <div>
      <div
        id="default-carousel"
        className="relative w-full"
        data-carousel="slide"
      >
        <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
          {listing.imgUrls.map((url, index) => (
            <div
              className="absolute duration-700 ease-in-out"
              data-carousel-item
              key={index}
            >
              <img
                src={listing.imgUrls[index]}
                className="absolute block w-screen h-56 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                alt="..."
              />
            </div>
          ))}
        </div>
      </div>

      <div className="flex relative listingDetails sm:flex-col  lg:flex-row  justify-center sm:items-center sm:gap-6  sm:p-5">
        <div className="flex flex-col gap-2">
          <div className="flex gap-1 mb-4">
            <label htmlFor="">Post By</label>
            <div className="h-6 flex items-center gap-2 font-semibold">
              <img
                className="h-6 w-6 object-cover rounded-full"
                src="https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt=""
              />

              <div className="bg-white rounded-full px-3 py-1 text-sm">
                <Moment fromNow>{listing.timestamp?.toDate()}</Moment>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="bg-green-600 h-3 w-3 rounded-full"></div>
            <label>For {listing.type}</label>
          </div>
          <div className="flex items-center text-center gap-2">
            <FaHome className="text-lg" />
            <label className="text-2xl font-semibold">{listing.name}</label>
          </div>
          <div className="flex items-center gap-2">
            <FaMapMarkedAlt className="text-lg" />
            <label className="sm:w-96 text-xl font-semibold">
              {listing.address}
            </label>
            <Link
              to={listing.addressLink}
              target="_blank"
              className="px-2 py-1 bg-white rounded-full text-sm text-center"
            >
              View On Map
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <MdLocalAtm className="text-lg" />
            <label className="font-semibold text-xl">
              ${" "}
              {listing.offer
                ? listing.discount
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                : listing.price
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              {listing.type === "rent" ? " / month" : ""}
            </label>
          </div>
          <div className="flex gap-2">
            <div className="flex items-center">
              <FaRegNewspaper />
            </div>
            <label className="text-lg">{listing.description}</label>
          </div>
          <div className="flex items-center gap-2 font-semibold">
            <div className="flex items-center bg-blue-500 px-3 py-[3px] rounded-full">
              <RxRulerSquare className="-rotate-90" />
              1,462 sqft.
            </div>
            <div className="flex items-center bg-blue-500 px-3 py-[3px] rounded-full">
              <FaBed className="text-lg" />
              {+listing.bedrooms > 1 ? `${listing.bedrooms} Beds` : "1 Bed"}
            </div>
            <div className="flex items-center bg-blue-500 px-3 py-[3px] rounded-full">
              <FaBath className="text-lg" />
              {+listing.bathrooms > 1 ? `${listing.bathrooms} Baths` : "1 Bath"}
            </div>
            <div className="flex items-center bg-blue-500 px-3 py-[3px] rounded-full">
              <RiParkingBoxLine className="text-lg" />
              {listing.parking ? "Parking spot" : "No parking"}
            </div>
            <div className="flex items-center bg-blue-500 px-3 py-[3px] rounded-full">
              <MdOutlineDeck className="text-lg" />
              {listing.furnished ? "Furnished" : "Not furnished"}
            </div>
          </div>
          {listing.userRef !== auth.currentUser?.uid && (
            <div className="mt-4 flex space-x-4">
            <button className="flex items-center gap-1 px-2 py-1 bg-green-400 rounded-full text-white">
              <BiPurchaseTag className="text-black" />
              Book Now
            </button>
            <button onClick={() => setContactLandlord(true)}  className="flex items-center gap-2 px-2 py-1 bg-green-400 rounded-full text-white">
              <MdContactPhone className="text-black" />
              Contact Dealer
            </button>
          </div>
          )}
          {contactLandlord && (
            <Contact userRef={listing.userRef} listing={listing} />
          )}
          <label className="text-red-700 mt-6 flex font-bold items-center gap-2">
            <FaRegQuestionCircle />
            Have a query
          </label>
        </div>

        {/* <div>
        <MapContainer
            //center={[listing.geolocation.lat, listing.geolocation.lng]}
            zoom={13}
            scrollWheelZoom={false}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {/* <Marker
              position={[listing.geolocation.lat, listing.geolocation.lng]}
            >
              <Popup>
                {listing.address}
              </Popup>
            </Marker> */}
        {/* </MapContainer>
        </div> */}

        <div
          className="absolute sm:right-24 sm:top-4 flex items-center gap-2 cursor-pointer py-1 px-2 bg-purple-400 rounded-full"
          onClick={() => {
            navigator.clipboard.writeText(window.location.href);
            setShareLinkCopied(true);
            setTimeout(() => {
              setShareLinkCopied(false);
            }, 2000);
          }}
        >
          <FaRegShareSquare />
          Share
        </div>
        {shareLinkCopied && (
          <p className="absolute sm:right-20 sm:top-12 font-semibold border-2 border-gray-400 rounded-md bg-white z-10 p-2">
            Link Copied
          </p>
        )}
      </div>
    </div>
  );
}

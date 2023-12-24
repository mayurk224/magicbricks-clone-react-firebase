import React from "react";
import { FaMapLocationDot } from "react-icons/fa6";
import { FaBath } from "react-icons/fa";
import { FaBed } from "react-icons/fa";
import { MdEditNote } from "react-icons/md";
import { MdDeleteSweep } from "react-icons/md";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { MdOutlinePayments } from "react-icons/md";
import { PiSignpostBold } from "react-icons/pi";

export default function ListingItem({ listing, id, onDelete, onEdit }) {
  return (
    <li className="relative w-72 h-auto">
      <Link
        to={`/category/${listing.type}/${id}`}
        className="ListingCard  flex flex-col p-3 rounded-2xl bg-white hover:shadow-2xl"
      >
        <div className="border-yellow-700 relative imageDiv">
          <Moment
            fromNow
            className="absolute px-2 py-1 text-white rounded-xl bg-blue-500 text-sm uppercase"
          >
            {listing.timestamp?.toDate()}
          </Moment>
          <label className="bottom-0 right-0 absolute p-1 rounded-full flex items-center justify-center bg-blue-200">
            <MdOutlinePayments
              className={`text-black text-xl ${
                listing.type === "rent" && "hidden"
              }`}
            />
            <PiSignpostBold
              className={`text-black text-xl ${
                listing.type === "sell" && "hidden"
              }`}
            />
          </label>
          <img src={listing.imgUrls[0]} alt="" className="rounded-lg h-[170px] object-cover " />
        </div>
        <div className="ListingDetails pt-2 pb-1">
          <div className="flex items-center gap-2">
            <div>
              <FaMapLocationDot />
            </div>
            <div className="flex w-[240px]">
              <label className="text-gray-600 truncate">
                {listing.address}
              </label>
            </div>
          </div>
          <div>
            <label className="text-xl font-semibold">{listing.name}</label>
          </div>
          <div>
            <label className="text-lg font-semibold">
              {listing.offers
                ? listing.discount
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                : listing.price
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
              {(listing.type === "rent" && "$ / month") || "$"}
            </label>
          </div>
          <div className="flex justify-between">
            <div className="flex items-center gap-2">
              <label className="font-semibold">
                {listing.bathrooms > 1
                  ? `${listing.bathrooms} Baths`
                  : "1 Bath"}
              </label>
              <label className="font-semibold">
                {listing.bedrooms > 1 ? `${listing.bedrooms} Beds` : "1 Bed"}
              </label>
            </div>
          </div>
        </div>
      </Link>
      {onDelete && (
        <MdDeleteSweep onClick={()=>onDelete(listing.id)} className="text-xl absolute bottom-5 right-4 cursor-pointer text-red-600" />
      )}
      {onDelete && (
        <MdEditNote  onClick={()=>onEdit(listing.id)} className="text-2xl absolute bottom-4 right-10 cursor-pointer" />
      )}
    </li>
  );
}

import React, { useState } from "react";

export default function CreateListing() {
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
  } = formData;
  function onChange(e) {}
  return (
    <div className="flex items-center justify-center">
      <form className="p-8 flex flex-col lg:w-[500px] sm:w-96 gap-3">
        <label className="text-3xl font-semibold">Create a Listing</label>
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
              value="sell"
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
            Create Listing
          </button>
        
      </form>
    </div>
  );
}

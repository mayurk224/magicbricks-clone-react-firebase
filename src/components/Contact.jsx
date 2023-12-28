import React from "react";
import { doc, getDoc } from "firebase/firestore";
import { useState } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { db } from "../firebase";

export default function Contact({ userRef, listing }) {
  const [landlord, setLandlord] = useState(null);
  const [message, setMessage] = useState("");
  useEffect(() => {
    async function getLandlord() {
      const docRef = doc(db, "users", userRef);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setLandlord(docSnap.data());
      } else {
        toast.error("Could not get landlord data");
      }
    }
    getLandlord();
  }, [userRef]);
  function onChange(e) {
    setMessage(e.target.value);
  }
  return (
    <div>
      {landlord !== null && (
        <form className="max-w-sm">
          <label
            for="message"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your message
          </label>
          <p>
            Contact {landlord.name} for the {listing.name.toUpperCase()}
          </p>
          <textarea
            name="message"
            id="message"
            rows="4"
            value={message}
            onChange={onChange}
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Leave your message here..."
          ></textarea>
          <div className="space-x-5 mt-3">
            <button
              type="submit"
              className="bg-green-300 px-2 py-1 rounded-full"
            >
              Submit
            </button>
            <button type="cancel" className="bg-red-300 px-2 py-1 rounded-full">
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

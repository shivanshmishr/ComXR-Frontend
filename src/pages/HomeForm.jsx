import React, { useState } from "react";
import backgroundimg from "../assets/backgroundimg.webp";
import { Link } from "react-router-dom";

export const HomeForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    city: "",
    pincode: "",
  });

  const [error, setError] = useState({
    name: false,
    mobile: false,
    city: false,
    pincode: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setError((prevError) => ({
      ...prevError,
      [name]: false,
    }));
  };

  const handleSubmit = (e) => {
    const { name, mobile, city, pincode } = formData;
    if (!name || !mobile || !city || !pincode) {
      setError({
        name: !name,
        mobile: !mobile,
        city: !city,
        pincode: !pincode,
      });
      e.preventDefault(); // Prevents navigation to the booking dashboard if there are validation errors
    }
  };

  return (
    <div>
      <img
        src={backgroundimg}
        className="w-[100%] h-[25vh] object-cover"
        alt="background"
      />

      <div className="bg-white p-[1.5vh] rounded-t-[1vh] -mt-[1vh]">
        <h1 className="text-center text-[2.5vh] font-medium mb-[2.5vh]">
          Book An At Home Session With Our Physiotherapists For{" "}
          <span className="font-semibold text-[#fd6500]">₹699!</span>
        </h1>

        <div className="mt-[2vh]">
          <p className="text-[2.2vh] my-[1vh]">Name</p>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`p-[1vh] w-[100%] rounded-lg outline-none border-2 ${error.name ? "border-red-500" : "border-[#d0d0d0]"
              }`}
            placeholder="Enter Name"
          />
          {error.name && (
            <p className="text-red-500 text-[1.8vh] mt-[0.5vh]">Name is required</p>
          )}
        </div>

        <div className="mt-[2vh]">
          <p className="text-[2.2vh] my-[1vh]">Mobile Number</p>
          <input
            type="text"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            className={`p-[1vh] w-[100%] rounded-lg outline-none border-2 ${error.mobile ? "border-red-500" : "border-[#d0d0d0]"
              }`}
            placeholder="Enter Mobile Number"
          />
          {error.mobile && (
            <p className="text-red-500 text-[1.8vh] mt-[0.5vh]">
              Mobile number is required
            </p>
          )}
        </div>

        <div className="mt-[2vh]">
          <p className="text-[2.2vh] my-[1vh]">City</p>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className={`p-[1vh] w-[100%] rounded-lg outline-none border-2 ${error.city ? "border-red-500" : "border-[#d0d0d0]"
              }`}
            placeholder="Enter City"
          />
          {error.city && (
            <p className="text-red-500 text-[1.8vh] mt-[0.5vh]">City is required</p>
          )}
        </div>

        <div className="mt-[2vh]">
          <p className="text-[2.2vh] my-[1vh]">Pincode</p>
          <input
            type="text"
            name="pincode"
            value={formData.pincode}
            onChange={handleChange}
            className={`p-[1vh] w-[100%] rounded-lg outline-none border-2 ${error.pincode ? "border-red-500" : "border-[#d0d0d0]"
              }`}
            placeholder="Enter Pincode"
          />
          {error.pincode && (
            <p className="text-red-500 text-[1.8vh] mt-[0.5vh]">Pincode is required</p>
          )}
        </div>

        <Link to="/bookingdashboard" state={{ formData }} onClick={handleSubmit}>
          <button className="bg-[#fd6500] w-full my-[2vh] py-[1vh] rounded-lg">
            <p className="text-[2.4vh] font-semibold text-white">Submit</p>
          </button>
        </Link>
      </div>
    </div>
  );
};

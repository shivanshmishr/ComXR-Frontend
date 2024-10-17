import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { FaUser, FaHome, FaRupeeSign } from "react-icons/fa";
import { IoMdPhonePortrait, IoIosTime } from "react-icons/io";
import { MdDateRange } from "react-icons/md";
import { IoArrowBackCircle } from "react-icons/io5";

export const DashboardDetails = () => {
  const location = useLocation();
  console.log("Received state in DashboardDetails:", location.state);

  // Check if the necessary state is passed, if not use fallback or display error message.
  const state = location.state || {};
  const { formData, selectedDate, selectedSlot, selectedTherapist } = state;

  // Error handling for missing formData
  if (!formData) {
    console.log("No formData available, checking local storage");
    const savedState = JSON.parse(localStorage.getItem('bookingState'));
    if (savedState && savedState.formData) {
      formData = savedState.formData;
    } else {
      console.log("No formData found in local storage either");
      return <div>No user data available. Please go back and fill out the form.</div>;
    }
  }

  // Setup display details with icons
  const appointmentDetails = [
    {
      icon: <FaUser />,
      label: "Name:",
      value: formData.name,
    },
    {
      icon: <IoMdPhonePortrait />,
      label: "Mobile:",
      value: formData.mobile,
    },
    {
      icon: <FaHome />,
      label: "City:",
      value: formData.city,
    },
    {
      icon: <FaHome />,
      label: "Pincode:",
      value: formData.pincode,
    },
    {
      icon: <MdDateRange />,
      label: "Date:",
      value: selectedDate,
    },
    {
      icon: <IoIosTime />,
      label: "Time:",
      value: selectedSlot,
    },
    {
      icon: <FaRupeeSign />,
      label: "Fees:",
      value: "₹699",  // Assuming the fee is static
    },
  ];

  return (
    <div className="p-[1vh]">
      <Link to="/bookingdashboard">
        <IoArrowBackCircle className="text-[#fd6500] text-[6vh]" />
      </Link>
      <h1 className="text-[2.6vh] font-semibold">Confirmed Appointment Details</h1>
      <div className="p-[1.5vh] border-2 border-[#fd6500] my-[2vh] rounded-lg">
        <h1 className="text-[2.7vh]">Physiotherapy Session Confirmation</h1>
        <div className="my-[2vh]">
          {appointmentDetails.map((item, index) => (
            <div key={index} className="flex flex-row items-center my-[0.5vh] gap-x-[1vh]">
              {item.icon}
              <p className="text-[2.3vh] font-semibold">{item.label}</p>
              <p className="text-[2.3vh] font-medium">{item.value}</p>
            </div>
          ))}
        </div>
        <div className="mt-[3vh]">
          <p className="text-[2.2vh] my-[1vh]">Complete Postal Address</p>
          <textarea
            type="text"
            rows={3}
            className="p-[1vh] w-[100%] rounded-lg outline-none border-2 border-[#d0d0d0]"
            placeholder="Enter Address"
          />
        </div>
        <button className="bg-[#fd6500] w-full my-[2vh] py-[1vh] rounded-lg">
          <p className="text-[2.4vh] font-semibold text-white">Submit</p>
        </button>
      </div>
    </div>
  );
};

export default DashboardDetails;

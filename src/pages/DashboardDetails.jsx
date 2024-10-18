import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaUser, FaHome, FaRupeeSign } from "react-icons/fa";
import { IoMdPhonePortrait, IoIosTime } from "react-icons/io";
import { MdDateRange } from "react-icons/md";
import { IoArrowBackCircle } from "react-icons/io5";

export const DashboardDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState('');
  const [success, setSuccess] = useState(false); // State to track submission success

  let { formData, selectedDate, selectedSlot, selectedTherapist } = location.state || {};

  if (!formData) {
    const savedState = JSON.parse(localStorage.getItem('bookingState'));
    if (savedState && savedState.formData) {
      formData = savedState.formData;
    } else {
      return <div>No user data available. Please go back and fill out the form.</div>;
    }
  }

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        navigate('/'); // Change this path to the correct route for your HomeForm
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [success, navigate]);

  // Convert 12-hour AM/PM time to 24-hour time format
  function convertTo24Hour(time) {
    if (!time) {
      console.error("convertTo24Hour: No time provided");
      return '00:00:00'; // return a safe default value or handle the error as needed
    }

    const timeMatch = time.match(/(\d+:\d+)\s*(AM|PM)/i);
    if (!timeMatch) {
      console.error("convertTo24Hour: Invalid time format", time);
      return '00:00:00'; // return a safe default value or handle the error as needed
    }

    let [hours, minutes] = timeMatch[1].split(':');
    const modifier = timeMatch[2].toUpperCase();

    hours = parseInt(hours, 10);
    if (hours === 12) {
      hours = 0; // Convert 12 AM to 00 hours
    }
    if (modifier === 'PM') {
      hours += 12; // Convert PM hours to military time
    }

    return `${hours.toString().padStart(2, '0')}:${minutes}:00`;
  }

  console.log("Selected Slot:", selectedSlot);
  const formattedSlot = convertTo24Hour(selectedSlot);
  console.log("Formatted Slot:", formattedSlot);

  const handleSubmit = async () => {
    setLoading(true);
    const bookingCompletionTime = new Date().toISOString().slice(0, 19).replace('T', ' ');
    const selectedDateTime = `${selectedDate} ${convertTo24Hour(selectedSlot)}`;

    const postData = {
      name: formData.name,
      mobile: formData.mobile,
      city: formData.city,
      pincode: formData.pincode,
      therapistId: selectedTherapist,
      selectedSlot: selectedDateTime,
      address: address,
      bookingCompletionTime: bookingCompletionTime
    };

    try {
      const response = await fetch('http://localhost:5000/api/v1/appointment/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || "Something went wrong");
      }

      setSuccess(true); // Set success to true will trigger useEffect
      console.log("Appointment added successfully:", result);
    } catch (error) {
      console.error("Error while adding appointment:", error);
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-[1vh]">
      <Link to="/bookingdashboard">
        <IoArrowBackCircle className="text-[#fd6500] text-[6vh]" />
      </Link>
      {success ? (
        <div className="text-[#2C3776] text-center">Appointment successfully scheduled! Redirecting...</div>
      ) : (
        <>
          <h1 className="text-[2.6vh] font-semibold">Confirmed Appointment Details</h1>
          <div className="p-[1.5vh] border-2 border-[#fd6500] my-[2vh] rounded-lg">
            <h1 className="text-[2.7vh]">Physiotherapy Session Confirmation</h1>
            <div className="my-[2vh]">
              {[
                { icon: <FaUser />, label: "Name:", value: formData.name },
                { icon: <IoMdPhonePortrait />, label: "Mobile:", value: formData.mobile },
                { icon: <FaHome />, label: "City:", value: formData.city },
                { icon: <FaHome />, label: "Pincode:", value: formData.pincode },
                { icon: <MdDateRange />, label: "Date:", value: selectedDate },
                { icon: <IoIosTime />, label: "Time:", value: selectedSlot },
                { icon: <FaRupeeSign />, label: "Fees:", value: "₹699" }
              ].map((item, index) => (
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
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <button
              className="bg-[#fd6500] w-full my-[2vh] py-[1vh] rounded-lg"
              onClick={handleSubmit}
              disabled={loading}
            >
              <p className="text-[2.4vh] font-semibold text-white">{loading ? "Submitting..." : "Submit"}</p>
            </button>
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
          </div>
        </>
      )}
    </div>
  );
};

export default DashboardDetails;

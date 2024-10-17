import React, { useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { FaUser, FaHome, FaRupeeSign } from "react-icons/fa";
import { IoMdPhonePortrait, IoIosTime } from "react-icons/io";
import { MdDateRange } from "react-icons/md";
import { IoArrowBackCircle } from "react-icons/io5";

export const DashboardDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const [address, setAddress] = useState(''); // To manage address input
  const [loading, setLoading] = useState(false); // Optional: To manage the loading state after submission

  console.log("Received state in DashboardDetails:", location.state);

  const state = location.state || {};
  const { formData, selectedDate, selectedSlot, selectedTherapist } = state;
  // Convert 12-hour AM/PM time to 24-hour format
  function convertTo24Hour(time) {
    let [hours, modifier] = time.split(' ');
    let [hh, mm] = hours.split(':');

    if (hh === '12') {
      hh = '00';
    }
    if (modifier === 'PM' && hh !== '12') {
      hh = parseInt(hh, 10) + 12;
    }
    return `${hh}:${mm}:00`;
  }
  if (!formData) {
    const savedState = JSON.parse(localStorage.getItem('bookingState'));
    if (savedState && savedState.formData) {
      formData = savedState.formData;
    } else {
      return <div>No user data available. Please go back and fill out the form.</div>;
    }
  }

  const appointmentDetails = [
    { icon: <FaUser />, label: "Name:", value: formData.name },
    { icon: <IoMdPhonePortrait />, label: "Mobile:", value: formData.mobile },
    { icon: <FaHome />, label: "City:", value: formData.city },
    { icon: <FaHome />, label: "Pincode:", value: formData.pincode },
    { icon: <MdDateRange />, label: "Date:", value: selectedDate },
    { icon: <IoIosTime />, label: "Time:", value: selectedSlot },
    { icon: <FaRupeeSign />, label: "Fees:", value: "₹699" }, // Assuming the fee is static
  ];

  // Function to handle form submission
  const handleSubmit = async () => {
    setLoading(true); // Optional: Set loading state to true
    const bookingCompletionTime = new Date();

    // Format the date to MySQL compatible format
    const formattedBookingTime = bookingCompletionTime.toISOString().slice(0, 19);
    // Combine the selected date and slot into one datetime string
    const selectedDateTime = new Date(`${selectedDate}T${convertTo24Hour(selectedSlot)}`).toISOString().slice(0, 19);
    const postData = {
      ...formData,
      therapistId: Number(selectedTherapist),  // Assuming therapist data has an `id` field
      selectedSlot: selectedDateTime,
      address: address,  // Add address from textarea
      bookingCompletionTime: formattedBookingTime  // Capture current time
    };

    console.log("Data being sent to backend:", postData);
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

      // Handle success (e.g., redirect or display success message)
      console.log("Appointment added successfully:", result);

    } catch (error) {
      console.error("Error while adding appointment:", error);
      setErrorMessage(error.message); // Set the error message to state
    }
  };

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
            value={address}
            onChange={(e) => setAddress(e.target.value)} // Update the address state
          />
        </div>
        <button
          className="bg-[#fd6500] w-full my-[2vh] py-[1vh] rounded-lg"
          onClick={handleSubmit}
          disabled={loading} // Disable the button while submitting
        >
          <p className="text-[2.4vh] font-semibold text-white">
            {loading ? "Submitting..." : "Submit"}
          </p>
        </button>
      </div>
    </div>
  );
};

export default DashboardDetails;

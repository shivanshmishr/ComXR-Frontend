import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import { useNavigate, useLocation } from 'react-router-dom';
import doctor from "../assets/doctor.png";

export const BookingDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Ensure that formData is pulled from location.state if available
  const [formData, setFormData] = useState(location.state?.formData || {});

  console.log("Initial location state in BookingDashboard:", location.state);

  const [selectedDate, setSelectedDate] = useState(dayjs().format("YYYY-MM-DD"));
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedTherapist, setSelectedTherapist] = useState(null);

  const handleSelectTherapist = (therapistId) => {
    setSelectedTherapist(prev => prev === therapistId ? null : therapistId);
    console.log("Selected therapist:", therapistId);
  };

  const handleNavigate = () => {
    // Ensure formData is passed correctly
    navigate('/bookingconfirmslot', {
      state: {
        formData, // Correctly passing formData
        selectedDate,
        selectedSlot,
        selectedTherapist
      }
    });
  };

  useEffect(() => {
    const state = { selectedDate, selectedSlot, selectedTherapist };
    console.log("Updating local storage with state:", state);
    localStorage.setItem('appointmentState', JSON.stringify(state));
  }, [selectedDate, selectedSlot, selectedTherapist]);

  const dates = Array.from({ length: 7 }, (_, i) => dayjs().add(i, "day").format("YYYY-MM-DD"));
  const timeSlots = [
    { label: "Morning", times: generateTimeSlots(9, 12) },
    { label: "Afternoon", times: generateTimeSlots(12, 17) },
    { label: "Evening", times: generateTimeSlots(17, 21) }, // Adjust as necessary
  ];
  const therapists = [{ id: "1", name: "Dr. Saily", available: true }, { id: "2", name: "Dr. Shweta", available: true }];

  function generateTimeSlots(startHour, endHour) {
    const slots = [];
    for (let hour = startHour; hour < endHour; hour++) {
      slots.push(`${hour % 12 || 12}:00 ${hour < 12 ? "AM" : "PM"}`, `${hour % 12 || 12}:30 ${hour < 12 ? "AM" : "PM"}`);
    }
    return slots;
  }


  console.log("State before navigation:", {
    formData,
    selectedDate,
    selectedSlot,
    selectedTherapist
  });

  return (
    <div className="p-4">
      {/* Form Content */}
      <h1 className="text-[#2C3776] font-semibold text-[2.6vh]">Book an appointment with</h1>
      <p className="text-[#2C3776] font-bold text-[2.7vh]">Physica Physiotherapy</p>
      <h1 className="text-[3vh] my-[1.5vh] text-[#fd6500]">About Physica</h1>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam, impedit.</p>

      <h1 className="text-[3.3vh] font-semibold text-gray-900 my-4">Select Therapist</h1>
      <div className="flex flex-row justify-between items-center">
        {therapists.map(therapist => (
          <div key={therapist.id} onClick={() => handleSelectTherapist(therapist.id)} className={`w-[47%] p-[0.5vh] flex justify-start gap-x-[1vh] items-center border-2 rounded-lg cursor-pointer ${selectedTherapist === therapist.id ? "border-[#fd6500]" : "border-gray-300"}`}>
            <img src={doctor} alt="doctor" className="w-[7vh] h-[7vh] rounded-full" />
            <div>
              <p className="text-[2vh] font-semibold">{therapist.name}</p>
              <p>{therapist.available ? "Available" : "Not Available"}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Date and Time Slot Selection */}
      <h1 className="text-[3.3vh] font-semibold text-gray-900 my-4">Select Date</h1>
      <div className="flex space-x-4 overflow-x-auto mb-4">
        {dates.map(date => (
          <div key={date}>
            <p className="text-center w-[10vh] font-semibold mb-[1vh]">{dayjs(date).format("ddd")}</p>
            <div className={`p-2 cursor-pointer rounded-lg ${selectedDate === date ? "bg-[#fd6500] text-white" : "bg-gray-100"}`} onClick={() => setSelectedDate(date)}>
              <p className="text-center">{dayjs(date).format("DD MMM")}</p>
              <p>Available</p>
            </div>
          </div>
        ))}
      </div>

      <h1 className="text-[3.3vh] font-semibold text-gray-900 my-4">Select Time Slot</h1>
      <div className="space-y-6">
        {timeSlots.map(slotGroup => (
          <div key={slotGroup.label}>
            <h2 className="text-[2.6vh] font-semibold text-gray-900">{slotGroup.label}</h2>
            <div className="flex flex-wrap gap-2 mt-2">
              {slotGroup.times.map(time => (
                <div key={time} className={`px-3 py-2 border rounded-lg cursor-pointer ${selectedSlot === time ? "border-[#fd6500] bg-[#fd6500] text-white" : "border-gray-300 bg-white"}`} onClick={() => setSelectedSlot(time)}>
                  {time}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <button onClick={handleNavigate}
        className="bg-[#fd6500] w-full my-[2vh] py-[1vh] rounded-lg">
        <p className="text-[2.4vh] font-semibold text-white">Submit</p>
        Submit
      </button>
    </div>
  );
};

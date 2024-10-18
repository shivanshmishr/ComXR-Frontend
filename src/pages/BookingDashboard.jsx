import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import { useNavigate, useLocation } from 'react-router-dom';
import doctor from "../assets/doctor.png";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

export const BookingDashboard = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const [therapists, setTherapists] = useState([]);
  const [formData, setFormData] = useState(location.state?.formData || {});
  const [selectedDate, setSelectedDate] = useState(dayjs().format("YYYY-MM-DD"));
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedTherapist, setSelectedTherapist] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/v1/therapist/get-all')
      .then(response => response.json())
      .then(data => {
        console.log("Fetched data from backend:", data);
        if (data.success) {
          setTherapists(data.data);
          console.log("Therapists and their appointments loaded:", data.data);
        }
      })
      .catch(error => console.error('Error fetching therapists:', error));
  }, []);


  const isSlotBooked = (time) => {
    if (!selectedTherapist) {
      console.log("No therapist selected, skipping check.");
      return false;
    }
    const therapist = therapists.find(t => t.id.toString() === selectedTherapist.toString());
    if (!therapist) {
      console.log("Therapist not found:", selectedTherapist);
      return false;
    }

    // Combine date and time then parse it to local timezone
    const selectedDateTime = dayjs(`${selectedDate} ${time}`, "YYYY-MM-DD h:mm A");
    console.log(`Formatted selected date and time for comparison: ${selectedDateTime.format()}`);

    return therapist.appointments.some(appointment => {
      const appointmentDateTime = dayjs(appointment.selected_slot);
      console.log(`Comparing ${selectedDateTime.format()} with ${appointmentDateTime.format()}`);
      return selectedDateTime.isSame(appointmentDateTime);
    });
  };



  function generateTimeSlots(startHour, endHour) {
    const slots = [];
    for (let hour = startHour; hour < endHour; hour++) {
      const hourFormatted = hour % 12 || 12;
      const period = hour < 12 ? "AM" : "PM";
      slots.push(`${hourFormatted}:00 ${period}`, `${hourFormatted}:30 ${period}`);
    }
    return slots;
  }

  const handleSelectTherapist = (therapistId) => {
    console.log("Therapist selected:", therapistId);
    setSelectedTherapist(therapistId.toString());  // Ensuring ID is treated as a string
  };

  const handleNavigate = () => {
    navigate('/bookingconfirmslot', {
      state: {
        formData,
        selectedDate,
        selectedSlot,
        selectedTherapist
      }
    });
  };

  const dates = Array.from({ length: 7 }, (_, i) => dayjs().add(i, "day").format("YYYY-MM-DD"));
  const timeSlots = [
    { label: "Morning", times: ["9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM"] },
    { label: "Afternoon", times: ["12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM", "3:00 PM"] },
    { label: "Evening", times: ["4:00 PM", "4:30 PM", "5:00 PM", "5:30 PM", "6:00 PM", "6:30 PM"] }
  ];

  return (
    <div className="p-4">
      <h1 className="text-[#2C3776] font-semibold text-[2.6vh]">Book an appointment with</h1>
      <p className="text-[#2C3776] font-bold text-[2.7vh]">Physica Physiotherapy</p>
      <h1 className="text-[3vh] my-[1.5vh] text-[#fd6500]">About Physica</h1>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam, impedit.</p>

      <h1 className="text-[3.3vh] font-semibold text-gray-900 my-4">Select Therapist</h1>
      <div className="flex flex-row justify-between items-center">
        {therapists.map(therapist => (
          <div
            key={therapist.id}
            onClick={() => handleSelectTherapist(therapist.id)}
            className={`w-[47%] p-[0.5vh] flex justify-start gap-x-[1vh] items-center border-2 rounded-lg cursor-pointer ${selectedTherapist === therapist.id.toString() ? "border-[#fd6500]" : "border-gray-300"}`}
          >
            <img src={doctor} alt="doctor" className="w-[7vh] h-[7vh] rounded-full" />
            <div>
              <p className="text-[2vh] font-semibold">{therapist.name}</p>
              <p>{therapist.available ? "Available" : "Not Available"}</p>
            </div>
          </div>
        ))}
      </div>

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
                <div key={time} className={`px-3 py-2 border rounded-lg cursor-pointer ${isSlotBooked(time) ? "border-red-500 bg-red-500 text-white" : selectedSlot === time ? "border-[#fd6500] bg-[#fd6500] text-white" : "border-gray-300 bg-white"}`} onClick={() => !isSlotBooked(time) && setSelectedSlot(time)}>
                  {time}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <button onClick={handleNavigate} className="bg-[#fd6500] w-full my-[2vh] py-[1vh] rounded-lg">
        <p className="text-[2.4vh] font-semibold text-white">Submit</p>
      </button>
    </div>
  );
};

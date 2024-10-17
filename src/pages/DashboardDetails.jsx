import React from "react";
import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { IoMdPhonePortrait } from "react-icons/io";
import { FaHome } from "react-icons/fa";
import { MdDateRange } from "react-icons/md";
import { IoIosTime } from "react-icons/io";
import { FaRupeeSign } from "react-icons/fa";
import { IoArrowBackCircle } from "react-icons/io5";

export const DashboardDetails = () => {
  const appointmentDetails = [
    {
      icon: <FaUser />,
      label: "Name:",
      value: "Dr. Saily Ghag",
    },
    {
      icon: <IoMdPhonePortrait />,
      label: "Mobile:",
      value: "9892260450",
    },
    {
      icon: <FaHome />,
      label: "Pincode:",
      value: "400025",
    },
    {
      icon: <MdDateRange />,
      label: "Date:",
      value: "17th October 2024",
    },
    {
      icon: <IoIosTime />,
      label: "Time:",
      value: "10:00 AM",
    },
    {
      icon: <FaRupeeSign />,
      label: "Fees:",
      value: "₹699",
    },
  ];

  return (
    <div className="p-[1vh]">

      <Link to="/bookingdashboard">
        <div className="flex flex-row items-center my-[1vh] gap-x-[1vh]">
          <IoArrowBackCircle className="text-[#fd6500] text-[6vh]" />
        </div>
      </Link>

      <h1 className="text-[#2C3776] font-semibold text-[2.6vh]">
        Book an appointment with
      </h1>
      <p className="text-[#2C3776] font-bold text-[2.7vh]">
        Dr. Rukaiya Mithaiwala
      </p>

      <div className="p-[1.5vh] border-2 border-[#fd6500] my-[2vh] rounded-lg">
        <h1 className="text-[2.7vh]">Physiotherapy Session with</h1>
        <span className="text-[2.7vh] font-semibold text-[#fd6500]">
          Dr. Saily Ghag
        </span>

        <div className="my-[2vh]">
          {appointmentDetails.map((item, index) => (
            <div className="flex flex-row items-center my-[0.5vh] gap-x-[1vh]">
              {item.icon}
              <p className="text-[2.3vh] font-semibold">{item.label}</p>
              <p className="text-[2.3vh] font-medium">{item.value}</p>
            </div>
          ))}
        </div>
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
  );
};


//Data Fetching Code 
// import React from "react";
// import { useLocation, Link } from "react-router-dom";
// import { FaUser, FaHome, FaRupeeSign } from "react-icons/fa";
// import { IoMdPhonePortrait, IoIosTime } from "react-icons/io";
// import { MdDateRange } from "react-icons/md";
// import { IoArrowBackCircle } from "react-icons/io5";

// export const DashboardDetails = () => {
//   const location = useLocation();

//   // Debugging output
//   console.log("Received state:", location.state);
//   let { formData, selectedDate, selectedSlot } = location.state || {};

  

//   // Check if formData is null, which indicates no state was passed
//   if (!formData) {
//     const savedState = JSON.parse(localStorage.getItem('appointmentState'));
//     if (savedState) {
//       formData = savedState.formData;
//       selectedDate = savedState.selectedDate;
//       selectedSlot = savedState.selectedSlot;
//     }
//   }
//   if (!formData) {
//     return <div>No data available. Please go back and enter the details.</div>;
//   }

//   // Example data array with icons for displaying appointment details
//   const appointmentDetails = [
//     {
//       icon: <FaUser />,
//       label: "Name:",
//       value: formData.name,
//     },
//     {
//       icon: <IoMdPhonePortrait />,
//       label: "Mobile:",
//       value: formData.mobile,
//     },
//     {
//       icon: <FaHome />,
//       label: "City:",
//       value: formData.city,
//     },
//     {
//       icon: <FaHome />,
//       label: "Pincode:",
//       value: formData.pincode,
//     },
//     {
//       icon: <MdDateRange />,
//       label: "Date:",
//       value: selectedDate,
//     },
//     {
//       icon: <IoIosTime />,
//       label: "Time:",
//       value: selectedSlot,
//     },
//     {
//       icon: <FaRupeeSign />,
//       label: "Fees:",
//       value: "₹699",  // Assuming the fee is static
//     },
//   ];

//   return (
//     <div className="p-[1vh]">
//       <Link to="/bookingdashboard">
//         <IoArrowBackCircle className="text-[#fd6500] text-[6vh]" />
//       </Link>

//       <h1 className="text-[2.6vh] font-semibold">Confirmed Appointment Details</h1>
//       <div className="p-[1.5vh] border-2 border-[#fd6500] my-[2vh] rounded-lg">
//         <h1 className="text-[2.7vh]">Physiotherapy Session Confirmation</h1>

//         <div className="my-[2vh]">
//           {appointmentDetails.map((item, index) => (
//             <div key={index} className="flex flex-row items-center my-[0.5vh] gap-x-[1vh]">
//               {item.icon}
//               <p className="text-[2.3vh] font-semibold">{item.label}</p>
//               <p className="text-[2.3vh] font-medium">{item.value}</p>
//             </div>
//           ))}
//         </div>

//         <div className="mt-[3vh]">
//           <p className="text-[2.2vh] my-[1vh]">Complete Postal Address</p>
//           <textarea
//             type="text"
//             rows={3}
//             className="p-[1vh] w-[100%] rounded-lg outline-none border-2 border-[#d0d0d0]"
//             placeholder="Enter Address"
//           />
//         </div>

//         <button className="bg-[#fd6500] w-full my-[2vh] py-[1vh] rounded-lg">
//           <p className="text-[2.4vh] font-semibold text-white">Submit</p>
//         </button>
//       </div>
//     </div>
//   );
// };

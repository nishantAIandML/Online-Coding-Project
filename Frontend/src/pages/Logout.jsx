// import React, { useEffect, useState, useContext } from "react";
// import { useNavigate } from "react-router-dom";

// const Logout = () => {
//   const [message, setMessage] = useState("Logging out...");
//   const navigate = useNavigate();

//   useEffect(() => {
//     const logoutUser = async () => {
//       try {
//         const res = await fetch("http://localhost:3000/api/v1/users/logout", {
//           method: "GET",
//           credentials: "include", // send cookies to backend
//         });

//         const data = await res.json();

//         if (!res.ok) throw new Error(data.message || "Logout failed");

//         // Clear frontend user state if using context
//         if (setUser) setUser(null);

//         setMessage("✅ Logout successful!");
//       } catch (err) {
//         setMessage(`❌ ${err.message}`);
//       }

//       // Redirect after 1.5s
//       setTimeout(() => {
//         navigate("/login");
//       }, 1500);
//     };

//     logoutUser();
//   }, [navigate, setUser]);

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200">
//       <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
//         <h2 className="text-2xl font-bold text-blue-600 mb-4">Logout</h2>
//         <p className="text-green-600 font-medium">{message}</p>
//         <p className="text-gray-500 text-sm mt-2">Redirecting to Login...</p>
//       </div>
//     </div>
//   );
// };

// export { Logout };

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Logout = ({ setUser }) => {
  const [message, setMessage] = useState("Logging out...");
  const navigate = useNavigate();

  useEffect(() => {
    const logoutUser = async () => {
      try {
        const res = await fetch(`${process.env.AWS_URL}/api/v1/users/logout`, {
          method: "GET",
          credentials: "include", // Send cookies
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Logout failed");

        // Clear global state if provided
        if (setUser) setUser(null);

        setMessage("✅ Logout successful!");
      } catch (err) {
        setMessage(`❌ ${err.message}`);
      }

      // Redirect after short delay
      setTimeout(() => navigate("/login"), 1500);
    };

    logoutUser();
  }, [navigate, setUser]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
        <h2 className="text-2xl font-bold text-blue-600 mb-4">Logout</h2>
        <p className="text-green-600 font-medium">{message}</p>
        <p className="text-gray-500 text-sm mt-2">Redirecting to Login...</p>
      </div>
    </div>
  );
};

export { Logout };

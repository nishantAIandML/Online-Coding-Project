// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const Login = () => {
//   const [formData, setFormData] = useState({ username: "", password: "" });
//   const [message, setMessage] = useState("");
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setMessage("");

//     try {
//       const res = await fetch("http://localhost:3000/api/v1/users/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });

//       const data = await res.json();
//       if (!res.ok) throw new Error(data.message || "Login failed");

//       setMessage("✅ Login successful!");
//       localStorage.setItem("token", data.token);
//       localStorage.setItem("username", data.user.username);

//       setTimeout(() => {
//         navigate("/"); // redirect to home
//       }, 800);
//     } catch (err) {
//       setMessage(`❌ ${err.message}`);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200">
//       <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8">
//         <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">
//           Login
//         </h2>
//         {message && (
//           <p
//             className={`mb-4 text-center text-sm ${
//               message.startsWith("✅") ? "text-green-600" : "text-red-600"
//             }`}
//           >
//             {message}
//           </p>
//         )}

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <input
//             name="username"
//             type="text"
//             placeholder="Username"
//             value={formData.username}
//             onChange={handleChange}
//             required
//             className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
//           />
//           <input
//             name="password"
//             type="password"
//             placeholder="Password"
//             value={formData.password}
//             onChange={handleChange}
//             required
//             className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
//           />

//           <button
//             type="submit"
//             className="w-full bg-blue-500 text-white py-3 rounded hover:bg-blue-600 transition duration-200"
//           >
//             Login
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export { Login };

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await fetch(`${import.meta.env.VITE_AWS_URL}/api/v1/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // ✅ send and store cookies automatically
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Login failed");

      setMessage("✅ Login successful!");

      // ✅ No localStorage — authentication relies fully on cookies
      setTimeout(() => {
        navigate("/"); // redirect to home
      }, 800);
    } catch (err) {
      setMessage(`❌ ${err.message}`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">
          Login
        </h2>
        {message && (
          <p
            className={`mb-4 text-center text-sm ${
              message.startsWith("✅") ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="username"
            type="text"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded hover:bg-blue-600 transition duration-200"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export { Login };

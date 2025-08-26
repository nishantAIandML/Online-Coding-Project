import React, { useEffect, useState } from "react";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    try {
      const res = await fetch(`${process.env.AWS_URL}/api/v1/users/profile`, {
        method: "GET", // ✅ Use GET because backend expects GET
        credentials: "include", // include cookies if needed
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      console.log("Profile API Response:", data); // Debug log

      if (!res.ok) throw new Error(data.message || "Failed to fetch profile");
      
      setUser(data);
    //   console.log("Fetched User:",user); // Debug log
      setMessage("✅ Profile loaded successfully");
      
    } catch (err) {
      setMessage(`❌ ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-600 text-lg">Loading profile...</p>
      </div>
    );
  }

  if (!user) {
    console.error(message);
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-red-500 text-lg">
          {message || "Failed to load profile."}
        </p>
      </div>
    );
  }

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-green-200">
//       <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8">
//         <h2 className="text-3xl font-bold mb-6 text-center text-green-600">
//           My Profile
//         </h2>

//         <div className="space-y-4">
//           <div>
//             <p className="text-gray-500 text-sm">Username</p>
//             <p className="font-semibold text-gray-800">{user.username}</p>
//           </div>

//           <div>
//             <p className="text-gray-500 text-sm">Email</p>
//             <p className="font-semibold text-gray-800">{user.email}</p>
//           </div>

//           <div>
//             <p className="text-gray-500 text-sm">Total Score</p>
//             <p className="font-semibold text-gray-800">{user.totalScore ?? 0}</p>
//           </div>

//           <div>
//             <p className="text-gray-500 text-sm">Problems Solved</p>
//             <ul className="list-disc list-inside text-gray-800">
//               {Array.isArray(user.problemsSolved) && user.problemsSolved.length > 0 ? (
//                 user.problemsSolved.map((problem, index) => (
//                   <li key={index}>{problem.title || "Unnamed Problem"}</li>
//                 ))
//               ) : (
//                 <p className="text-gray-500">No problems solved yet.</p>
//               )}
//             </ul>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 via-green-200 to-green-300 p-6">
  <div className="max-w-md w-full bg-white shadow-2xl rounded-2xl p-8 transform transition duration-300 hover:scale-105">
    {/* Profile Header */}
    <div className="flex flex-col items-center">
      <div className="w-20 h-20 rounded-full bg-green-200 flex items-center justify-center shadow-md mb-4">
        <span className="text-3xl font-bold text-green-600">
          {user.username?.charAt(0).toUpperCase()}
        </span>
      </div>
      <h2 className="text-3xl font-extrabold text-green-700 tracking-wide">
        My Profile
      </h2>
      <p className="text-sm text-gray-500 mt-1">Welcome back, {user.username}!</p>
    </div>

    {/* Divider */}
    <div className="border-t border-gray-200 my-6"></div>

    {/* User Info */}
    <div className="space-y-5">
      <div>
        <p className="text-gray-500 text-sm">Username</p>
        <p className="font-semibold text-gray-800 text-lg">{user.username}</p>
      </div>

      <div>
        <p className="text-gray-500 text-sm">Email</p>
        <p className="font-semibold text-gray-800">{user.email}</p>
      </div>

      <div>
        <p className="text-gray-500 text-sm">Total Score</p>
        <p className="font-semibold text-gray-800 text-lg">
          {user.totalScore ?? 0}
        </p>
      </div>

      <div>
        <p className="text-gray-500 text-sm mb-2">Problems Solved</p>
        {Array.isArray(user.problemsSolved) && user.problemsSolved.length > 0 ? (
          <ul className="bg-green-50 rounded-lg p-3 shadow-inner space-y-1">
            {user.problemsSolved.map((problem, index) => (
              <li
                key={index}
                className="text-gray-800 text-sm font-medium px-2 py-1 hover:bg-green-100 rounded transition"
              >
                {problem.title || "Unnamed Problem"}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 italic">No problems solved yet.</p>
        )}
      </div>
    </div>

    
  </div>
</div>

);
};
export { Profile };

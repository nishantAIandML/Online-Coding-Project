import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Problem = () => {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const response = await fetch(`${import.meta.env.AWS_URL}/api/v1/problems/`);
        const data = await response.json();

        if (response.ok) {
          setProblems(data.problems);
        } else {
          setError(data.message || "Failed to load problems");
        }
      } catch (err) {
        setError("⚠️ Server error");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProblems();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          📚 Problem List
        </h1>

        {loading ? (
          <p className="text-center text-gray-500">Loading problems...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full table-auto border-collapse">
              <thead>
                <tr className="bg-gray-200 text-left">
                  <th className="p-3">#</th>
                  <th className="p-3">Title</th>
                  <th className="p-3">Difficulty</th>
                  <th className="p-3">Tags</th>
                  <th className="p-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {problems.map((problem, index) => (
                  <tr
                    key={problem._id}
                    className="border-t hover:bg-gray-50 transition"
                  >
                    <td className="p-3">{index + 1}</td>
                    <td className="p-3 font-medium text-blue-700">{problem.title}</td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-1 rounded text-white text-sm ${
                          problem.difficulty === "Easy"
                            ? "bg-green-500"
                            : problem.difficulty === "Medium"
                            ? "bg-yellow-500"
                            : "bg-red-500"
                        }`}
                      >
                        {problem.difficulty}
                      </span>
                    </td>
                    <td className="p-3">
                      {problem.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="inline-block bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded mr-1"
                        >
                          {tag}
                        </span>
                      ))}
                    </td>
                    <td className="p-3">
                      <Link
                        to={`/${problem._id}`}
                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export {Problem};
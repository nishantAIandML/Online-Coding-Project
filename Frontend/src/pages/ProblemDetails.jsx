import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const ProblemDetails = () => {
  const { id } = useParams(); // Get problem ID from URL
  const [problem, setProblem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProblem = async () => {
      try {
        const res = await fetch("http://3.110.101.117:3000/api/v1/problems/${id}");
        const data = await res.json();
        if (res.ok) {
          setProblem(data.problem);
        } else {
          setError(data.message || "Failed to load problem");
        }
      } catch (err) {
        setError("⚠️ Server error");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProblem();
  }, [id]);

  if (loading) return <p className="text-center mt-4">Loading problem...</p>;
  if (error) return <p className="text-center mt-4 text-red-500">{error}</p>;
  if (!problem) return <p className="text-center mt-4">Problem not found</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        <Link
          to="/problems"
          className="text-blue-500 underline mb-4 inline-block"
        >
          ← Back to Problem List
        </Link>

        <h1 className="text-3xl font-bold mb-4">{problem.title}</h1>

        <p className="mb-4">{problem.description}</p>

        <p className="mb-2">
          <strong>Difficulty:</strong>{" "}
          <span
            className={`px-2 py-1 rounded text-white ${
              problem.difficulty === "Easy"
                ? "bg-green-500"
                : problem.difficulty === "Medium"
                ? "bg-yellow-500"
                : "bg-red-500"
            }`}
          >
            {problem.difficulty}
          </span>
        </p>

        {problem.tags?.length > 0 && (
          <p className="mb-4">
            <strong>Tags:</strong>{" "}
            {problem.tags.map((tag, i) => (
              <span
                key={i}
                className="inline-block bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded mr-1"
              >
                {tag}
              </span>
            ))}
          </p>
        )}

        {problem.constraints && (
          <div className="mb-4">
            <strong>Constraints:</strong>
            <p className="ml-2">{problem.constraints}</p>
          </div>
        )}

        {problem.publicTestCases?.length > 0 && (
          <div className="mb-4">
            <strong>Public Test Cases:</strong>
            {problem.publicTestCases.map((tc, i) => (
              <div
                key={i}
                className="bg-gray-100 p-2 my-1 rounded font-mono"
              >
                <p>
                  <strong>Input:</strong> {tc.input}
                </p>
                <p>
                  <strong>Output:</strong> {tc.output}
                </p>
              </div>
            ))}
          </div>
        )}

        {problem.solution && (
          <div>
            <strong>Solution Hint:</strong>
            <pre className="bg-gray-200 p-2 rounded font-mono text-sm">
              {problem.solution}
            </pre>
            {problem.solutionTimeComplexity && (
              <p>
                <strong>Time Complexity:</strong>{" "}
                {problem.solutionTimeComplexity}
              </p>
            )}
            {problem.solutionSpaceComplexity && (
              <p>
                <strong>Space Complexity:</strong>{" "}
                {problem.solutionSpaceComplexity}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export { ProblemDetails };

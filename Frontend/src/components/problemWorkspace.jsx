// import React, { useState, useEffect } from "react";
// import Editor from "@monaco-editor/react";

// export const ProblemWorkspace = () => {
//   const [problems, setProblems] = useState([]);
//   const [selectedProblem, setSelectedProblem] = useState(null);
//   const [code, setCode] = useState("");
//   const [language, setLanguage] = useState("cpp");
//   const [stdin, setStdin] = useState("");
//   const [output, setOutput] = useState("");
//   const [loading, setLoading] = useState(false);

//   // Fetch problems
//   useEffect(() => {
//     const fetchProblems = async () => {
//       try {
//         const res = await fetch("http://localhost:3000/api/v1/problems", {
//           credentials: "include",
//         });
//         const data = await res.json();
//         if (res.ok) setProblems(data.problems || []);
//         else setOutput(`❌ ${data.message || "Failed to fetch problems"}`);
//       } catch (err) {
//         setOutput(`❌ ${err.message}`);
//       }
//     };
//     fetchProblems();
//   }, []);

//   const handleRun = async () => {
//     if (!selectedProblem) return setOutput("❌ Please select a problem first");

//     setLoading(true);
//     setOutput("Running code...");
//     try {
//       const res = await fetch(
//         "http://localhost:3000/api/v1/submissions/compile",
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           credentials: "include",
//           body: JSON.stringify({ code, language, stdin }),
//         }
//       );

//       const data = await res.json();
//       setOutput(
//         data.success
//           ? data.output || "No output returned"
//           : `❌ ${data.message}`
//       );
//     } catch (err) {
//       setOutput(`❌ ${err.message}`);
//     }
//     setLoading(false);
//   };

//   const handleSubmit = async () => {
//     if (!selectedProblem) return setOutput("❌ Please select a problem first");

//     setLoading(true);
//     setOutput("Submitting...");
//     try {
//       const res = await fetch("http://localhost:3000/api/v1/submissions", {
//         method: "POST",
//         headers: { "Content-Type": "application/json"},
//         credentials: "include",
//         body: JSON.stringify({
//           problemId: selectedProblem._id,
//           code,
//           language,
//         }),
//       });

//       const data = await res.json();
//       if (!res.ok) throw new Error(data.message || "Submission failed");

//       setOutput(
//         `✅ Submission completed!\nScore: ${selectedProblem.score}\nPassed: ${data.passedCases}/${data.totalCases}`
//       );
//     } catch (err) {
//       setOutput(`❌ ${err.message}`);
//     }
//     setLoading(false);
//   };

//   return (
//     <div style={{ display: "flex", height: "100vh" }}>
//       {/* Problem List */}
//       <div
//         style={{
//           width: "250px",
//           borderRight: "1px solid #ccc",
//           overflowY: "auto",
//         }}
//       >
//         <h3 style={{ padding: "10px", background: "#f5f5f5" }}>Problems</h3>
//         {problems.map((p) => (
//           <div
//             key={p._id}
//             onClick={() => setSelectedProblem(p)}
//             style={{
//               padding: "8px",
//               cursor: "pointer",
//               background:
//                 selectedProblem?._id === p._id ? "#e0f7fa" : "transparent",
//             }}
//           >
//             {p.title}
//           </div>
//         ))}
//       </div>

//       {/* Code Editor */}
//       <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
//         {selectedProblem ? (
//           <>
//             {/* Toolbar */}
//             <div
//               style={{
//                 padding: "10px",
//                 background: "#f5f5f5",
//                 display: "flex",
//                 gap: "10px",
//                 alignItems: "center",
//               }}
//             >
//               <select
//                 value={language}
//                 onChange={(e) => setLanguage(e.target.value)}
//                 className="border p-1 rounded"
//               >
//                 <option value="cpp">C++</option>
//                 <option value="python">Python</option>
//                 <option value="javascript">JavaScript</option>
//               </select>

//               <button
//                 onClick={handleRun}
//                 disabled={loading}
//                 style={{
//                   background: "#4CAF50",
//                   color: "#fff",
//                   padding: "6px 14px",
//                   border: "none",
//                 }}
//               >
//                 ▶ Run
//               </button>

//               <button
//                 onClick={handleSubmit}
//                 disabled={loading}
//                 style={{
//                   background: "#2196F3",
//                   color: "#fff",
//                   padding: "6px 14px",
//                   border: "none",
//                 }}
//               >
//                 📤 Submit
//               </button>
//             </div>

//             {/* Editor */}
//             <div style={{ flex: 1 }}>
//               <Editor
//                 height="100%"
//                 language={language}
//                 value={code}
//                 onChange={(val) => setCode(val || "")}
//                 theme="vs-dark"
//               />
//             </div>

//             {/* Stdin */}
//             <textarea
//               placeholder="Custom input (stdin)..."
//               value={stdin}
//               onChange={(e) => setStdin(e.target.value)}
//               style={{
//                 height: "80px",
//                 border: "1px solid #ddd",
//                 padding: "5px",
//                 fontFamily: "monospace",
//               }}
//             />

//             {/* Output */}
//             <div
//               style={{
//                 background: "#1e1e1e",
//                 color: "white",
//                 padding: "10px",
//                 height: "150px",
//                 overflowY: "auto",
//               }}
//             >
//               <strong>Output / Message:</strong>
//               <pre>{output}</pre>
//             </div>
//           </>
//         ) : (
//           <div
//             style={{
//               flex: 1,
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               fontSize: "1.2rem",
//               color: "#888",
//             }}
//           >
//             ⚠ Please select a problem from the left
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };



import React, { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";

export const ProblemWorkspace = () => {
  const [problems, setProblems] = useState([]);
  const [selectedProblem, setSelectedProblem] = useState(null);
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("cpp");
  const [stdin, setStdin] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const res = await fetch(`${import.meta.env.AWS_URL}/api/v1/problems`, {
          credentials: "include",
        });
        const data = await res.json();
        if (res.ok) setProblems(data.problems || []);
        else setOutput(`❌ ${data.message || "Failed to fetch problems"}`);
      } catch (err) {
        setOutput(`❌ ${err.message}`);
      }
    };
    fetchProblems();
  }, []);

  const handleRun = async () => {
    if (!selectedProblem) return setOutput("❌ Please select a problem first");
    setLoading(true);
    setOutput("Running code...");
    try {
      const res = await fetch(
        `${import.meta.env.AWS_URL}/api/v1/submissions/compile`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ code, language, stdin }),
        }
      );
      const data = await res.json();
      setOutput(
        data.success ? data.output || "No output returned" : `❌ ${data.message}`
      );
    } catch (err) {
      setOutput(`❌ ${err.message}`);
    }
    setLoading(false);
  };

  const handleSubmit = async () => {
    if (!selectedProblem) return setOutput("❌ Please select a problem first");
    setLoading(true);
    setOutput("Submitting...");
    try {
      const res = await fetch(`${import.meta.env.AWS_URL}/api/v1/submissions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          problemId: selectedProblem._id,
          code,
          language,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Submission failed");
      setOutput(
        `✅ Submission completed!\nScore: ${selectedProblem.score}\nPassed: ${data.passedCases}/${data.totalCases}`
      );
    } catch (err) {
      setOutput(`❌ ${err.message}`);
    }
    setLoading(false);
  };

  const handleAIReview = async () => {
    if (!selectedProblem) return setOutput("❌ Please select a problem first");
    setLoading(true);
    setOutput("Reviewing code with AI...");
    try {
      // Example: Replace with your AI review API
      const res = await fetch(`${import.meta.env.AWS_URL}/api/v1/submissions/ai-review`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          problemId: selectedProblem._id,
          code,
          language,
        }),
      });
      const data = await res.json();
      setOutput(
        data.success
          ? `🧠 AI Review:\n${data.review || "No review available"}`
          : `❌ ${data.message}`
      );
    } catch (err) {
      setOutput(`❌ ${err.message}`);
    }
    setLoading(false);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Left: Problem Details */}
      <div className="w-1/2 p-4 overflow-y-auto bg-white border-r">
        <h2 className="text-xl font-bold mb-4">Select Problem</h2>
        <select
          value={selectedProblem?._id || ""}
          onChange={(e) => {
            const prob = problems.find((p) => p._id === e.target.value);
            setSelectedProblem(prob);
          }}
          className="border p-2 rounded w-full mb-4"
        >
          <option value="">-- Select a problem --</option>
          {problems.map((p) => (
            <option key={p._id} value={p._id}>
              {p.title} - {p.difficulty}
            </option>
          ))}
        </select>

        {selectedProblem && (
          <div className="space-y-2">
            <h2 className="text-2xl font-bold">{selectedProblem.title}</h2>
            <p className="text-gray-700">{selectedProblem.description}</p>

            {selectedProblem.tags?.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-1">
                {selectedProblem.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="bg-blue-200 text-blue-800 px-2 py-0.5 rounded text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {selectedProblem.constraints && (
              <div>
                <h3 className="font-semibold mt-2">Constraints:</h3>
                <p className="text-gray-600">{selectedProblem.constraints}</p>
              </div>
            )}

            {selectedProblem.publicTestCases?.length > 0 && (
              <div>
                <h3 className="font-semibold mt-2">Public Test Cases:</h3>
                {selectedProblem.publicTestCases.map((tc, i) => (
                  <div
                    key={i}
                    className="bg-gray-100 p-2 rounded my-1 font-mono"
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

            {selectedProblem.solution && (
              <div>
                <h3 className="font-semibold mt-2">Solution Hint:</h3>
                <pre className="bg-gray-200 p-2 rounded font-mono text-sm">
                  {selectedProblem.solution}
                </pre>
                {selectedProblem.solutionTimeComplexity && (
                  <p>
                    <strong>Time Complexity:</strong>{" "}
                    {selectedProblem.solutionTimeComplexity}
                  </p>
                )}
                {selectedProblem.solutionSpaceComplexity && (
                  <p>
                    <strong>Space Complexity:</strong>{" "}
                    {selectedProblem.solutionSpaceComplexity}
                  </p>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Right: Code Editor */}
      <div className="w-1/2 flex flex-col">
        {selectedProblem ? (
          <>
            {/* Toolbar */}
            <div className="flex items-center gap-2 p-2 bg-gray-50 border-b">
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="border rounded px-2 py-1"
              >
                <option value="cpp">C++</option>
                <option value="python">Python</option>
                <option value="javascript">JavaScript</option>
              </select>

              <button
                onClick={handleRun}
                disabled={loading}
                className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600"
              >
                ▶ Run
              </button>

              <button
                onClick={handleSubmit}
                disabled={loading}
                className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
              >
                📤 Submit
              </button>

              <button
                onClick={handleAIReview}
                disabled={loading}
                className="bg-purple-500 text-white px-4 py-1 rounded hover:bg-purple-600"
              >
                🤖 AI Review
              </button>
            </div>

            {/* Editor */}
            <div className="flex-1">
              <Editor
                height="100%"
                language={language}
                value={code}
                onChange={(val) => setCode(val || "")}
                theme="vs-dark"
              />
            </div>

            {/* Stdin */}
            <textarea
              placeholder="Custom input (stdin)..."
              value={stdin}
              onChange={(e) => setStdin(e.target.value)}
              className="border-t border-gray-300 p-2 font-mono h-24"
            />

            {/* Output */}
            <div className="bg-gray-900 text-white p-2 h-40 overflow-y-auto font-mono">
              <strong>Output / Message:</strong>
              <pre>{output}</pre>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500 text-lg">
            ⚠ Please select a problem from the left
          </div>
        )}
      </div>
    </div>
  );
};

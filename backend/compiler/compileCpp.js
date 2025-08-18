import fs from "fs";
import { exec } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

// ESM __dirname fix
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compileCpp = async (code, callback) => {
  const tempDir = path.join(__dirname, `temp_${Date.now()}`);
  fs.mkdirSync(tempDir);

  const sourceFile = path.join(tempDir, "main.cpp");
  const outputFile = path.join(tempDir, "main.exe"); // for Windows, use "main" for Linux/Mac

  // Save C++ code
  fs.writeFileSync(sourceFile, code);

  // Compile & Run
  exec(`g++ "${sourceFile}" -o "${outputFile}" && "${outputFile}"`, (err, stdout, stderr) => {
    try {
      // Delete files after execution
      if (fs.existsSync(outputFile)) fs.unlinkSync(outputFile);
      fs.unlinkSync(sourceFile);
      fs.rmdirSync(tempDir);
    } catch (cleanupErr) {
      console.error("Cleanup failed:", cleanupErr);
    }

    if (err) {
      return callback(`Compilation/Runtime Error:\n${stderr}`);
    }
    callback(stdout);
  });
};

export { compileCpp };

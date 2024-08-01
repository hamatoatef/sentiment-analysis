import { useState } from "react";

function InputData({ analysis, isAnalysis }) {
  const [value, setValue] = useState("");

  const handleClick = (e) => {
    e.preventDefault();
    analysis(value);
  };
  return (
    <>
      <textarea
        type="text"
        className="border p-2 w-full h-[75%]"
        placeholder="Enter text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={isAnalysis}
      />
      <div className="flex justify-end p-2">
        <button
          className="bg-blue-400 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mt-2"
          onClick={handleClick}
        >
          Submit
        </button>
      </div>
    </>
  );
}

export default InputData;

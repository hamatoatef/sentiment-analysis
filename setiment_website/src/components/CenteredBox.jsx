import { useAnalysis } from "../hooks/useAnalysis";
import Chart from "./Chart";
import InputData from "./InputData";
import angry from "./../images/angry.png";
import neutral from "./../images/neutral_face.png";
import happy from "./../images/grinning.png";
function CenteredBox() {
  const { analysis, isAnalysis, data = {} } = useAnalysis();

  const { score = 0, label = "default_label" } = data;

  const parts = label.split("_")[1];
  let src;

  // 0 -> Negative; 1 -> Neutral; 2 -> Positive
  if (parts === "0") {
    src = angry;
  } else if (parts === "1") {
    src = neutral;
  } else if (parts === "2") {
    src = happy;
  }

  return (
    <div className="flex items-center justify-center h-screen mt-[-30px]">
      <div className="bg-gray-200 w-[80%] h-[75%] flex flex-row justify-around items-center">
        <div className="bg-slate-50 h-[75%] w-[42%]">
          <InputData analysis={analysis} isAnalysis={isAnalysis} />
        </div>
        <div className="bg-slate-50 h-[75%] w-[42%] flex items-center justify-center">
          <div className="pt-[100px]">
            <Chart score={score} parts={parts} />
          </div>

          <img src={src} className="w-[30%] h-[30%] border-0	" />
        </div>
      </div>
    </div>
  );
}

export default CenteredBox;

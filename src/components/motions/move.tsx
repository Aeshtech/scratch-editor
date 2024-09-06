import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const Move = ({ motionId }: { motionId: string }) => {
  const [steps, setSteps] = useState(0);

  const { activeSprite } = useSelector((state: RootState) => state.global);

  const handleClick = () => {
    const element = document.getElementById(activeSprite);
    if (!element) return;

    const left = element.offsetLeft;
    element.style.left = left + steps + "px";
  };
  return (
    <div className="flex flex-wrap justify-center items-center w-full h-[50px] bg-primary text-white rounded-[10px] text-sm font-semibold px-2 py-1 my-2 cursor-pointer">
      Move
      <input
        type="number"
        className="text-black text-center w-14 h-[35px] mx-2 rounded-[10px] pr-1 outline-none"
        value={steps}
        onChange={(e) => {
          e.stopPropagation();
          setSteps(parseInt(e.target.value));
        }}
      />
      steps
      <button
        id={motionId}
        onClick={handleClick}
        hidden
        className="hidden"
      ></button>
    </div>
  );
};

export default Move;

import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const GotoXY = ({ motionId }: { motionId: string }) => {
  const [steps, setSteps] = useState({ x: 0, y: 0 });

  const { activeSprite } = useSelector((state: RootState) => state.global);

  const handleClick = () => {
    const el = document.getElementById(activeSprite);
    if (!el) return;
    el.style.left = steps.x + "px";
    el.style.top = steps.y + "px";
  };
  return (
    <div className="flex flex-wrap justify-center items-center w-full h-[50px] bg-primary text-white rounded-[10px] text-sm font-semibold px-2 py-1 my-2 cursor-pointer">
      Goto X,Y
      <input
        type="number"
        className="text-black text-center w-12 h-[35px] ml-2 rounded-[10px] pr-1 outline-none"
        value={steps.x}
        onChange={(e) => {
          e.stopPropagation();
          setSteps((prev) => ({ ...prev, x: parseInt(e.target.value) }));
        }}
      />
      <input
        type="number"
        className="text-black text-center w-12 h-[35px] mx-2 rounded-[10px] pr-1 outline-none"
        value={steps.y}
        onChange={(e) => {
          e.stopPropagation();
          setSteps((prev) => ({ ...prev, y: parseInt(e.target.value) }));
        }}
      />
      <button
        id={motionId}
        onClick={handleClick}
        hidden
        className="hidden"
      ></button>
    </div>
  );
};

export default GotoXY;

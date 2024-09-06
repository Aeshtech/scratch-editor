import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useState } from "react";

const Turn = ({ motionId }: { motionId: string }) => {
  const [angle, setAngle] = useState(0);
  const { activeSprite } = useSelector((state: RootState) => state.global);

  const handleClick = () => {
    const el = document.getElementById(activeSprite);
    if (!el) return;
    el.style.transform = `rotate(${angle}deg)`;
  };

  return (
    <div className="flex flex-wrap justify-center items-center w-full h-[50px] bg-primary text-white rounded-[10px] text-sm font-semibold px-2 py-1 my-2 cursor-pointer">
      Turn
      <input
        type="number"
        className="text-black text-center w-14 h-[35px] mx-2 rounded-[10px] pr-1 outline-none"
        value={angle}
        onChange={(e) => {
          e.stopPropagation();
          setAngle(parseInt(e.target.value));
        }}
      />
      Degrees
      <button
        id={motionId}
        onClick={handleClick}
        hidden
        className="hidden"
      ></button>
    </div>
  );
};

export default Turn;

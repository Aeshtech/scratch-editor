import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { getMotion } from "./get-motion";
import { setAnimations } from "../redux/global-slice";
import { MotionVariantsType } from "../lib/constants";

export default function MidArea() {
  const { animations } = useSelector((state: RootState) => state.global);
  const dispatch = useDispatch();

  const handleClick = (comps: string[], id: string) => {
    const elem = document.querySelector(".spriteDiv");
    if (elem) {
      elem.classList.add("transition-all");
    }
    if (comps.length === 0) return;
    let i = 0;

    const cnt = setInterval(() => {
      if (i === comps.length) {
        clearInterval(cnt);
      }

      const motionId = `comp${comps[i]}-${id}-${i}`;
      const ele = document.getElementById(motionId);
      if (ele) {
        ele.click();
      }
      i++;
    }, 500);
  };

  const handleCreateAnimation = () => {
    const updatedAnimation = [
      ...animations,
      {
        id: `animation-${animations.length + 1}`,
        comps: ["MOVE"] as MotionVariantsType[],
      },
    ];
    dispatch(setAnimations(updatedAnimation));
  };

  return (
    <div className="flex-1 h-full overflow-x-auto">
      <div className="flex items-center px-4 bg-violet-500 h-[50px] justify-between text-white">
        <span className="text-lg font-bold">Animations</span>
        <button
          type="button"
          onClick={handleCreateAnimation}
          className="bg-slate-200 active:scale-[0.98] text-primary font-semibold h-8 px-2 rounded-md"
        >
          Create Animation
        </button>
      </div>

      <div className="pt-4 px-2 flex justify-start flex-nowrap gap-y-5 gap-x-5 overflow-x-auto hideScrollbar min-h-[50%]">
        {animations.map((animation, index) => (
          <div
            className="w-[220px] border border-gray-400 rounded-[10px] shrink-0"
            key={animation.id}
          >
            <div className="w-full flex items-center p-2 justify-between bg-primary text-white rounded-t-[10px]">
              <span className="text-sm">Animation {index + 1}</span>
              <button
                type="button"
                className="border-2 text-white h-[35px] bg-yellow-500 active:scale-[0.98] font-bold w-[80px] flex items-center justify-center rounded-[10px]"
                onClick={() => handleClick(animation.comps, animation.id)}
              >
                ▶️ Play
              </button>
            </div>
            <Droppable droppableId={animation.id} type="MOTIONS">
              {(provided) => {
                return (
                  <ul
                    className={`${animation.id} w-full h-full pb-2`}
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {animation.comps &&
                      animation.comps.map((variant, i) => {
                        const str = `${variant}`;
                        const motionId = `comp${variant}-${animation.id}-${i}`;

                        return (
                          <div className="px-2">
                            <Draggable
                              key={`${str}-${animation.id}-${i}`}
                              draggableId={`${str}-${animation.id}-${i}`}
                              index={i}
                            >
                              {(provided) => (
                                <li
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                >
                                  {getMotion({ key: variant, id: motionId })}
                                  {/* {provided.placeholder} */}
                                </li>
                              )}
                            </Draggable>
                          </div>
                        );
                      })}
                    {provided.placeholder}
                  </ul>
                );
              }}
            </Droppable>
          </div>
        ))}
      </div>
    </div>
  );
}

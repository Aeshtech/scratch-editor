import { setActiveSprite, setSprites } from "../redux/global-slice";
import { RootState } from "../redux/store";
import CatSprite from "./cat-sprite";
import { useSelector, useDispatch } from "react-redux";

export default function PreviewArea() {
  const { sprites, activeSprite } = useSelector(
    (state: RootState) => state.global
  );
  const dispatch = useDispatch();

  let startX: number = 0;
  let startY: number = 0;
  let activeElement: HTMLElement | null = null;

  function startDrag(
    event: React.MouseEvent<HTMLDivElement>,
    elementId: string
  ): void {
    // Get the element to be dragged
    activeElement = document.getElementById(elementId) as HTMLElement;
    activeElement.classList.remove("transition-all");
    activeElement.classList.remove("duration-300");

    // Prevent default behavior and set initial positions
    event.preventDefault();
    startX = event.clientX;
    startY = event.clientY;

    // Attach event listeners for dragging and stopping
    document.addEventListener("mousemove", dragElement);
    document.addEventListener("mouseup", stopDrag);
  }

  function dragElement(event: MouseEvent): void {
    if (!activeElement) return;

    // Prevent default behavior and calculate position changes
    event.preventDefault();
    const deltaX = startX - event.clientX;
    const deltaY = startY - event.clientY;
    startX = event.clientX;
    startY = event.clientY;

    // Update the element's position
    activeElement.style.top = `${activeElement.offsetTop - deltaY}px`;
    activeElement.style.left = `${activeElement.offsetLeft - deltaX}px`;
  }

  function stopDrag(): void {
    // Remove event listeners when dragging stops
    document.removeEventListener("mousemove", dragElement);
    document.removeEventListener("mouseup", stopDrag);
  }

  const handleCreateSprite = () => {
    const updatedSprites = [...sprites, `sprite-${sprites.length + 1}`];
    dispatch(setSprites(updatedSprites));
  };

  return (
    <div className="flex-none w-full h-full">
      <div className="w-full flex items-center px-4 bg-violet-500 h-[50px] justify-between text-white">
        <span className="text-lg font-bold">Preview</span>
        <div>
          <label htmlFor="select-sprite" className="font-semibold">
            Active Sprite:
          </label>
          <select
            name="sprites"
            onChange={(e) => dispatch(setActiveSprite(e.target.value))}
            id="select-sprite"
            className="text-primary font-bold rounded-[10px] px-1 h-[30px] ml-2"
          >
            {sprites.map((sprite, index) => (
              <option value={sprite} key={sprite}>
                Sprite {index + 1}
              </option>
            ))}
          </select>
        </div>
        <button
          type="button"
          onClick={handleCreateSprite}
          className="bg-slate-200 active:scale-[0.98] text-primary font-semibold h-8 px-2 rounded-md"
        >
          Create Sprite
        </button>
      </div>
      <div className="relative h-full overflow-hidden">
        {sprites.map((sprite) => (
          <div
            className={
              "absolute transition-all duration-300 spriteDiv " + activeSprite
            }
            onMouseDown={(e) => startDrag(e, sprite)}
            id={sprite}
            key={sprite}
          >
            <CatSprite />
          </div>
        ))}
      </div>
    </div>
  );
}

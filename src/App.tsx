import Header from "./components/header";
import MidArea from "./components/mid-area";
import PreviewArea from "./components/preview-area";
import Sidebar from "./components/sidebar";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "./redux/store";
import { MotionVariantsType } from "./lib/constants";
import { setAnimations } from "./redux/global-slice";

export default function App() {
  const dispatch = useDispatch();
  const { animations } = useSelector((state: RootState) => state.global);

  // Update Lists of Animations
  const onDragEndAnimations = (result: DropResult) => {
    const { draggableId, destination, source } = result;
    if (destination === undefined || destination === null) return;
    console.log({ draggableId, destination, source });

    const element = result.draggableId.split("-")[0];

    // Clone the animations array to avoid direct mutations
    const updatedAnimations = JSON.parse(JSON.stringify(animations));

    // Find the index of the destination animation object
    const destIndex = updatedAnimations.findIndex(
      (animation: { id: string; comps: MotionVariantsType[] }) =>
        animation.id === destination.droppableId
    );

    if (destIndex > -1) {
      // Clone the destination comp list to avoid direct mutations
      const destCompList = [...updatedAnimations[destIndex].comps];

      // Insert the dragged component into the destination list
      destCompList.splice(
        destination.index,
        0,
        `${element as MotionVariantsType}`
      );

      // Update the destination animation's comps
      updatedAnimations[destIndex].comps = destCompList;
    }

    // Update your state or perform further operations with updatedAnimations
    dispatch(setAnimations(updatedAnimations));
    console.log({ updatedAnimations });
  };

  return (
    <DragDropContext
      onDragEnd={onDragEndAnimations}
      onBeforeCapture={(beforeCapture) => console.log(beforeCapture)}
      onDragStart={(dragStart) => console.log(dragStart)}
    >
      <Header />
      <div className="bg-blue-100 pt-6 font-sans h-[calc(100svh-50px)]">
        <div className="overflow-hidden h-full flex flex-row">
          <div className="flex-1 h-full overflow-hidden flex flex-row bg-white border-t border-r border-gray-200 rounded-tr-xl mr-2">
            <Sidebar /> <MidArea />
          </div>
          <div className="w-1/3 h-full overflow-hidden flex flex-row bg-white border-t border-l border-gray-200 rounded-tl-xl ml-2">
            <PreviewArea />
          </div>
        </div>
      </div>
    </DragDropContext>
  );
}

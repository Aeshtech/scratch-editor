import { Draggable, Droppable } from "react-beautiful-dnd";
import { motionVariants } from "../lib/constants";
import { getMotion } from "./get-motion";

export default function Sidebar() {
  return (
    <div className="w-60 flex-none h-full overflow-y-auto flex flex-col items-start border-r border-gray-200">
      <div className="w-full flex items-center px-4 bg-violet-500 h-[50px] justify-center text-white">
        <span className="text-lg font-bold">Motions</span>
      </div>
      <Droppable droppableId="sidebar-motion" type="MOTIONS">
        {(provided) => (
          <ul
            className="my-3 px-2"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {motionVariants.map((x, i) => {
              return (
                <Draggable
                  key={`${x}-draggable`}
                  draggableId={`${x}-draggable`}
                  index={i}
                >
                  {(provided) => (
                    <li
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="my-2"
                    >
                      {getMotion({ key: x, id: `${x}-sidebar` })}
                    </li>
                  )}
                </Draggable>
              );
            })}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </div>
  );
}

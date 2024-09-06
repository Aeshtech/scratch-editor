import GotoXY from "./motions/goto-xy";
import Move from "./motions/move";
import Repeat from "./motions/repeat";
import Turn from "./motions/turn";

export const getMotion = ({ key, id }: { key: string; id: string }) => {
  switch (key) {
    case "MOVE":
      return <Move motionId={id} />;

    case "TURN":
      return <Turn motionId={id} />;

    case "GOTO_XY":
      return <GotoXY motionId={id} />;

    case "REPEAT":
      return <Repeat motionId={id} />;

    default:
      return null;
  }
};

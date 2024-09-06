export const motionVariants = ["MOVE", "TURN", "GOTO_XY"] as const;
export type MotionVariantsType = (typeof motionVariants)[number];

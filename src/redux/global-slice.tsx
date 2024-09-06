import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { MotionVariantsType } from "../lib/constants";

export interface GlobalSliceType {
  activeSprite: string;
  animations: {
    id: string;
    comps: MotionVariantsType[];
  }[];
  sprites: string[];
}

const initialState: GlobalSliceType = {
  activeSprite: "sprite-0",
  animations: [
    {
      id: "animation-0",
      comps: ["MOVE"],
    },
  ],
  sprites: ["sprite-0"],
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setActiveSprite: (state, action: PayloadAction<string>) => {
      state.activeSprite = action.payload;
    },
    setAnimations: (
      state,
      action: PayloadAction<GlobalSliceType["animations"]>
    ) => {
      state.animations = action.payload;
    },
    setSprites: (state, action: PayloadAction<GlobalSliceType["sprites"]>) => {
      state.sprites = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setActiveSprite, setAnimations, setSprites } =
  globalSlice.actions;

export default globalSlice.reducer;

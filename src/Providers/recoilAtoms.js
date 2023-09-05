import { atom } from "recoil";
import { v1 } from "uuid";

export const clockState = atom({
  key: `clockState-${v1()}`,
  default: new Date(),
});

export const positionState = atom({
  key: `positionState-${v1()}`,
  default: { x: 0, y: 0 },
});

export const tooltipVisibilityState = atom({
  key: `tooltipVisibilityState-${v1()}`,
  default: false,
});
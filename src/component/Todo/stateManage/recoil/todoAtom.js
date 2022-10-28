import { atom } from "recoil";
export const todoAtom = atom({
  key: 'todo', 
  default: [], // default value (aka initial value)
});


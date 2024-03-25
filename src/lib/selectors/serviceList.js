import { selector } from "recoil";
import { serviceList } from "../atoms/serviceList";

export const getAllServices = selector({
  key: "serviceListState", // unique ID (with respect to other atoms/selectors)
  get: async ({ get }) => {
    const res = get(serviceList);
    return res || [];
  },
});

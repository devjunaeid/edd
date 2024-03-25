import { selector } from "recoil";
import { projectList } from "../atoms/projectList";

export const getAllProjects = selector({
  key: "projectCountState", // unique ID (with respect to other atoms/selectors)
  get: async ({ get }) => {
    const res = get(projectList);
    return res || [];
  },
});

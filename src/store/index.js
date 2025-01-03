import { createPinia } from "pinia";
import { userStore } from "./userStore";

const pinia = createPinia();
export default pinia;
export { userStore };

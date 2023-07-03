import { createStore } from "redux";
import rootred from "./Components/redux/reducer/Main";

const store = createStore(
    rootred
);

export default store;
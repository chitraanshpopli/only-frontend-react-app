import { createStore } from "redux";

import ChangeFilter from "./reducer";

export default function configureStore(initialState) {
    return createStore(ChangeFilter, initialState);
}
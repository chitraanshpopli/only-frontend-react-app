import Filter from "../resources/model/filter";
import Action from "./action";

export default function changeFilter(state = {filter: new Filter()}, action) {
    switch (action.type) {
        case Action.TYPES.CHANGE_KEYWORD: {
            const filter = state.filter;
            filter.set({"keyword": action});
            return { filter };
        }
        case Action.TYPES.CHANGE_SORT_BY: {
            const filter = state.filter;
            filter.set({"sortBy": action});
            return { filter };
        }
        default: {
            return state;
        }
    }
};
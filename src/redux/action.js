export default class Action {

    static get TYPES() {
        return {
            CHANGE_KEYWORD: "CHANGE_KEYWORD",
            CHANGE_SORT_BY: "CHANGE_SORT_BY",
        };
    };

    static changeKeyword(keyword){
        return {
            type: Action.TYPES.CHANGE_KEYWORD,
            payload: keyword
        };
    };

    static changeSortBy(sortBy){
        return {
            type: Action.TYPES.CHANGE_SORT_BY,
            payload: sortBy
        };
    };

}
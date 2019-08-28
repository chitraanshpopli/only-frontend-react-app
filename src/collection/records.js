import BaseCollection from './base_collection';


export default class Records extends BaseCollection {
    getPath() {
        return '';
    }

    parse(response) {
        return response.items;
    }
}

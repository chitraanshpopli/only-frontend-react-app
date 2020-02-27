import BaseCollection from './base_collection';


export default class Records extends BaseCollection {
    getPath() {
        return '';
    }

    parse(response) {
        if (response.data) {
            return response.data;
        }
        return response;
    }
}

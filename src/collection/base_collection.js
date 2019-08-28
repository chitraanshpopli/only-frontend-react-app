import Backbone from 'backbone';

export default class BaseCollection extends Backbone.Collection {
    constructor(options) {
        super(options);
        this.baseUrl = '';
    }

    url() {
        if (this.getPath) {
            return this.baseUrl + this.getPath();
        }
        return this.baseUrl;
    }
}

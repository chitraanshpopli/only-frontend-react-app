import Backbone from 'backbone';

export default class BaseModel extends Backbone.Model {
    constructor(attr, options) {
        super(attr, options);
        this.baseUrl = '';
    }


    urlRoot() {
        if (this.getPath) {
            return this.baseUrl + this.getPath();
        }
        return this.baseUrl;
    }
}

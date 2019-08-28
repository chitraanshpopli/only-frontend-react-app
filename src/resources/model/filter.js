import BaseModel from './base_model';

export default class Filter extends BaseModel {

    validate() {
        const errors = [];
        if (!this.get('keyword')) {
            errors.push("KEYWORD_REQUIRED");
        }
        return errors;
    }
}

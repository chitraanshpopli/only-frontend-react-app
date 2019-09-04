import React from 'react';
import Page from "./common/page";
import TableListing from "./common/table_listing";
import _ from "underscore";


export default class RenderData extends Page {
    constructor(props) {
        super(props);
        _.bindAll(this, 'renderButton');
    }

    renderButton(model) {
        const state = JSON.stringify({
            repositoryDataIndex: model,
            searchResults: this.props.searchResults,
            filter: this.props.filter,
        });
        return (
            <button
                className="btn-sm btn-primary no-outline"
                onClick={() => this.navigate('/info', state)}
            >More</button>
        );
    }

    render() {
        const headers = [
            'NAME',
            'SCORE',
            'FORKS',
            'ACTION'
        ];
        const attributes = [
            'name',
            'score',
            'forks',
            this.renderButton
        ];
        const styles = [
            'col-md-2',
            'col-md-2',
            'col-md-2',
            'col-md-2'
        ];
        return (
            <div className="col-md-8 offset-md-2 col-12 margin-top-2">
                <TableListing
                    columnHeaders={headers}
                    collection={this.props.searchResults}
                    attributes={attributes}
                    styles={styles}
                />
            </div>
        )
    }
}

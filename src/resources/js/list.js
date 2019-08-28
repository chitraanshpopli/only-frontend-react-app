import React from 'react';
import _ from 'underscore';
import RenderData from './render_data';
import RenderFilter from "./render_filter";
import Records from "../../collection/records";
import Filter from "../model/filter";
import Page from "./common/page";
import ErrorMessage from "./common/error_message";

export default class List extends Page{
    constructor(props){
        super(props);
        this.state={
            searchResults: new Records(),
            filter: new Filter({sortBy: {value:"score",label:"Score"}}),
            errorMessages: {}
        };
        if(this.props.location.state!==undefined){
            const data = JSON.parse(this.props.location.state);
            this.state={
                searchResults:new Records(data.searchResults),
                filter:new Filter(data.filter),
                errorMessages: {}
            }
        }
        _.bindAll(this, 'changeFilterParameters', 'search', 'changeSort');
    }

    search(){
        const records = new Records();
        records.fetch({
            url: 'https://api.github.com/search/repositories',
            type: 'GET',
            data: {q:this.state.filter.get('keyword')},
            success: () => {
                records.comparator = this.state.filter.get('sortBy')["value"];
                records.sort();
                this.setState({searchResults:records, errorMessages: {}});
            },
            error: () => {
                this.setState({errorMessages: {main: "SERVER_ERROR_TRY_LATER"}});
            }
        });
    }

    changeSort(sort){
        const searchResults = this.state.searchResults;
        searchResults.comparator = sort["value"];
        searchResults.sort();
        const filter = this.state.filter;
        filter.set({sortBy: sort});
        this.setState({searchResults, filter});
    }


    changeFilterParameters(key, value){
        const newFilter = this.state.filter;
        newFilter.set({[key]: value});
        this.setState({ filter: newFilter })
    }

    render(){
        return(
            <div className="margin-bottom-10">
                <ErrorMessage message={this.state.errorMessages.main}/>
                <center>
                    <h1 className="margin-top-2 primary-text">Github !</h1>
                </center>
                    <RenderFilter
                        searchClick={this.search}
                        {...this.state}
                        changeFilter={this.changeFilterParameters}
                        onSortChange={this.changeSort}
                        setError={this.setError}
                    />
                    <RenderData
                        {...this.state}
                        history={this.props.history}
                    />
                    <div id="loader" className="margin-top-3 loader" hidden />
            </div>
        )
    }
}
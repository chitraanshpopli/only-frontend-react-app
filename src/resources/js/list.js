import React from 'react';
import { connect } from "react-redux";
import _ from 'underscore';
import RenderData from './render_data';
import RenderFilter from "./render_filter";
import Records from "../../collection/records";
import Filter from "../model/filter";
import Page from "./common/page";
import ErrorMessage from "./common/error_message";
import Action from "../../redux/action";

class List extends Page{
    constructor(props){
        super(props);
        this.state={
            records: new Records(),
            filter: new Filter({sortBy: {value:"score",label:"Score"}}),
            errorMessages: {}
        };
        if(this.props.location.state!==undefined){
            const data = JSON.parse(this.props.location.state);
            this.state={
                records:new Records(data.records),
                filter:new Filter(data.filter),
                errorMessages: {}
            }
        }
        _.bindAll(this, 'search', 'onSortChange', 'onKeywordChange');
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
                this.setState({records:records, errorMessages: {}});
            },
            error: () => {
                this.setState({errorMessages: {main: "SERVER_ERROR_TRY_LATER"}});
            }
        });
    }

    onSortChange(sort){
        const records = this.state.records;
        records.comparator = sort["value"];
        records.sort();
        const filter = this.state.filter;
        filter.set({sortBy: sort});
        this.setState({records, filter});
    }

    //
    onKeywordChange(event){
        const r=this.props.updateKeyword(event.target.value);
        debugger;
        // const newFilter = this.state.filter;
        // newFilter.set({[key]: value});
        // this.setState({ filter: newFilter })
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
                        onKeywordChange={this.onKeywordChange}
                        onSortChange={this.onSortChange}
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

const mapStateToProps = state => ({
    filter: state.filter
});

const mapDispatchToProps = dispatch => ({
    updateKeyword: item => dispatch(Action.changeKeyword(item)),
    changeSortBy: id => dispatch(Action.changeSortBy(id))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(List);
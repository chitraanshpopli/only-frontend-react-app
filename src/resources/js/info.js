import React from 'react';
import _ from 'underscore';
import Record from "../model/record";
import Records from "../../collection/records";
import Filter from "../model/filter";
import Page from "./common/page";


export default class RepoInfo extends Page{
    constructor(props){
        super(props);
        const data = JSON.parse(this.props.location.state);
        this.state = {
            index:new Record(data.repositoryDataIndex),
            searchResults:new Records(data.searchResults),
            filter:new Filter(data.filter)
        };
        _.bindAll(this, 'createRow');
    }

    createRow(){
        let tableRow=[];
        let repository = this.state.index;
        let names = {
            name: 'Name',
            full_name: 'Full name',
            forks: 'Forks',
            language: 'Language',
            size: 'Size',
            score: 'Scores',
            open_issues: 'Open issues',
            watchers: 'Watchers'
        };
        Object.keys(names).forEach((property) => {
            tableRow.push(
                <tr key={property}>
                    <td className="bold-font">{names[property]}</td>
                    <td>{repository.get(property)}</td>
                </tr>
            )
        });
        return tableRow;
    }

    render(){
        let tableRow = this.createRow();
        return(
            <center>
                <h1>{this.state.index["name"]}</h1>
                <table className="margin-top-3">
                    <tbody>
                    {tableRow}
                    </tbody>
                </table>
                <button className="btn btn-primary margin-top-3" onClick={() => this.navigate('/', JSON.stringify(this.state))}>Back</button>
            </center>
        )
    }
}
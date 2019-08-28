import React from "react";
import _ from "underscore";
import { Translate } from 'react-i18nify';
import Page from "./page";

export default class TableListing extends Page {
    static get defaultProps() {
        return { actionHeaders: [], actions: [] };
    }

    getRowStyle(model) {
        if (typeof this.props.getRowStyle === "function") {
            return this.props.getRowStyle(model);
        }
        return "";
    }

    columnHeaders() {
        return (<tr key="column-header">
            {(() => {
                const columnHeaders = _.map(this.props.columnHeaders, (header, index) => {
                    let value = '';
                    if (header !== null && header !== undefined) {
                        value = (typeof header === 'function') ? header() : <Translate value={header} key={`th_value_${index}`} />;
                    }
                    return (<th
                        key={`th_${index}`}
                        className={this.props.headerStyle !== undefined ? this.props.headerStyle[index] : this.props.styles[index]}
                    >{value}</th>);
                });
                const actionHeaders = _.map(this.props.actionHeaders, actionHeader => actionHeader());
                return columnHeaders.concat(actionHeaders);
            })()}
        </tr>);
    }

    renderContent(model) {
        return _.map(model, (attribute, index) => (
            <tr key={`key_${index}`}>
                {
                    _.map(attribute, (columnValue, columnNumber) => (
                        <td key={`${columnNumber}`} className={this.props.styles[columnNumber]}>
                            {columnValue}
                        </td>
                    ))
                }
            </tr>
        ));
    }

    content() {
        let counter = 0;
        if (this.props.content) {
            return this.renderContent(this.props.attributes);
        }
        return this.props.collection.map(((model) => {
            counter += 1;
            return (<tr key={`key_${counter}`} className={this.getRowStyle(model)}>
                {(
                    () => {
                        const columns = _.map(this.props.attributes, (attribute, index) => {
                            const value = (typeof attribute === 'function') ? attribute(model) : model.get(attribute);
                            return (<td
                                data-title={this.props.columnHeaders[index]}
                                key={index}
                                className={this.props.styles[index]}
                            >
                                {(value) || <span>{'\u00A0'}</span>}
                            </td>);
                        });
                        const actions = _.map(this.props.actions, action => action(model));
                        return columns.concat(actions);
                    })()}
            </tr>);
        }));
    }

    render() {
        return (
            <div className="table-listing">
                <section>
                    <table className="table">
                        <thead className="column-headers">
                            {this.columnHeaders()}
                        </thead>
                        <tbody className="table-content">
                            {this.content()}
                        </tbody>
                    </table>
                </section>
            </div>
        );
    }
}

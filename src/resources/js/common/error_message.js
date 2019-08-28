import React from "react";
import {I18n} from "react-i18nify";

export default class ErrorMessage extends React.PureComponent {
    render() {
        if (!this.props.message) {
            return <div/>;
        }
        return (<div className="error-message margin-top-2">
            <div className="col-md-4 offset-md-4">
                <div className="panel panel-danger">
                    <div className="panel-body">
                        <center>
                            {I18n.t(this.props.message)}
                        </center>
                    </div>
                </div>
            </div>
        </div>);
    }
}

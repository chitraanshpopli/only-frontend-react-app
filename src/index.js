import React from 'react';
import ReactDOM from 'react-dom';
import { Provider as ReduxProvider } from "react-redux";
import './resources/scss/index.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App';
import App from './resources/js/router';
import * as serviceWorker from './serviceWorker';
import configureStore from "./redux/store";
import Records from "./collection/records";
import Filter from "./resources/model/filter";

const reduxStore = configureStore({
    records: new Records(),
    filter: new Filter({sortBy: {value:"score",label:"Score"}}),
    errorMessages: {}
});

ReactDOM.render(
    <ReduxProvider store={reduxStore}>
        <App/>
    </ReduxProvider>,
    document.getElementById('root')
);

serviceWorker.unregister();

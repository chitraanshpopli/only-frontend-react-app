import React from 'react';
import _ from 'underscore';

export default class Page extends React.Component{

    constructor(props) {
        super(props);
        _.bindAll(this, 'setError', 'navigate');
    }

    setError(message) {
        this.setState({errorMessages: message})
    }

    getFirstMessage(message) {
        return message[0];
    }

    navigate(url, state = {}) {
        this.props.history.push(url, state);
    }
}
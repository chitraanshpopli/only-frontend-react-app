import React from 'react';
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom';
import Error from './common/error404';
import List from './list';
import Info from './info';

const App = () => {
    return (
        <Router>
            <div>
                <Switch>
                    <Route exact path="/" component={List} />
                    <Route exact path="/info" component={Info} />
                    <Route path="/*" component={Error} />
                </Switch>
            </div>
        </Router>
    );
};

export default App;
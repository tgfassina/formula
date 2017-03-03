import React from 'react';
import { Router, Route, browserHistory } from 'react-router';

import Edit from './edit.js';
import Eval from './eval.js';

class App extends React.Component {
    render() {
        return (
            <Router history={browserHistory}>
                <Route path="/" component={Edit} />
                <Route path="/edit" component={Edit} />
                <Route path="/eval" component={Eval} />
            </Router>
        );
    }
}

export default App;

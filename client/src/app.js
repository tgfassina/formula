import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import Layout from './layout.js';
import Edit from './edit.js';
import Eval from './eval.js';

class App extends React.Component {
    render() {
        return (
            <Router history={browserHistory}>
                <Route path="/" component={Layout}>
                    <IndexRoute component={Edit} />
                    <Route path="/edit" component={Edit} />
                    <Route path="/eval" component={Eval} />
                </Route>
            </Router>
        );
    }
}

export default App;

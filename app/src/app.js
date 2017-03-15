import React from 'react'
import {Router, Route, IndexRoute, hashHistory} from 'react-router'

import Layout from './layout.js'
import Edit from './edit.js'
import Eval from './eval.js'
import NotFound from './not-found.js'

class App extends React.Component {
    render() {
        return (
            <Router history={hashHistory}>
                <Route path="/" component={Layout}>
                    <IndexRoute component={Edit} />
                    <Route path="/eval/:key" component={Eval} />
                    <Route path='*' component={NotFound} />
                </Route>
            </Router>
        )
    }
}

export default App

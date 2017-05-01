import React from 'react'
import {Router, Route, IndexRoute, hashHistory} from 'react-router'

import Layout from './pages/layout'
import Edit from './pages/edit'
import Eval from './pages/eval'
import NotFound from './pages/not-found'

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

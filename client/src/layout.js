import React from 'react'

import './vendor/index.js'
import './styles/custom.css'
import './styles/formula.css'

const Layout = ({children}) => (
    <div className="row justify-content-center">
        <div className="col-sm-12 col-md-6 col-lg-5 col-xl-4">
            {children}
        </div>
    </div>
)

export default Layout

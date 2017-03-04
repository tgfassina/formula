import React from 'react'

import AppSection from './parts/app-section.js'

class Share extends React.Component {
    clickHandler() {
        this.props.onSave()
    }

    render() {
        return (
            <AppSection>
                <h1>Share</h1>
                <div className="row justify-content-center">
                    <div className="col-10">
                        <div className="input-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Name"
                            />
                            <span className="input-group-btn">
                                <button
                                    className="btn btn-primary"
                                    onClick={this.clickHandler.bind(this)}
                                >
                                    Save
                                </button>
                            </span>
                        </div>
                    </div>
                </div>
            </AppSection>
        )
    }
}

export default Share

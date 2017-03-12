import React from 'react'

import AppSection from './parts/app-section.js'

const UrlLink = ({url}) => (
    <a href={url} target="_blank">
        <i className="fa fa-external-link"></i>
    </a>
)

const UrlDisplay = ({url}) => (
    <code className="data-display url-display">
        <div className="row no-gutters">
            <div className="col-11 text-scroll">
                <small>{url}</small>
            </div>
            <div className="col-1 text-right">
                <UrlLink url={url} />
            </div>
        </div>
    </code>
)

class Saver extends React.Component {
    clickHandler() {
        this.props.onSave()
    }

    changeHandler(event) {
        this.props.onUpdate(event.target.value)
    }

    render() {
        return (
            <div className="input-group">
                <input
                    type="text"
                    className="form-control"
                    onChange={this.changeHandler.bind(this)}
                    placeholder="Name"
                />
                <span className="input-group-btn">
                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={this.clickHandler.bind(this)}
                    >
                        Save
                    </button>
                </span>
            </div>
        )
    }
}

class Share extends React.Component {
    getShareUrl() {
        if (this.props.sharedId) {
            return [window.location.origin, '/#/eval/', this.props.sharedId].join('')
        }
    }

    render() {
        return (
            <AppSection>
                <h1>Share</h1>
                <div className="row justify-content-center">
                    <div className="col-10">
                        <Saver
                            onUpdate={this.props.onUpdate}
                            onSave={this.props.onSave}
                        />
                        {this.props.sharedId ?
                            <UrlDisplay url={this.getShareUrl()} />
                        : null}
                    </div>
                </div>
            </AppSection>
        )
    }
}

export default Share

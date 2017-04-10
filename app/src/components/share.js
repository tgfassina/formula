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

const Saver = ({
  onSave,
  onUpdate,
  saving,
}) => (
    <div className="input-group">
        <input
            type="text"
            className="form-control"
            onChange={(event) => onUpdate(event.currentTarget.value)}
            placeholder="Name"
        />
        <span className="input-group-btn">
            <button
                className="btn btn-primary cursor-pointer"
                onClick={(event) => onSave()}
                disabled={saving}
            >
                Save
            </button>
        </span>
    </div>
)

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
                            saving={this.props.saving}
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

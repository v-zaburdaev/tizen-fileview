import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class FileItem extends Component {
    static propTypes = {
        value: PropTypes.object.isRequired,
        idx: PropTypes.number.isRequired,
        selected: PropTypes.number.isRequired,
    }

    render() {
        let file = this.props.value;
        let selected = (this.props.idx===this.props.selected?"selected":"");
        return (
            <div className={(file.isFile?"file":"")+" "+(file.isDirectory?"directory":"")+" "+selected}>
                {/* {file.fullPath} */}
                {file.name}
            </div>
        )
    }
}

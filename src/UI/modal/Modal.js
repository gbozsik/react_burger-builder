import React, { Component } from 'react'

import classes from './Modal.css'
import Aux from '../../hoc/Aux'
import BackDrop from '../backDrop/BackDrop'

class Modal extends Component {
    // This should be a functional component, doesn`t have to be a class
    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.show !== this.props.show
    }

    componentDidUpdate() {
        console.log('[Modal] componentUpdate')
    }

    render() {
        return (
            < Aux >
                <BackDrop clicked={this.props.closeBackDrop} show={this.props.show} />
                <div className={classes.Modal}
                    style={{
                        transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: this.props.show ? '1' : '0'
                    }}>
                    {this.props.children}
                </div>
            </Aux >
        )
    }
}

export default Modal;
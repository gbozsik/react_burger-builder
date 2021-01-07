import React, { Component } from 'react'

import Modlal from '../../UI/modal/Modal'
import Aux from '../Aux'

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {

        state = {
            error: null
        }

        // componentDidMount () { //this would run after render(), so in case of any error during rendering, would not be caught
        constructor(props) {
            super(props)
            this.requestInterceptor = axios.interceptors.request.use(req => {
                this.setState({ error: null })
                return req
            })

            this.responseInterceptor = axios.interceptors.response.use(res => res, error => {
                console.log('ERROR: ', error)
                this.setState({ error: error })
            })
        }

        componentWillUnmount() {
            axios.interceptors.request.eject(this.requestInterceptor)
            axios.interceptors.response.eject(this.responseInterceptor)
        }

        errorConfirmedHandler = () => {
            this.setState({ error: null })
        }

        render() {
            return (
                <Aux>
                    <Modlal show={this.state.error} closeBackDrop={this.errorConfirmedHandler}>
                        {this.state.error ? this.state.error.message : null}
                    </Modlal>
                    <WrappedComponent {...this.props} />
                </Aux>
            )
        }
    }
}

export default withErrorHandler
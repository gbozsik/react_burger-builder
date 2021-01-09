import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import Input from '../../UI/input/Input'
import Button from '../../UI/button/Button'
import classes from './Auth.css'
import * as actionCreator from '../../store/actions/index'
import Spinner from '../../UI/spinner/Spinner'

class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Mail address'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        },
        formIsValid: false,
        isSignup: false
    }

    inputChangedHandler = (event, controlName) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true
            }
        }
        this.setState({ controls: updatedControls })

        let formIsValid = true
        for (let key in updatedControls) {
            if (!updatedControls[key].valid) {
                formIsValid = false
            }
        }
        this.setState({ formIsValid: formIsValid })
    }

    checkValidity(value, rules) {
        let isValid = true;
        if (!rules) {
            return true;
        }

        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }

        return isValid;
    }

    submitHandler = (event) => {
        event.preventDefault()      //withour this, each input change will triger onAuth
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup)
    }

    switchAuthModeHandler = (event) => {
        this.setState(prevState => {
            return {isSignup: !prevState.isSignup}
        })
    }

    render() {
        const formElementsArray = []
        for (const key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            })
        }
        
        let form = (
            <form
            onSubmit={this.submitHandler}
            className={classes.ContactData}>
                {formElementsArray.map(formElelment => (
                    <Input
                        key={formElelment.id}
                        elementType={formElelment.config.elemnetType}
                        elementConfig={formElelment.config.elementConfig}
                        value={formElelment.value}
                        invalid={!formElelment.config.valid}
                        shouldValidate={formElelment.config.validation}
                        touched={formElelment.config.touched}
                        changed={(event) => this.inputChangedHandler(event, formElelment.id)} />)
                        )}
                <Button btnType='Success' disabled={!this.state.formIsValid}>{this.state.isSignup ? 'SIGNUP' : 'SIGNIN'}</Button>
            </form>)

        if (this.props.loading) {
            form = <Spinner/>
        }

        let errorMessage = null

        if (this.props.error) {
            errorMessage = (
                <p>{this.props.error.message}</p>
            )
        }

        let redirect = null
        if (this.props.isAuthenticated){
            redirect = <Redirect to='/'/>
        }

        return (
            <div className={classes.Auth}>
                {redirect}
                {errorMessage}
                {form}
                <Button
                clicked={this.switchAuthModeHandler}
                btnType='Danger'>SWITCH TO {this.state.isSignup ? 'SIGNIN' : 'SIGNUP'}</Button>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        loading: state.authReducer.loading,
        error: state.authReducer.error,
        isAuthenticated: state.authReducer.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, url) => dispatch(actionCreator.auth(email, password, url))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth)
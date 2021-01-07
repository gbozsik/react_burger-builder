import React, { Component } from 'react'
import Input from '../../UI/input/Input'
import Button from '../../UI/button/Button'

class Auth extends Component {
    state = {
        control: {
            email: {
                elemnetType: 'input',
                elementConfig: {
                    typte: 'email',
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
                elemnetType: 'input',
                elementConfig: {
                    typte: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            },
        }
    }

    render() {
        return (
            <div>
                <form>

                </form>
            </div>
        )
    }
}
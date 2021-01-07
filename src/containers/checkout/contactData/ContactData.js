import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from '../../../axios-orders'
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler'

import Button from '../../../UI/button/Button'
import classes from './ContactData.css'
import Spinner from '../../../UI/spinner/Spinner'
import Input from '../../../UI/input/Input'
import * as orderActionCreator from '../../../store/actions/index'

class ContactData extends Component {

    state = {
        orderForm: {
            name: {
                elemnetType: 'input',
                elementConfig: {
                    typte: 'text',
                    placeholder: 'Your name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                elemnetType: 'input',
                elementConfig: {
                    typte: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zipCode: {
                elemnetType: 'input',
                elementConfig: {
                    typte: 'text',
                    placeholder: 'ZIP Code'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5
                },
                valid: false,
                touched: false
            },
            contry: {
                elemnetType: 'input',
                elementConfig: {
                    typte: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elemnetType: 'input',
                elementConfig: {
                    typte: 'email',
                    placeholder: 'Your E-Mail'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elemnetType: 'select',
                elementConfig: {
                    options: [{ value: 'fastest', displayValue: 'Fastest' },
                    { value: 'cheapest', displayValue: 'Cheapest' }]
                },
                value: 'fastest',
                validation: {},
                valid: true
            },
        },
        formIsValid: false
    }

    orderHandler = (event) => {
        event.preventDefault()
    
        const formData = {}
        for (let formIdentifierElement in this.state.orderForm) {
            formData[formIdentifierElement] = this.state.orderForm[formIdentifierElement].value
        }

        const order = {
            ingredients: this.props.ingred,
            price: this.props.totalPr,
            oderData: formData
        }
        this.props.onSendOrder(order)
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

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedOrderForm = {          // not cloning the inner objects (name, street...)
            ...this.state.orderForm
        }
        const updatedFormElement = {        // clone the inner object
            ...updatedOrderForm[inputIdentifier]
        }
        updatedFormElement.value = event.target.value
        updatedFormElement.touched = true

        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation)

        updatedOrderForm[inputIdentifier] = updatedFormElement

        let formIsValid = true
        for (let inputIdentifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid
        }
        this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid })
    }

    render() {
        const formElementsArray = []
        for (const key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }

        let form = (
            <form
                onSubmit={this.orderHandler}
                className={classes.ContactData}>
                <h4>Enter your Contact data</h4>
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
                <Button btnType='Success' disabled={!this.state.formIsValid}>ORDER</Button>
            </form>
        )
        if (this.props.loading) {
            form = (<Spinner />)
        }

        return (
            <div>
                { form }
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        ingred: state.bbReducer.ingredients,
        totalPr: state.bbReducer.totalPrice,
        loading: state.oReducer.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSendOrder: (order) => dispatch(orderActionCreator.sendOrder(order))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios))
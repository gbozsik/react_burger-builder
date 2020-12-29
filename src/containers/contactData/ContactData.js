import React, { Component } from 'react'
import axios from '../../axios-orders'

import Button from '../../UI/button/Button'
import classes from './ContactData.css'
import Spinner from '../../UI/spinner/Spinner'
import Input from '../../UI/input/Input'
import { elementType } from 'prop-types'

class ContactData extends Component {

    state = {
        orderForm: {
            name: {
                elemnetType: 'input',
                elementConfig: {
                    typte: 'text',
                    placeholder: 'Your name'
                },
                value: ''
            },
            street: {
                elemnetType: 'input',
                elementConfig: {
                    typte: 'text',
                    placeholder: 'Street'
                },
                value: ''
            },
            zipCode: {
                elemnetType: 'input',
                elementConfig: {
                    typte: 'text',
                    placeholder: 'ZIP Code'
                },
                value: ''
            },
            contry: {
                elemnetType: 'input',
                elementConfig: {
                    typte: 'text',
                    placeholder: 'Country'
                },
                value: ''
            },
            email: {
                elemnetType: 'input',
                elementConfig: {
                    typte: 'email',
                    placeholder: 'Your E-Mail'
                },
                value: ''
            },
            deliveryMethod: {
                elemnetType: 'select',
                elementConfig: {
                    options: [{ value: 'fastest', displayValue: 'Fastest' },
                    { value: 'cheapest', displayValue: 'Cheapest' }]
                },
                value: ''
            },
        }
    }

    orderHandler = (event) => {
        event.preventDefault()
        // console.log('totalPrice in ContactData: ', this.props.totalPrice)
        this.setState({ loading: true })
        const formData = {}
        for(let formIdentifierElement in this.state.orderForm) {
            formData[formIdentifierElement] = this.state.orderForm[formIdentifierElement].value
        }
        console.log('formdata in orderHandler: ', formData)
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            oderData: formData

        }
        axios.post('/orders.json', order).then(response => {
            console.log(response)
            this.setState({ loading: false })
            this.props.history.push('/')
        }).catch(error => {
            console.log(error)
            this.setState({ loading: false })
        })
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedOrderForm = {          // not cloning the inner objects (name, street...)
            ...this.state.orderForm
        }
        const updatedFormElement = {        // clone the inner object
            ...updatedOrderForm[inputIdentifier]
        }
        updatedFormElement.value = event.target.value
        updatedOrderForm[inputIdentifier] = updatedFormElement
        this.setState({orderForm: updatedOrderForm})
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
                        changed={(event) => this.inputChangedHandler(event, formElelment.id)} />)
                )}
                <Button btnType='Success'>ORDER</Button>
            </form>
        )
        if (this.state.loading) {
            form = (<Spinner />)
        }

        return (
            <div>
                { form}
            </div>
        )
    }
}

export default ContactData
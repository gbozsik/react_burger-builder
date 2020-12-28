import React, { Component } from 'react'
import axios from '../../axios-orders'

import Button from '../../UI/button/Button'
import classes from './ContactData.css'
import Spinner from '../../UI/spinner/Spinner'

class ContactData extends Component {

    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postal: ''
        }
    }

    orderHandler = (event) => {
        event.preventDefault()
        console.log('totalPrice in ContactData: ', this.props.totalPrice)
        this.setState({ loading: true })
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            customer: {
                name: 'Max',
                addres: {
                    street: 'street 1',
                    zipCode: '235',
                    contry: 'Germany'
                },
                email: 'email'
            },
            deliveryMethod: 'fastest'
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

    render() {
        let form = (
            <div className={classes.ContactData}>
                <h4>Enter your Contact data</h4>
                <input className={classes.Input} type='text' name='name' placeholder='Your name'></input>
                <input className={classes.Input} type='email' name='email' placeholder='Your email'></input>
                <input className={classes.Input} type='text' name='street' placeholder='Street'></input>
                <input className={classes.Input} type='text' name='postal' placeholder='Postal'></input>
                <Button btnType='Success' clicked={this.orderHandler}>ORDER</Button>
            </div>
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
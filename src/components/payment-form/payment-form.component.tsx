// In order to add stripe, you need to add the element + hooks to get the api request and all running
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { FormEvent, useState } from "react";
import Button from '../button/button.component'
import { BUTTON_TYPE_CLASSES } from "../button/button.component";
import { PaymentFormContainer, FormContainer } from "./payment-form.styles";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/user/user.selector";
import { selectCartTotal } from "../../store/cart/cart.selector";
import { StripeCardElement } from "@stripe/stripe-js";
const PaymentForm = () => {
    //We need to make an API request for the payment handler
    const stripe = useStripe();
    const elements = useElements();
    const amount = useSelector(selectCartTotal);
    const currentUser = useSelector(selectCurrentUser);
    const ifValidCardElement = (card: StripeCardElement | null): card is StripeCardElement => card!== null;
    const paymentHandler  = async(e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        //make sure the two hooks are loaded:
        if (!stripe || !elements){
            return;
        }
        
        //Testing: 
        //pass in RELATIVE route
        const response = await fetch('/.netlify/functions/create-payment-intent',{
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({amount:10000})
        }).then((res)=> {return res.json();});
        const {paymentIntent: {client_secret}} = response;
        console.log(response);
        const cardData = elements.getElement(CardElement);
        //cardData === null
        if(!ifValidCardElement(cardData)) return;
        //confirm card payment is a function from stripe that lets us pay via cards
        const payementResult = await stripe.confirmCardPayment(client_secret, {
            payment_method: {
                //card cannot be nul
                
            card: cardData,            
            billing_details:{
                name: currentUser? currentUser.displayName: 'Guest',
            },
        },
    });
     

    if(payementResult.error){
        alert(payementResult.error);
    }

    else{
        if(payementResult.paymentIntent.status === 'succeeded')
        {
            alert('Payment Successful');
        }
    }
};

    return(
        <PaymentFormContainer>
            {/* Add in the handler to the button */}
            <FormContainer onSubmit={paymentHandler}>
                <h2>Credit Card Payment: </h2>
            <CardElement />
            <Button buttonType = {BUTTON_TYPE_CLASSES.inverted} > Pay Now </Button>
            </FormContainer>
        </PaymentFormContainer>
    );
};

export default PaymentForm;
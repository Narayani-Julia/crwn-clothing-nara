//js equivalent for import
require("dotenv").config();
///this is our stripe. passing stripe our secret variable
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
//this function is the export of this file
//exports.handler === export
exports.handler = async(event) => {
   //will recieve an event request and do something with the event
   try{
    //three things for payment method:
    //currency, payment method, amount
    const{amount} = JSON.parse(event.body);
    const paymentIntent = await stripe.paymentIntents.create({
        amount, 
        currency: "usd",
        payment_method_types: ["card"],
    });
    return {
        statusCode:200,
        body: JSON.stringify({paymentIntent  
        }),
    };
   } 
   catch(error){
    console.log({error});
    return{
        statusCode: 400,
        body: JSON.stringify({error}),
    };
   }
};


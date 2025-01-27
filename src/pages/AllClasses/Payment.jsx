import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import CheckOutForm from './CheckOutForm';
import { useLocation } from 'react-router-dom';


const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_PK)

const Payment = () => {
    const location = useLocation();
    // const { price } = location.state || { price: 0 };
    const { classDetails } = location.state;
    return (
        <div className='max-w-3xl h-screen flex flex-col justify-center mx-auto px-5'>
            <Elements stripe={stripePromise}>
                <CheckOutForm
                classDetails={classDetails}
                // _id ={_id}
                >
                </CheckOutForm>
            </Elements>
        </div>
    );
};

export default Payment;
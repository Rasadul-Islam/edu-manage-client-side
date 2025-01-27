import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import Swal from 'sweetalert2';

const CheckOutForm = ({classDetails }) => {
    const { user } = useAuth();
    const [error, setError] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const { _id, title, name, image, description, price, enrollmentCount } = classDetails;

    useEffect(() => {
        axiosSecure.post('/create-payment-intent', { price })
            .then(res => {
                console.log(res.data.clientSecret);
                setClientSecret(res.data.clientSecret);
            })

    }, [axiosSecure, price])



    const handleSubmit = async event => {
        event.preventDefault();
        if (!stripe || !elements) {
            return;
        }
        setLoading(true);
        const card = elements.getElement(CardElement)
        if (card === null) {
            return;
        }
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })
        if (error) {
            // console.log('Payment Error', error);
            setError(error.message);

        } else {
            // console.log('Payment Method', paymentMethod);
            setError('');
        }
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user.email || 'anonymous',
                    name: user.displayName || 'anonymous',
                }
            }
        });

        if (confirmError) {
            setError(confirmError.message);
            setLoading(false);
            return;
        } else {
            console.log('payment intent', paymentIntent);
            if (paymentIntent.status === "succeeded") {
                // console.log(paymentIntent.id);
                const payment = {
                    title:title,
                    classCreator:name,
                    classId:_id,
                    image:image,
                    studentEmail: user.email,
                    price: price,
                    date: new Date(),
                    transactionId: paymentIntent.id,
                }
                const res = await axiosSecure.post('/payments', payment)
                // console.log("payment save", res.data.insertedId);
                if(res.data.insertedId){
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Your payment has been completed",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            }
        }

        // Redirect to enrolled classes page
        navigate('/dashboard/myEnrollClass');

    }
    return (
        <form onSubmit={handleSubmit} className="border-2 border-teal-400 rounded-lg shadow-lg p-5">
            <h1 className="font-semibold mb-5">Payment: ${price}</h1>
            <CardElement className="border-2 p-2 mb-5 rounded-lg" />
            {error && <p className="text-red-500">{error}</p>}
            <button
                className="px-4 py-2 rounded-lg bg-teal-500 text-white hover:bg-teal-600"
                type="submit"
                disabled={!stripe || !clientSecret || loading}
            >
                {loading ? 'Processing...' : 'Pay'}
            </button>
        </form>
    );
};

export default CheckOutForm;
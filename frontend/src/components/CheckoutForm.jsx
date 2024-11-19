import React from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const CheckoutForm = ({ cart }) => {
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const cardElement = elements.getElement(CardElement);


        const { error, paymentIntent } = await stripe.confirmCardPayment('TU_CLIENT_SECRET', {
            payment_method: {
                card: cardElement,
            },
        });

        if (error) {
            console.log('[error]', error);
            alert('Error en el pago: ' + error.message);
        } else {
            // Aquí maneja el pago exitoso
            if (paymentIntent.status === 'succeeded') {
                console.log('¡Pago exitoso!', paymentIntent);
                alert('Pago realizado con éxito.');

            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <CardElement />
            <button type="submit" disabled={!stripe}>
                Pagar
            </button>
        </form>
    );
};

export default CheckoutForm;
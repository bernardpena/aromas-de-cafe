import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import Modal from './Modal'; 

const CheckoutForm = ({ cart }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [isModalOpen, setModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState({ title: '', text: '' });

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
            setModalMessage({ title: 'Error en el pago', text: error.message });
            setModalOpen(true);
        } else {
            if (paymentIntent.status === 'succeeded') {
                console.log('¡Pago exitoso!', paymentIntent);
                setModalMessage({ title: 'Pago exitoso', text: 'Tu pago se ha realizado con éxito.' });
                setModalOpen(true); 
            }
        }
    };

    const closeModal = () => {
        setModalOpen(false); 
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <CardElement />
                <button type="submit" disabled={!stripe}>
                    Pagar
                </button>
            </form>
            <Modal isOpen={isModalOpen} onClose={closeModal} message={modalMessage} />
        </div>
    );
};

export default CheckoutForm;
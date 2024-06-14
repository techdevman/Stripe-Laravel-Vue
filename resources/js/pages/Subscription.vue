<script setup>
import { ref, onMounted } from 'vue';
import { loadStripe } from '@stripe/stripe-js';

let stripe = ref(null); // Declare stripe as a reactive property
let cardElement = ref(null);

onMounted(async () => {
    stripe.value = await initializeStripe(); // Assign the initialized stripe value

    const elements = stripe.value.elements(); // Get the Stripe elements instance

    // Create the card element and mount it to the DOM
    const card = elements.create('card', {
        classes: {
            base: 'bg-gray-100 rounded border border-gray-300 focus:border-indigo-500 text-base outline-none text-gray-700 p-3 leading-8 transition-colors duration-200 ease-in-out'
        }
    });
    card.mount('#card-element');

    cardElement.value = card; // Store the card element reference in the reactive property
});


const initializeStripe = async () => {
    const stripe = await loadStripe('pk_test_51OOGV1Ak2XOBTyuArm5xjQs66xQBYoAurPPkysEdTAOwGj3pdwXiSy5ggbwDJG5bxAJU0tbV6194uQ0ne4YITSv900MWfjAVuv');
    return stripe;
}
</script>

<template>
    <form @submit.prevent="subscribe">
        <label>
            Card Number
            <div id="card-element" ref="cardElement"></div>
        </label>

        <button type="submit">Subscribe</button>
    </form>
</template>
  
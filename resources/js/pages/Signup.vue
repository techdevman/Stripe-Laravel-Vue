<script setup>
import { ref, onMounted } from 'vue';
import { validEmail, apiClient } from '../services.js'
import { useRouter } from 'vue-router';
import { loadStripe } from '@stripe/stripe-js';

const router = useRouter();
const name = ref('');
const email = ref('');
const password = ref('');
const passwordConfirm = ref('');
const policy = ref(false);
const errors = ref({});
const stripe = ref(null); // Declare stripe as a reactive property
const cardElement = ref(null);

onMounted(async () => {
    stripe.value = await initializeStripe(); // Assign the initialized stripe value

    const elements = stripe.value.elements(); // Get the Stripe elements instance

    // Create the card element and mount it to the DOM
    const card = elements.create('card', {
        classes: {
            base: 'bg-white rounded border border-gray-300 focus:border-indigo-500 text-base outline-none text-gray-700 p-3 leading-8 transition-colors duration-200 ease-in-out'
        }
    });
    card.mount('#card-element');

    cardElement.value = card; // Store the card element reference in the reactive property
});

const initializeStripe = async () => {
    const stripe = await loadStripe('pk_test_51OOGV1Ak2XOBTyuArm5xjQs66xQBYoAurPPkysEdTAOwGj3pdwXiSy5ggbwDJG5bxAJU0tbV6194uQ0ne4YITSv900MWfjAVuv');
    return stripe;
}

const register = async () => {  
    errors.value = {};

    if(!name.value) errors.value.name = "Name required.";
    if (!email.value) {
        errors.value.email = 'Email is required.';
    } else if (!validEmail(email.value)) {
        errors.value.email = 'Email must be valid.';
    }
    if (password.value.length < 8) {
        errors.value.password = "Password should be 8 characters or more.";
    } else if (password.value != passwordConfirm.value) {
        errors.value.password = "Password should be confirmed.";
    }
    if (!policy.value) {
        errors.value.policy = "You must agree to the privacy policy.";
    }

    if (Object.keys(errors.value).length === 0) {
        const payload = {
            name: name.value,
            email: email.value,
            password: password.value,
        };
        // console.log(payload)
        try {
            await apiClient.post('/register', payload);
            router.push('/signin');
        } catch (error) {
            console.log(error)
        }
    }
};
</script>

<template>
    <div class="relative w-full h-full py-16 min-h-screen">
        <div class="flex content-center items-center justify-center h-full">
            <div class="w-full lg:w-5/12 px-4">
                <div
                    class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-200 border-0"
                >
                    <div class="rounded-t mb-0 px-6 py-6">
                        <div class="text-center mb-3">
                            <h6 class="text-gray-800 text-lg font-bold">
                                Sign up with
                            </h6>
                        </div>
                        
                        <hr class="mt-6 border-b-1 border-gray-300" />
                    </div>
                    <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
                        <form>
                            <div class="relative w-full mb-3">
                                <label
                                    class="block uppercase text-gray-700 text-xs font-bold mb-2"
                                >
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    v-model="name"
                                    class="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow w-full ease-linear transition-all duration-150"
                                    placeholder="Name"
                                />
                                <span class="error" v-if="errors.name">{{ errors.name }}</span>
                            </div>
            
                            <div class="relative w-full mb-3">
                                <label
                                    class="block uppercase text-gray-700 text-xs font-bold mb-2"
                                >
                                    Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    v-model="email"
                                    class="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow w-full ease-linear transition-all duration-150"
                                    placeholder="Email"
                                />
                                <span class="error" v-if="errors.email">{{ errors.email }}</span>
                            </div>
            
                            <div class="relative w-full mb-3">
                                <label
                                    class="block uppercase text-gray-700 text-xs font-bold mb-2"
                                    htmlFor="grid-password"
                                >
                                    Password
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    v-model="password"
                                    class="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow w-full ease-linear transition-all duration-150"
                                    placeholder="Password"
                                />
                                <span class="error" v-if="errors.password">{{ errors.password }}</span>
                            </div>
                            
                            <div class="relative w-full mb-3">
                                <label
                                    class="block uppercase text-gray-700 text-xs font-bold mb-2"
                                    htmlFor="grid-password"
                                >
                                    Confirm Password
                                </label>
                                <input
                                    type="password"
                                    name="password-confirm"
                                    v-model="passwordConfirm"
                                    class="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow w-full ease-linear transition-all duration-150"
                                    placeholder="Confirm Password"
                                />
                            </div>

                            <div class="relative w-full mb-3">
                                <label
                                    class="block uppercase text-gray-700 text-xs font-bold mb-2"
                                >
                                    Card Number
                                </label>
                                <div id="card-element" ref="cardElement"></div>
                            </div>
            
                            <div class="grid">
                                <label class="inline-flex items-center cursor-pointer">
                                    <input
                                        id="customCheckLogin"
                                        type="checkbox"
                                        v-model="policy"
                                        class="form-checkbox border-0 rounded text-gray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                                    />
                                    <span class="ml-2 text-sm font-semibold text-gray-700">
                                        I agree with the
                                        <span class="text-emerald-500">
                                            Privacy Policy
                                        </span>
                                    </span>
                                </label>
                                <span class="error" v-if="errors.policy">{{ errors.policy }}</span>
                            </div>
            
                            <div class="text-center mt-6">
                                <button
                                    class="bg-gray-800 text-white active:bg-gray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                                    type="button"
                                    @click="register"
                                >
                                    Subscribe for $10 / month
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                <div class="flex flex-wrap mt-6 relative">
                    <div class="w-full text-right">
                        <router-link to="/signin" class="text-gray-700">
                            <small>Already registered?</small>
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
span.error {
    color: red;
    font-size: 12px;
}
</style>
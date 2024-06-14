<script setup>
import { ref } from 'vue';
import { useNotification } from "@kyvg/vue3-notification";
import { validEmail, apiClient } from '../services.js'

import Navbar from '../components/Navbar.vue';
import Footer from '../components/Footer.vue';

const { notify }  = useNotification();
const name = ref('');
const email = ref('');
const message = ref('');
const errors = ref({});

const contact = async () => {
    errors.value = {};

    if(!name.value) errors.value.name = "Name required.";
    if (!email.value) {
        errors.value.email = 'Email is required.';
    } else if (!validEmail(email.value)) {
        errors.value.email = 'Email must be valid.';
    }
    if(!message.value) errors.value.message = "Message required.";

    if (Object.keys(errors.value).length === 0) {
        const payload = {
            name: name.value,
            email: email.value,
            message: message.value,
        };
        // console.log(payload)
        apiClient.post('/contact', payload)
        .then((response) => {
            // console.log("response", response.data)
            notify({
                type: "success",
                text: response.data.message,
            });
        })
        .catch((error) => {
            // console.log("error", error.response.data.message)
            errors.value.response = error.response.data.message;
        });
    }
};
</script>

<template>
    <div>
        <notifications position="top right" />
        <Navbar />
        <div class="container pt-24 mx-auto">
            <div class="flex flex-wrap justify-center">
                <div class="w-full lg:w-6/12 px-4">
                    <div
                        class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-200"
                    >
                        <div class="flex-auto p-5 lg:p-10">
                            <h4 class="text-2xl font-semibold">
                                Want to contact us?
                            </h4>
                            <p class="leading-relaxed mt-1 mb-4 text-gray-500">
                                Complete this form and we will get back to you in 24 hours.
                            </p>
                            <div class="relative w-full mb-3 mt-8">
                                <label
                                    class="block uppercase text-gray-700 text-xs font-bold mb-2"
                                    htmlFor="full-name"
                                >
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    v-model="name"
                                    class="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow w-full ease-linear transition-all duration-150"
                                    placeholder="Full Name"
                                />
                                <span class="error" v-if="errors.name">{{ errors.name }}</span>
                            </div>

                            <div class="relative w-full mb-3">
                                <label
                                    class="block uppercase text-gray-700 text-xs font-bold mb-2"
                                    htmlFor="email"
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
                                    htmlFor="message"
                                >
                                    Message
                                </label>
                                <textarea
                                    name="message"
                                    v-model="message"
                                    rows="4"
                                    cols="80"
                                    class="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow w-full"
                                    placeholder="Type a message..."
                                />
                                <span class="error" v-if="errors.message">{{ errors.message }}</span>
                            </div>
                            <div class="text-center mt-6">
                                <button
                                    class="bg-gray-800 text-white active:bg-gray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                    type="button"
                                    @click="contact"
                                >
                                    Send Message
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Footer />
    </div>
</template>

<style>
span.error {
    color: red;
    font-size: 12px;
}
</style>
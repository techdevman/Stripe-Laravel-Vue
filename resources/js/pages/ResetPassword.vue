<script setup>
import { ref } from 'vue';
import { validEmail, apiClient } from '../services.js'
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const email = ref('');
const password = ref('');
const passwordConfirm = ref('');
const errors = ref({});
const message = ref('');

const resetPassword = async () => {  
    errors.value = {};

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

    if (Object.keys(errors.value).length === 0) {
        const payload = {
            email: email.value,
            password: password.value,
            password_confirmation: passwordConfirm.value,
            token: route.query.token,
        };
        // console.log(payload)
        try {
            const response = await apiClient.post('/reset-password', payload);
            message.value = response.data.message;
            router.push('/login');
        } catch (error) {
            // console.log("error", error.response.data.message)
            errors.value.response = error.response.data.message;
        }
    }
};
</script>

<template>
    <div class="relative w-full h-full py-40 min-h-screen">
        <div class="flex content-center items-center justify-center h-full">
            <div class="w-full lg:w-4/12 px-4">
                <div
                    class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-200 border-0"
                >
                    <div class="rounded-t mb-0 px-6 py-6">
                        <div class="text-center mb-3">
                            <h6 class="text-gray-800 text-lg font-bold">
                                Reset Password
                            </h6>
                        </div>
                        <div>
                            <span class="error" v-if="errors.response">{{ errors.response }}</span>
                        </div>
                        
                        <hr class="mt-6 border-b-1 border-gray-300" />
                    </div>
                    <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
                        <form>
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
            
                            <div class="text-center mt-6">
                                <button
                                    class="bg-gray-800 text-white active:bg-gray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                                    type="button"
                                    @click="resetPassword"
                                >
                                    Reset Password
                                </button>
                            </div>
                        </form>
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
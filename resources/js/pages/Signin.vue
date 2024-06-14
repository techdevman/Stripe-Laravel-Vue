<script setup>
import { ref } from 'vue';
import { useNotification } from "@kyvg/vue3-notification";
import { validEmail, apiClient } from '../services.js'
import { useRouter } from 'vue-router';

const { notify }  = useNotification();
const router = useRouter();
const email = ref('');
const password = ref('');
const errors = ref({});

const login = async () => {  
    errors.value = {};

    if (!email.value) {
        errors.value.email = 'Email is required.';
    } else if (!validEmail(email.value)) {
        errors.value.email = 'Email must be valid.';
    }
    if (password.value.length < 8) {
        errors.value.password = "Password should be 8 characters or more.";
    }

    if (Object.keys(errors.value).length === 0) {
        const payload = {
            email: email.value,
            password: password.value,
        };
        // console.log(payload)
        apiClient.post('/login', payload)
        .then((response) => {
            // console.log("response", response.data)
            localStorage.setItem('token', response.data.token);
            notify({
                type: "success",
                title: "Authorization",
                text: "You have been logged in!",
            });
            router.push('/');
        })
        .catch((error) => {
            // console.log("error", error.response.data.message)
            errors.value.response = error.response.data.message;
        });
    }
};
</script>

<template>
    <div class="relative w-full h-full py-28 min-h-screen">
        <notifications position="top right" />
        <div class="flex content-center items-center justify-center h-full">
            <div class="w-full lg:w-4/12 px-4">
                <div
                    class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-200 border-0"
                >
                    <div class="rounded-t mb-0 px-6 py-6">
                        <div class="text-center mb-3">
                            <h6 class="text-gray-800 text-lg font-bold">
                                Sign in with
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
                            <div>
                                <label class="inline-flex items-center cursor-pointer">
                                    <input
                                        id="customCheckLogin"
                                        type="checkbox"
                                        class="form-checkbox border-0 rounded text-gray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                                    />
                                        <span class="ml-2 text-sm font-semibold text-gray-700">
                                            Remember me
                                        </span>
                                </label>
                            </div>
            
                            <div class="text-center mt-6">
                                <button
                                    class="bg-gray-800 text-white active:bg-gray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                                    type="button"
                                    @click="login"
                                >
                                    Sign In
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                <div class="flex flex-wrap mt-6 relative">
                    <div class="w-1/2">
                        <router-link to="/forgot-password" class="text-gray-700">
                            <small>Forgot password?</small>
                        </router-link>
                    </div>
                    <div class="w-1/2 text-right">
                        <router-link to="/signup" class="text-gray-700">
                            <small>Create new account</small>
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
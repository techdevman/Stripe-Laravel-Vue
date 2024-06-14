<script setup>
import { ref, onMounted } from 'vue';
import { useNotification } from "@kyvg/vue3-notification";
import { validEmail, apiClient, fetchUser } from '../services.js'

onMounted(async () => {
    user.value = await fetchUser();
    name.value = user.value.name;
    email.value = user.value.email;
})

const { notify }  = useNotification();
const user = ref(null);
const name = ref('');
const email = ref('');
const password = ref('');
const passwordConfirm = ref('');
const errors = ref({});

const settingAccount = async () => {  
    errors.value = {};

    if(!name.value) errors.value.name = "Name required.";
    if (!email.value) {
        errors.value.email = 'Email is required.';
    } else if (!validEmail(email.value)) {
        errors.value.email = 'Email must be valid.';
    }
    if (password.value.length > 0 && password.value.length < 8) {
        errors.value.password = "Password should be 8 characters or more.";
    } else if (password.value != passwordConfirm.value) {
        errors.value.password = "Password should be confirmed.";
    }

    if (Object.keys(errors.value).length === 0) {
        const payload = {
            id: user.value.id,
            name: name.value,
            email: email.value,
            password: password.value,
        };
        console.log(payload);
        try {
            const response = await apiClient.post('/setting/account', payload);
            notify({
                type: "success",
                text: response.data.message,
            });

        } catch (error) {
            console.log(error)
        }
    }
};
</script>
<template>
    <div
      class="relative flex flex-col min-w-0 break-words w-full lg:w-8/12 mx-auto mb-6 shadow-lg rounded-lg border-0"
    >
        <notifications position="top right" />
        <div class="rounded-t bg-white mb-0 px-6 py-6">
            <div class="text-center flex justify-between">
                <h6 class="text-gray-700 text-2xl font-bold">My account</h6>
                <button
                    class="bg-emerald-600 text-white active:bg-emerald-500 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                    type="button"
                    @click="settingAccount"
                >
                    Setting
                </button>
            </div>
        </div>
        <div class="flex-auto px-4 lg:px-10 py-6">
            <form>
                <div class="flex flex-wrap">
                    <div class="w-full lg:w-6/12 px-4">
                        <div class="relative w-full mb-3">
                            <label
                                class="block uppercase text-gray-600 text-xs font-bold mb-2"
                                htmlFor="grid-name"
                            >
                                Full Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                v-model="name"
                                class="border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow w-full ease-linear transition-all duration-150"
                                value=""
                            />
                            <span class="error" v-if="errors.name">{{ errors.name }}</span>
                        </div>
                    </div>
                    <div class="w-full lg:w-6/12 px-4">
                        <div class="relative w-full mb-3">
                            <label
                                class="block uppercase text-gray-600 text-xs font-bold mb-2"
                                htmlFor="grid-email"
                            >
                                Email address
                            </label>
                            <input
                                type="email"
                                name="email"
                                v-model="email"
                                class="border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow w-full ease-linear transition-all duration-150"
                                value=""
                            />
                            <span class="error" v-if="errors.email">{{ errors.email }}</span>
                        </div>
                    </div>
                    <div class="w-full lg:w-6/12 px-4">
                        <div class="relative w-full mb-3">
                            <label
                                class="block uppercase text-gray-600 text-xs font-bold mb-2"
                                htmlFor="grid-password"
                            >
                                Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                v-model="password"
                                class="border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow w-full ease-linear transition-all duration-150"
                                value=""
                            />
                            <span class="error" v-if="errors.password">{{ errors.password }}</span>
                        </div>
                    </div>
                    <div class="w-full lg:w-6/12 px-4">
                        <div class="relative w-full mb-3">
                            <label
                                class="block uppercase text-gray-600 text-xs font-bold mb-2"
                                htmlFor="grid-password"
                            >
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                name="passwordConfirm"
                                v-model="passwordConfirm"
                                class="border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow w-full ease-linear transition-all duration-150"
                                value=""
                            />
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>
<style>
span.error {
    color: red;
    font-size: 12px;
}
</style>
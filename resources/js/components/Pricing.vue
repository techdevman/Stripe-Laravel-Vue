<script setup>
import { ref, onMounted } from 'vue';
import { useNotification } from "@kyvg/vue3-notification";
import { apiClient, fetchUser } from '../services.js'

onMounted(async () => {
    user.value = await fetchUser();
    const response = await apiClient.get('/plans');
    plans.value = response.data.plans;
})

const { notify }  = useNotification();
const user = ref(null);
const plans = ref(null);
const errors = ref({});

</script>
<template>
    <div
      class="relative flex flex-col min-w-0 break-words w-full lg:w-8/12 mx-auto mb-6 shadow-lg rounded-lg border-0"
    >
        <notifications position="top right" />
        <div class="rounded-t bg-white mb-0 px-6 py-6">
            <div class="text-center flex justify-between">
                <h6 class="text-gray-700 text-2xl font-bold">Pricing</h6>
            </div>
        </div>
        <div class="flex justify-around px-4 lg:px-10 py-6">
            <!-- Pricing Card -->
            <div v-for="plan in plans" class="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-800 bg-white rounded-lg border border-gray-100 shadow xl:p-8">
                <h3 class="text-2xl font-semibold">{{ plan.name }}</h3>
                <div class="flex justify-center items-baseline my-8">
                    <span class="mr-2 text-4xl font-bold">${{ plan.price }}</span>
                    <span class="text-gray-500 dark:text-gray-400">/month</span>
                </div>
                <!-- List -->
                <ul role="list" class="mb-8 space-y-4 text-left">
                    <li class="flex items-center space-x-3">
                        <!-- Icon -->
                        <svg class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                        <span>Individual configuration</span>
                    </li>
                    <li class="flex items-center space-x-3">
                        <!-- Icon -->
                        <svg class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                        <span>No setup, or hidden fees</span>
                    </li>
                    <li class="flex items-center space-x-3">
                        <!-- Icon -->
                        <svg class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                        <span>Team size: <span class="font-semibold">1 developer</span></span>
                    </li>
                    <li class="flex items-center space-x-3">
                        <!-- Icon -->
                        <svg class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                        <span>Premium support: <span class="font-semibold">6 months</span></span>
                    </li>
                    <li class="flex items-center space-x-3">
                        <!-- Icon -->
                        <svg class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                        <span>Free updates: <span class="font-semibold">6 months</span></span>
                    </li>
                </ul>
                <a href="#" class="text-white bg-gray-800 hover:bg-gray-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Get started</a>
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
<script setup>
import { ref } from 'vue';

import Navbar from '../components/Navbar.vue';
import Footer from '../components/Footer.vue';
import AccountSetting from '../components/AccountSetting.vue';
import Pricing from '../components/Pricing.vue';

</script>

<template>
    <div>
        <Navbar />
        <div class="container pt-24 mx-auto">
            <AccountSetting />
            <Pricing />
        </div>
        <Footer />
    </div>
</template>

<style>

</style>
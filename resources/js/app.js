import { createApp, ref } from 'vue'
import Notifications from '@kyvg/vue3-notification'
import router from "./router";
import Vue3EasyDataTable from 'vue3-easy-data-table';
import 'vue3-easy-data-table/dist/style.css';

import App from './App.vue';

const app = createApp(App);

// const user = ref(null);
// fetchUser();
// app.provide('user', user);

app.component('DataTable', Vue3EasyDataTable);
app.use(Notifications);
app.use(router).mount("#app");
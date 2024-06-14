<script setup>
import { ref, inject, computed, onMounted } from 'vue';
import { createPopper } from "@popperjs/core";
import { apiClient, fetchUser } from '../services.js'
import { useRouter } from 'vue-router';

onMounted(async () => {
    user.value = await fetchUser();
})
const router = useRouter();
// const user = inject('user');
const user = ref(null);
const avatarUrl = computed(() => {
  if (user && user.value && user.value.name) {
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(user.value.name)}&background=0D8ABC&color=fff`;
  }
  return null;
});
const dropdownPopoverShow = ref(false);
// References for the dropdown button and popover
const btnDropdownRef = ref(null);
const popoverDropdownRef = ref(null);

const toggleDropdown = (event) => {
    event.preventDefault();
    if (dropdownPopoverShow.value) {
        dropdownPopoverShow.value = false;
    } else {
        dropdownPopoverShow.value = true;
        createPopper(btnDropdownRef.value, popoverDropdownRef.value, {
            placement: "bottom-start",
        });
    }
}

const logout = async () => {
    try {
        await apiClient.post('/logout');
        localStorage.removeItem('token')
        router.push('/signin');
    } catch (error) {
        console.log(error)
    }
}
</script>

<template>
    <div>
        <a
            class="hover:text-gray-950 text-gray-800 pl-3 flex items-center text-xs uppercase font-bold"
            href="#"
            ref="btnDropdownRef"
            v-on:click="toggleDropdown($event)"
        >
            <div class="items-center flex">
                <span class="w-10 h-10 text-sm text-white bg-gray-200 inline-flex items-center justify-center rounded-full">
                    <img alt="..." class="w-full rounded-full align-middle border-none shadow-lg" :src="avatarUrl">
                </span>
            </div>
        </a>
        <div
            ref="popoverDropdownRef"
            class="bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48"
            v-bind:class="{
                hidden: !dropdownPopoverShow,
                block: dropdownPopoverShow,
            }"
        >
            <router-link
                to="/settings"
                class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-800"
            >
                Settings
            </router-link>
            <a
                href="#"
                class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-800"
                @click="logout"
            >
                Log out
            </a>
        </div>
    </div>
</template>
  
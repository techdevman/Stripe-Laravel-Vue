<script setup>
import NavbarDropdown from './NavbarDropdown.vue';
</script>

<template>
    <nav
      class="top-0 fixed z-50 w-full flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg bg-white shadow"
    >
        <div
            class="container px-4 mx-auto flex flex-wrap items-center justify-between"
        >
            <div
                class="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start"
            >
                <router-link to="/">
                    <a
                    class="text-gray-800 text-md font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase"
                    href="#"
                    >
                        Spreadsheet
                    </a>
                </router-link>
            </div>
            <div
                class="lg:flex flex-grow items-center"
                id="example-navbar-warning"
            >
                <ul class="flex flex-col lg:flex-row list-none lg:ml-auto">
                    <li class="flex items-center">
                        <router-link to="/">
                            <a
                                class="hover:text-gray-950 text-gray-800 px-3 py-2 flex items-center text-xs uppercase font-bold"
                                href="#"
                            >
                                Home
                            </a>
                        </router-link>
                    </li>
                    <li class="flex items-center">
                        <router-link to="/about">
                            <a
                                class="hover:text-gray-950 text-gray-800 px-3 py-2 flex items-center text-xs uppercase font-bold"
                                href="#"
                            >
                                About
                            </a>
                        </router-link>
                    </li>
                    <li class="flex items-center">
                        <router-link to="/contact">
                            <a
                                class="hover:text-gray-950 text-gray-800 px-3 py-2 flex items-center text-xs uppercase font-bold"
                                href="#"
                            >
                                Contact
                            </a>
                        </router-link>
                    </li>
                    <li class="flex items-center">
                        <router-link to="/terms">
                            <a
                                class="hover:text-gray-950 text-gray-800 px-3 py-2 flex items-center text-xs uppercase font-bold"
                                href="#"
                            >
                                Terms of Service
                            </a>
                        </router-link>
                    </li>
                    <li class="flex items-center">
                        <NavbarDropdown />
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

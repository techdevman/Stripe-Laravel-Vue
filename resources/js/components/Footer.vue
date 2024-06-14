<template>
    <footer
      class="pb-6 w-full"
    >
        <div class="container mx-auto px-4">
            <hr class="mb-6 border-b-1 border-gray-300" />
            <div
                class="flex flex-wrap items-center md:justify-between justify-center"
            >
                <div class="w-full md:w-4/12 px-4">
                    <div
                        class="text-sm text-gray-500 font-semibold py-1 text-center md:text-left"
                    >
                        Copyright © {{ date }}
                        <router-link to="/">
                            <a
                                href="#"
                                class="text-gray-500 hover:text-gray-700 text-sm font-semibold py-1"
                            >
                                Google Spreadsheet
                            </a>
                        </router-link>
                    </div>
                </div>
                <div class="w-full md:w-8/12 px-4">
                    <ul class="flex flex-wrap list-none md:justify-end justify-center">
                        <li>
                            <router-link
                                to="/"
                                class="text-gray-500 hover:text-gray-700 text-sm font-semibold block py-1 px-3"
                            >
                                Home
                            </router-link>
                        </li>
                        <li>
                            <router-link
                                to="/about"
                                class="text-gray-500 hover:text-gray-700 text-sm font-semibold block py-1 px-3"
                            >
                                About
                            </router-link>
                        </li>
                        <li>
                            <router-link
                                to="/contact"
                                class="text-gray-500 hover:text-gray-700 text-sm font-semibold block py-1 px-3"
                            >
                                Contact
                            </router-link>
                        </li>
                        <li>
                            <router-link
                                to="/terms"
                                class="text-gray-500 hover:text-gray-700 text-sm font-semibold block py-1 px-3"
                            >
                                Terms of Service
                            </router-link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </footer>
</template>
  
<script>
export default {
    data() {
        return {
            date: new Date().getFullYear(),
        };
    },
    props: {
        absolute: {
            type: Boolean,
            default: false,
        },
    },
};
</script>
  
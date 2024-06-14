<script setup>
import { ref, onMounted } from "vue";

import { spreadsheetId, googleApiKey, convertData } from '../services.js'

onMounted(() => {
    fetchSheetData();
});

const searchField = ['date', 'book', 'tm', 'pitcher', 'oppLuConfirmed', 'o_u', 'line', 'odds', 'units', 'win', 'profit_loss'];
const searchValue = ref('');
const items = ref([]);
const headers = [
    { value: 'date', text: 'Date', sortable: true },
    { value: 'book', text: 'Book', sortable: true },
    { value: 'pitcher', text: 'Pitcher', sortable: true },
    { value: 'oppLuConfirmed', text: 'Opp LU Confirmed?', sortable: true },
    { value: 'o_u', text: 'O/U', sortable: true },
    { value: 'line', text: 'Line', sortable: true },
    { value: 'odds', text: 'Odds', sortable: true },
    { value: 'units', text: 'Units', sortable: true },
    { value: 'win', text: 'Win?', sortable: true },
    { value: 'profit_loss', text: 'Profit/Loss', sortable: true },
];
const loading = ref(false);

const fetchSheetData = async () => {
    const rows = [
        [1,2,3,4,5,6,7,8,9,10,11],
        [1,2,3,4,5,6,7,8,9,10,11]
    ];
    items.value = convertData(rows, headers);
    // console.log(items)
}
</script>

<template>
    <div class="flex justify-end mb-4">
        <input type="text" v-model="searchValue" class="border border-gray-300 px-3 py-2 placeholder-gray-500 text-gray-800 bg-white rounded text-sm shadow focus:outline-gray-600 ease-linear transition-all duration-150" placeholder="Search">
    </div>
    <DataTable
        :loading="loading"
        :headers="headers"
        :items="items"
        :search-field="searchField"
        :search-value="searchValue"
        table-class-name="customize-table"
        alternating
        border-cell
        show-index
        header-text-direction="center"
        body-text-direction="center"
        must-sort
    />
</template>

<style>
 
</style>
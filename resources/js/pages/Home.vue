<script setup>
import { ref } from 'vue';

import KBets from '../components/KBets.vue';
import BBets from '../components/BBets.vue';
import OutsBets from '../components/OutsBets.vue';
import Navbar from '../components/Navbar.vue';
import Footer from '../components/Footer.vue';

const selectedIndex = ref(0)
const tabs = ref([
    { title: 'K Bets Tracker' },
    { title: 'BB Bets Tracker' },
    { title: 'OUTS Bets Tracker' }
])

function selectTab(i) {
    selectedIndex.value = i
}
</script>

<template>
    <div>
        <Navbar />
        <div class="container pt-16 mx-auto">
            <div class='wrapper'>
                <ul class='tabs__header'>
                    <li v-for='(tab, index) in tabs'
                        :key='tab.title'
                        @click='selectTab(index)'
                        :class='{"tab__selected": (index == selectedIndex)}'
                    >
                        {{ tab.title }}
                    </li>
                </ul>
                <div class='tab' v-show='selectedIndex === 0'>
                    <KBets />
                </div>
                <div class='tab' v-show='selectedIndex === 1'>
                    <BBets />
                </div>
                <div class='tab' v-show='selectedIndex === 2'>
                    <OutsBets />
                </div>
            </div>
        </div>
        <Footer />
    </div>
</template>

<style>
    .wrapper {
        width: 100%;
        margin: 0;
        padding: 20px;
    }
    ul.tabs__header {
        display: block;
        list-style: none;
        margin: 0;
        padding: 0;
    }
  
    ul.tabs__header > li {
        padding: 12px 25px;
        margin: 0;
        display: inline-block;
        margin-right: 5px;
        cursor: pointer;
        color: rgb(55 65 81);
    }
  
    ul.tabs__header > li.tab__selected {
        font-weight: 600;
        border-bottom: 3px solid;
        color: rgb(5 150 105);
    }
  
    .tab {
        display: inline-block;
        padding: 20px 0;
        width: 100%;
    }
</style>
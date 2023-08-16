<template>
    <ul class="d-flex list-unstyled border-bottom border-light mb-2">
        <li class="py-3 fw-bold">Mo</li>
        <li class="py-3 fw-bold">Tu</li>
        <li class="py-3 fw-bold">We</li>
        <li class="py-3 fw-bold">Th</li>
        <li class="py-3 fw-bold">Fr</li>
        <li class="py-3 fw-bold">Sa</li>
        <li class="py-3 fw-bold text-danger">Su</li>
    </ul>
    <ul class="content d-flex flex-wrap list-unstyled mb-0">
        <li class="py-2 opacity-50" v-for="n in prevMonthArray" :key="n" @click="chooseDateInPrevMonth(n)">{{ n }}</li>
        <li class="py-2 fw-bold" :class="{'bg-info': n === props.date}" v-for="n in currentMonthArray" :key="n" @click="chooseDate(n)">{{ n }}</li>
        <li class="py-2 opacity-50" v-for="n in nextMonthArray" :key="n" @click="chooseDateInNextMonth(n)">{{ n }}</li>
    </ul>
</template>

<script setup lang="ts">
import { type Ref, ref, watchEffect, computed, type ComputedRef } from "vue";

const currentMonthArray : Ref<number[]> = ref<number[]>([]);
const prevMonthArray : Ref<number[]> = ref<number[]>([]);
const nextMonthArray : Ref<number[]> = ref<number[]>([]);

const props = defineProps<{
    date: number,
    month: number, /* count from 0 */
    year: number
}>();

const emit = defineEmits<{
    chooseDateInCurrMonth: [n: number],
    chooseDateInPrevMonth: [data: Array<number>],
    chooseDateInNextMonth: [data: Array<number>],
}>();

// get the total days of month
const totalDaysOfMonth : ComputedRef<number> = computed(() => {
    return new Date(props.year, props.month + 1, 0).getDate();
});
const lastDayOfPrevMonth : Ref<number> = ref(0);
const firstDay : Ref<number> = ref(0);
const lastDay : Ref<number> = ref(0);

// function to update array
function updateCurrentMonthArray() {
    for (let i = 1; i <= totalDaysOfMonth.value; i++) {
        currentMonthArray.value.push(i);
    }
};

function updatePrevMonthArray() {
    if (firstDay.value === 0) {
        firstDay.value += 7;
    } 
    let i = 1;
    while (i < firstDay.value) {
        prevMonthArray.value.unshift(lastDayOfPrevMonth.value);
        lastDayOfPrevMonth.value --;
        i ++;
    }
};

function updateNextMonthArray() {
    if (lastDay.value === 0) {
        lastDay.value += 7;
    }
    let i = 7;
    let d = 1;
    while ( i > lastDay.value) {
        nextMonthArray.value.push(d);
        d ++;
        i --;
    }
};

const resetArray = () => {
    prevMonthArray.value = [];
    currentMonthArray.value = [];
    nextMonthArray.value = [];
};

// Choose Date in calendar
const chooseDate = (n : number) => {
    emit('chooseDateInCurrMonth', n);
};

const chooseDateInPrevMonth = (n: number) => {
    emit('chooseDateInPrevMonth', [n, props.month - 1])
};

const chooseDateInNextMonth = (n: number) => {
    emit('chooseDateInNextMonth', [n, props.month + 1])
};

// watch Effect when data changed from parent element
watchEffect(() => {
    resetArray();
    firstDay.value = new Date(props.year, props.month, 1).getDay();
    lastDay.value = new Date(props.year, props.month, totalDaysOfMonth.value).getDay();
    lastDayOfPrevMonth.value = new Date(props.year, props.month, 0).getDate();
    updatePrevMonthArray();
    updateCurrentMonthArray();
    updateNextMonthArray();
});

</script>

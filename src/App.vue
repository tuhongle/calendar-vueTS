<script setup lang="ts">
import { computed, type ComputedRef, onMounted, type Ref, ref, watch, reactive } from "vue";
import { type Month, type weekDate } from './types/datemonth';
import Calendar from "./components/Calendar.vue";

// set and change Calendar background
const card : Ref = ref(null);
onMounted(() => {
  changeBackground();
  card.value.style.backgroundPosition = 'center center';
  card.value.style.backgroundSize = 'cover';
});

function changeBackground() {
  let i = Math.floor(Math.random() * 70);
  card.value.style.backgroundImage = `url('/wallpaper/wallpaper-${i}.jpg')`;
};

// declare variables: weekday, day, month, year
const day: Ref<number> = ref(0);
const date: Ref<number> = ref(0);
const month: Ref<number> = ref(0);
const year: Ref<number> = ref(0);
const d: Ref<Date> = ref(new Date());

function getData(data: Date) {
  day.value = data.getDay();
  date.value = data.getDate();
  month.value = data.getMonth();
  year.value = data.getFullYear();
}

// invoke getData() to get first data
getData(d.value);

// watch 3 variales: year, month, date when invoke functions
watch(
  () => new Date(year.value, month.value, date.value),
  (data: Date) => {
    changeBackground();
    getData(data);
  }
);

const monthText : ComputedRef<Month> = computed((): Month => {
  switch (month.value + 1) {
    case 1: 
    return 'January';
    case 2:
    return 'February';
    case 3:
    return 'March';
    case 4:
    return 'April';
    case 5:
    return 'May';
    case 6:
    return 'June';
    case 7:
    return 'July';
    case 8:
    return 'August';
    case 9:
    return 'September';
    case 10:
    return 'October';
    case 11:
    return 'November';
    default:
    return 'December';
  }
});

const weekday : ComputedRef<weekDate> = computed((): weekDate => {
  switch (day.value) {
    case 0:
    return 'Sunday';
    case 1:
    return 'Monday';
    case 2:
    return 'Tuesday';
    case 3:
    return 'Wednesday';
    case 4:
    return 'Thursday';
    case 5:
    return 'Friday';
    default:
    return 'Saturday';
  }
})


// funtions to change data
function dayUp() {
  date.value ++;
};

function monthUp() {
  month.value ++;
};

function yearUp() {
  year.value ++;
};

function dayDown() {
  date.value --;
};

function monthDown() {
  month.value --;
};

function yearDown() {
  year.value --;
};

// Receive emit from Calendar.vue to change date

const setDate = (n: number) => {
  date.value = n;
};

const setDateNotCurrMonth = (data: number[]) => {
  date.value = data[0];
  month.value = data[1];
};

</script>

<template>
  <div class="container-fluid bg-dark">
    <div class="row">
      <div class="col-12 col-sm-8 col-md-6 col-xl-4 mx-auto py-3 vh-100">
        <div ref="card" class="card text-center pt-3 h-100 rounded-4 overflow-hidden text-light">
          <h1 class="mb-1 fw-bolder display-1">{{ weekday }}</h1>
          <div class="d-flex align-items-center">
            <div class="col-4 text-center px-0">
              <button class="btn btn-outline-secondary border-0" @click="dayUp"><i class="bi bi-caret-up-fill fs-1 text-light"></i></button>
              <h5 class="mb-0 fw-bold">{{ date }}</h5>
              <button class="btn btn-outline-secondary border-0" @click="dayDown"><i class="bi bi-caret-down-fill fs-1 text-light"></i></button>
            </div>
            <div class="col-4 text-center px-0">
              <button class="btn btn-outline-secondary border-0" @click="monthUp"><i class="bi bi-caret-up-fill fs-1 text-light"></i></button>
              <h5 class="mb-0 fw-bold">{{ monthText }}</h5>
              <button class="btn btn-outline-secondary border-0" @click="monthDown"><i class="bi bi-caret-down-fill fs-1 text-light"></i></button>
            </div>
            <div class="col-4 text-center px-0">
              <button class="btn btn-outline-secondary border-0" @click="yearUp"><i class="bi bi-caret-up-fill fs-1 text-light"></i></button>
              <h5 class="mb-0 fw-bold">{{ year }}</h5>
              <button class="btn btn-outline-secondary border-0" @click="yearDown"><i class="bi bi-caret-down-fill fs-1 text-light"></i></button>
            </div>
          </div>
          <div class="calendar mt-auto">
            <Calendar :date="date" :month="month" :year="year" @chooseDateInCurrMonth="setDate" @chooseDateInPrevMonth="setDateNotCurrMonth" @chooseDateInNextMonth="setDateNotCurrMonth"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
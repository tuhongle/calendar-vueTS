<script setup lang="ts">
import Calendar from "./components/Calendar.vue";
</script>

<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12 col-md-8 col-lg-6 mx-auto py-5 vh-100">
        <div class="card text-center pt-5 h-100 rounded-4 overflow-hidden">
          <h1 class="mb-5 fw-bolder">Friday</h1>
          <div class="row">
            <div class="col-4">
              <h5>12</h5>
            </div>
            <div class="col-4">
              <h5>April</h5>
            </div>
            <div class="col-4">
              <h5>2023</h5>
            </div>
          </div>
          <div class="calendar mt-auto">
            <Calendar />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

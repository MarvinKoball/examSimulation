<template>
  <div class="about">
    <h1>learn by sections</h1>
    <div><selectSection @selection-changed="onSelectionChangend" /></div>
    <div class="card text-center" v-if="!finishWithAllTask">
      <!-- Display a loading message while the data is being fetched -->
      <div v-if="loading">Loading...</div>
      <!-- Display an error message if there was an error fetching the data -->
      <div v-if="error">Error: {{ error }}</div>
      <ul class="list-group list-group-flush" v-if="currentTasks">
        <li
          @click="SelectStatementToBeCorrect(task)"
          v-bind:style="{
            backgroundColor: task.isSelected ? '#99ff99' : '#FFFFFF',
          }"
          class="list-group-item"
          v-for="task in currentTasks"
          :key="task.id"
        >
          {{ task.statement }}
        </li>
      </ul>
      <button
        @click="previousPage"
        class="btn btn-secondary"
        v-if="currentPage >= 1"
      >
        Previous
      </button>
      <button
        v-if="
          currentPage <
          Math.floor(tasks.statements.length / tasks.itemsPerPage - 1)
        "
        @click="nextPage"
        class="btn btn-primary"
      >
        Next
      </button>
      <button
        v-if="
          currentPage ==
          Math.floor(tasks.statements.length / tasks.itemsPerPage - 1)
        "
        @click="evaluate"
        class="btn btn-warning"
      >
        Evaluate
      </button>
      <br />
      <br />
      <br />
    </div>
    <div class="card text-center" v-if="finishWithAllTask">
      <a>{{ result }}</a>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, reactive } from "vue";

import { task, mapIntoTask, TaskList } from "../../../types";
import selectSection from "../components/selectSection.vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

let loading = false;
let error: any;
let tasks: TaskList = reactive({
  statements: [],
  itemsPerPage: 5,
});
let currentPage = ref(0);
let currentTasks: any = [];
let TasksInPages: any = [];
let result = "";
let finishWithAllTask = ref(false);

async function fetchTasks(section: string) {
  finishWithAllTask.value = false;
  try {
    loading = true;
    const response = await fetch(
      `http://192.168.178.28:3000/by_section/${section}`
    );

    const data = await response.json();
    let newTask: task[] = [];
    data.forEach((entry: any) => {
      newTask.push(mapIntoTask(entry));
    });
    loading = false;
    tasks.statements = newTask;
    tasks.statements.forEach((statement) => (statement.isSelected = false));
  } catch (err: any) {
    error = err.message;
    loading = false;
  }
  currentPage.value = 0;
  TasksInPages = [];
  splitIntoPages();
  selectPage(currentPage.value);
}
function nextPage() {
  currentPage.value += 1;
  selectPage(currentPage.value);
}

function previousPage() {
  currentPage.value -= 1;
  selectPage(currentPage.value);
}
function splitIntoPages() {
  const pages = Math.floor(tasks.statements.length / tasks.itemsPerPage);
  console.log(tasks.statements.length);
  console.log(pages);
  for (let i = 0; i < pages; i++) {
    const start = i * tasks.itemsPerPage;
    const end = start + tasks.itemsPerPage;
    const currentPage = tasks.statements.slice(start, end);
    if (currentPage.length == tasks.itemsPerPage)
      TasksInPages.push(currentPage);
  }
}
function selectPage(num: number) {
  currentTasks = TasksInPages[num];
}
function onSelectionChangend(selection: any) {
  loading = true;
  fetchTasks(selection).catch((err) => {
    error = err;
  });
}
function SelectStatementToBeCorrect(taskpp: task) {
  currentTasks.find((task: task) => task.id === taskpp.id);

  if (taskpp.isSelected == true) {
    taskpp.isSelected = false;
  } else {
    taskpp.isSelected = true;
  }
  console.log(taskpp);
}
function evaluate() {
  let pointCounter = 0;
  let maxPoints = TasksInPages.length * 100;
  TasksInPages.forEach((page: any) => {
    let correctlyIdentified = 0;
    page.forEach((statement: any) => {
      if (statement.isSelected == statement.isCorrect) {
        correctlyIdentified++;
      }
    });
    console.log(page.length);
    if (correctlyIdentified == page.length) {
      pointCounter += 100;
    } else if (correctlyIdentified == page.length - 1) {
      pointCounter += 60;
    } else if (correctlyIdentified == page.length - 2) {
      pointCounter += 30;
    } else if (correctlyIdentified == page.length - 3) {
      pointCounter += 10;
    } else if (correctlyIdentified == page.length - 4) {
      pointCounter += 1;
    }
  });
  finishWithAllTask.value = true;
  result = pointCounter + " out of " + maxPoints;
  console.log(pointCounter + " out of " + maxPoints);
}
</script>

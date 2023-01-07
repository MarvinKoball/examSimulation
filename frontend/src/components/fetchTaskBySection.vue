<template>
  <div><selectSection @selection-changed="onSelectionChangend" /></div>
  <div class="card text-center" v-if="!finishWithAllTask">
    <!-- Display a loading message while the data is being fetched -->
    <div v-if="loading">Loading...</div>
    <!-- Display an error message if there was an error fetching the data -->
    <div v-if="error">Error: {{ error }}</div>
    <!-- Display the data if it was successfully fetched -->
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
        <!--  <button class="btn btn-primary float-right">Test</button> -->
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
        Math.ceil(tasks.statements.length / tasks.itemsPerPage - 1)
      "
      @click="nextPage"
      class="btn btn-primary"
    >
      Next
    </button>
    <button
      v-if="
        currentPage ==
        Math.ceil(tasks.statements.length / tasks.itemsPerPage - 1)
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
</template>

<script lang="ts">
import { ref, computed, reactive } from "vue";
import { Options, Vue } from "vue-class-component";
import { task, mapIntoTask, TaskList } from "../../../types";
import selectSection from "../components/selectSection.vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

@Options({
  components: { selectSection },
})
export default class fetchTaskBySection extends Vue {
  loading = false;
  error: any;
  tasks: TaskList = {
    statements: [],
    itemsPerPage: 5,
  };
  currentPage = 0;
  currentTasks: any = [];
  TasksInPages: any = [];
  result = "";
  finishWithAllTask = false;

  async fetchTasks(section: string) {
    this.finishWithAllTask = false;
    try {
      this.loading = true;
      const response = await fetch(
        `http://192.168.178.28:3000/by_section/${section}`
      );

      const data = await response.json();
      let newTask: task[] = [];
      data.forEach((entry: any) => {
        newTask.push(mapIntoTask(entry));
      });
      this.loading = false;
      this.tasks.statements = newTask;
      this.tasks.statements.forEach(
        (statement) => (statement.isSelected = false)
      );
    } catch (err: any) {
      this.error = err.message;
      this.loading = false;
    }
    this.currentPage = 0;
    this.TasksInPages = [];
    this.splitIntoPages();
    this.selectPage(this.currentPage);
  }
  nextPage() {
    this.currentPage += 1;
    this.selectPage(this.currentPage);
  }

  previousPage() {
    this.currentPage -= 1;
    this.selectPage(this.currentPage);
  }
  splitIntoPages() {
    const pages = Math.ceil(
      this.tasks.statements.length / this.tasks.itemsPerPage
    );
    console.log(pages);
    for (let i = 0; i < pages; i++) {
      const start = i * this.tasks.itemsPerPage;
      const end = start + this.tasks.itemsPerPage;
      const currentPage = this.tasks.statements.slice(start, end);
      if (currentPage.length == this.tasks.itemsPerPage)
        this.TasksInPages.push(currentPage);
    }
  }
  selectPage(num: number) {
    this.currentTasks = this.TasksInPages[num];
  }
  onSelectionChangend(selection: any) {
    this.loading = true;
    this.fetchTasks(selection).catch((error) => {
      this.error = error;
    });
  }
  SelectStatementToBeCorrect(taskpp: task) {
    this.currentTasks.find((task: task) => task.id === taskpp.id);

    if (taskpp.isSelected == true) {
      taskpp.isSelected = false;
    } else {
      taskpp.isSelected = true;
    }
    console.log(taskpp);
  }
  evaluate() {
    let pointCounter = 0;
    let maxPoints = this.TasksInPages.length * 100;
    this.TasksInPages.forEach((page: any) => {
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
    this.finishWithAllTask = true;
    this.result = pointCounter + " out of " + maxPoints;
    console.log(pointCounter + " out of " + maxPoints);
  }
}
</script>

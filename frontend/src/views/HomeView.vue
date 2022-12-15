<template>
  <div class="home">
    <AddTaskForm msg="HALLO MARVIN" />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import AddTaskForm from "../components/AddTaskForm.vue";

@Options({
  components: { AddTaskForm },
})
export default class HomeView extends Vue {}
</script>

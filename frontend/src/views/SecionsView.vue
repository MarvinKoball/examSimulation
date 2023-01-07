<template>
  <div class="about">
    <h1>learn by sections</h1>
    <fetchTaskBySection />
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import fetchTaskBySection from "../components/fetchTaskBySection.vue";
import selectSection from "../components/selectSection.vue";

@Options({
  components: { fetchTaskBySection, selectSection },
})
export default class bySections extends Vue {
  //t
}
</script>

<template>
  <div class="form-group">
    <label for="section-selection">Choose a Section</label>
    <select
      id="section-selection"
      class="form-control"
      @change="onSelectionChanged"
      v-model="selected"
    >
      <option
        v-for="section in sections"
        :key="section.id"
        :value="section.section"
      >
        {{ section.section }}
      </option>
    </select>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, defineEmits } from "vue";

type section = { section: string; id: number };
let sections = ref<section[]>([]);
let selected = ref();
const emit = defineEmits(["selection-changed"]);
onMounted(() => {
  fetchSections();
});
async function fetchSections() {
  try {
    const response = await fetch("http://192.168.178.28:3000/sections");
    sections.value = await response.json();
  } catch (error) {
    console.error(error);
  }
}
function onSelectionChanged() {
  emit("selection-changed", selected.value);
}
</script>

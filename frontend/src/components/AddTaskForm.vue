<template>
  <div class="hello">
    <p></p>
    <h1>Upload task</h1>
    <br />
    <ul>
      <li>
        <form
          id="form"
          @submit="
            (event) => {
              event.preventDefault();
              uploadTask();
            }
          "
        >
          <div class="form-group">
            <label for="exam">exam:</label>
            <input
              type="exam"
              class="form-control"
              id="exam"
              v-model="testTask.exam"
            />
          </div>
          <div class="form-group">
            <label for="section">section:</label>
            <input
              type="section"
              class="form-control"
              id="section"
              v-model="testTask.section"
            />
          </div>

          <div class="form-group">
            <label for="subject">subject:</label>
            <input
              type="subject"
              class="form-control"
              id="subject"
              v-model="testTask.subject"
            />
          </div>
          <div class="form-group">
            <label for="taskType">taskType:</label>
            <input
              type="taskType"
              class="form-control"
              id="taskType"
              v-model="testTask.taskType"
            />
          </div>
          <div class="form-group">
            <label for="statement">statement:</label>
            <input
              type="statement"
              class="form-control"
              id="statement"
              v-model="testTask.statement"
            />
          </div>
          <div class="form-check form-switch">
            <label for="flexSwitchCheckDefault">hasPicture:</label>
            <input
              type="checkbox"
              id="flexSwitchCheckDefault"
              class="form-check-input"
              v-model="hasPicture"
            />
          </div>
          <div class="form-group">
            <input
              type="file"
              class="form-control"
              id="picture"
              accept="image/png, image/jpg"
              ref="fileInput"
              v-show="hasPicture"
              @change="setPicture"
              multiple
            />
          </div>
          <div class="form-check form-switch">
            <label for="flexSwitchCheckDefault">isCorrect:</label>
            <input
              type="checkbox"
              id="isCorrect"
              class="form-check-input"
              v-model="testTask.isCorrect"
            />
          </div>
          <button type="submit" class="btn btn-primary">Submit</button>
        </form>
      </li>
    </ul>
    <ul>
      <li></li>
    </ul>
  </div>
</template>

<script lang="ts">
/* eslint-disable */
import { Vue } from "vue-class-component";
import { task } from "../../../types/index";
//import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import { file } from "@babel/types";

export default class AddTaskForm extends Vue {
  hasPicture = false;
  testTask: task = {
    section: "",
    subject: "",
    statement: "",
    exam: "",
    taskType: "",
    isCorrect: false,
  };

  created() {
    console.log("AddTaskForm created");
    fetch("http://localhost:3000/").then(async (response) => {
      console.log(await response.json());
      //this.testTask.pictureStream = "";
    });
  }
  setPicture(){
    const file = (this.$refs.fileInput as HTMLInputElement).files![0];
    console.log(file);
    

      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload=()=>{
        this.testTask.pictureStream=reader.result as string;
        console.log(this.testTask);
        
      }
      
      }

  async uploadTask() {
    //console.log(this.testTask);
    const result = await fetch("http://localhost:3000/add", {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify(this.testTask),
    });
    console.log(result.json());
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

<template>
  <div>
    <v-card
      v-if="!isTodoCardHide"
      justify="center"
      class="transition-swing"
      @click="updateTodoModal = !updateTodoModal"
    >
      <v-card-text>
        <div>ID : {{ todo.todoId }}</div>
        <div>タイトル : {{ todo.title }}</div>
        <div>内容 : {{ todo.detail }}</div>
        <div>
          期限日 : {{ todo.toDate }}
          <v-icon small v-if="overToDate"> mdi-alert </v-icon>
        </div>
        <div>
          ステータス :
          <span v-for="(todoStatusLabel, i) in todoStatusLabelList" :key="i">
            {{ todoStatusLabel.label }}
          </span>
        </div>
      </v-card-text>
    </v-card>
    <UpdateTodoComponent
      v-if="updateTodoModal"
      :updateTodoModal="updateTodoModal"
      :todo="todo"
      :todoStatusList="todoStatusList"
      @closeUpdateTodoComponent="closeUpdateTodoComponent"
    />
  </div>
</template>


<script>
import UpdateTodoComponent from "@/components/UpdateTodoComponent";

export default {
  props: ["todo", "todoStatusList"],
  data() {
    return {
      overToDate: false,
      todoStatusLabelList: [],
      isTodoCardHide: false,
      updateTodoModal: false,
    };
  },
  components: {
    UpdateTodoComponent,
  },
  created() {
    this.loadTdoStatus();
    this.toDateColor();
  },
  methods: {
    toDateColor() {
      var toDate = new Date(this.todo.toDate);
      const today = new Date(Date.now());
      if (today > toDate) {
        this.overToDate = true;
      } else {
        this.overToDate = false;
      }
    },
    loadTdoStatus() {
      this.todo.todoStatus.forEach((todoStatus) => {
        this.todoStatusList.forEach((todoStatusLabel) => {
          if (todoStatusLabel.statusId === todoStatus) {
            this.todoStatusLabelList.push(todoStatusLabel);
          }
        });
      });
    },
    closeUpdateTodoComponent(isDelete) {
      this.toDateColor();
      this.updateTodoModal = false;
      if (isDelete) {
        this.isTodoCardHide = true;
      }
    },
  },
};
</script>

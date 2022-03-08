<template>
  <div>
    <v-row class="text-center">
      <v-col cols="12" class="mb-4">
        <h1>ToDo</h1>
      </v-col>
      <v-col cols="12" class="mb-4">
        <v-row class="text-center" justify="center">
          <v-chip-group column multiple v-model="searchTodoStatusIndex">
            <v-chip
              v-for="(todoStatus, i) in todoStatusList"
              :key="i"
              filter
              outlined
            >
              {{ todoStatus.label }}
            </v-chip>
          </v-chip-group>
        </v-row>
      </v-col>
      <v-text-field
        v-model="searchWord"
        label="検索(タイトル、内容)"
        class="mx-4"
        outlined
        @keyup.enter="getTodoSearch()"
      ></v-text-field>
      <div class="text-center">
        <v-btn class="mx-2" fab @click="createTodoModal = !createTodoModal">
          <v-icon> mdi-plus </v-icon>
        </v-btn>
        <CreateTodoComponent
          :createTodoModal="createTodoModal"
          @closeCreateTodoComponent="closeCreateTodoComponent"
        />
      </div>
      <v-col v-for="(todo, i) in todoJsonList" :key="i" cols="12">
        <TodoComponent
          v-if="todoJsonList"
          :todo="todo"
          :todoStatusList="todoStatusList"
        />
      </v-col>
    </v-row>
  </div>
</template>


<script>
import TodoComponent from "@/components/TodoComponent";
import CreateTodoComponent from "@/components/CreateTodoComponent";

export default {
  data() {
    return {
      todoStatusList: [],
      searchTodoStatusIds: [],
      searchTodoStatusIndex: [],
      searchWord: "",
      createTodoModal: false,
      todoJsonList: [],
    };
  },
  components: {
    CreateTodoComponent,
    TodoComponent,
  },
  created() {
    this.getStatusList();
  },
  watch: {
    searchTodoStatusIndex: function () {
      this.loadSelectedTodoStatusIds();
    },
  },
  methods: {
    loadSelectedTodoStatusIds() {
      let tempSearchTodoStatusIds = [];
      this.searchTodoStatusIndex.forEach((item) => {
        tempSearchTodoStatusIds.push(this.todoStatusList[item].statusId);
      });
      this.searchTodoStatusIds = tempSearchTodoStatusIds;
      this.getTodoSearch();
    },
    getStatusList() {
      this.$axios.get("todo/get_status_list").then((response) => {
        response.data.forEach((todoStatus, index) => {
          todoStatus;
          this.searchTodoStatusIndex.push(index);
        });
        this.todoStatusList = response.data;
      });
    },
    getTodoSearch() {
      this.todoJsonList = [];
      const searchParam = {
        searchWord: this.searchWord,
        searchTodoStatusIds: this.searchTodoStatusIds,
      };
      this.$axios
        .get("todo/get_todo_search", { params: searchParam })
        .then((response) => {
          this.todoJsonList = response.data;
        });
    },
    closeCreateTodoComponent(isRefresh) {
      this.createTodoModal = false;
      if (isRefresh) {
        this.getTodoSearch();
      }
    },
  },
};
</script>

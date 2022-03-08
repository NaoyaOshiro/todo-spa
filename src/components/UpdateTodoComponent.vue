<template>
  <div>
    <v-bottom-sheet v-model="updateTodoModalComponent" scrollable>
      <v-card tile class="rounded-t-xl" height="600px">
        <v-card-text>
          <v-row class="text-center" justify="center">
            <v-col md="5" sm="12">
              <h3 class="mt-4">ToDoを変更</h3>
            </v-col>
          </v-row>
          <v-row class="text-center" justify="center">
            <v-col md="5" sm="12">
              <v-form>
                <v-text-field
                  v-model="todo.title"
                  label="タイトル"
                  outlined
                ></v-text-field>
                <v-textarea
                  v-model="todo.detail"
                  label="内容"
                  outlined
                  name="input-7-4"
                  rows="3"
                  row-height="15"
                ></v-textarea>
                <v-dialog
                  v-model="toDateModal"
                  ref="dialog"
                  :return-value.sync="todo.toDate"
                  persistent
                  width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="todo.toDate"
                      label="期限日"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                      outlined
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="todo.toDate" scrollable>
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="toDateModal = false">
                      Cancel
                    </v-btn>
                    <v-btn
                      text
                      color="primary"
                      @click="$refs.dialog.save(todo.toDate)"
                    >
                      OK
                    </v-btn>
                  </v-date-picker>
                </v-dialog>
                <v-select
                  v-model="selectTodoStatus"
                  label="ステータス"
                  :items="todoStatusList"
                  item-text="label"
                  item-value="statusId"
                  multiple
                  outlined
                  return-object
                ></v-select>
              </v-form>
              <v-alert
                :value="inputValidateAlert"
                dense
                border="left"
                type="warning"
                transition="scale-transition"
                class="ma-4"
              >
                {{ inputValidateMessage }}
              </v-alert>
              <v-row class="my-4 text-center" justify="center">
                <v-btn class="mr-4" @click="updateTodo()"> 変更 </v-btn>
                <v-btn text @click="deleteTodo()"> 削除 </v-btn>
              </v-row>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-bottom-sheet>
  </div>
</template>


<script>
export default {
  props: ["updateTodoModal", "todo", "todoStatusList"],
  computed: {
    updateTodoModalComponent: {
      get() {
        return this.updateTodoModal;
      },
      set() {
        this.$emit("closeUpdateTodoComponent", this.isDelete);
      },
    },
  },
  data() {
    return {
      inputValidateAlert: false,
      inputValidateMessage: "",
      selectTodoStatus: [],
      isDelete: false,
      toDateModal: false,
    };
  },
  created() {
    this.getSelectedTosoStatus();
  },
  methods: {
    getSelectedTosoStatus() {
      this.todo.todoStatus.forEach((todoStatusId) => {
        let selectTodoStatus = this.todoStatusList.filter((todoStatus) => {
          return todoStatus.statusId === todoStatusId;
        })[0];
        this.selectTodoStatus.push(selectTodoStatus);
      });
    },
    deleteTodo() {
      this.todo.todoStatus = this.selectTodoStatus.value;
      this.$axios
        .delete("todo/delete_todo", { data: { todoId: this.todo.todoId } })
        .then(() => {
          this.isDelete = true;
          this.updateTodoModalComponent = false;
        });
    },
    updateTodo() {
      this.inputValidateAlert = false;
      this.todo.todoStatus = this.selectTodoStatus.map((item) => item.statusId);
      this.$axios.put("todo/update_todo", this.todo).then((response) => {
        if (response.data.message) {
          this.inputValidateMessage = response.data.message;
          this.inputValidateAlert = true;
        } else {
          this.updateTodoModalComponent = false;
        }
      });
    },
  },
};
</script>

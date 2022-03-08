<template>
  <div>
    <v-bottom-sheet v-model="createTodoModalComponent" scrollable>
      <v-card tile class="rounded-t-xl" height="600px">
        <v-card-text>
          <v-row class="text-center" justify="center">
            <v-col md="5" sm="12">
              <h3 class="mt-4">ToDoを作成</h3>
            </v-col>
          </v-row>
          <v-row class="text-center" justify="center">
            <v-col md="5" sm="12">
              <v-form>
                <v-text-field
                  v-model="newTodoJson.title"
                  label="タイトル"
                  outlined
                ></v-text-field>
                <v-textarea
                  v-model="newTodoJson.detail"
                  label="内容"
                  outlined
                  rows="3"
                  row-height="15"
                ></v-textarea>
                <v-dialog
                  v-model="toDateModal"
                  ref="dialog"
                  :return-value.sync="newTodoJson.toDate"
                  width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="newTodoJson.toDate"
                      label="期限日"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                      outlined
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="newTodoJson.toDate" scrollable>
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="toDateModal = false">
                      Cancel
                    </v-btn>
                    <v-btn
                      text
                      color="primary"
                      @click="$refs.dialog.save(newTodoJson.toDate)"
                    >
                      OK
                    </v-btn>
                  </v-date-picker>
                </v-dialog>
              </v-form>
            </v-col>
          </v-row>
          <v-row class="my-4 text-center" justify="center">
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
          </v-row>
          <v-row class="my-4 text-center" justify="center">
            <v-btn @click="createTodo()"> 作成 </v-btn>
          </v-row>
        </v-card-text>
      </v-card>
    </v-bottom-sheet>
  </div>
</template>


<script>
export default {
  props: ["createTodoModal"],
  computed: {
    createTodoModalComponent: {
      get() {
        return this.createTodoModal;
      },
      set() {
        this.$emit("closeCreateTodoComponent", this.isRefresh);
      },
    },
  },
  data() {
    return {
      inputValidateAlert: false,
      inputValidateMessage: "",
      isRefresh: false,
      newTodoJson: {
        title: "",
        detail: "",
        toDate: this.getNextMonth(),
      },
      toDateModal: false,
    };
  },
  methods: {
    createTodo() {
      this.inputValidateAlert = false;
      this.$axios
        .post("todo/create_todo", this.newTodoJson)
        .then((response) => {
          if (response.data.message) {
            this.inputValidateMessage = response.data.message;
            this.inputValidateAlert = true;
          } else {
            this.isRefresh = true;
            this.createTodoModalComponent = false;
          }
        });
    },
    getNextMonth() {
      var date = new Date();
      var nextMonth = new Date(
        date.getFullYear(),
        date.getMonth() + 1,
        date.getDate()
      );
      return (
        nextMonth.getFullYear() +
        "-" +
        (nextMonth.getMonth() + 1) +
        "-" +
        nextMonth.getDate()
      );
    },
  },
};
</script>

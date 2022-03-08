<template>
  <div>
    <v-card flat max-width="400">
      <v-card-text>
        <h2 class="my-6">ユーザー作成</h2>
        <v-form ref="form">
          <v-text-field
            v-model="user.userName"
            label="ユーザー名"
            outlined
            prepend-inner-icon="mdi-account"
          ></v-text-field>
          <v-text-field
            v-model="user.password"
            label="パスワード"
            prepend-inner-icon="mdi-lock"
            class="input-group--focused"
            :append-icon="passwordShow ? 'mdi-eye' : 'mdi-eye-off'"
            :type="passwordShow ? 'text' : 'password'"
            outlined
            @click:append="passwordShow = !passwordShow"
          ></v-text-field>
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
        <v-btn
          class="mb-4"
          :createUserLoading="createUserLoading"
          :disabled="createUserLoading"
          rounded
          outlined
          block
          @click="createUser()"
        >
          ユーザー作成
        </v-btn>
        <v-btn text block to="/signin"> ログインページへ </v-btn>
      </v-card-text>
    </v-card>
  </div>
</template>


<script>
export default {
  data() {
    return {
      passwordShow: false,
      createUserLoading: false,
      inputValidateAlert: false,
      inputValidateMessage: "",
      user: {
        userName: "",
        password: "",
      },
    };
  },
  methods: {
    createUser() {
      this.inputValidateAlert = false;
      this.createUserLoading = true;
      this.$axios.post("user/create_user", this.user).then((response) => {
        if (response.data.message) {
          this.inputValidateMessage = response.data.message;
          this.inputValidateAlert = true;
          this.createUserLoading = false;
        } else {
          this.signin(response.data);
        }
      });
    },
    signin(userData) {
      localStorage.clear();
      this.$store.commit("setUserData", userData);
      this.$store.commit("setSignin", true);
      window.location.href = "/";
    },
  },
};
</script>

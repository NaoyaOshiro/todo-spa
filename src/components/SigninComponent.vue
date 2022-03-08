<template>
  <div>
    <v-card flat max-width="400">
      <v-card-text>
        <h2 class="my-6">ログイン</h2>
        <v-form ref="form">
          <v-text-field
            v-model="user.userName"
            label="ユーザー名"
            prepend-inner-icon="mdi-account"
            outlined
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
          border="left"
          type="warning"
          transition="scale-transition"
          class="ma-4"
        >
          {{ inputValidateMessage }}
        </v-alert>
        <v-btn
          class="mb-4"
          :signinUserLoading="signinUserLoading"
          :disabled="signinUserLoading"
          rounded
          outlined
          block
          @click="signinUser()"
        >
          ログイン
        </v-btn>
        <v-btn text block to="/signup"> ユーザー作成ページへ </v-btn>
      </v-card-text>
    </v-card>
  </div>
</template>


<script>
export default {
  data() {
    return {
      passwordShow: false,
      signinUserLoading: false,
      inputValidateAlert: false,
      inputValidateMessage: "",
      user: {
        userName: "",
        password: "",
      },
    };
  },
  methods: {
    signinUser() {
      this.inputValidateAlert = false;
      this.signinUserLoading = true;
      this.$axios.post("user/signin_user", this.user).then((response) => {
        if (response.data.message) {
          this.inputValidateMessage = response.data.message;
          this.inputValidateAlert = true;
          this.signinUserLoading = false;
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

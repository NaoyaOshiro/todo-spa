<template>
  <v-row class="text-center">
    <v-col>
      <v-btn @click="signout()"> ログアウト </v-btn>
    </v-col>
  </v-row>
</template>


<script>
export default {
  methods: {
    signout() {
      localStorage.clear();
      window.location.href = "/";
    },
  },
};
</script>

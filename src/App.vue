<template>
  <v-app>
    <v-app-bar app color="#FFFFFF" dense>
      <v-toolbar-title><v-btn text to="/"> ToDo </v-btn></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-menu transition="slide-y-transition" open-on-hover offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn text v-bind="attrs" v-on="on">
            {{ user ? user.userName : null }}
            <v-icon> mdi-menu-down </v-icon>
          </v-btn>
        </template>
        <v-list-item-group>
          <v-list dense>
            <v-list-item
              v-for="(item, index) in menuList"
              :key="index"
              to="/signout"
            >
              <v-list-item-title>
                {{ item.title }}
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-list-item-group>
      </v-menu>
    </v-app-bar>
    <v-row align="start" justify="center" class="ma-0">
      <v-col md="8" sm="12">
        <v-main>
          <router-view class="mt-10 mb-14" />
        </v-main>
      </v-col>
    </v-row>
  </v-app>
</template>


<script>
export default {
  data() {
    return {
      user: this.$store.getters.getUserData,
      menuList: [{ title: "ログアウト" }],
    };
  },
};
</script>


<style lang="scss">
#app {
  background-color: #f5f5f5;
}
</style>

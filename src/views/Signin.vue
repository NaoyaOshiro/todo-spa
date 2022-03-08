<template>
  <div>
    <v-row>
      <v-col align="center">
        <SigninComponent />
      </v-col>
    </v-row>
  </div>
</template>


<script>
import SigninComponent from "@/components/SigninComponent";

export default {
  components: {
    SigninComponent,
  },
};
</script>

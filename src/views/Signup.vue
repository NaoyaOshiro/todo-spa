<template>
  <div>
    <v-row>
      <v-col align="center">
        <SignupComponent />
      </v-col>
    </v-row>
  </div>
</template>


<script>
import SignupComponent from "@/components/SignupComponent";

export default {
  components: {
    SignupComponent,
  },
};
</script>

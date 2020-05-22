<template>
  <v-app>
    <v-row justify="center" align-content="center">
      <div class="space"></div>
      <div class="text-center">
        <v-progress-circular
          indeterminate
          :size="70"
          :width="7"
          color="primary"
        ></v-progress-circular>
      </div>
    </v-row>
  </v-app>
</template>

<style>
.space {
  height: 31%;
}
</style>

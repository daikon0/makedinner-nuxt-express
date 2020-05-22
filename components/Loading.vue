<template>
  <v-app>
    <v-row justify="center" align-content="center">
      <div>
        <div class="space"></div>
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

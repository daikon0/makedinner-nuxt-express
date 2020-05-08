<template>
  <v-app>
    <v-card class="overflow-hidden" height="1000">
      <v-app-bar color="info">
        <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>

        <v-toolbar-title>Make Dinner</v-toolbar-title>
      </v-app-bar>
      <nuxt />

      <v-navigation-drawer v-model="drawer" absolute temporary>
        <v-list nav dense>
          <v-list-item-group
            v-model="group"
            active-class="deep-purple--text text--accent-4"
          >
            <v-list-item to="/mypage">
              <v-list-item-icon>
                <v-icon>mdi-home</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Home</v-list-item-title>
            </v-list-item>

            <v-list-item to="/mypage/menu">
              <v-list-item-icon>
                <v-icon>mdi-account</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Menu</v-list-item-title>
            </v-list-item>

            <v-list-item to="/mypage/selectGenre">
              <v-list-item-icon>
                <v-icon>mdi-account</v-icon>
              </v-list-item-icon>
              <v-list-item-title>MakeDinner</v-list-item-title>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>
    </v-card>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    drawer: false,
    group: ''
  })
}
</script>

<!-- <div>
    <nav class="navbar navvbar-light bg-light">
      <div class="navbar-header">
        <nuxt-link to="/mypage" class="navbar-brand nav-link">
          Makedinner
        </nuxt-link>
      </div>
    </nav>
    <nuxt />
  </div> -->

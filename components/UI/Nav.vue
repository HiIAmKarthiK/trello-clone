<template>
  <div class="header">
    <v-app-bar app class="header__nav">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon
      ><v-toolbar-title @click="toBoards" class="logo"
        ><h2>TRELLO CLONE</h2></v-toolbar-title
      >
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" absolute bottom temporary>
      <v-list nav dense>
        <v-list-item-group active-class="deep-purple--text text--accent-4">
          <v-list-item @click="toBoards">
            <v-list-item-title
              ><v-icon>mdi-view-dashboard-variant-outline</v-icon>&nbsp;&nbsp;<b
                >My Boards</b
              ></v-list-item-title
            >
          </v-list-item>

          <v-list-item @click="signout">
            <v-list-item-title>
              <v-icon>mdi-exit-to-app</v-icon>&nbsp;&nbsp;<b
                >Sign out</b
              ></v-list-item-title
            >
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
    };
  },
  methods: {
    signout() {
      this.$fire.auth.signOut();
    },
    toBoards() {
      this.$router.push(`/`);
    },
  },
};
</script>

<style lang="scss" scoped>
.logo {
  cursor: pointer;
}
</style>

<template>
  <v-app>
    <v-main>
      <Nav />
      <Nuxt />
    </v-main>
  </v-app>
</template>

<script>
import Nav from '~/components/UI/Nav';

export default {
  name: 'DefaultLayout',
  components: {
    Nav,
  },
  async created() {
    await this.$store.dispatch('boards/setBoards');
  },
};
</script>

<template>
  <div class="boards">
    <v-card class="board" :style="boardStyle" @click="goToBoard">
      <v-card-title>{{ board.title }}</v-card-title>
      <v-card-subtitle>
        created {{ board.dateCreated | daysDuration }}
      </v-card-subtitle>
    </v-card>
  </div>
</template>

<script>
export default {
  props: {
    board: {
      type: Object,
    },
  },
  computed: {
    boardStyle() {
      return this.board.image.downloadURL != ''
        ? `background:url(${this.board.image.downloadURL});`
        : this.board.color != ''
        ? `background-color:${this.board.color}`
        : '';
    },
  },
  methods: {
    goToBoard() {
      this.$router.push(`board/${this.board.id}`);
    },
  },
};
</script>

<style lang="scss" scoped>
.board {
  height: 300px;
  width: 300px;
  background-size: cover !important;
  background-repeat: no-repeat !important;
  cursor: pointer;
}
</style>

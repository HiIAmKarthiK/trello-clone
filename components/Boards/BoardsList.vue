<template>
  <div class="boards-list">
    <p v-if="boards.length == 0">Please create a board to see one.</p>
    <Board v-for="board in boards" :key="board.id" :board="board" />
  </div>
</template>

<script>
import Board from '~/components/Boards/Board';
export default {
  props: {
    boards: {
      type: Array,
      required: true,
    },
  },
  components: {
    Board,
  },
};
</script>

<style lang="scss" scoped>
.boards-list {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  flex-wrap: wrap;
  padding: $container-padding;

  @media (min-width: $mobile-breakpoint) {
    justify-content: start;
  }
}
</style>

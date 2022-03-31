<template>
  <div class="lists-container">
    <div class="lists">
      <List
        v-for="(list, listIndex) in lists"
        :key="list.id"
        :list="list"
        :listIndex="listIndex"
        @onCardCreate="createCard"
        @onDeleteList="deleteList"
        @onDeleteCard="deleteCard"
        @onCardDragStart="cardDragStart"
        @onDrop="listDrop"
      />
    </div>
  </div>
</template>

<script>
import List from '@/components/Lists/List';
export default {
  components: {
    List,
  },
  props: {
    lists: {
      type: Array,
      required: true,
    },
  },
  methods: {
    createCard(obj) {
      this.$emit('onCardCreate', {
        ...obj,
      });
    },
    deleteList(listId) {
      this.$emit('onDeleteList', listId);
    },
    deleteCard(listAndCardId) {
      this.$emit('onDeleteCard', { ...listAndCardId });
    },
    cardDragStart(listIdAndCard) {
      this.$emit('onCardDragStart', { ...listIdAndCard });
    },
    listDrop(listId) {
      this.$emit('onListDrop', { ...listId });
    },
  },
};
</script>

<style lang="scss" scoped>
.lists-container {
  padding: $container-padding;

  .lists {
    display: flex;
    gap: $container-padding;
    // min-height: 60vh;
  }
}
</style>

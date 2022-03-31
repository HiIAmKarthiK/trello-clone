<template>
  <div class="list" @drop="onDrop(list.id)" @dragover.prevent>
    <div class="list-header">
      <h2 title="list-title">{{ list.title }}</h2>

      <v-icon class="trash-icon" @click="deleteList(list.id)"
        >mdi-trash-can-outline</v-icon
      >
    </div>
    <div class="list-body">
      <v-card
        :draggable="true"
        class="p1 display-card"
        v-for="card in getCards"
        :key="card.id"
        @dragstart="cardDragStart($event, list.id, card)"
      >
        <p>{{ card.title }}</p>
        <v-icon class="card-close-icon" @click="deleteCard(list.id, card.id)"
          >mdi-close</v-icon
        >
      </v-card>
      <Card
        :listId="list.id"
        :listIndex="listIndex"
        @onCardCreate="createCard"
      />
    </div>
    <!-- <div class="list-actions">
      <v-icon class="plus-icon" size="55">mdi-plus-circle</v-icon>
    </div> -->
  </div>
</template>

<script>
import Card from '@/components/Cards/Card';

export default {
  props: ['list', 'listIndex'],
  components: {
    Card,
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
    deleteCard(listId, cardId) {
      this.$emit('onDeleteCard', { listId, cardId });
    },
    cardDragStart(e, listId, card) {
      this.$emit('onCardDragStart', { listId, card });
    },
    onDrop(listId) {
      this.$emit('onDrop', { listId });
    },
  },
  computed: {
    getCards() {
      return this.list.cards;
    },
  },
};
</script>

<style lang="scss" scoped>
.list {
  width: 350px;
  height: fit-content;
  padding: $container-padding;
  background-color: rgb(228 228 228 / 75%);
  border-radius: 12px;
  position: relative;

  .list-header {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;

    .trash-icon {
      position: absolute;
      right: 0;
      color: $trash-icon-color;
    }
  }

  .list-body {
    display: flex;
    flex-direction: column;
    row-gap: $container-padding;

    .display-card {
      position: relative;

      p {
        margin-right: 1.6rem;
      }
    }

    .card-close-icon {
      position: absolute;
      top: 1rem;
      right: 1rem;
    }
  }

  .list-actions {
    .plus-icon {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      right: 50%;
      transform: translateY(50%);
      bottom: 0;
      cursor: pointer;
    }
  }
}
</style>

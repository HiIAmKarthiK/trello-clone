<template>
  <v-card class="p-p5">
    <v-form class="card-form">
      <textarea
        class="card-input"
        rows="1"
        ref="cardVal"
        data-gramm="false"
        data-gramm_editor="false"
        data-enable-grammarly="false"
        placeholder="Enter card Title"
        @focus="buttonShow = true"
        @input="resize($event)"
      />
      <v-btn @click="emitTitle" v-if="buttonShow" type="button">ADD CARD</v-btn>
    </v-form>
  </v-card>
</template>

<script>
export default {
  props: ['listId', 'listIndex'],
  data() {
    return {
      buttonShow: false,
    };
  },
  methods: {
    /// text area resize dynamically
    resize(e) {
      e.target.style.height = 'auto';
      e.target.style.height = `${e.target.scrollHeight}px`;
    },
    emitTitle() {
      this.buttonShow = true;
      this.$emit('onCardCreate', {
        title: this.$refs.cardVal.value.trim(),
        listIndex: this.listIndex,
        listId: this.listId,
      });
      this.$refs.cardVal.value = '';
    },
  },
};
</script>

<style lang="scss" scoped>
.card-form {
  display: flex;
  flex-direction: column;

  .card-input {
    border: none;
    outline: none;
    padding: 0.7rem;
    resize: none;
  }
}
</style>

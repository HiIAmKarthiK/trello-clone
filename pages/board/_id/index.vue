<template>
  <div class="specific-board">
    <v-dialog v-model="dialogOpen" max-width="600" persistent>
      <v-card class="card">
        <div class="dialog-container">
          <v-form ref="form">
            <div class="dialog-header flex-sb">
              <h2>List Title</h2>
              <v-icon @click="dialogOpen = false">mdi-close</v-icon>
            </div>
            <v-text-field
              label="List Title"
              v-model="list.title"
              :rules="listRules"
              required
            ></v-text-field>
            <v-spacer />
            <div class="dialog-footer">
              <v-btn rounded color="primary" @click="createList"> SET </v-btn>
            </div>
          </v-form>
        </div>
      </v-card>
    </v-dialog>
    <div class="background" :style="getStyle">
      <div class="board-info flex-sb">
        <div class="board-content">
          <h1>
            {{ board.title }}
            <v-tooltip right>
              <template v-slot:activator="{ attrs, on }">
                <v-icon
                  v-bind="attrs"
                  v-on="on"
                  class="trash-icon"
                  @click="deleteBoard"
                  >mdi-trash-can-outline</v-icon
                >
              </template>
              <span>Delete Board</span>
            </v-tooltip>
          </h1>
          <h3>{{ board.dateCreated | date }}</h3>
        </div>
        <v-btn depressed large @click="dialogOpen = true">CREATE LIST</v-btn>
      </div>
      <ListsList
        :lists="board.lists"
        @onCardCreate="createCard"
        @onDeleteList="deleteList"
        @onDeleteCard="deleteCard"
        @onCardDragStart="cardAndListHandler"
        @onListDrop="droppedAtList"
      />
    </div>
  </div>
</template>

<script>
import { v4 as uuid } from 'uuid';
import ListsList from '@/components/Lists/ListsList';
import { deleteObject } from 'firebase/storage';
export default {
  components: {
    ListsList,
  },
  data() {
    return {
      addButtonShow: false,
      dialogOpen: false,
      fromCardAndListId: null,
      list: {
        title: '',
        cards: null,
        id: null,
        dateCreated: null,
      },
      listRules: [(v) => !!v || 'Title is required'],
      card: {
        title: '',
        id: null,
        dateCreated: null,
      },
      cardRules: [(v) => !!v || 'Title is required'],
    };
  },
  created() {
    $nuxt.$fire.firestore
      .collection('users')
      .doc($nuxt.$fire.auth.currentUser.uid)
      .collection('boards')
      .doc(this.board.id)
      .onSnapshot((doc) => {
        // like sockets
        this.board = doc.data();
      });
  },
  async asyncData({ params }) {
    let boardRef = await $nuxt.$fire.firestore
      .collection('users')
      .doc($nuxt.$fire.auth.currentUser.uid)
      .collection('boards')
      .doc(params.id);

    let boardData = {};

    let doc = await boardRef.get();

    if (doc.exists) {
      boardData = doc.data();
      boardData.id = params.id;
    }

    return { board: boardData };
  },
  computed: {
    getStyle() {
      return this.board.image.downloadURL != ''
        ? `background:url(${this.board.image.downloadURL});`
        : this.board.color != ''
        ? `background-color:${this.board.color}`
        : '';
    },
  },
  methods: {
    createList() {
      if (this.$refs.form.validate()) {
        this.list.cards = [];
        this.list.dateCreated = Date.now();
        this.list.id = uuid();

        this.board.lists.push(this.list);
        this.dialogOpen = false;
        this.updateBoard();
        this.$refs.form.reset();
      }
    },
    createCard({ title, listIndex, listId }) {
      if (title != '') {
        this.card.dateCreated = Date.now();
        this.card.id = uuid();
        this.card.title = title;
        this.board.lists
          .find((list) => list.id === listId)
          .cards.push(this.card);
        this.updateBoard();
      }
    },
    cardAndListHandler(cardAndListId) {
      this.fromCardAndListId = cardAndListId;
    },
    droppedAtList(listIdObj) {
      const removableCardIndex = this.board.lists
        .find((list) => list.id == this.fromCardAndListId.listId)
        .cards.findIndex((card) => card.id == this.fromCardAndListId.card.id);

      this.board.lists
        .find((list) => list.id == listIdObj.listId)
        .cards.unshift(this.fromCardAndListId.card);
      console.log(removableCardIndex);

      this.board.lists
        .find((list) => list.id == this.fromCardAndListId.listId)
        .cards.splice(removableCardIndex, 1);

      this.updateBoard();
    },
    async updateBoard() {
      await $nuxt.$fire.firestore
        .collection('users')
        .doc($nuxt.$fire.auth.currentUser.uid)
        .collection('boards')
        .doc(this.board.id)
        .update(this.board, { merge: true }); // like patch request
    },
    deleteList(listId) {
      this.board.lists = this.board.lists.filter((list) => list.id != listId);
      this.updateBoard();
    },
    deleteCard({ listId, cardId }) {
      let aList = this.board.lists.find((list) => list.id === listId);
      const listIndex = this.board.lists.findIndex(
        (list) => list.id === listId
      );
      const cards = aList.cards.filter((card) => card.id != cardId);
      aList.cards = cards;
      this.board.lists[listIndex] = aList;
      this.updateBoard();
    },
    deleteBoard() {
      $nuxt.$fire.firestore
        .collection('users')
        .doc($nuxt.$fire.auth.currentUser.uid)
        .collection('boards')
        .doc(this.board.id)
        .delete();
      this.$router.replace('/');

      // delete respective image from storage
      const imagePath =
        'images' +
        '/' +
        this.$fire.auth.currentUser.uid +
        '/' +
        'boards' +
        '/' +
        this.board.id +
        '/' +
        this.board.image.name;

      if (imagePath != '' && this.board.image.name) {
        const deleteRef = this.$fire.storage.ref(imagePath);

        // Delete the file
        deleteObject(deleteRef)
          .then(() => {
            // File deleted successfully
          })
          .catch((error) => {
            console.log(error);
            // Uh-oh, an error occurred!
          });
      }

      // remove board from store
      $nuxt.$store.dispatch('boards/deleteBoard', this.board.id);
    },
  },
};
</script>

<style lang="scss" scoped>
.background {
  height: calc(100vh - 65px);
  background-position: center !important;
  background-size: cover !important;
  background-repeat: no-repeat !important;
  overflow: scroll;

  .board-info {
    padding: $container-padding;
  }
}

.trash-icon {
  color: $trash_icon_color;
  cursor: pointer;
}

.dialog-container {
  padding: $container-padding;

  .dialog-footer {
    display: flex;
    justify-content: flex-end;
  }
}
</style>

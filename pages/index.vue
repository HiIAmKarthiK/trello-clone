<template>
  <div class="index">
    <div class="boards-container">
      <div class="board-header flex-sb align-center">
        <h1>My Boards</h1>
        <div class="board-actions">
          <v-btn @click="addBoard">ADD BOARD</v-btn>
        </div>
      </div>
      <BoardsList :boards="getBoards" />

      <v-dialog v-model="dialogOpen" max-width="355" persistent>
        <v-card class="card">
          <div class="dialog-container">
            <div class="flex-sb">
              <h2>Add Board</h2>
              <v-icon @click="closeBoard">mdi-close</v-icon>
            </div>
            <v-form ref="form" class="flex-col">
              <v-text-field
                v-model="board.title"
                :rules="titleRules"
                label="Title"
                required
                class="input"
              ></v-text-field>
              <v-btn v-if="enableColor === false" @click="enableColor = true">
                Choose board color
              </v-btn>

              <br />
              <v-color-picker
                v-if="enableColor === true"
                v-model="board.color"
                dot-size="25"
                hide-inputs
                swatches-max-height="100"
              ></v-color-picker>

              <div
                @click="chooseImage"
                class="choose-image"
                :style="`background-image: url('${
                  board.image.downloadURL ? board.image.downloadURL : ''
                }');`"
              >
                <template v-if="fileToUpload.progress === 'add-image'">
                  <v-icon>mdi-camera</v-icon>
                  <p>Add a board background</p>
                  <input
                    type="file"
                    accept="jpg, jpeg, png"
                    ref="boardBackground"
                    multiple
                    color="#f66f26"
                    buffer-value="0"
                    @click="onFileClicked($event)"
                    @change="onFileSelected($event)"
                    style="display: none"
                  />
                </template>
                <template v-else-if="fileToUpload.progress === true">
                  <div class="text-center">
                    <v-progress-circular
                      :size="50"
                      color="green"
                      indeterminate
                    ></v-progress-circular>
                  </div>
                </template>
              </div>

              <v-btn color="primary" @click="createBoard">Submit</v-btn>
            </v-form>
          </div>
        </v-card>
      </v-dialog>
      <v-snackbar
        :timeout="4000"
        v-model="snackbar"
        color="green accent-2"
        absolute
        top
        center
      >
        {{ text }}
      </v-snackbar>
    </div>
  </div>
</template>

<script>
import Nav from '~/components/UI/Nav';
import BoardsList from '~/components/Boards/BoardsList';
import { deleteObject } from 'firebase/storage';
import { v4 as uuid } from 'uuid';
export default {
  name: 'IndexPage',
  components: {
    Nav,
    BoardsList,
  },
  data() {
    return {
      dialogOpen: false,
      snackbar: false,
      enableColor: false,
      boardAndImageId: '',
      imagePath: '',
      fileToUpload: {},
      text: ``,
      board: {
        title: '',
        color: '',
        image: {
          downloadURL: '',
        },
        lists: null,
      },
      titleRules: [(v) => !!v || 'Title is required'],
    };
  },
  computed: {
    getBoards() {
      return this.$store.getters['boards/getBoards'];
    },
  },
  methods: {
    addBoard() {
      /// used for board id and image id inside storage
      this.boardAndImageId = uuid();
      this.dialogOpen = true;
      // clearing the cached image on board open
      this.board.image.downloadURL = '';
      this.fileToUpload.progress = 'add-image';
    },
    closeBoard() {
      this.dialogOpen = false;

      // closing color picker
      this.enableColor = false;

      // deleing image if not submitted or when board is closed
      if (this.imagePath != '') {
        const deleteRef = this.$fire.storage.ref(this.imagePath);

        // Delete the file
        deleteObject(deleteRef)
          .then(() => {
            // File deleted successfully
          })
          .catch((error) => {
            // Uh-oh, an error occurred!
          });
      }
    },
    chooseImage() {
      this.$refs['boardBackground'].click();
    },
    onFileClicked($event) {
      $event.target.value = '';
    },
    onFileSelected(event) {
      try {
        /// Process Selected Files
        let file = event.target.files[0];
        this.fileToUpload = {
          file,
          originalName: file.name,
          loading: false,
          progress: true,
          success: false,
          error: false,
          previewPath: '',
          uuid: uuid(),
        };

        const itemFilename =
          this.fileToUpload.uuid + '-' + this.fileToUpload.file.name;

        const itemName =
          'images' +
          '/' +
          this.$fire.auth.currentUser.uid +
          '/' +
          'boards' +
          '/' +
          this.boardAndImageId +
          '/' +
          itemFilename;
        this.imagePath = itemName;
        this.uploadFiles(itemFilename, itemName);
      } catch (error) {}
    },
    uploadFiles(itemFilename, itemName) {
      const itemRef = $nuxt.$fire.storage.ref(`${itemName}`);

      const itemMeta = {
        customMetadata: {
          owner: this.$fire.auth.currentUser.uid,
        },
        contentType: this.fileToUpload.file.type,
      };

      // Action upload
      const task = itemRef.put(this.fileToUpload.file, itemMeta);

      // Watch for upload status Changes
      return task.on(
        'state_changed',
        // Handle progress
        (progress) => {
          // Set upload progress on item
          this.fileToUpload.progress = true;
        },
        // Handle unsuccessful uploads
        (error) => {
          console.log(error);
          this.fileToUpload.failed = true;
          this.fileToUpload.error = error;
          return false;
        },
        // Handle successful uploads on complete
        async () => {
          const url = await task.snapshot.ref
            .getDownloadURL()
            .catch((e) => false);
          // Store form media
          this.board.image = {
            name: itemFilename,
            originalName: this.fileToUpload.file.name,
            downloadURL: url,
            uuid: this.fileToUpload.uuid,
          };
          this.fileToUpload.progress = false;
        }
      );
    },
    async createBoard() {
      if (this.$refs.form.validate()) {
        this.board.dateCreated = Date.now();
        this.board.lists = [];
        this.board.id = this.boardAndImageId;
        this.dialogOpen = false;

        let clientBoard = {
          title: this.board.title,
          dateCreated: this.board.dateCreated,
          color: this.board.color,
          image: {
            downloadURL: this.board.image.downloadURL,
          },
          lists: [],
          id: this.boardAndImageId,
        };

        await this.$fire.firestore
          .collection('users')
          .doc(this.$fire.auth.currentUser.uid)
          .collection('boards')
          .doc(this.boardAndImageId)
          .set(this.board);
        this.$refs.form.reset();
        this.snackbar = true;
        this.text = 'Board created successfully';

        // push to client also
        this.$store.dispatch('boards/addBoard', clientBoard);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.boards-container {
  display: flex;
  flex-direction: column;

  .board-header {
    padding: $container-padding;
  }
}

.card {
  border-radius: 10px;
}

.choose-image {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  column-gap: 0.3rem;
  height: 150px;
  background-size: cover;
  background-position: center;

  p {
    margin: 0;
  }
}

.dialog-container {
  display: flex;
  flex-direction: column;
  padding: $container-padding;
}

.boards-list {
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
}
</style>

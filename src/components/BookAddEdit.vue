<template>
    <div>
        <b-container>
            <b-row>
                <b-col></b-col>
                <b-col cols="6">
                    <b-form @submit="onSubmit">
                        <b-form-group
                            v-show="isEdit"
                            id="id-group-1"
                            label="Book id:"
                            label-for="input-id"
                            description="Not editable"
                        >
                            <b-form-input
                                id="input-id"
                                v-model="form.bookId"
                                required
                                readonly
                            ></b-form-input>
                        </b-form-group>
                        <b-form-group
                            id="input-group-2"
                            label="Book name:"
                            label-for="input-name"
                        >
                            <b-form-input
                            id="input-name"
                            v-model="form.bookName"
                            required
                            ></b-form-input>
                        </b-form-group>
                        <b-form-group
                            id="input-group-3"
                            label="Author name:"
                            label-for="select-author"
                        >
                            <b-form-select id="select-author" v-model="form.selectedAuthors" :options="form.authorList" multiple :select-size="6"></b-form-select>
                        </b-form-group>
                        <b-form-group
                            id="input-group-4"
                            label="Genre name:"
                            label-for="select-genre"
                        >
                            <b-form-select id="select-genre" v-model="form.selectedGenres" :options="form.genreList" multiple :select-size="6"></b-form-select>
                        </b-form-group>
                        <b-button type="submit" variant="primary">Save</b-button>
                    </b-form>
                </b-col>
                <b-col></b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      isEdit: null,
      form: {
        bookId: null,
        bookName: null,
        authorList: [],
        genreList: [],
        selectedAuthors: [],
        selectedGenres: []
      }
    }
  },
  mounted () {
    if (this.$route.params.book != null) {
      this.isEdit = true
      const bookItem = this.$route.params.book
      this.form.bookId = bookItem.id
      this.form.bookName = bookItem.name
      this.form.selectedAuthors = bookItem.authorList
      this.form.selectedGenres = bookItem.genreList
    }
    this.getAuthors()
    this.getGenres()
  },
  methods: {
    getAuthors () {
      axios
        .get('/authors')
        .then(response => (this.form.authorList = response.data.map(d => { return { value: d, text: d.name } })))
    },
    getGenres () {
      axios
        .get('/genres')
        .then(response => (this.form.genreList = response.data.map(d => { return { value: d, text: d.name } })))
    },
    onSubmit (event) {
      event.preventDefault()
      if (this.isEdit) {
        axios
          .put('/book/' + this.form.bookId, null, {
            data: {
              name: this.form.bookName,
              authors: this.form.selectedAuthors,
              genres: this.form.selectedGenres
            }
          })
          .then(response => {})
          .catch(e => {
            this.errors.push(e)
          })
        this.$router.push({ path: '/' })
      } else {
        axios
          .post('/book', null, {
            data: {
              name: this.form.bookName,
              authors: this.form.selectedAuthors,
              genres: this.form.selectedGenres
            }
          })
          .then(response => {})
          .catch(e => {
            this.errors.push(e)
          })
        this.$router.push({ path: '/' })
      }
    }
  }
}
</script>

<template>
  <div>
    <b-container>
      <b-row>
        <b-col>
          <h1>Books</h1>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-table striped bordered hover :fields="fields" :items="items">
            <template #cell(comments)="data">
              <router-link id="comment-icon" :to="{ name: 'BookComments', params: {bookId: data.item.id}}">
                  <b-icon icon="chat-square" class="text-dark"></b-icon>
              </router-link>
              <b-tooltip target="comment-icon" triggers="hover">
                Read and edit comments
              </b-tooltip>
            </template>
            <template #cell(edit)="data">
              <router-link id="edit-icon" :to="{ name: 'BookEdit', params: {book: data.item} }">
                <b-icon icon="gear"  animation="spin" class="text-dark"></b-icon>
              </router-link>
              <b-tooltip target="edit-icon" triggers="hover">
                Edit book
              </b-tooltip>
            </template>
            <template #cell(delete)="data">
                <a id="delete-icon" href="">
                 <b-icon @click="delteItem(data.item.id)" icon="trash"  class="text-dark"></b-icon>
                </a>
                <b-tooltip target="delete-icon" triggers="hover">
                 Delete book
                </b-tooltip>
            </template>
          </b-table>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <router-link to='/book/edit' class="text-dark"><b-button variant="primary">Add new</b-button></router-link>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      fields: [
        { key: 'id', label: 'ID' },
        { key: 'name', label: 'Book Name' },
        {
          key: 'authorList',
          label: 'Authors',
          formatter: value => {
            return value.map(function (item) { return item == null ? '' : item.name }).join(', ')
          }
        },
        {
          key: 'genreList',
          label: 'Genres',
          formatter: value => {
            return value.map(function (item) { return item == null ? '' : item.name }).join(', ')
          }
        },
        { key: 'comments', label: '' },
        { key: 'edit', label: '' },
        { key: 'delete', label: '' }
      ],
      items: null
    }
  },
  mounted () {
    axios
      .get('/books')
      .then(response => (this.items = response.data))
  },
  methods: {
    delteItem (itemId) {
      axios.delete('/book/' + itemId)
        .then(response => {})
        .catch(e => {
          this.errors.push(e)
        })
      this.$router.push({ path: '/' })
    }
  }
}
</script>

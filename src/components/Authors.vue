<template>
  <div>
    <b-container>
      <b-row>
        <b-col>
          <h1>Authors</h1>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-table striped bordered hover :fields="fields" :items="items">
            <template #cell(edit)="data">
              <router-link id="edit-icon" :to="{ name: 'AuthorEdit', params: {item: data.item} }">
                <b-icon icon="gear"  animation="spin" class="text-dark"></b-icon>
              </router-link>
              <b-tooltip target="edit-icon" triggers="hover">
                Edit author
               </b-tooltip>
            </template>
            <template #cell(delete)="data">
                <a id="delete-icon" href="">
                 <b-icon @click="delteItem(data.item.id)" icon="trash"  class="text-dark"></b-icon>
                </a>
                <b-tooltip target="delete-icon" triggers="hover">
                 Delete author
                </b-tooltip>
            </template>
          </b-table>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <router-link to='/author/edit' class="text-dark"><b-button variant="primary">Add new</b-button></router-link>
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
        { key: 'name', label: 'Author Name' },
        { key: 'edit', label: '' },
        { key: 'delete', label: '' }
      ],
      items: null
    }
  },
  mounted () {
    axios
      .get('/authors')
      .then(response => (this.items = response.data))
  },
  methods: {
    delteItem (itemId) {
      axios.delete('/author/' + itemId)
        .then(response => {})
        .catch(e => {
          this.errors.push(e)
        })
      this.$router.push({ path: '/authors' })
    }
  }
}
</script>

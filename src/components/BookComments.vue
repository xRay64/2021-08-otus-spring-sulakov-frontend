<template>
<div>
    <b-container v-for="comment in comments" :key="comment.id">
    <b-row>
        <b-col></b-col>
        <b-col class="bg-secondary text-white text-left text-wrap shadow" cols="6">
            {{ comment.text }}
        </b-col>
        <b-col></b-col>
    </b-row>
    <b-row>
            &nbsp;
    </b-row>
    </b-container>
    <b-row>
        <b-col></b-col>
        <b-col>
            <b-form @submit="onSubmit">
                    <b-form-textarea
                        id="textarea"
                        v-model="newCommentText"
                        placeholder="Enter new comment here..."
                        rows="3"
                        max-rows="6"
                        ></b-form-textarea>
                    <br>
                    <b-button type="submit" variant="primary">Save</b-button>
            </b-form>
        </b-col>
        <b-col></b-col>
    </b-row>
</div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      bookId: null,
      comments: null,
      newCommentText: null
    }
  },
  mounted () {
    if (this.$route.params.bookId != null) {
      this.bookId = this.$route.params.bookId
      this.getComments(this.$route.params.bookId)
    }
  },
  methods: {
    getComments (id) {
      axios
        .get('/book/' + id + '/comments')
        .then(response => {
          this.comments = response.data
        })
    },
    onSubmit (event) {
      var bookId = this.bookId
      event.preventDefault()
      axios
        .post('/book/' + bookId + '/comment', null, {
          params: {
            commentText: this.newCommentText
          }
        })
        .then(response => {
          if (response.status === 200) {
            if (this.comments === '') {
              this.comments = [{ id: 1, text: this.newCommentText }]
            } else {
              this.comments.push({ id: this.comments.lenght + 1, text: this.newCommentText })
            }
            this.newCommentText = ''
          }
        })
        .catch(e => {
          this.errors.push(e)
        })
    }
  }
}
</script>

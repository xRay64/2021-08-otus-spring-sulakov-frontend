<template>
    <div>
        <b-row>
            <b-col></b-col>
            <b-col >
                <b-form @submit="onSubmit">
                    <b-form-group
                        v-show="isEdit"
                        id="input-group-1"
                        label="Author id:"
                        label-for="input-id"
                        description="Not editable"
                    >
                        <b-form-input
                        id="input-id"
                        v-model="form.id"
                        required
                        readonly
                        ></b-form-input>
                    </b-form-group>
                    <b-form-group
                        id="input-group-2"
                        label="Author name:"
                        label-for="input-name"
                    >
                        <b-form-input
                        id="input-name"
                        v-model="form.name"
                        required
                        ></b-form-input>
                    </b-form-group>
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
      isEdit: false,
      form: {
        id: '',
        name: ''
      }
    }
  },
  mounted () {
    if (this.$route.params.item != null) {
      this.form.id = this.$route.params.item.id
      this.form.name = this.$route.params.item.name
      this.isEdit = true
    }
  },
  methods: {
    onSubmit (event) {
      event.preventDefault()
      if (this.isEdit) {
        axios.put('/author/' + this.form.id, null, {
          params: {
            name: this.form.name
          }
        })
          .then(respose => {})
          .catch(e => {
            this.errors.push(e)
          })
      } else {
        axios.post('/author', null, {
          params: {
            name: this.form.name
          }
        })
          .then(respose => {})
          .catch(e => {
            this.errors.push(e)
          })
      }
      this.$router.push({ path: '/authors' })
    }
  }
}
</script>

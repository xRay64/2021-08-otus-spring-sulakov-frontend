<template>
  <div>
    <b-table striped hover :items="items"></b-table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      items: null
    }
  },
  mounted () {
    axios
      .get('/genres')
      .then(response => (this.items = response))
  }
}
</script>

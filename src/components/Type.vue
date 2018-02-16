<template>
  <div class="hello">
    <nav class="navbar navbar-light bg-light static-top">
      <div class="container">
        <a class="navbar-brand" v-bind:href="'/#/'">Pokemon</a>
        <a class="btn btn-primary" v-bind:href="'/#/'">Home</a>
      </div>
    </nav>
    <div class="container margin-content">
      <div class="col-md-12">
        <h1>{{ msg }}</h1>
      </div>
    </div>
    <div class="container margin-content">
      <div v-if="loading" class="loader text-center">
        <img src="./../assets/loader-large.gif" alt="loader">
      </div>
    </div>
    <div class="container margin-content" v-if="!loading">
      <div class="row">
        <div class="col-lg-4 col-md-4 col-sm-6 portfolio-item text-center" v-for="item in response">
          <div class="card h-100">
            <div class="card-body">
              <h2><a v-bind:href="'/#/subtype/'+ item">{{ item }}</a></h2>
            </div>
          </div>
        </div>
      </div>
    </div>      
  </div>
</template>
<script>
import {AXIOS} from './http-common'

export default {
  name: 'Type',
  data () {
      return {
        msg: 'Tipe Pokemon',
        loading: true,
        response: [],
        errors: []
      }
    },
    created () {
      this.callRestService()
    },
    watch: {
      '$route': 'callRestService'
    },
    methods: {
      // Fetches posts when the component is created.
      callRestService () {
        AXIOS.get('types')
          .then(response => {
            // JSON responses are automatically parsed.
            if (response.data.types.length > 0) {
              this.loading = false
              this.response = response.data.types
            }
          })
          .catch(e => {
            this.errors.push(e)
          })
      }
    }
}
</script>
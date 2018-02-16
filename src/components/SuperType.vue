<template>
  <div class="hello">
    <nav class="navbar navbar-light bg-light static-top">
      <div class="container">
        <a class="navbar-brand" href="#">Pokemon</a>
        <a class="btn btn-primary" v-bind:href="'/#/'">Home</a>
      </div>
    </nav>
    <div class="container margin-content">
      <div class="row">
        <div class="col-md-9">
          <h1>{{ msg }}</h1>
        </div> 
      </div>
    </div>
    <div class="container margin-content">
      <div v-if="loading" class="loader text-center">
        <img src="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/0.16.1/images/loader-large.gif" alt="loader">
      </div>
    </div>
    <div class="container margin-content" v-if="!loading">
      <div class="row">
        <div class="col-lg-4 col-md-4 col-sm-6 portfolio-item text-center" v-for="item in response">
          <div class="card h-100">
            <div class="card-body">
              <h2><a v-bind:href="'/#/singleimage/'+ $attrs.type + '/' + $attrs.subtype + '/' + item">{{ item }}</a></h2>
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
  name: 'SuperType',
  data () {
      return {
        msg: 'Super Tipe Pokemon',
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
        AXIOS.get('supertypes')
          .then(response => {
            // JSON responses are automatically parsed.
            if (response.data.supertypes.length > 0) {
              this.loading = false
              this.response = response.data.supertypes
            }
            
          })
          .catch(e => {
            this.errors.push(e)
          })
      }
    }
}
</script>
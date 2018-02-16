<template>
  <div class="hello">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container">
        <a class="navbar-brand" v-bind:href="'/#/'">{{ msg }}</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse justify-content-end">
          <ul class="navbar-nav navbar-right">
            <li class="nav-item">
              <a class="nav-link" v-bind:href="'/#/type/'">{{ msgtipe }}
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" v-bind:href="'/#/subtype/'">{{ msgsubtipe }}
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" v-bind:href="'/#/supertype/'">{{ msgsupertipe }}
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" v-bind:href="'/#/login/'">{{ msgLogin }}</a>
            </li>
          </ul>
        </div>      
      </div>
    </nav>
    <div class="container margin-content">
      <div class="row">
        <div class="col-md-9">
          <h1>{{ msgHome }}</h1>
        </div> 
      </div>
    </div>
    <div class="container margin-content">
      <div v-if="loading" class="loader text-center">
        <img src="./../assets/loader-large.gif" alt="loader">
      </div>
    </div>
    <div class="container margin-content" v-if="!loading">
      <div class="row">
        <div class="col-lg-3 col-md-4 col-sm-6 portfolio-item text-center" v-for="item in response">
          <div class="card h-100">
            <div class="card-body">
              <h2><a v-bind:href="'/#/subtypepokemon/'+ item">{{ item }}</a></h2> 
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
  name: 'SubType',
  data () {
    return {
      msgHome: 'Sub Tipe Pokemon',
      msg: 'Pokemon',
      msgtipe: 'Tipe Pokemon',
      msgsubtipe: 'SubTipe Pokemon',
      msgsupertipe: 'SuperTipe Pokemon',
      msgLogin: 'Login',
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
    callRestService () {
      AXIOS.get('subtypes').then(
        response => {
          if (response.data.subtypes.length > 0) {
            this.loading = false
            this.response = response.data.subtypes
          }
        }
      ).catch(
        e => {
          this.errors.push(e)
        }
      )
    }
  }
}
</script>
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
    <div class="header">
      <div class="container text-center">
        <h1>{{ msgTitleHeader }}</h1>
        <div class="form-row">
          <div class="col-md-3">
            <select v-model="selectedtipe" class="form-control">
              <option disabled="" value="">{{ msgPilihTipe }}</option>
              <option v-for="option in options" v-bind:value="option">
                {{ option }}
              </option>
            </select>
          </div>
          <div class="col-md-3">
            <select v-model="selectedsubtipe" class="form-control">
              <option disabled="" value="">{{ msgSubTipe }}</option>
              <option v-for="optionsubtipe in optionssubtipe" v-bind:value="optionsubtipe">
                {{ optionsubtipe }}
              </option>
            </select>
          </div>
          <div class="col-md-3">
            <select v-model="selectedsupertipe" class="form-control">
              <option disabled="" value="">{{ msgSuperTipe }}</option>
              <option v-for="optionsupertipe in optionssupertipe" v-bind:value="optionsupertipe">
                {{ optionsupertipe }}
              </option>
            </select>
          </div>
          <div class="col-md-3">
            <button @click="searchPokemon(selectedtipe, selectedsubtipe, selectedsupertipe)" class="btn btn-block btn-primary">{{ msgCari }}</button>
          </div>
        </div>
      </div>
    </div>
    <div class="container margin-content">
      <div class="col-md-12">
        <h3>{{ msgHome }}</h3>
      </div>
    </div>
    <div class="container margin-content">
      <div v-if="loading" class="loader text-center">
        <img src="./../assets/loader-large.gif" alt="loader">
      </div>
    </div>
    <div class="col-md-12 margin-content" v-if="datatextcards">
        <div>
          <h2>{{ textcards }}</h2>
        </div>
      </div>
    <div class="container margin-content" v-if="!loading">
      <div class="row text-center text-lg-left">
        <div class="col-lg-3 col-md-4 col-xs-6" v-for="item in response">
          <a v-bind:href="'/#/detailimage/'+ item.id" class="d-block mb-4 h-100">
            <img class="img-fluid img-thumbnail lazy-img-fadein" alt="item.name" v-lazy='item.imageUrl' lazy="loading">
          </a>
        </div>
      </div>
    </div>      
  </div>
</template>
<script>
import {AXIOS} from './http-common'

export default {
  name: 'Search',
  data () {
    return {
      msg: 'Pokemon',
      msgHome: 'Hasil Pencarian Pokemon',
      msgtipe: 'Tipe Pokemon',
      msgsubtipe: 'Sub Tipe Pokemon',
      msgsupertipe: 'Super Tipe Pokemon',
      msgTipe: 'Tipe',
      msgTitleHeader: 'Cari Pokemon',
      msgLogin: 'Login',
      msgPilihTipe: 'Pilih Tipe',
      msgSubTipe: 'Pilih Sub Tipe',
      msgSuperTipe: 'Pilih Super Tipe',
      msgCari: 'Cari',
      loading: true,
      datatextcards: false,
      selectedtipe: '',
      selectedsubtipe: '',
      selectedsupertipe: '',
      response: [],
      options: [],
      optionssubtipe: [],
      optionssupertipe: [],
      errors: [],
      errorsoptions: [],
      errorsoptionssubtipe: [],
      errorsoptionssupertipe: [],
      tipepokemon: '',
      textcards: '',
      page: ['1','2','3','4','5','6','7','8','9','10']
    }
  },
  created () {
    this.callRestService(this.$route)
  },
  watch: {
    '$route': 'callRestService'
  },
  methods: {
      
    callRestService (route) {
      
      if (route.query.type == "" && route.query.subtype == "" && route.query.supertype == "") {
        this.getDataPokemonAll(route);
      } else if(route.query.type !== "" && route.query.subtype == "" && route.query.supertype == "") {
        this.getDataPokemonType(route)
      } else if(route.query.type == "" && route.query.subtype !== "" && route.query.supertype == "") {
        this.getDataPokemonSubType(route)
      } else if(route.query.type == "" && route.query.subtype == "" && route.query.supertype !== "") {
        this.getDataPokemonSuperType(route)
      } else if(route.query.type !== "" && route.query.subtype !== "" && route.query.supertype == "") {
        this.getDataPokemonTypeSubType(route)
      } else if(route.query.type !== "" && route.query.subtype == "" && route.query.supertype !== "") {
        this.getDataPokemonTypeSuperType(route)
      } else if(route.query.type == "" && route.query.subtype !== "" && route.query.supertype !== "") {
        this.getDataPokemonSubTypeSuperType(route)
      } else {
        this.getDataPokemonAlls(route)
      }
    },
    getDataPokemonAlls(route) {
      AXIOS.get('cards?types='+route.query.type+'&subtype='+route.query.subtype+'&supertype='+route.query.supertype).then(
        response => {
          if (response.data.cards.length == 0) {
            this.datatextcards = true
            this.loading = false
            this.textcards = 'Data Tidak Tersedia'
          } else {
            this.datatextcards = false
            this.loading = false
            this.response = response.data.cards
          }
        }
      ).catch(
        e => {
          this.errors.push(e)
        }
      )
    },
    getDataPokemonAll(route) {
      AXIOS.get('cards?types=&subtype=&supertype=').then(
        response => {
          if (response.data.cards.length == 0) {
            this.datatextcards = true
            this.loading = false
            this.textcards = 'Data Tidak Tersedia'
          } else {
            this.datatextcards = false
            this.loading = false
            this.response = response.data.cards
          }
        }
      ).catch(
        e => {
          this.errors.push(e)
        }
      )
    },
    getDataPokemonType(route) {
      AXIOS.get('cards?types='+route.query.type+'&subtype=&supertype=').then(
        response => {
          if (response.data.cards.length == 0) {
            this.datatextcards = true
            this.loading = false
            this.textcards = 'Data Tidak Tersedia'
          } else {
            this.datatextcards = false
            this.loading = false
            this.response = response.data.cards
          }
        }
      ).catch(
        e => {
          this.errors.push(e)
        }
      )
    },
    getDataPokemonSubType(route) {
      AXIOS.get('cards?types&=subtype='+route.query.subtype+'&supertype=').then(
        response => {
          if (response.data.cards.length == 0) {
            this.datatextcards = true
            this.loading = false
            this.textcards = 'Data Tidak Tersedia'
          } else {
            this.datatextcards = false
            this.loading = false
            this.response = response.data.cards
          }
        }
      ).catch(
        e => {
          this.errors.push(e)
        }
      )
    },
    getDataPokemonSuperType(route) {
      AXIOS.get('cards?types=&subtype=supertype='+route.query.supertype).then(
        response => {
          if (response.data.cards.length == 0) {
            this.datatextcards = true
            this.loading = false
            this.textcards = 'Data Tidak Tersedia'
          } else {
            this.datatextcards = false
            this.loading = false
            this.response = response.data.cards
          }
        }
      ).catch(
        e => {
          this.errors.push(e)
        }
      )
    },
    getDataPokemonTypeSubType(route) {
      AXIOS.get('cards?types='+route.query.type+'&subtype='+route.query.subtype+'&supertype=').then(
        response => {
          if (response.data.cards.length == 0) {
            this.datatextcards = true
            this.loading = false
            this.textcards = 'Data Tidak Tersedia'
          } else {
            this.datatextcards = false
            this.loading = false
            this.response = response.data.cards
          }
        }
      ).catch(
        e => {
          this.errors.push(e)
        }
      )
    },
    getDataPokemonTypeSuperType(route) {
      AXIOS.get('cards?types='+route.query.type+'&subtype=&supertype='+route.query.supertype).then(
        response => {
          if (response.data.cards.length == 0) {
            this.datatextcards = true
            this.loading = false
            this.textcards = 'Data Tidak Tersedia'
          } else {
            this.datatextcards = false
            this.loading = false
            this.response = response.data.cards
          }
        }
      ).catch(
        e => {
          this.errors.push(e)
        }
      )
    },
    getDataPokemonSubTypeSuperType(route) {
      AXIOS.get('cards?types=&subtype='+route.query.subtype+'&supertype='+route.query.supertype).then(
        response => {
          if (response.data.cards.length == 0) {
            this.datatextcards = true
            this.loading = false
            this.textcards = 'Data Tidak Tersedia'
          } else {
            this.datatextcards = false
            this.loading = false
            this.response = response.data.cards
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
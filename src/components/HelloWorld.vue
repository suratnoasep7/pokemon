<template>
  <div>
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
      <div v-if="loading" class="loader text-center">
        <img src="./../assets/loader-large.gif" alt="loader">
      </div>
    </div>
    <div class="container margin-content" v-if="!loading">
      <div class="row text-center text-lg-left">
        <div class="col-lg-3 col-md-4 col-xs-6" v-for="item in response">
          <a v-bind:href="'/#/detailimage/'+ item.id" class="d-block mb-4 h-100">
            <img class="img-fluid img-thumbnail lazy-img-fadein" alt="item.name" v-lazy='item.imageUrl' lazy="loaded">
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {AXIOS} from './http-common'
import VuePaginator from 'vuejs-paginator'

export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Pokemon',
      msglogin: 'Login',
      msgPilihTipe: 'Pilih Tipe',
      msgSubTipe: 'Pilih Sub Tipe',
      msgtipe: 'Tipe Pokemon',
      msgSuperTipe: 'Pilih Super Tipe',
      msgCari: 'Cari',
      msgLogin: 'Login',
      msgTitleHeader: 'Cari Pokemon',
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
      loading: true
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
      AXIOS.get('cards?abilityName=&abilityText=&abilityType=&ancientTrait=&artist=&attackCost=&attackDamage=&attackName=&attackText=&contains=&hp=&id=&name=&nationalPokedexNumber=&number=&page=&pageSize=&rarity=&resistances=&retreatCost=&series=&set=&setCode=&subtype=&supertype=&text=&types=&weaknesses=').then(
        response => {
          if (response.data.cards.length > 0) {
            this.loading = false
            this.response = response.data.cards
          }      
        }).catch(
          e => {
            this.errors.push(e)
          }
        )

      AXIOS.get('types').then(
        response => {
          this.options = response.data.types
        }).catch(
          e => {
            this.errorsoptions.push(e)
          }
        )

      AXIOS.get('subtypes').then(
        response => {
          this.optionssubtipe = response.data.subtypes
        }
      ).catch(
        e => {
          this.errorsoptionssubtipe.push(e)
        }
      )
          
      AXIOS.get('supertypes').then(
        response => {
          this.optionssupertipe = response.data.supertypes
        }
      ).catch(
        e => {
          this.errorsoptionssupertipe.push(e)
        }
      )
    },
    searchPokemon(type, subtype, supertype) {
      if (type !== "" && subtype !== "" && supertype !== "") {
        this.$router.push({path: '/singleimage/'+type+'/'+subtype+'/'+supertype})
      } else {
        alert('Pilih Pencarian')
      }
    }
  }
}
</script>
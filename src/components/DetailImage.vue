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
              <a class="nav-link" v-bind:href="'/#/login/'">{{ msgLogin }}</a>
            </li>
          </ul>
        </div>      
      </div>
    </nav>
    <div class="container">
      <div class="col-md-12 margin-content">
        <div v-if="loading" class="loader text-center">
          <img src="./../assets/loader-large.gif" alt="loader">
        </div>
      </div>
    </div>
    <div class="container margin-content" v-if="!loading">
      <div class="col-md-12">
        <h1>{{ msg }} {{ response.name }}</h1>
      </div>
      
      <div class="col-md-12 margin-content" v-if="!loading">
        <div class="row">
          <div class="col-md-8">
            <div class="row">
              <div class="col-md-4">
                <img class="img-fluid rounded mb-3 mb-md-0 lazy-img-fadein" v-lazy="response.imageUrl">
              </div>
              <div class="col-md-8">
                <p>Artist - {{ response.artist }}</p>
                <p>Rarity - {{ response.rarity }}</p>
                <p>Series - {{ response.series }}</p>
                <p v-for="item in response.text">{{ item }}</p>
              </div>  
            </div>
            <!-- <div class="col-md-12 margin-content">
                 <div v-if="loadingdetail" class="loader text-center">
                   <img src="./../assets/loader-large.gif" alt="loader">
                 </div>
               </div>
               <div class="col-lg-3 col-md-4 col-xs-6" v-for="itemdetail in responsedetail" v-if="!loadingdetail">
                 <a v-bind:href="'/#/detailimage/'+ itemdetail.id" class="d-block mb-4 h-100">
                   <img class="img-fluid img-thumbnail lazy-img-fadein" alt="itemdetail.name" v-lazy='itemdetail.imageUrl' lazy="loaded">
                 </a>
               </div> -->   
          </div>
          <div class="col-md-4">
            <div class="card my-4">
              <h4 class="card-header">{{ msgCari }}</h4>
              <div class="card-body">
                <div class="form-row">
                  <div class="col-md-12 form-group">
                    <select v-model="selectedtipe" class="form-control">
                      <option disabled="" value="">{{ msgPilihTipe }}</option>
                      <option v-for="option in options" v-bind:value="option">
                        {{ option }}
                      </option>
                    </select>
                  </div>
                  <div class="col-md-12 form-group">
                    <select v-model="selectedsubtipe" class="form-control">
                      <option disabled="" value="">{{ msgSubTipe }}</option>
                      <option v-for="optionsubtipe in optionssubtipe" v-bind:value="optionsubtipe">
                        {{ optionsubtipe }}
                      </option>
                    </select>
                  </div>
                  <div class="col-md-12 form-group">
                    <select v-model="selectedsupertipe" class="form-control">
                      <option disabled="" value="">{{ msgSuperTipe }}</option>
                      <option v-for="optionsupertipe in optionssupertipe" v-bind:value="optionsupertipe">
                        {{ optionsupertipe }}
                      </option>
                    </select>
                  </div>
                  <div class="col-md-12">
                    <button @click="searchPokemon(selectedtipe, selectedsubtipe, selectedsupertipe)" class="btn btn-block btn-primary">{{ msgCari }}</button>
                  </div>
                </div>
              </div>
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
  name: 'DetailImage',
  data () {
    return {
      msg: 'Pokemon',
      msgtipe: 'Tipe Pokemon',
      msgLogin: 'Login',
      msgPilihTipe: 'Pilih Tipe',
      msgSubTipe: 'Pilih Sub Tipe',
      msgtipe: 'Tipe Pokemon',
      msgSuperTipe: 'Pilih Super Tipe',
      msgCari: 'Cari',
      loading: true,
      loadingdetail: true,
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
      responsedetail: []
    }
  },
  created () {
    this.callRestService(this.$route.params.id)
  },
  watch: {
    '$route': 'callRestService'
  },
  methods: {
    callRestService (id) {  
      AXIOS.get('/cards/'+id).then(
        response => {
          if (response.data.card.name !== null) {
            this.loading = false
            this.response = response.data.card 
            this.getRelatedPokemon(this.response.supertype) 
          }  
        }
      ).catch(
        e => {
          this.errors.push(e)
        }
      )
            
      AXIOS.get('types').then(
        response => {
          this.options = response.data.types
        }
      ).catch(
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
    getRelatedPokemon(supertype) {
      AXIOS.get('cards?supertype='+ supertype).then(
        response => {
          if (response.data.cards.length > 0) {
            for (var i = 95; i < pokemon.length; i++) {
              this.responsedetail.push(pokemon[i])
            }
            this.loadingdetail = false
          }
        }
      ).catch(
        e => {
          this.errors.push(e)
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
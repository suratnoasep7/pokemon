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
      <div class="col-md-12">
        <h1>{{ msg }}</h1>
        <p>{{ msgTipe }} - {{ tipepokemon }}</p>
      </div>
      <div class="col-md-12 margin-content">
        <div v-if="loading" class="loader text-center">
         <img src="./../assets/loader-large.gif" alt="loader">
        </div>
      </div>
      <div class="col-md-12 margin-content" v-if="datatextcards">
        <div>
          <h2>{{ textcards }}</h2>
        </div>
      </div>
      <div class="row" v-if="!loading">
        <div class="col-md-8">
          <div class="col-md-12 margin-content">
            <div class="row text-center text-lg-left">
              <div class="col-lg-3 col-md-4 col-xs-6" v-for="item in response">
                <a v-bind:href="'/#/detailimage/'+ item.id" class="d-block mb-4 h-100">
                  <img class="img-fluid img-thumbnail lazy-img-fadein" alt="item.name" v-lazy='item.imageUrl' lazy="loading">
                </a>
              </div>
            </div>
            <div class="margin-content text-center" v-if="!loading">
              <nav>
                <ul class="pagination justify-content-center">
                  <li class="page-item"><a class="page-link">Previous</a></li>
                  <li class="page-item" v-for="pageitem in page">
                    <a v-on:click="getPage(tipepokemon, pageitem)" class="page-link">{{ pageitem }}</a>
                  </li>
                  <li class="page-item"><a class="page-link">Next</a></li>
                </ul>
              </nav>
            </div> 
          </div>
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
</template>
<script>
import {AXIOS} from './http-common'

export default {
  name: 'TypePokemon',
  data () {
    return {
      msg: 'Pokemon',
      msgtipe: 'Tipe Pokemon',
      msgsubtipe: 'Sub Tipe Pokemon',
      msgsupertipe: 'Super Tipe Pokemon',
      msgTipe: 'Tipe',
      msgView: 'View Pokemon',
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
    
    if (this.$route.params.type !== "") {
      this.callRestService(this.$route.params.type)
      this.tipepokemon = this.$route.params.type
    } else {
      this.$router.push({path: '/type'})
    }    
  },
  watch: {
    '$route': 'callRestService'
  },
  methods: {
    callRestService (type) {
      AXIOS.get('cards?types='+type).then(
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
    getPage(type, page) {
      this.loading = true
      AXIOS.get('cards?types='+type+'&page='+page).then(
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
    },
    searchPokemon(type, subtype, supertype) {
      if (type !== "" && subtype == "" && supertype == "") {
        this.$router.push({path: '/typepokemon/'+type})
      } else if (type == "" && subtype !== "" && supertype == "") {
        this.$router.push({path: '/subtypepokemon/'+subtype})
      } else if (type == "" && subtype == "" && supertype !== "") {
        this.$router.push({path: '/supertypepokemon/'+subtype})
      } else if (type !== "" && subtype !== "" && supertype !== "") {
        this.$router.push({path: '/singleimage/'+type+'/'+subtype+'/'+supertype})
      } else {
        alert('Pilih Pencarian')
      }    
    }
  }
}
</script>
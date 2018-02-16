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
        <p>Tipe - {{ $attrs.type}} / Sub Tipe - {{ $attrs.subtype }} / Super Tipe - {{ $attrs.supertype }}</p>
        <p></p>
      </div>
      <div class="col-md-12 margin-content">
        <div v-if="loading" class="loader text-center">
         <img src="./../assets/loader-large.gif" alt="loader">
        </div>
      </div>
      <div class="row" v-if="!loading">
        <div class="col-md-8">
          <div class="col-md-12 margin-content" v-for="item in response">
            <div class="row">
              <div class="col-md-4">
                <a v-bind:href="'/#/detailimage/'+ item.id">
                  <img class="img-fluid rounded mb-3 mb-md-0 lazy-img-fadein" v-lazy="item.imageUrl">
                </a>
              </div>
              <div class="col-md-8">
                <h2>{{ item.name }}</h2>
                <hr>
                <div class="row">
                  <div class="col-md-6">
                    <h3>Attack</h3>
                    <div v-for="itempokemonattack in item.attacks">
                      <p>{{itempokemonattack.name}}</p>
                    </div>  
                  </div>
                  <div class="col-md-6">
                    <h3>Weaknesses</h3>
                    <div v-for="itempokemon in item.weaknesses">
                      <p>{{itempokemon.type}}</p>
                    </div>  
                  </div>
                </div>
                <a class="btn btn-primary" v-bind:href="'/#/detailimage/'+ item.id">View Pokemon</a>
              </div>
            </div>
            <hr>  
          </div>
        </div>
        <div class="col-md-4">
          <div class="card my-4">
            <h4 class="card-header">Search</h4>
            <div class="card-body">
              <div class="form-row">
                <div class="col-md-12 form-group">
                  <select v-model="selectedtipe" class="form-control">
                    <option disabled="" value="">Pilih Tipe</option>
                    <option v-for="option in options" v-bind:value="option">
                      {{ option }}
                    </option>
                  </select>
                </div>
                <div class="col-md-12 form-group">
                  <select v-model="selectedsubtipe" class="form-control">
                    <option disabled="" value="">Pilih Sub Tipe</option>
                    <option v-for="optionsubtipe in optionssubtipe" v-bind:value="optionsubtipe">
                      {{ optionsubtipe }}
                    </option>
                  </select>
                </div>
                <div class="col-md-12 form-group">
                  <select v-model="selectedsupertipe" class="form-control">
                    <option disabled="" value="">Pilih Super Tipe</option>
                    <option v-for="optionsupertipe in optionssupertipe" v-bind:value="optionsupertipe">
                      {{ optionsupertipe }}
                    </option>
                  </select>
                </div>
                <div class="col-md-12">
                  <button @click="searchPokemon(selectedtipe, selectedsubtipe, selectedsupertipe)" class="btn btn-block btn-primary">Cari</button>
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
  name: 'Type',
  data () {
      return {
        msg: 'Pokemon',
        loading: true,
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
        errorsoptionssupertipe: []
      }
    },
    created () {

      //this.$router.push({path: '/type'});
      if (this.$route.params.type == "") {
        this.$router.push({path: '/type'});
      } else {
        this.callRestService(this.$route.params.type, this.$route.params.subtype, this.$route.params.supertype)
      }

      if (this.$route.params.subtype == "") {
        this.$router.push({path: '/type'});
      } else {
        this.callRestService(this.$route.params.type, this.$route.params.subtype, this.$route.params.supertype)
      }
      if (this.$route.params.supertype == "") {
        this.$router.push({path: '/type'});
      } else {
        this.callRestService(this.$route.params.type, this.$route.params.subtype, this.$route.params.supertype)
      }

      
    },
    watch: {
      '$route': 'callRestService'
    },
    methods: {

      // Fetches posts when the component is created.
      callRestService (type, subtype, supertype) {
        
        AXIOS.get('cards?types='+type+'&subtype='+subtype+'&supertype='+supertype)
          .then(response => {
            // JSON responses are automatically parsed.
            if (response.data.cards.length > 0) {
              this.loading = false
              this.response = response.data.cards
            }
            
          })
          .catch(e => {
            this.errors.push(e)
          })
          AXIOS.get('types')
          .then(response => {
            // JSON responses are automatically parsed.
            this.options = response.data.types
          })
          .catch(e => {
            this.errorsoptions.push(e)
          })
          AXIOS.get('subtypes')
          .then(response => {
            // JSON responses are automatically parsed.
            this.optionssubtipe = response.data.subtypes
          })
          .catch(e => {
            this.errorsoptionssubtipe.push(e)
          })
          AXIOS.get('supertypes')
          .then(response => {
            // JSON responses are automatically parsed.
            this.optionssupertipe = response.data.supertypes
          })
          .catch(e => {
            this.errorsoptionssupertipe.push(e)
          })
      },
      searchPokemon(type, subtype, supertype) {
        if (type !== "" && subtype !== "" && supertype !== "") {
          this.$router.push({path: '/singleimage/'+type+'/'+subtype+'/'+supertype})
        }
        
      }
    }
}
</script>
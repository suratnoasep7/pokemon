<template>
  <div class="login">
    <div class="container">
      <div class="col-md-4 content-login clearfix">
        <div class="form-row">
          <h1>Register</h1>
          <form v-on:submit.prevent="onSubmit">
            <div class="form-group">
              <input type="text" v-model="username" class="form-control" placeholder="Username">    
            </div>
            <div class="form-group">
              <input type="text" v-model="email" class="form-control" placeholder="Email">    
            </div>
            <div class="form-group">
              <input type="password" v-model="password" class="form-control" placeholder="Password">    
            </div>
            <div class="form-group">
              <button class="btn btn-primary btn-block">Submit</button>    
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {AXIOS} from './http-common'

export default {
  name: 'Login',
  data () {
    return {
      username: '',
      password: '',
      email: ''
    }
  }
}
</script>
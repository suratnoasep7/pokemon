<template>
  <div class="login">
    <div class="container">
      <div class="col-md-4 content-login clearfix">
        <div class="form-row">
          <h1>Login</h1>
          <form v-on:submit.prevent="onSubmit">
            <div class="form-group">
              <input type="text" v-model="username" class="form-control" placeholder="Username">    
            </div>
            <div class="form-group">
              <input type="password" v-model="password" class="form-control" placeholder="Password">    
            </div>
            <div class="form-group">
              <button class="btn btn-primary btn-block">Sign In</button>    
            </div>
            <div class="clearfix"></div>
            <div class="margin-content">
              <p>Don't have account <a v-bind:href="'/#/register/'">Register</a></p>
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
      password: ''
    }
  }
}
</script>
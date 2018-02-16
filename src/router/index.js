import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Type from '@/components/Type'
import SubType from '@/components/SubType'
import SuperType from '@/components/SuperType'
import SingleImage from '@/components/SingleImage'
import DetailImage from '@/components/DetailImage'
import Login from '@/components/Login'
import Register from '@/components/Register'
import TypePokemon from '@/components/TypePokemon'
import SubTypePokemon from '@/components/SubTypePokemon'
import SuperTypePokemon from '@/components/SuperTypePokemon'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/type',
      name: 'Type',
      component: Type
    },
    {
      path: '/subtype/',
      name: 'SubType',
      component: SubType,
      props: true
    },
    {
      path: '/supertype/',
      name: 'SuperType',
      component: SuperType,
      props: true
    },
    {
      path: '/singleimage/:type/:subtype/:supertype',
      name: 'SingleImage',
      component: SingleImage,
      props: true
    },
    {
      path: '/detailimage/:id',
      name: 'DetailImage',
      component: DetailImage
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/typepokemon/:type',
      name: 'TypePokemon',
      component: TypePokemon
    },
    {
      path: '/subtypepokemon/:subtype',
      name: 'SubTypePokemon',
      component: SubTypePokemon
    },
    {
      path: '/supertypepokemon/:supertype',
      name: 'SuperTypePokemon',
      component: SuperTypePokemon
    }
  ]
})

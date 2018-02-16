import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Type from '@/components/Type'
import SubType from '@/components/SubType'
import SuperType from '@/components/SuperType'
import SingleImage from '@/components/SingleImage'
import DetailImage from '@/components/DetailImage'

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
      path: '/subtype/:type',
      name: 'SubType',
      component: SubType,
      props: true
    },
    {
      path: '/supertype/:type/:subtype',
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
    }
  ]
})

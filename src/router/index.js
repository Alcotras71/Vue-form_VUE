import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home.vue'
import Article from '../components/Article.vue'
import ErrorCmp from '../components/Error/Error.vue'

Vue.use(Router)

export default new Router({
	mode: 'history',
  	routes: [ 
		{
			path: '/',
			name: 'Home',
			component: Home
		},
		{
			path: '/article',
			name: 'article',
			component: Article,
		},
		{
			path: '*',
			component: ErrorCmp
		}
	]
})

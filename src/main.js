import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

firebase.initializeApp({
	apiKey: "AIzaSyA7Ok298qvXFUlE_TvnbHFXDf1DuwK258U",
	authDomain: "itc-ads-21681.firebaseapp.com",
	databaseURL: "https://itc-ads-21681.firebaseio.com",
	projectId: "itc-ads-21681",
	storageBucket: "itc-ads-21681.appspot.com",
	messagingSenderId: "209888568161",
	appId: "1:209888568161:web:14ea203f18657d46551b20"
})

let app

firebase.auth().onAuthStateChanged(() => {
	if (!app) {
		app = new Vue({
			router,
			store,
			vuetify,
			render: h => h(App),
			async created () {
				await this.$store.dispatch('fetchInfo')
			},
			async mounted () {
				await this.$store.dispatch('fetchComments')
		
				await firebase.auth().onAuthStateChanged((user) => {
					if (user) {
						this.$store.dispatch('autoLoginUser', user)
					}
				})
		  }
		}).$mount('#app')
	}
})
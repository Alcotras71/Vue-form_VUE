import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import shared from './shared'
import article from './article'
import info from './info'
import comment from './comment';

Vue.use(Vuex)

export default new Vuex.Store({
	modules: {
		auth,
		article,
		shared,
		info,
		comment
	}
})
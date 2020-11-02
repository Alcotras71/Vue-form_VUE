import firebase from 'firebase/app'

class Article {
	constructor (title, text) {
		this.title = title
		this.text = text
	}
}

export default {
	state: {
		arts: []
	},
	mutations: {
		loadArts (state, payload) {
			state.arts = payload
		}
	},
	actions: {
		async fetchArts ({commit}) {
			commit('clearError')
			commit('setLoading', true)

			const resultArts = []

			try {
				const art = (await firebase.database().ref('arts').once('value')).val()

				resultArts.push(
					new Article(art.title, art.text)
				)

				commit('loadArts', resultArts)
				commit('setLoading', false)
			} catch (error) {
				commit('setLoading', false)
				commit('setError', error.message)
				throw error
			}

		}
	},
	getters: {
		arts (state) {
			return state.arts
		}
	}
}
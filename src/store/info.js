import firebase from 'firebase/app'

export default {
	state: {
		info: {}
	},
	mutations: {
		setInfo (state, info) {
			state.info = info
		},
		clearInfo(state) {
			state.info = {}
		}
	},
	actions: {
		async fetchInfo ({dispatch, commit}) {
			try {
				const uid = await dispatch('getUid')
				const info = (await firebase.database().ref(`/users/${uid}/info`).once('value')).val()
				commit('setInfo', info)
			} catch (error) {
				commit('setLoading', false)
				commit('setError', error.message)
				throw error
			}
		}
	},
	getters: {
		info (state) {
			return state.info
		}
	}
}
import firebase from 'firebase/app'

class User {
	constructor(id) {
		this.id = id
	}
}

export default {
	state: {
		user: null
	},
	mutations: {
		setUser (state, payload) {
			state.user = payload
		}
	},
	actions: {
		async registerUser ({commit, dispatch}, {email, password, login}) {
			commit('clearError')
			commit('setLoading', true)

			try {
				const user = await firebase.auth().createUserWithEmailAndPassword(email, password)
				const uid = await dispatch('getUid')
				await firebase.database().ref(`/users/${uid}/info`).set({login})
				commit('setUser', new User(user.uid))
				commit('setLoading', false)
			} catch (error) {
				commit('setLoading', false)
				commit('setError', error.message)
				throw error
			}
		}, 
		async loginUser ({commit}, {email, password}) {
			commit('clearError')
			commit('setLoading', true)

			try {
				const user = await firebase.auth().signInWithEmailAndPassword(email, password)
				commit('setUser', new User(user.uid))
				commit('setLoading', false)
			} catch (error) {
				commit('setLoading', false)
				commit('setError', error.message)
				throw error
			}
		},
		getUid () {
			const user = firebase.auth().currentUser
			return user ? user.uid : null
		},
		autoLoginUser ({commit}, payload) {
			commit('setUser', new User(payload.uid))
		},
		async logoutUser ({commit}) {
			await firebase.auth().signOut()
			commit('setUser', null)
			commit('clearInfo')
		}

	},
	getters: {
		user (state) {
			return state.user
		},
		isUserLoggedIn (state) {
			return state.user !== null
		}
	}
}
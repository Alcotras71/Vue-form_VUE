import firebase from 'firebase/app'

class Comment {
	constructor (date, comment, login) {
		this.date = date,
		this.comment = comment,
		this.login = login
	}
}

export default {
	state: {
		comments: [

		]
	},
	mutations: {
		createComment (state, payload) {
			state.comments.push(payload)
		},
		loadComments (state, payload) {
			state.comments = payload
		}
	},
	actions: {
		async createComment ({commit}, payload) {
			commit('clearError')
			commit('setLoading', true)

			try {
				const newComment = new Comment(payload.date, payload.comment, payload.login)

				const comment = await firebase.database().ref('comments').push(newComment)
				
				commit('setLoading', false)
				commit('createComment', {
					...newComment
				})
			} catch (error) {
				commit('setError', error.message)
				commit('setLoading', false)
				throw error
			}
		},
		async fetchComments ({commit}) {
			commit('clearError')
			commit('setLoading', true)

			const resultComments = []

			try {
				const comments = (await firebase.database().ref('comments').once('value')).val()

				Object.keys(comments).forEach(key => {
					const comment = comments[key]
					resultComments.push(
						new Comment (comment.date, comment.comment, comment.login)
					)
				})

				commit('loadComments', resultComments)
				commit('setLoading', false)
			} catch (error) {
				commit('setError', error.message)
				commit('setLoading', false)
				throw error
			}
		}
	},
	getters: {
		comments (state) {
			return state.comments
		}
	}
}
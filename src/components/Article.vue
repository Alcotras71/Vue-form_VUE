<template>
	<v-container>
		<v-row>
			<v-col class="hidden-sm-and-down" cols="1"></v-col>
			<v-col>
				<v-sheet
					v-for="art in arts"
					:key="art.id"
					min-height="50vh"
					class="elevation-5"
				>
					<div class="pa-15">
						<h1 class="pb-5">{{ art.title }}</h1>
						<div v-html="art.text"></div>
					</div>
				</v-sheet>
				<v-card class="mt-6 pa-8">
					<div>
						<h3>Comments</h3>
					</div>
					<v-sheet 
						class="elevation-5 mb-5"
						v-for="comment in comments"
						:key="comment.id"
					>
						<v-card-title>
							<span>{{ comment.login }}</span>
							<v-spacer></v-spacer>
							<span class="pr-16 date-size">{{ comment.date }}</span>
						</v-card-title>
						<v-card-text>
							{{ comment.comment }}
						</v-card-text>
					</v-sheet>
				</v-card>
				<div class="text-center">
					<v-btn 
						href="#comment"
						v-if="!addComment && isUserLoggedIn"
						outlined
						x-large
						class="mt-5 cyan darken-2 white--text"
						@click="addComment = !addComment"
					>
						Add comment
					</v-btn>
				</div>
				<v-card class="mt-6 pa-8" v-if="addComment">
					<h3>Add comment</h3>
					<v-form class="mb-3" v-model="valid" ref="form" validation>
						<v-textarea
							id="comment"
							label="Add comment"
							name="comment"
							type="text"
							required
							:rules="[v => !!v || 'Comment is required']"
							v-model="comment"
						></v-textarea>
					</v-form>
					<v-layout>
						<v-spacer></v-spacer>
						<v-btn
							:disabled="!valid || loading"
							:loading="loading"
							@click="createComment"
							class="cyan darken-2 white--text"
						>
							Add comment
						</v-btn>
					</v-layout>
				</v-card>
			</v-col>
			<v-col class="hidden-sm-and-down" cols="1"></v-col>
		</v-row>
	</v-container>
</template>

<script>
export default {
	name: 'articleVue',
	data () {
		return {
			addComment: false,
			comment: '',
			valid: false,
			date: new Date
		}
	},
	computed: {
		isUserLoggedIn () {
			return this.$store.getters.isUserLoggedIn
		},
		arts () {
			return this.$store.getters.arts
		},
		comments () {
			return this.$store.getters.comments
		},
		login () {
			return this.$store.getters.info.login
		},
		localeDate () {
			function getZero(num) {
				if (num >= 0 && num < 10) {
					return `0${num}`
				} else {
					return num
				}
			}
			return `${(this.date).toLocaleDateString()}  ${getZero((this.date).getHours())}:${getZero((this.date).getMinutes())}`
		},
		loading () {
			return this.$store.getters.loading
		}
	},
	methods: {
		createComment () {
			if (this.$refs.form.validate()) {
				const comment = {
					date: this.localeDate,
					comment: this.comment,
					login: this.login
				}

				this.$store.dispatch('createComment', comment)
				this.addComment = !this.addComment
				this.comment = ''
			}
		}
	},
	async mounted () {
		await this.$store.dispatch('fetchArts')
	}
}
</script>

<style lang="scss" scoped>
	.date-size{
		font-size: 2vh;
	}
</style>
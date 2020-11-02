<template>
	<v-dialog 
		max-width="600"
		v-model="dialog"
	>
		<template v-slot:activator="{ on }">
			<v-btn 
				v-on="on"
				text
			>
				<v-icon left>mdi-lock</v-icon>
					Login
			</v-btn>
		</template>
		<v-card class="elevation-12">
			<v-app-bar dark color="cyan darken-2">
				<v-toolbar-title>Login form</v-toolbar-title>
			</v-app-bar>
			<v-card-text>
				<v-form v-model="valid" ref="form" validation>
					<v-text-field 
						prepend-icon="mdi-email"
						label="Email"
						required
						type="email"
						name="email"
						class="mb-5 mt-5"
						:rules="emailRules"
						v-model="email"
					></v-text-field>
					<v-text-field
						prepend-icon="mdi-lock"
						label="Password"
						name="password"
						type="password"
						required
						:rules="passwordRules"
						counter
						v-model="password"
					></v-text-field>
				</v-form>
			</v-card-text>
			<v-card-actions>
				<v-spacer></v-spacer>
				<v-btn 
					outlined
					large
					:loading="loading"
					class="px-5 cyan darken-2 white--text"
					:disabled="!valid || loading"
					@click="onSubmit"
				>
					Login
				</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script>
export default {
	name: 'login',
	data () {
		return {
			dialog: false,
			email: '',
			password: '',
			valid: false,
			emailRules: [
				 v => !!v || 'E-mail is required',
  				 v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
			],
			passwordRules: [
				v => !!v || 'Password is required',
       		v => (v && v.length >= 6) || 'Password must be equal or more than 6 characters',
			]
		}
	},
	computed: {
		loading () {
			return this.$store.getters.loading
		}
	},
	methods: {
		async onSubmit () {
			if (this.$refs.form.validate()) {
				const user = {
					email: this.email,
					password: this.password
				}

				await this.$store.dispatch('loginUser', user)
					 .then(() => {
						this.dialog = false
					})
					.catch(() => {})

				await this.$store.dispatch('fetchInfo')
			}
		}
	},
	created () {
		if (this.$route.query['loginError']) {
			this.$store.dispatch('setError', 'Please log in to get access to this page.')
		}
	}
}
</script>
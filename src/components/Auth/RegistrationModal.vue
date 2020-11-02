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
				<v-icon left>mdi-face</v-icon>
					Registration
				</v-btn>
		</template>
		<v-card class="elevation-12">
			<v-app-bar dark color="cyan darken-2">
				<v-toolbar-title>Registration</v-toolbar-title>
			</v-app-bar>
			<v-card-text>
				<v-form v-model="valid" ref="form" validation>
					<v-text-field 
						prepend-icon="mdi-email"
						label="Email"
						required
						type="email"
						name="email"
						class="mt-5"
						:rules="emailRules"
						v-model="email"
					></v-text-field>
					<v-text-field 
						prepend-icon="mdi-account"
						label="Login"
						required
						type="text"
						name="login"
						class="mt-5"
						:rules="loginRules"
						v-model="login"
					></v-text-field>
					<v-text-field
						prepend-icon="mdi-lock"
						label="Password"
						name="password"
						type="password"
						required
						counter
						:rules="passwordRules"
						v-model="password"
					></v-text-field>
					<v-text-field
						prepend-icon="mdi-lock"
						label="Confirm password"
						name="confirm-password"
						type="password"
						required
						counter
						v-model="confirmPassword"
						:rules="confirmPasswordRules"
					></v-text-field>
				</v-form>
			</v-card-text>
			<v-card-actions>
				<v-spacer></v-spacer>
				<v-btn 
					outlined
					large
					class="px-5 cyan darken-2 white--text"
					:disabled="!valid || loading"
					@click="onSubmit"
					:loading="loading"
				>
					Create account
				</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script>
export default {
	name: 'registration',
	data () {
		return {
			dialog: false,
			email: '',
			login: '',
			password: '',
			confirmPassword: '',
			valid: false,
			emailRules: [
				 v => !!v || 'E-mail is required',
  				 v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
			],
			loginRules: [
				v => !!v || 'Login is required',
				v => (v && v.length >= 4) || 'Login must be equal or more than 4 characters'
			],
			passwordRules: [
				v => !!v || 'Password is required',
       		v => (v && v.length >= 6) || 'Password must be equal or more than 6 characters',
			],
			confirmPasswordRules: [
				v => !!v || 'Password is required',
				v => v === this.password || 'Passwords should match'
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
					password: this.password,
					login: this.login
				}

				await this.$store.dispatch('registerUser', user)
					.then(() => {
						this.dialog = false
					})
					.catch(() => {})

				await this.$store.dispatch('fetchInfo')
			}
		}
	}
}
</script>
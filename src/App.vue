<template>
	<v-app>
		<v-navigation-drawer 
			class="cyan lighten-5"
			app 
			temporary
			v-model="drawer"
			width="400"
		>
			<v-list>
				<v-list-item v-if="isUserLoggedIn" class="text-center">
					<v-list-item-icon>
						<v-icon>mdi-account-circle</v-icon>
					</v-list-item-icon>
					<v-list-item-content v-text="login"></v-list-item-content>
				</v-list-item>
				<div v-if="!isUserLoggedIn">
					<v-list-item>
						<login-modal></login-modal>
					</v-list-item>
					<v-list-item>
						<registration-modal></registration-modal>
					</v-list-item>
				</div>
				<v-list-item 
					v-for="link of links"
					:key="link.title"
					:to="link.url"
					>
					<v-list-item-icon>
						<v-icon>{{ link.icon }}</v-icon>
					</v-list-item-icon>

					<v-list-item-content>
						<v-list-item-title v-text="link.title"></v-list-item-title>
					</v-list-item-content>
				</v-list-item>
				<v-list-item 
					v-if="isUserLoggedIn"
					@click="onLogOut"
					>
					<v-list-item-icon>
						<v-icon>mdi-exit-to-app</v-icon>
					</v-list-item-icon>

					<v-list-item-content>
						<v-list-item-title v-text="'Logout'"></v-list-item-title>
					</v-list-item-content>
				</v-list-item>
			</v-list>
		</v-navigation-drawer>

		<v-card tile>
			<v-app-bar 
				app 
				dark 
				color="cyan darken-2"
				class="px-5"
			>
				<v-app-bar-nav-icon
					@click="drawer = !drawer"
					class="hidden-md-and-up"
				></v-app-bar-nav-icon>
				<v-toolbar-title class="pointer text-uppercase">
					<router-link display to="/" tag="div"><span class="font-weight-light">vue</span><span class="font-weight-medium">forms</span></router-link>
				</v-toolbar-title>
				<v-toolbar-items class="hidden-sm-and-down pl-10">
					<v-btn
						text
						v-for="link in links"
						:key="link.title"
						:to="link.url"
					>
					<v-icon left>{{ link.icon }}</v-icon>
						{{ link.title }}
					</v-btn>
				</v-toolbar-items>
				<v-spacer></v-spacer>
				<v-toolbar-title
					v-if="isUserLoggedIn"
					class="pr-10 hidden-xs-and-down"
				>
					{{ login }}
				</v-toolbar-title>
				<v-toolbar-items class="hidden-sm-and-down">
					<login-modal v-if="!isUserLoggedIn"></login-modal>
					<registration-modal v-if="!isUserLoggedIn"></registration-modal>
					<v-btn
						v-if="isUserLoggedIn"
						text
						@click="onLogOut"
					>
					<v-icon left>mdi-exit-to-app</v-icon>
						Logout
					</v-btn>
				</v-toolbar-items>
			</v-app-bar>
		</v-card>

		<v-main class="cyan lighten-5">
				<router-view></router-view>
		</v-main>
		<template v-if="error">
			<v-snackbar
				:multi-line="true"
				:timeout="5000"
				:input="closeError"
				:value="true"
				color="error"
				:vertical="true"
			>
				<div class="d-flex">
					{{error}}
					<v-btn
						right
						text
						dark
						@click="closeError"
					>
						Close
					</v-btn>
				</div>
			</v-snackbar>
		</template>

	</v-app>
</template>

<script>
import LoginModal from './components/Auth/LoginModal.vue'
import RegistrationModal from './components/Auth/RegistrationModal.vue'

export default {
	name: 'app',
	data () {
		return {
			drawer: false,
			componentKey: 0
		}
	},
	methods: {
		closeError () {
			this.$store.dispatch('clearError')
		},
		onLogOut () {
			this.$store.dispatch('logoutUser')
			this.$router.push('/')
		}
	},
	computed: {
		error () {
			return this.$store.getters.error
		},
		isUserLoggedIn () {
			return this.$store.getters.isUserLoggedIn
		},
		links () {
			return [
				{title: 'Home', icon: 'mdi-home', url: '/'},
				{title: 'Article', icon: 'mdi-file', url: '/article'}
			]
		},
		login () {
			try {
				return this.$store.getters.info.login
			} catch (error) {}
		}
  },
  components: {
	  LoginModal,
	  RegistrationModal
  }
}
</script>

<style lang="scss">
	.pointer {
		cursor: pointer;
	}
</style>
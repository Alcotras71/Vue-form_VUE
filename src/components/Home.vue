<template>
	<div>
		<v-container fluid>
			<v-layout row>
				<v-flex xs12>
					<v-carousel 
						cycle
						height="800"
					>
						<v-carousel-item
							v-for="house in houses"
							:key="house.id"
							:src="house.imageSrc"
						>
						</v-carousel-item>
					</v-carousel>
				</v-flex>
			</v-layout>
		</v-container>
	</div>
</template>

<script>
export default {
	name: 'home',
	computed: {
		houses () {
			return [
				{imageSrc: 'https://images.wallpaperscraft.com/image/planet_eclipse_photoshop_122026_3840x2400.jpg'},
				{imageSrc: 'https://images.wallpaperscraft.com/image/planet_galaxy_space_144684_3840x2400.jpg'},
				{imageSrc: 'https://images.wallpaperscraft.com/image/planet_space_universe_129992_3840x2400.jpg'},
				{imageSrc: 'https://images.wallpaperscraft.com/image/planet_stars_shine_148948_3840x2400.jpg'},
				{imageSrc: 'https://images.wallpaperscraft.com/image/planet_shine_galaxy_139243_3840x2400.jpg'},
				{imageSrc: 'https://images.wallpaperscraft.com/image/planet_shine_atmosphere_153949_3840x2400.jpg'}
			]
		}
	}	
}
</script>

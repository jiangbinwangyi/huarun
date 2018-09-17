<style lang="less">
	@import 'main.less';
</style>

<template>
	<div class="main">
		<Layout>
			<Header class="main-top">
				<topHeader myTitle="医疗信息化工作流开发平台"></topHeader>
			</Header>
			<Content class="main-box">
				<router-view></router-view>
			</Content>
			<Footer class="main-bot">版权所有 © 2017 优易健康</Footer>
		</Layout>
	</div>
</template>

<script>
	import topHeader from './header/topHeader.vue';
	export default {
		name: 'Main',
		components: {
			topHeader,
		},
		data() {
			return {}
		},
		mounted() {},
		methods: {},
		created() {},
		watch: {},
		updated () {}
	};
</script>
<style lang="less">
	@import 'main.less';
</style>

<template>
	<div class="main`">
		<Layout>
			<Header class="main-top">
				<topHeader myTitle="医疗信息化工作流开发平台"></topHeader>
			</Header>
			<Content class="main-box">
				<topWorkNode v-show="workNodeShow"></topWorkNode>
				<router-view></router-view>
			</Content>
		</Layout>
	</div>
</template>

<script>
	import topHeader from './header/topHeader.vue';
	import topWorkNode from './workNode/workNodeTop.vue';
	export default {
		name: 'Main',
		components: {
			topHeader,
			topWorkNode,
		},
		data() {
			return {
				workNodeShow:false
			};
		},
		mounted() {
			if(this.$route.fullPath.indexOf('workNode')>-1){
				this.workNodeShow = true;
			}else{
				this.workNodeShow = false;
			}
		},
		methods: {
		}
	};
</script>
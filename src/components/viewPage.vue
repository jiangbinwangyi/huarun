<template>
	<div class="viewPage">
		<div class="viewPageMain">
			<Form :label-width="80" id="viewPage">
				<!--后期与formcreate封装成统一的视图组件-->
				<formView></formView>
			</Form>
		</div>
	</div>
</template>

<script>
	import formView from './workNode/formCreate/formView';
	export default {
		components: {
			formView
		},
		data() {
			return {
			}
		},
		computed:{
		},
		mounted() {
		},
		methods: {
		},
		created(){
		}
	}
</script>

<style lang="less">
	.main{
		.viewPage{
			width: 100%;
			height: 100%;
			overflow: auto;
			.viewPageMain{
				width: 980px;
				margin: 0 auto;
				background: #fff;
				padding: 20px;
				min-height: 100%;
				.pageViewBox{
					.pageViewItem{
						.pageViewOperate{
							display: none;
						}
					}
				}
			}
		}
	}
</style>
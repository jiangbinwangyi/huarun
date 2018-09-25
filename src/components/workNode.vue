<template>
	<div class="workNode">
		<div class="workNodeTop">
			<Row>
				<Col span="3">
				<h3><Icon type="ios-create" /> 门诊流程</h3>
				</Col>
				<Col span="16">
				<Steps :current="curStep">
					<Step title="数据关联" content="编辑病人相关信息模块"></Step>
					<Step title="表单创建" content="设置相应页面表单内容"></Step>
					<Step title="表单逻辑" content="设置表单相互之间逻辑"></Step>
				</Steps>
				</Col>
				<Col span="5">
				<div class="workNodeNext">
					<Button type="success" to="/viewPage" v-show="curStep>0">预览</Button>
					<Button type="success" to="/workFlow" v-show="curStep==2">完成</Button>
					<Button type="primary" @click="curStep--" v-show="curStep!=0">上一步</Button>
					<Button type="primary" @click="curStep++" v-show="curStep!=2">下一步</Button>
				</div>
				</Col>
			</Row>
		</div>
		<div class="workNodeMain">
			<router-view></router-view>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				workNodeSteps: ['dataLink','formCreate','formLogic'],
				curStep: 0,
			}
		},
		props: {},
		created() {
			this.curStep = this.workNodeSteps.indexOf(this.$router.currentRoute.name);
		},
		mounted() {
		},
		computed:{
		},
		methods: {
		},
		watch: {
			curStep(s) {
				this.$router.push({
					path: '/workNode/'+this.workNodeSteps[s]
				});
			},
		},
		updated(){}
	}
</script>

<style lang="less">
	.main{
		.workNode{
			.workNodeTop {
				background: #fff;
				padding: .16rem 15px;
				height: 1.08rem;
				h3 {
					line-height: .76rem;
					height: .76rem;
					font-size: 16px;
				}
				.workNodeNext {
					display: flex;
					align-items: center;
					height: .76rem;
					justify-content: flex-end;
					.ivu-btn {
						margin-right: 8px;
						&:last-child {
							margin: 0;
						}
					}
				}
			}
			.workNodeMain{
				height: 9.03rem;
			}
		}
	}
	
</style>
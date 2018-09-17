<template>
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
				<Button type="success" @click="viewPage" v-show="curStep==1">预览</Button>
				<Button type="success" to="/workFlow" v-show="curStep==2">完成</Button>
				<Button type="primary" @click="prevStep" v-show="curStep!=0">上一步</Button>
				<Button type="primary" @click="nextStep" v-show="curStep!=2">下一步</Button>
			</div>
			</Col>
		</Row>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				curStep: 0,
			}
		},
		mounted() {
			if(this.$route.name == "dataLink") {
				this.curStep = 0;
			} else if(this.$route.name == "formCreate") {
				this.curStep = 1;
			} else if(this.$route.name == "formLogic") {
				this.curStep = 2;
			} else {
				this.curStep = 0;
			}
		},
		methods: {
			nextStep() {
				if(this.curStep < 2) {
					this.curStep += 1;
				}
			},
			prevStep() {
				if(this.curStep > 0) {
					this.curStep -= 1;
				}
			},
			viewPage() {
				console.log(1);
			}
		},
		watch: {
			curStep(s) {
				let path = '/workNode/dataLink';
				if(s == 0) {
					path = '/workNode/dataLink';
				} else if(s == 1) {
					path = '/workNode/formCreate';
				} else if(s == 2) {
					path = '/workNode/formLogic';
				} else {
					path = '/workNode/dataLink';
				}
				this.$router.push({
					path: path
				});
			}
		}
	}
</script>

<style lang="less">
	.workNodeTop {
		background: #fff;
		padding: .16rem 15px;
		h3 {
			line-height: 44px;
			height: 44px;
			font-size: 16px;
		}
		.workNodeNext {
			display: flex;
			align-items: center;
			height: 44px;
			justify-content: flex-end;
			.ivu-btn {
				margin-right: 8px;
				&:last-child {
					margin: 0;
				}
			}
		}
	}
</style>
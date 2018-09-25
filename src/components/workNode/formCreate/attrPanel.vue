<template>
	<div class="attr">
		<div class="attr-title">{{attr.toolName}}</div>
		<div class="attr-action">
			<Form label-position="top">
				<!--title attr panel-->
				<div class="attrPanelTitle" v-if="attr.attr == 'text'">
					<FormItem label="标题内容">
						<Input placeholder="请输入标题名称" v-model="attr.name">
						</Input>
					</FormItem>
				</div>

				<!--form attr panel-->
				<div class="attrPanelForm" v-if="attr.attr == 'form'">
					<!--基础属性-->
					<div class="attrPanelBase">
						<FormItem label="控件标题">
							<Input v-model="attr.name" placeholder="请输入控件标题">
							</Input>
						</FormItem>
						<FormItem label="提示内容">
							<Input v-model="attr.placeholder" placeholder="请输入控件提示内容"></Input>
						</FormItem>
						<FormItem label="是否必填">
							<i-switch size="large" v-model="attr.required">
								<span slot="open">是</span>
								<span slot="close">否</span>
							</i-switch>
						</FormItem>
					</div>
					<!--私有属性-->

					<!--样式属性-->
					<div class="attrPanelStyle">
						<FormItem label="标题宽度（px）">
							<RadioGroup v-model="attr.labelWidth" type="button" size="small">
								<Radio :label="36"></Radio>
								<Radio :label="48"></Radio>
								<Radio :label="60"></Radio>
								<Radio :label="72"></Radio>
								<Radio :label="84"></Radio>
								<Radio :label="96"></Radio>
								<Radio :label="108"></Radio>
								<Radio :label="120"></Radio>
							</RadioGroup>
						</FormItem>
						<FormItem label="控件宽度（%）">
							<RadioGroup type="button" size="small">
								<Radio :label="10"></Radio>
								<Radio :label="20"></Radio>
								<Radio :label="30"></Radio>
								<Radio :label="40"></Radio>
								<Radio :label="50"></Radio>
								<Radio :label="60"></Radio>
								<Radio :label="70"></Radio>
								<Radio :label="80"></Radio>
								<Radio :label="90"></Radio>
								<Radio :label="100"></Radio>
							</RadioGroup>
						</FormItem>
					</div>
				</div>
			</Form>
		</div>
	</div>
</template>

<script>
	/*
	 记录一下两种实现思路
	 1. 现在所采用的思路，通过watch对labelindex的监听，改变面板属性
	 然后同v-model双向绑定attr.info
	通过watch对attr.info的深度监听，改变vuex数据
	（缺点是watch监听attr.info的时候不能确定是哪个属性发生改变，所有属性都要传过去）
	
	2. 通过computed与labelIndex进行绑定，一旦labelIndex发生变化，
	即可改变对vuex数据的请求，同时对单向绑定的value视图进行改变
	然后通过对@on-change事件的监听，
	将属性和对应的属性值一并发送给vuex进行数据操作
	（缺点是代码量稍多，逻辑思路比较长）
	 * */
	import {mapState} from 'vuex'
	export default {
		name: "attrPanel",
		data() {
			return {
				attr: {},
			}
		},
		computed: mapState({
			curLabel: state => state.formCreate.pageView[state.formCreate.labelIndex]
		}),
		mounted(){
		},
		created() {},
		methods: {},
		watch: {
			//属性面板切换
			'curLabel':{
				handler(curLabel){
					this.attr = curLabel;
				},
				immediate: true
			},
			//属性值改变监听
			'attr.info': {
				handler(n,o){
					if(o){
						let obj = {
							type: 'editLabel',
							curIndex: this.curLabelIndex,
							attr: {}
						}
						for(let k in n){
							obj.attr[k] = n[k];
						}
						this.$store.commit(obj);
					}
				},
				deep: true,
			}
		}
	}
</script>

<style lang="less" scoped>
	.attr {
		background-color: #fff;
		width: 100%;
		height: 100%;
		padding: 0;
		position: relative;
		.attr-title {
			height: .64rem;
			line-height: .64rem;
			text-align: center;
			background-color: #e8edf1;
			color: #5e6572;
			font-weight: bold;
			font-size: 14px;
			position: relative;
			z-index: 1;
		}
		.attr-action {
			width: 100%;
			box-sizing: border-box;
			padding: .84rem .2rem .2rem;
			font-size: 14px;
			height: 100%;
			position: absolute;
			top: 0;
			overflow-y: auto;
		}
	}
</style>
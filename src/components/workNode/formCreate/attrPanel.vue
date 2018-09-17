<template>
	<div class="attr">
		<div class="attr-title">{{attr.name}}</div>
		<div class="attr-action">
			<Form :label-width="60">
				<!--title attr panel-->
				<div class="attrPanelTitle" v-if="attr.attr == 'text'">
					<FormItem label="标题内容">
						<Input 
							placeholder="请输入标题名称" 
							:value="attr.name"
							@input="changeAttr('name',$event)" >
						</Input>
					</FormItem>
				</div>
				
				<!--form attr panel-->
				<div class="attrPanelForm" v-if="attr.attr == 'form'">
					<!--基础属性-->
					<div class="attrPanelBase">
						<FormItem label="控件标题">
							<Input :value="attr.info.name"
								@input="changeAttr('name',$event)" 
								placeholder="请输入控件标题">
							</Input>
						</FormItem>
						<FormItem label="提示内容">
							<Input :value="attr.info.placeholder" 
								@input="changeAttr('placeholder',$event)" 
								 placeholder="请输入控件提示内容"></Input>
						</FormItem>
						<FormItem label="是否必填">
							<i-switch size="large" 
								:value="attr.info.required" 
								@on-change="changeAttr('required',$event)">
								<span slot="open">是</span>
								<span slot="close">否</span>
							</i-switch>
						</FormItem>
					</div>
					<!--私有属性-->
					<!--样式属性-->
				</div>
			</Form>
		</div>		
	</div>
</template>

<script>
	export default {
		name: "attrPanel",
		props: [
			'curLabelIndex',  //选中的控件
		],
		data() {
			return {
			}
		},
		computed:{
			attr(){
				let pageView = this.$store.state.formCreate.pageView;
				let pageTool = this.$store.state.formCreate.pageTool;
				//lebel索引值合法
				if(this.curLabelIndex>=pageView.length || pageView.length==0){
					return {
						//默认值
						name: "属性面板",
						attr: "none"
					}
				}else{
					let curLabel = pageView[this.curLabelIndex]; //当前label
					return {
						//属性面板名称
						name: (()=>{
							for(let v of pageTool){
								if(v.type == curLabel.type){
									return v.name;
									break;
								}
							}
						})(),
						//form属性面板类型（input，select等）
						type: curLabel.type,
						//属性面板类型（text，form等）
						attr: curLabel.attr,
						//当前label的详细属性
						info: {
							name: curLabel.name || "",
							placeholder: curLabel.placeholder || "",
							required: curLabel.required || false,
						}
					}
				}
			},
		},
		mounted() {},
		methods: {
			//改变store属性
			changeAttr(k,v){
				let obj = {
					type:'editLabel',
					curIndex: this.curLabelIndex,
					attr: {}
				}
				obj.attr[k] = v;
				this.$store.commit(obj);
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
<template>
	<div class="pageViewBox" id="pageView">
		<div v-for="(v,i) in pageView" class="pageViewItem" :class="v.line && 'line'">
			<!--标题-->
			<div class="pageViewMain" v-if="v.type=='title'">
				<h1><Icon type="ios-bookmark" />{{v.name}}</h1>
			</div>
			<!--输入框-->
			<div class="pageViewMain" v-if="v.type=='input'">
				<FormItem :label="v.name" :required="v.required">
					<Input :placeholder="v.placeholder"></Input>
				</FormItem>
			</div>
			<!--日期-->
			<div class="pageViewMain" v-if="v.type=='date'">
				<FormItem :label="v.name" :required="v.required">
					<DatePicker :placeholder="v.placeholder"></DatePicker>
				</FormItem>
			</div>
			<!--价格-->
			<div class="pageViewMain" v-if="v.type=='money'">
				<FormItem :label="v.name" :required="v.required">
					<Input prefix="logo-usd" :placeholder="v.placeholder" />
				</FormItem>
			</div>
			<!--下拉列表-->
			<div class="pageViewMain" v-if="v.type=='select'">
				<FormItem :label="v.name" :required="v.required">
					<Select :placeholder="v.placeholder">
						<Option value="beijing">北京</Option>
						<Option value="shanghai">上海</Option>
						<Option value="shenzhen">深圳</Option>
					</Select>
				</FormItem>
			</div>
			<!--多选按钮-->
			<div class="pageViewMain" v-if="v.type=='checkbox'">
				<FormItem :label="v.name" :required="v.required">
					<CheckboxGroup>
						<Checkbox label="美食"></Checkbox>
						<Checkbox label="娱乐"></Checkbox>
						<Checkbox label="运动"></Checkbox>
						<Checkbox label="艺术"></Checkbox>
					</CheckboxGroup>
				</FormItem>
			</div>
			<!--单选按钮-->
			<div class="pageViewMain" v-if="v.type=='radio'">
				<FormItem :label="v.name" :required="v.required">
					<RadioGroup>
						<Radio label="男">男</Radio>
						<Radio label="女">女</Radio>
					</RadioGroup>
				</FormItem>
			</div>
			<!--按钮-->
			<div class="pageViewMain" v-if="v.type=='button'">
				<FormItem>
					<Button type="primary">确定</Button>
					<Button style="margin-left: 8px">重置</Button>
				</FormItem>
			</div>
			<!--操作-->
			<div class="pageViewOperate" :data-type="v.type" @click.self="changeAttr(i)">
				<div class="pageOperateMain">
					<Icon :type="v.line?'ios-arrow-dropright-circle':'ios-arrow-dropleft-circle'" v-if="v.group=='基础组件'" @click.stop="changeAttrLine(i)" />
					<Icon type="ios-close-circle" class="pageItemDelete" />
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'formView',
		data() {
			return {};
		},
		mounted() {},
		computed: {
			pageView() {
				return this.$store.state.formCreate.pageView
			},
		},
		beforeDestroy() {},
		methods: {
			//传递选中控件
			changeAttr(index) {
				this.$emit('cueLabelIndex', index)
			},
			//合并拆分组件
			changeAttrLine(index) {
				this.$store.commit({
					type: 'editLabel',
					curIndex: index,
					attr: {
						line: !this.pageView[index].line
					}
				})
			},
		}
	}
</script>

<style lang="less">
	.main {
		.pageViewBox {
			height: 100%;
			padding: .2rem;
			overflow-y: auto;
			.pageViewItem {
				position: relative;
				padding-bottom: 20px;
				width: 100%;
				transition: all .2s ease;
				display: inline-block;
				&.line {
					width: 50%;
				}
				.pageViewMain {
					display: block;
					.ivu-form-item {
						margin: 0;
					}
					h1 {
						color: #2d8cf0;
						font-size: 14px;
						line-height: 2;
						padding-bottom: 10px;
						border-bottom: solid 1px #2d8cf0;
					}
				}
				.pageViewOperate {
					display: none;
					position: absolute;
					top: 0;
					left: 0;
					width: 100%;
					height: 100%;
					border: dashed 1px #fff;
					background: rgba(45, 140, 240, .1);
					z-index: 9;
					.pageOperateMain {
						position: absolute;
						right: 6px;
						top: 6px;
						font-size: 16px;
						cursor: pointer;
					}
				}
				&:hover .pageViewOperate {
					display: block;
				}
			}
		}
	}
</style>
<template>
	<Form :label-width="80" style="height: 100%;">
		<Row class="createPage" :gutter="20">
			<Col span="20" class="pageViewBox" id="pageView">
			</Col>
			<Col span="4" class="pageToolBox" id="pageTool">
				<h3>文本控件</h3>
				<div class="pageToolItem">
					<p><Icon type="md-square" />标题</p>
					<div class="pageToolMain">
						<h1>完美的人生体验</h1>
					</div>
				</div>
				<div class="pageToolItem">
					<p><Icon type="ios-paper" />段落</p>
					<div class="pageToolMain">
						<p>这里是一段关于完美的描述</p>
					</div>
				</div>
				<h3>表单控件</h3>
				<div class="pageToolItem">
					<p><Icon type="ios-brush" />输入框</p>
					<div class="pageToolMain">
						<FormItem label="姓名">
							<Input placeholder="Enter your name"></Input>
						</FormItem>
					</div>
					
				</div>
				<div class="pageToolItem">
					<p><Icon type="md-albums" />按钮</p>
					<div class="pageToolMain">
						<FormItem>
							<Button type="primary">确定</Button>
							<Button style="margin-left: 8px">重置</Button>
						</FormItem>
					</div>
				</div>
				<div class="pageToolItem">
					<p><Icon type="ios-calendar" />日期选择</p>
					<div class="pageToolMain">
						<FormItem prop="date" label="日期">
	                        <DatePicker placeholder="Select date"></DatePicker>
	                    </FormItem>
					</div>
				</div>
				<div class="pageToolItem">
					<p><Icon type="ios-radio-button-on" />单选按钮组</p>
					<div class="pageToolMain">
						<FormItem label="性别" prop="gender">
				            <RadioGroup>
				                <Radio label="男">男</Radio>
				                <Radio label="女">女</Radio>
				            </RadioGroup>
				        </FormItem>
					</div>
				</div>
				<div class="pageToolItem">
					<p><Icon type="ios-radio-button-on" />多选按钮组</p>
					<div class="pageToolMain">
						<FormItem label="爱好" prop="interest">
				            <CheckboxGroup>
				                <Checkbox label="美食"></Checkbox>
				                <Checkbox label="娱乐"></Checkbox>
				                <Checkbox label="运动"></Checkbox>
				                <Checkbox label="艺术"></Checkbox>
				            </CheckboxGroup>
				        </FormItem>
					</div>
				</div>
				<div class="pageToolItem">
					<p><Icon type="ios-radio-button-on" />下拉列表</p>
					<div class="pageToolMain">
						<FormItem label="City" prop="city">
				            <Select placeholder="Select your city">
				                <Option value="beijing">北京</Option>
				                <Option value="shanghai">上海</Option>
				                <Option value="shenzhen">深圳</Option>
				            </Select>
				        </FormItem>
					</div>
				</div>
			</Col>
		</Row>
	</Form>
</template>

<script>
	import Sortable from 'sortablejs';
	export default {
		data() {
			return {

			}
		},
		mounted() {
			document.body.ondrop = function(event) {
				event.preventDefault();
				event.stopPropagation();
			};

			let vm = this;

			//工具盒子
			let pageTool = document.getElementById('pageTool');
			Sortable.create(pageTool, {
				group: {
					name: 'list',
					pull: 'clone',
					put: false //是否允许放入
				},
				animation: 120,
				handle: '.pageToolItem', //只有pageItem 可以拖拽
				sort: false, //是否排序
				//				disabled: true,
				fallbackClass: 'fallback-item',
				ghostClass: 'ghost-item', //确认前样式
				chosenClass: 'chosen-item',
				forceFallback: true,
				onStart(event) {
					event.item.childNodes[0].remove();
				},
				onRemove(event) {

				}
			});

			//视图盒子
			let pageView = document.getElementById('pageView');
			Sortable.create(pageView, {
				group: {
					name: 'list',
					pull: false //是否允许拖出
				},
				filter: '.draggable-delete',
				onFilter: function(evt) {
					evt.item.parentNode.removeChild(evt.item);
				},
				animation: 120,
				ghostClass: 'ghost-item', //影子样式
				fallbackClass: 'viewFallback',
				chosenClass: 'viewChosen',
				scroll: true,
				onRemove(event) {

				}
			});

			this.changeModal();
		},
		methods: {
			savePage() {
				console.log(this.$Modal)
			},
			cancelPage() {
				//重置
			},
			changeModal() {

			}
		}
	}
</script>

<style lang="less">
	.createPage {
		height: 100%;
		.pageBox{
			height: 100%;
			border: solid 1px #eee;
			padding: .2rem;
			overflow-y: auto;
		}
		.pageToolBox {
			.pageBox;
			background: #eee;
			h3{
				font-size: 16px;
				&:not(:first-child){
					margin-top: 12px;
				}
			}
			.pageToolItem{
				p{
					line-height: 2;
					font-size: 14px;	
				}
				.pageToolMain {
					display: none;
				}
			}
			
		}
		.pageViewBox {
			.pageBox;
			.pageToolMain {
				display: block;
			}
		}
		.fallback-item {
			opacity: 0;
		}
		.chosen-item {
		}
		.ghost-item{
			opacity: .2;
			border: dashed 1px #999;
		}
		.viewChosen {
		}
		.viewFallback{
			opacity: 0;
		}
	}
</style>
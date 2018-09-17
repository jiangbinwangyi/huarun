<template>
	<Form :label-width="80" style="height: 100%;">
		<Row class="createPage">
			<!--工具盒子-->
			<Col span="5" class="pageToolBox">
			<div class="pageToolMain" id="pageTool">
				<template v-for="title in pageToolTitle">
					<h3>{{title}}</h3>
					<div class="pageToolItem" v-for="(v,i) in pageTool" v-if="v.group==title" :data-type="v.type">
						<p>
							<Icon :type="v.icon" />{{v.name}}</p>
					</div>
				</template>
			</div>
			</Col>
			<!--视图盒子-->
			<Col span="13">
				<formView @cueLabelIndex="changeAttr($event)">
				</formView>
			</Col>
			<!--属性面板-->
			<Col span="6" class="attrBox">
				<attrPanel :curLabelIndex="curLabelIndex"></attrPanel>
			</Col>
		</Row>
	</Form>
</template>
<script>
	import Sortable from 'sortablejs';
	import attrPanel from './attrPanel';
	import formView from './formView';
	export default {
		components: {
			attrPanel,
			formView
		},
		props: [
			'fromCreateData'
		],
		data() {
			return {
				curLabelIndex: 0, //初始化
			}
		},
		created() {
			//临时，后期统一整理到router.js逻辑里
			this.$store.commit('setLabel',this.fromCreateData);
		},
		computed: {
			//pageView和pageTool在本页面只读不改，所有的修改交给$store
			pageTool(){
				return this.$store.state.formCreate.pageTool
			},
			pageToolTitle() {
				let arr = [];
				for(let v of this.pageTool) {
					if(arr.indexOf(v.group) < 0) {
						arr.push(v.group);
					}
				}
				return arr;
			}
		},
		mounted() {
			let vm = this
			document.body.ondrop = function(event) {
				event.preventDefault();
				event.stopPropagation();
			};

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
				fallbackClass: 'fallback-item',
				ghostClass: 'ghost-item', //确认前样式
				chosenClass: 'chosen-item',
//				forceFallback: true,
				onRemove(event) {
					//向视图库添加数据，直接操作store
					vm.$store.commit({
						type:'newLabel',
						labelType: event.item.dataset.type,
						newIndex: event.newIndex
					});
					
					//删除dom节点。操作数据，改变dom
					event.item.parentNode.removeChild(event.item);
				}
			});

			//视图盒子
			let pageView = document.getElementById('pageView');
			Sortable.create(pageView, {
				group: {
					name: 'list',
					pull: false //是否允许拖出
				},
				filter: '.pageItemDelete',
				onFilter: function(event) {
					//删除视图库数据，dom已经被移除，同时改变数据
					vm.$store.commit({
						type: 'delLabel',
						oldIndex: event.oldIndex
					})
				},
				animation: 120,
				ghostClass: 'ghost-item', //影子样式
				fallbackClass: 'viewFallback',
				chosenClass: 'viewChosen',
				scroll: true,
				onRemove(event) {},
				onUpdate(event) {
					//还原dom的移动操作，交给vue
					let newIndex = event.newIndex,
						oldIndex = event.oldIndex,
						$ul = event.item.parentElement,
						$li = $ul.children[newIndex],
						$oldLi = $ul.children[oldIndex]
					// 先删除移动的节点
					$ul.removeChild($li)
					// 再插入移动的节点到原有节点，还原了移动的操作
					if(newIndex > oldIndex) {
						$ul.insertBefore($li, $oldLi)
					} else {
						$ul.insertBefore($li, $oldLi.nextSibling)
					}

					//把数据排序交给vue更新视图，直接操作store
					vm.$store.commit({
						type: 'sortLabel',
						oldIndex,
						newIndex
					})
				}
			});
		},
		methods: {
			changeAttr(index){
				this.curLabelIndex = index;
			}
		},
		watch: {},
	}
</script>
<style lang="less">
	.main {
		.createPage {
			height: 100%;
			.pageBox {
				height: 100%;
				padding: .2rem;
				overflow-y: auto;
			}
			.pageToolBox {
				.pageBox;
				.pageToolMain {
					font-size: 0;
					background: #fff;
					height: 100%;
				}
				h3 {
					font-size: 14px;
					background: #eceff2;
					color: #5e6572;
					line-height: .64rem;
					text-align: center;
					margin-bottom: .1rem;
					height: .64rem;
					&:not(:first-child) {
						margin-top: .3rem;
					}
				}
				.pageToolItem {
					display: inline-block;
					width: 30.667%;
					padding: .2rem 0 .1rem;
					overflow: hidden;
					text-align: center;
					border: solid 1px #ddd;
					margin: 2% 0 0 2%;
					margin-bottom: 0;
					background: #eceff2;
					p {
						line-height: 2;
						font-size: 12px;
						i {
							display: block;
							font-size: 18px;
						}
					}
				}
			}
			.attrBox {
				height: 100%;
				padding: .2rem;
			}
			/*以下样式有待整理*/
			.fallback-item {
				opacity: 0;
			}
			.chosen-item {}
			.ghost-item {
				opacity: .2;
				border: dashed 1px #999;
			}
			.viewChosen {}
			.viewFallback {
				opacity: 0;
			}
		}
	}
</style>
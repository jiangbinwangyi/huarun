<template>
	<Row style="height: 100%;" id="work-container">
		<!--左侧工作流盒子-->
		<Col span="4" class="leftMenu">
		<!--利用refs直接处理工作流 workFlowLeft-->
		<!--@flowChange监听工作流切换-->
		<leftMenu ref="flowBox" @flowChange="flowChange($event)"></leftMenu>
		</Col>
		<!--中间视图盒子-->
		<Col span="16" class="centerView">
		<h3>{{flowTitle}}</h3>
		<div id="viewBox" class="viewBox">
			<div v-for="(item, index) in workViewList.nodes" :key="index" :id="item.id" class="workItem" :data-index="index" :style="'left:'+item.loca.x+'px;top:'+item.loca.y+'px;'">
				<div class="workItemMain" :data-type="item.type" @dblclick="toWorkNode($event)">
					<Icon :type="item.icon"></Icon>
					{{ item.name }}
					<Icon type="md-close" class="draggable-delete"></Icon>
				</div>
				<div class="workItemArrow"></div>
			</div>
		</div>
		</Col>
		<!--右侧工具盒子-->
		<Col span="4" class="rightMenu">
		<div class="toolBox">
			<h3>工具箱</h3>
			<div id="toolBox">
				<template v-for="title in toolListTitle">
					<div class="toolBoxTitle">{{title}}</div>
					<div v-for="(item, index) in workTool" v-if="item.type==title" :key="index" class="workItem" :data-index="index">
						<Icon :type="item.icon"></Icon>
						{{ item.name }}
					</div>
				</template>
			</div>
		</div>
		</Col>
	</Row>
</template>

<script>
	import Sortable from 'sortablejs';
	import { jsPlumb } from 'jsplumb';
	import axios from 'axios';
	import 'jsplumb/css/jsplumbtoolkit-defaults.css';
	import leftMenu from './workFlow/workFlowLeft.vue';
	import flowNode from './workFlowNode.vue';
	import workTool from './workFLow/workTool.js';

	export default {
		name: 'workFlow',
		components: {
			leftMenu,
			flowNode
		},
		data() {
			return {
				flowTitle: "",
				workTool,
				jsp: null,
			};
		},
		computed: {
			workViewList() {
				return {
					nodes: this.$store.state.workFlow.workView.nodes,
					connections: this.$store.state.workFlow.workView.connections
				}
			},
			toolListTitle() {
				let arr = [];
				for(let v of this.workTool) {
					if(arr.indexOf(v.type) < 0) {
						arr.push(v.type);
					}
				}
				return arr;
			}
		},
		mounted() {
			document.body.ondrop = function(event) {
				event.preventDefault();
				event.stopPropagation();
			};
		},
		methods: {
			plumbReady() {
				jsPlumb.ready(() => {
					let vm = this;
					
					//工具盒子，实现拖拽
					let toolBox = document.querySelector('#toolBox');
					Sortable.create(toolBox, {
						group: {
							name: 'list',
							pull: 'clone',
							put: false
						},
						handle: '.workItem',
						sort: false,
						//forceFallback: true,
						fallbackClass: 'toolFallback',
						chosenClass: 'toolChosen',
						onRemove(event) {
							//删除拖拽后复制的dom节点
							event.item.parentNode.removeChild(event.item);
							//新增节点
							let nodes = vm.workViewList.nodes;
							let id = jsPlumbUtil.uuid();;

							let item = event.clone;
							let loca = vm.getLocation(item); //获取坐标位置
							for(let v of vm.workTool) {
								if(item.innerHTML.indexOf(v.name) > -1) {
									vm.$store.commit({
										type: 'nodeNew',
										tool: Object.assign({}, v),
										loca,
										id
									})
									break;
								}
							}

							vm.$nextTick(() => {
								vm.initNode(id);
							});
						},
					});

					//视图盒子只作为容器
					let viewBox = document.getElementById('viewBox');
					Sortable.create(viewBox, {
						group: {
							name: 'list',
							pull: false, //是否允许拖出
							put: true
						},
						sort: false,
						//forceFallback: true,
						fallbackClass: 'itemFallback',
						chosenClass: 'itemChosen',
					});

					// 删除连接线
					//					instance.bind("click", function(c) {
					//						instance.deleteConnection(c);
					//					});

					//					instance.bind("connection", function(info) {
					//
					//					});

					//初始化
					this.plumbBegin();
					jsPlumb.fire("jsPlumbDemoLoaded", this.jsp);
				})
			},
			plumbEmpty(workView){
				this.$store.commit({
					type: 'setWork',
					data: {
						nodes: [],
						connections: []
					}
				});
				this.$nextTick(() => {
					this.jsp.empty("viewBox");

					this.$store.commit({
						type: 'setWork',
						data: workView
					});

					this.$nextTick(() => { //第二次用来做dom重新装载完成
						this.plumbBegin();
					})
				})
			},
			plumbBegin() {
				let vm = this;
				
				let instance = jsPlumb.getInstance({
					Endpoint: [
						"Blank",
						{
							cssClass: "chart-dot",
							hoverClass: "chart-dot-hover",
							radius: 5
						}
					],
					Connector: "Straight",
					HoverPaintStyle: {
						stroke: "#1e8151",
						strokeWidth: 2
					},
					ConnectionOverlays: [
						[
							"Arrow",
							{
								location: 1,
								visible: true,
								width: 11,
								height: 11,
								id: "Arrow"
							}
						]
					],
					Container: "viewBox"
				})

				this.jsp = instance;

				//删除节点
				instance.on(viewBox, "click", ".draggable-delete", function(c) {
					let el = c.path.filter((e, i) => {
						return e.className && e.classList.contains('workItem');
					})
					let id = el[0].id;
					vm.$Modal.confirm({
						render: (h) => {
							return h('p', "确认是否删除该节点")
						},
						onOk: () => {
							//instance.deleteConnectionsForElement(id);
							//instance.deleteConnection(id);
							//instance.deleteEveryConnection(id);
							//instance.deleteEveryEndpoint(id);

							vm.$store.commit({ //既要删除节点数据
								type: 'nodeDel',
								id
							})

							let workView = vm.workViewList;

							vm.plumbEmpty(workView);

						}
					})
				})

				instance.bind("beforeDrop", function(info) {
					//info.connection.getOverlay("label").setLabel(info.connection.id);
					//判断是否已有该连接
					let isSame = true;
					vm.workViewList.connections.forEach(item => {
						if(
							(item.targetId === info.targetId &&
								item.sourceId === info.sourceId) ||
							(item.targetId === info.sourceId && item.sourceId === info.targetId)
						) {
							isSame = false;
						}
					});
					if(isSame) {
						vm.$store.commit({
							type: 'connectEdit',
							connect: {
								targetId: info.targetId,
								sourceId: info.sourceId
							}
						})
					} else {
						console.log("不允许重复连接！");
					}
					return isSame;
				});

				this.workViewList.nodes.forEach(item => {
					this.initNode(item.id);
				});
				this.workViewList.connections.forEach(item => {
					this.jsp.connect({
						source: item.sourceId,
						target: item.targetId
					});
				});
			},
			initNode(el) {
				let vm = this;
				this.jsp.draggable(el, {
					// containment: true,
					start(params) {
						// 拖动开始
					},
					drag(params) {
						// 拖动中
					},
					stop(params) {
						// 拖动结束,更新存储位置
						let loca = {
							x: params.pos[0],
							y: params.pos[1]
						}
						vm.$store.commit({
							type: 'nodeEdit',
							index: params.el.dataset.index,
							attr: {
								loca
							}
						})
					}
				});

				this.jsp.makeSource(el, {
					filter: ".workItemArrow",
					// anchor: "Continuous",
					anchor: ["Perimeter", {
						shape: "Rectangle"
					}],
					connectorStyle: {
						stroke: "#5c96bc",
						strokeWidth: 2,
						outlineStroke: "transparent",
						outlineWidth: 4
					},
					extract: {
						action: "the-action"
					},
					maxConnections: -1,
					onMaxConnections: function(info, e) {
						alert("Maximum connections (" + info.maxConnections + ") reached");
					}
				});

				this.jsp.makeTarget(el, {
					dropOptions: {
						hoverClass: "dragHover"
					},
					anchor: ["Perimeter", {
						shape: "Rectangle"
					}],
					allowLoopback: false
				});

				this.jsp.fire("jsPlumbDemoNodeAdded", el);
			},
			//工作流节点双击进入编辑页面
			toWorkNode(e) { //不能双击图标
				if(e.target.dataset.type == "工作流节点") {
					this.$router.push({
						path: '/workNode/dataLink'
					});
				} else {
					this.$Message.error('普通节点暂时不可编辑');
				}
			},
			//获取拖入位置
			getLocation(item) {
				//后期注意控制位置的范围，以及精细的位置调整
				let viewBox = document.querySelector('#viewBox');
				let top = document.querySelector('.main-top').clientHeight;
				let left = document.querySelector('.leftMenu').clientWidth;
				let mouse = window.event;
				return {
					x: mouse.clientX - (left + viewBox.offsetLeft) - item.clientWidth / 2,
					y: mouse.clientY - (top + viewBox.offsetTop) - item.clientHeight / 2
				}
			},
			flowChange(op) {
				//由于每一次都要做重新请求，不能保存工作流
				axios.get('./static/workFlow/workView_' + op.id + '.json').then((res) => {
					this.$nextTick(() => { //首次加载启动plumb
						if(op.r){
							this.$store.commit({
								type: 'setWork',
								data: res.data
							})
							this.plumbReady();
						}else{ //切换工作流的话直接清空
							this.plumbEmpty(res.data);
						}
					});
				}).catch((e) => {
					console.log(e);
				})
			}
		}
	};
</script>

<style lang="less"></style>
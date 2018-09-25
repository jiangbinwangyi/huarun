<template>
	<Row style="height: 100%;" id="work-container">
		<!--左侧工作流盒子-->
		<Col span="4" class="leftMenu">
			<!--@flowChange监听工作流切换-->
			<leftMenu @flowChange="emptyNode($event)"></leftMenu>
		</Col>
		<!--中间视图盒子-->
		<Col span="16" class="centerView">
			<h3>{{flowTitle}}</h3>
			<div id="viewBox" class="viewBox">
				<div v-for="(item, index) in nodeList.nodes" :key="index" :id="item.id" class="workItem" :data-index="index" :style="'left:'+item.loca.x+'px;top:'+item.loca.y+'px;'">
					<div class="workItemMain" @dblclick="toWorkNode(item.type)">
						<Icon :type="item.icon"></Icon>
						<span v-text="item.name"></span>
						<Icon type="md-create" class="nodeEdit" @click="nodeEdit(index)"></Icon>
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
	import workTool from './workFLow/workTool.js';

	export default {
		name: 'workFlow',
		components: {
			leftMenu,
		},
		data() {
			return {
				flowTitle: "",
				workTool,
				jsp: null,
			};
		},
		computed: {
			nodeList() {
				return this.$store.state.workFlow.nodeList
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
		watch: {
			nodeList: {
				handler(n, o) {
					this.$nextTick(() => {
						if(n.nodes && n.nodes.length > 0) {
							this.jspReady()
						}
					})
				},
//				deep: true   //如果深度监听，会重复装载jsp
			}
		},
		methods: {
			jspReady() {
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
							//新增节点
							let id = jsPlumbUtil.uuid(); //生成随机ID
							
							let item = event.item;
							
							let loca = vm.getLocation(item); //获取坐标位置
							
							let tool = vm.workTool.find((e,i)=>{
								return item.dataset.index == i;
							})
							
							item.parentNode.removeChild(item); //删除复制的dom节点
							
							vm.$store.commit({
								type: 'nodeNew',
								tool: Object.assign({},tool),
								loca,
								id
							})

							vm.$nextTick(() => {
								vm.jspInitNode(id); //注册成jsp节点
								
								vm.nodeEdit(vm.nodeList.nodes.length-1); //编辑新节点
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
					});

					//初始化
					this.jspBegin();
					jsPlumb.fire("jsPlumbDemoLoaded", this.jsp);
				})
			},
			jspBegin() {
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
							vm.$store.commit({ //既要删除节点数据
								type: 'nodeDel',
								id
							})
							
							//需要重新装载
							let newNodeList = vm.nodeList;
							vm.$nextTick(()=>{
								vm.$store.commit('setNode',{});
								vm.$nextTick(()=>{
									vm.jsp.empty('viewBox');
									vm.$store.commit('setNode',newNodeList);
								})
							})
						}
					})
				})

				instance.bind("beforeDrop", function(info) {
					//info.connection.getOverlay("label").setLabel(info.connection.id);
					//判断是否已有该连接
					let isSame = true;
					vm.nodeList.connections.forEach(item => {
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
				
				// 删除连接线
				//instance.bind("click", function(c) {
					//instance.deleteConnection(c);
				//});

				//instance.bind("connection", function(info) {});
				
				this.nodeList.nodes.forEach(item => {
					this.jspInitNode(item.id);
				});
				this.nodeList.connections.forEach(item => {
					this.jsp.connect({
						source: item.sourceId,
						target: item.targetId
					});
				});
			},
			jspInitNode(el) {
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
					//anchor: "Continuous",
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
			//工作流节点双击进入编辑页面，进入前保存
			toWorkNode(type) { //不能双击图标
				if(type == "工作流节点") {
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
			//切换时，先清空工作流
			emptyNode(id){
				this.$store.commit('setNode',{});
				this.$nextTick(()=>{
					this.jsp.empty('viewBox');
					this.$store.dispatch('setNode',id);
				})
			},
			//编辑工作节点
			nodeEdit(index){
				let name = this.nodeList.nodes[index].name;
				this.$Modal.confirm({
					render: (h) => {
						return h('Input', {
							props: {
								value: name,
								autofocus: true,
								placeholder: '请输入工作节点名字'
							},
							on: {
								input: (val) => {
									name = val;
								}
							}
						})
					},
					onOk: () => {
						this.$store.commit('nodeEdit',{index,attr:{name}});
					}
				})
			}
		}
	};
</script>

<style lang="less"></style>
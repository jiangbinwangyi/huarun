<template>
	<Row :gutter="10">
		<!--左侧工具盒子-->
		<Col span="4" class="leftMenu">
			<leftMenu class="flowBox"></leftMenu>
		</Col>
		<!--右侧视图盒子-->
		<Col span="16" class="rightView">
			<ul id="viewBox" class="draggable-list viewBox"></ul>
		</Col>
		<Col span="4" class="rightMenu">
			<div class="draggable-list toolBox">
				<ul id="toolBox">
					<li class="toolBoxTitle"><div class="draggable-list-main">通用节点</div></li>
					<li v-for="(item, index) in toolList" 
						v-if="item.type=='common'" 
						:key="index" 
						:data-modal="item.modal" 
						class="notwrap toolItem" 
						:data-index="index"
						@dblclick="toWorkError">
						<div class="draggable-list-main">
							<Icon :type="item.icon"></Icon>
							{{ item.name }}
							<Icon type="md-close" class="draggable-delete"></Icon>
						</div>
						<div class="draggable-arrow">
							<Icon type="md-arrow-dropdown" />
						</div>
					</li>
					<li class="toolBoxTitle"><div class="draggable-list-main">工作流节点</div></li>
					<li v-for="(item, index) in toolList" 
						v-if="item.type=='work'" 
						:key="index" 
						:data-modal="item.modal" 
						class="notwrap toolItem" 
						:data-index="index"
						@dblclick="toWorkNode(index,$event)">
						<div class="draggable-list-main">
							<Icon :type="item.icon"></Icon>
							{{ item.name }}
							<Icon type="md-close" class="draggable-delete"></Icon>
						</div>
						<div class="draggable-arrow">
							<Icon type="md-arrow-dropdown" />
						</div>
					</li>
				</ul>
			</div>
		</Col>
	</Row>
</template>

<script>
	import Sortable from 'sortablejs';
	import leftMenu from './leftMenu.vue';
	export default {
		name: 'workFlow',
		components: {
			leftMenu,
		},
		data() {
			return {
				toolList: [{
					name: '流程开始',
					icon: 'ios-create',
					type: 'common'
				}, {
					name: '流程结束',
					icon: 'ios-settings',
					type: 'common'
				}, {
					name: '数据过滤',
					icon: 'ios-settings',
					type: 'common'
				}, {
					name: '流程分支',
					icon: 'ios-settings',
					type: 'common'
				}, {
					name: '门诊挂号',
					icon: 'ios-settings',
					type: 'work'
				}, {
					name: '门诊就诊',
					icon: 'ios-settings',
					type: 'work'
				}, {
					name: '门诊缴费',
					icon: 'ios-settings',
					type: 'work'
				}, {
					name: '辅助检验',
					icon: 'ios-settings',
					type: 'work'
				}, {
					name: '手术治疗',
					icon: 'ios-settings',
					type: 'work'
				}, {
					name: '药方开药',
					icon: 'ios-settings',
					type: 'work'
				}, {
					name: '住院登记',
					icon: 'ios-settings',
					type: 'work'
				}, {
					name: '入院常规',
					icon: 'ios-settings',
					type: 'work'
				}],
				viewList: []
			};
		},
		mounted() {
			document.body.ondrop = function(event) {
				event.preventDefault();
				event.stopPropagation();
			};

			let vm = this;

			//工具盒子
			let toolBox = document.getElementById('toolBox');
			Sortable.create(toolBox, {
				group: {
					name: 'list',
					pull: 'clone',
					put: false //是否允许放入
				},
				animation: 120,
				handle: '.toolItem',
				sort: false, //是否排序
				fallbackClass: 'iview-admin-cloned-item',
				onRemove(event) {
					vm.viewList.splice(event.newIndex, 0, vm.toolList[event.item.getAttribute('data-index')]);
					let prevItem = event.item.previousSibling;
					let nextItem = event.item.nextSibling;
					if(prevItem!=null){
						prevItem.classList.add('active');
					}
					if(nextItem!=null){
						event.item.classList.add('active');
					}
				}
			});

			//视图盒子
			let viewBox = document.getElementById('viewBox');
			Sortable.create(viewBox, {
				group: {
					name: 'list',
					pull: true //是否允许拖出
				},
				filter: '.draggable-delete',
				animation: 120,
				ghostClass: 'placeholder-style', //影子样式
				fallbackClass: 'iview-admin-cloned-item',
				onEnd(event){
					event.item && event.item.classList.add('active');
					let tc = event.target.childNodes;
					tc[tc.length-1].classList.remove('active');
					tc[tc.length-2].classList.add('active');
				},
				onFilter(event) {
					let nextItem = event.item.nextSibling;
					let prevItem = event.item.previousSibling;
					if(nextItem==null && prevItem!=null){
						prevItem.classList.remove('active');
					}
					event.item.parentNode.removeChild(event.item);
					vm.viewList.splice(event.oldIndex, 1);
				},
				onRemove(event) {
					
				},
			});
		},
		methods: {
			toWorkNode(v,e){
				if(e.target.parentNode.id="viewBox"){
					this.$router.push({
						path: '/workNode/dataLink'
					});
				}
			},
			toWorkError(){
				this.$Message.error('普通节点暂时不可编辑');
			}
		}
	};
</script>

<style lang="less">
	
</style>
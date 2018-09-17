<template>
	<div :id="'workView'+id" class="workItem" :data-index="index" :style="'left:'+loca.x+'px;top:'+loca.y+'px;'">
		<div class="workItemMain" :data-type="type" @dblclick="toWorkNode($event)">
			<Icon :type="icon"></Icon>
			{{ name }}
			<Icon type="md-close" class="draggable-delete"></Icon>
		</div>
		<div class="workItemArrow"></div>
	</div>
</template>

<script>
	import Sortable from 'sortablejs';

	export default {
		name: 'workFlowNode',
		data() {
			return {

			};
		},
		props: {
			id: {
				type: String,
				required: true
			},
			name: {
				type: String,
				required: true
			},
			type: {
				type: String,
				required: true
			},
			icon: {
				type: String
			},
			loca: {
				type: Object
			},
			index: {
				type: Number
			}
		},
		computed: {

		},
		mounted() {

		},
		methods: {
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
		}
	};
</script>

<style lang="less"></style>
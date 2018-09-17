<template>
	<div class="flowBox">
		<h3>
			工作流
			<span class="flowBoxRight">
				<Icon type="md-add" @click="flowNew" />
			</span>
		</h3>
		<ul>
			<li v-for="(v,i) in flowList" :class="v.id==curId&&'cur'" @click.self="flowChange(v.id)">
				{{v.name}}
				<span class="flowBoxRight">
					<Icon type="md-create" @click="flowEdit(i)" /> 
					<Icon type="md-close"  @click="flowDel(i)"/>
				</span>
			</li>
		</ul>
	</div>
</template>

<script>
	export default {
		name: "leftMenu",
		data() {
			return {
				flowList: [{
					id: 0,
					name: "门诊工作流",
				}, {
					id: 1,
					name: "住院工作流",
				}],
				curId: null
			}
		},
		computed: {
		},
		props: [],
		mounted() {
		},
		created() {
			this.flowChange(this.flowList[0].id,true);
		},
		methods: {
			//工作流加载
			flowChange(id,r) {
				this.curId = id;
				this.$emit('flowChange',{id,r})
			},
			//工作流新建
			flowNew() {
				let newFlowName = "";
				this.$Modal.confirm({
					render: (h) => {
						return h('Input', {
							props: {
								autofocus: true,
								placeholder: '请输入工作流名字'
							},
							on: {
								input: (val) => {
									newFlowName = val;
								}
							}
						})
					},
					onOk: () => {
						let fl = this.flowList;
						if(newFlowName != "") {
							let id = fl[fl.length - 1].id || -1;
							fl.push({
								id: id + 1,
								name: newFlowName,
								cur: false,
								flow: []
							})
						}
					}
				})
			},
			//工作流编辑
			flowEdit(i) {
				let newFlowName = this.flowList[i].name;
				this.$Modal.confirm({
					render: (h) => {
						return h('Input', {
							props: {
								value: newFlowName,
								autofocus: true,
								placeholder: '请输入工作流名字'
							},
							on: {
								input: (val) => {
									newFlowName = val;
								}
							}
						})
					},
					onOk: () => {
						this.flowList[i].name = newFlowName;
					}
				})
			},
			//工作流删除
			flowDel(i) {
				if(this.flowList.length < 2) {
					this.$Message.error('不能删除所有工作流');
				} else {
					this.$Modal.confirm({
						render: (h) => {
							return h('p', "确认是否删除")
						},
						onOk: () => {
							this.flowList.splice(i, 1);
							this.flowChange(0);
						}
					})
				}
			}
		},
		watch: {
			flowList: {
				handler(newList){
					this.flowChange(this.curId);
				},
				deep: true  //数组深度监听
			}
		}
	}
</script>

<style>

</style>
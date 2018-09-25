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
	import {mapState} from 'vuex';
	export default {
		name: "leftMenu",
		data() {
			return {
				curId: null
			}
		},
		computed: mapState({
			flowList: state=>state.workFlow.flowList
		}),
		props: [],
		mounted() {},
		created() {
			this.$store.dispatch('setFlow');
		},
		watch: {
			flowList: {
				handler(n,o){
					if(n.length>0){
						let id = n[0].id
						this.curId = id;
						this.$store.dispatch('setNode',id);
					}
				},
				//deep: true  //数组深度监听
			}
		},
		methods: {
			//工作流切换,切换前保存。
			flowChange(id) {
				this.curId = id;
				this.$emit('flowChange',id)
			},
			//工作流新建
			flowNew() {
				let name = "";
				this.$Modal.confirm({
					render: (h) => {
						return h('Input', {
							props: {
								autofocus: true,
								placeholder: '请输入工作流名字'
							},
							on: {
								input: (val) => {
									name = val;
								}
							}
						})
					},
					onOk: () => {
						let fl = this.flowList;
						if(name != "") {
							let id = fl[fl.length - 1].id+1 || 0;
							this.$store.commit('flowNew',{id,name})
						}
					}
				})
			},
			//工作流编辑
			flowEdit(i) {
				let name = this.flowList[i].name;
				this.$Modal.confirm({
					render: (h) => {
						return h('Input', {
							props: {
								value: name,
								autofocus: true,
								placeholder: '请输入工作流名字'
							},
							on: {
								input: (val) => {
									name = val;
								}
							}
						})
					},
					onOk: () => {
						this.$store.commit('flowEdit',{i,name});
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
							this.$store.commit('flowDel',i)
							this.$nextTick(()=>{
								this.flowChange(this.flowList[0].id);
							})
						}
					})
				}
			}
		}
	}
</script>

<style>

</style>
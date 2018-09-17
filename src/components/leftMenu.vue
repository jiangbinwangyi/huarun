<template>
	<div>
		<h3>
			工作流
			<span class="flowBoxRight">
				<Icon type="md-add" @click="flowNew" />
			</span>
		</h3>
		<ul>
			<li v-for="(v,i) in flowList">
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
		data(){
			return{
				flowList:[
					{
						id: 0,
						name: "门诊工作流"
					},{
						id: 1,
						name: "住院工作流"
					}
				]
			}
		},
		props:{},
		methods:{
			flowNew(){  
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
                    onOk: ()=>{
                    	let fl = this.flowList;
                    	if(newFlowName!=""){
                    		let id = fl[fl.length-1].id || -1;
                    		fl.push({
                    			id: id+1,
                    			name: newFlowName
                    		})
                    	}
                    }
                })
			},
			flowEdit(i){
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
                    onOk: ()=>{
                    	this.flowList[i].name = newFlowName;
                    }
                })
			},
			flowDel(i){
				this.$Modal.confirm({
                    render: (h) => {
                        return h('p', "确认是否删除")
                    },
                    onOk: ()=>{
                    	this.flowList.splice(i,1);
                    }
                })
			}
		}
	}
</script>

<style>
</style>
import axios from 'axios';
export default {
	state: {
		curFlow: null,
		flowList: null,
		nodeList: null
	},
	getters: {},
	actions: {
		getFlow({commit}){
			axios.get('./static/workFlow/workFlowList.json')
				.then((res)=>{
					if(res.data){
						commit('setFlow',res.data);
					}else{
						commit('setFlow',[]);
					}
				})
		},
		getNode({commit},id){
			if(id){
				axios.get('./static/workFlow/workNodeList_'+id+'.json')
					.then((res)=>{
						if(res.data.nodes || res.data.nodes.length>0){
							commit('setNode',res.data);
						}else{
							commit('setNode','empty');
						}
					})
			}
		}
	},
	mutations: {
		//初始化工作流
		setFlow(s,data){
			s.flowList = data;
		},
		//设置当前工作流
		curFlow(s,index){
			s.curFlow = index;
		},
		//新增工作流
		flowNew(s,newFlow){
			s.flowList.push(newFlow);
		},
		//删除工作流
		flowDel(s,index){
			s.flowList.splice(index,1)
		},
		//编辑工作流
		flowEdit(s,op){
			s.flowList[op.i].name = op.name;
		},
		//初始化节点
		setNode(s, data) {
			if(data=="empty"){
				s.nodeList = {nodes:[],connections:[]}
			}else{
				s.nodeList = data;
			}
		},
		//新增节点
		nodeNew(s, op) {
			if(!s.nodeList.nodes){
				s.nodeList.nodes = [];
			}
			s.nodeList.nodes.push(Object.assign(op.tool, {
				loca: op.loca,
				id: op.id
			}))
		},
		//删除节点
		nodeDel(s, op) {
			s.nodeList.nodes = s.nodeList.nodes.filter((item) => {
				return item.id != op.id;
			})
			//删除相关连接
			s.nodeList.connections = s.nodeList.connections.filter(e=>{
				return e.targetId != op.id && e.sourceId != op.id
			})
		},
		//编辑节点
		nodeEdit(s, op) {
			for(let v in op.attr) {
				s.nodeList.nodes[op.index][v] = op.attr[v];
			}
		},
		//编辑连接
		connectEdit(s, op) {
			s.nodeList.connections.push(op.connect);
		}
	},
}
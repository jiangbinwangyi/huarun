import axios from 'axios';
export default {
	state: {
		flowList: [],
		nodeList: {}
	},
	getters: {},
	actions: {
		setFlow({commit}){
			axios.get('./static/workFlow/workFlowList.json')
				.then((res)=>{
					commit('setFlow',res.data);
				})
		},
		setNode({commit},id){
			axios.get('./static/workFlow/workNodeList_'+id+'.json')
				.then((res)=>{
					commit('setNode',res.data);
				})
				.catch(function (error) {
					commit('setNode',{})
				})
		}
	},
	mutations: {
		//初始化工作流
		setFlow(s,data){
			s.flowList = data;
		},
		//新增工作流
		flowNew(s,newFlow){
			s.flowList.push(newFlow)
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
			s.nodeList = data;
		},
		//新增节点
		nodeNew(s, op) {
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
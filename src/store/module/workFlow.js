export default {
	state: {
		workView: {
			nodes: [],
			connections: [],
		}
	},
	getters: {},
	mutations: {
		setWork(s, op) {
			s.workView = op.data;
		},
		//新增节点
		nodeNew(s, op) {
			let curView = s.workView[s.curFlow];
			s.workView.nodes.push(Object.assign(op.tool, {
				loca: op.loca,
				id: op.id
			}))
		},
		//删除节点
		nodeDel(s, op) {
			s.workView.nodes = s.workView.nodes.filter((item) => {
				return item.id != op.id;
			})
			//删除相关连接
			s.workView.connections = s.workView.connections.filter(e=>{
				return e.targetId != op.id && e.sourceId != op.id
			})
		},
		//编辑节点
		nodeEdit(s, op) {
			//			let curView = s.workView[s.curFlow];
			for(let v in op.attr) {
				s.workView.nodes[op.index][v] = op.attr[v];
			}
			//			s.workView[s.curFlow] = [].concat(s.workView[s.curFlow]);
		},
		//编辑连接
		connectEdit(s, op) {
			s.workView.connections.push(op.connect);
		}
	},
	actions: {
//		requestWorkFlow(context, id) {
//			
//		}
	}
}
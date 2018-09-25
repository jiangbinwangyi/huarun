import pageTool from './pageTool'

export default {
	state: {
		pageTool,
		pageView: [],
		labelIndex: null
	},
	getters: {},
	actions: {
		setLabel({rootState,state,commit}) {
			let dataLink = rootState.dataLink.dataLink;
			let pageView = [];
			let pageTool = state.pageTool;
			if(Object.keys(dataLink).length!=0) {
				for(let title in dataLink) { //标题分类
					for(let label of dataLink[title]) { 
						if(label.show) {
							//1.是否已经包含该分类标题
							let include = pageView.some((e)=>{
								return e.name == title;
							})
							function tool(type){
								return pageTool.find((e)=>{
									return e.type == type;
								})
							}
							//2.如果不包含就添加标题
							if(!include) {
								pageView.push(Object.assign({name:title},tool('title')))
							}
							pageView.push(Object.assign({name:label.name},tool(label.type)))
						}
					}
				}
			}else{
				pageView.push({ //默认值
					"toolName": "标题",
					"name": "新建表单",
					"type": "title",
					"attr": "text",
					"line": false
				})
			}
			commit('setLabel',pageView); //初始化数据
			commit('curLabel',0); //初始化选中
		}
	},
	mutations: {
		//初始化
		setLabel(state, pageView) {
			state.pageView = pageView
		},
		//添加
		newLabel(s, op) {
			for(let v of s.pageTool) {
				if(op.labelType == v.type) {
					s.pageView.splice(op.newIndex, 0, Object.assign({}, v)); //深拷贝对象
				}
			}
		},
		//删除
		delLabel(s, op) {
			s.pageView.splice(op.oldIndex, 1);
			s.labelIndex = 0;
		},
		//排序
		sortLabel(s, op) {
			let item = s.pageView.splice(op.oldIndex, 1);
			s.pageView.splice(op.newIndex, 0, item[0]);
		},
		//编辑
		editLabel(s, op) {
			let curIndex = op.curIndex;
			for(let v in op.attr) {
				s.pageView[curIndex][v] = op.attr[v];
			}
			s.pageView = [].concat(s.pageView);
		},
		//选择
		curLabel(s, index) {
			s.pageView.map((e, i) => {
				e.cur = false;
				if(i == index) {
					e.cur = true;
				}
			})
			s.pageView = [].concat(s.pageView); //设置选中样式
			s.labelIndex = index; //当前选中label
		}
	}
}
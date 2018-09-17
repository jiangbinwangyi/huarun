import pageTool from './pageTool'

export default {
	state: {
		pageTool,
		pageView: [],
	},
	getters: {
	},
	mutations: {
		//初始化
		setLabel(s, dataLink) {
			if(dataLink.length) { 
				s.pageView = [];
				for(let v of dataLink) {
					for(let n of s.pageTool) {
						if(v.type == n.type) { //判断表单控件类型
							let obj = Object.assign({}, n); //复制控件默认属性
							obj.name = v.name;
							s.pageView.push(obj);
							break;
						}
					}
				}
			} else if(localStorage.viewData) { //其他页面过来判断是否存储
				s.pageView = JSON.parse(localStorage.getItem("viewData"));
			} else {
				//初始化不为空
				s.pageView = [{
					"name": "新建表单",
					"type": "title",
					"icon": "logo-tumblr",
					"group": "功能组件",
					"attr": "text",
					"line": false
				}];
			}
		},
		//添加
		newLabel(s,op){
			for(let v of s.pageTool) {
				if(op.labelType == v.type) {
					s.pageView.splice(op.newIndex,0,Object.assign({},v)); //深拷贝对象
				}
			}
		},
		//删除
		delLabel(s,op){
			s.pageView.splice(op.oldIndex, 1);
		},
		//排序
		sortLabel(s,op){
			let item = s.pageView.splice(op.oldIndex, 1);
			s.pageView.splice(op.newIndex, 0, item[0]);
		},
		//edit
		editLabel(s,op){
			let curIndex = op.curIndex;
			for(let v in op.attr){
				s.pageView[curIndex][v] = op.attr[v];
			}
			s.pageView = [].concat(s.pageView);
		}
	}
}
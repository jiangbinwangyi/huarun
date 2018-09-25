import axios from 'axios';

export default {
	state: {
		dataLink: {},
	},
	getters: {
		
	},
	mutations: {
		setData(state,data){
			state.dataLink = data;
		},
		editData(state, name){
			let data = state.dataLink;
			for(let row in data){
				data[row].map((e,i)=>{
					if(e.name == name){
						return e.show = !e.show;
					}
				})
			}
			console.log(state.dataLink);
		}
	},
	actions: {
		getAllData({ commit }){
			axios.get('./static/dataLink.json').then(response => {
				commit('setData',response.data);
			})
		},
	}
}
<template>
	<div class="logic-main">
		<h2 class="logic-title"><i></i>表单内逻辑</h2>
		<Row>
			<Col span="24" v-for="(item,index) in neiList" :key="index" class="logic-item">
				<vue-item :options="item" flag="nei" :index="index" @onDelItem="delItem"></vue-item>
			</Col>
			<Col span="24" class="add-ico" >
				<div  @click="addItem(0)"><Icon type="ios-add-circle-outline" />新增逻辑</div>
			</Col>
    	</Row>
		<!-- 外部 -->
		<h2 class="logic-title"><i></i>表单关联逻辑</h2>
		<Row>
			<Col span="24" v-for="(item,index) in waiList" :key="index" class="logic-item">
				<vue-item :options="item" flag="wai" :index="index" @onDelItem="delItem"></vue-item>
			</Col>
			<Col span="24" class="add-ico" >
				<div  @click="addItem(1)"><Icon type="ios-add-circle-outline" />新增逻辑</div>
			</Col>
    	</Row>
	</div>
</template>

<script>
	import Sortable from 'sortablejs';
	import VueItem from './Item'
	export default {
		components:{VueItem},
		data() {
			return {
				msg: "formLogic",
				neiList:[],//控制条数
				waiList:[],//控制条数
			}
		},
		mounted() {
			
		},
		methods: {
			addItem(val){
				//新增一行
				if(val==0){
					this.neiList.push({})
				}else{
					this.waiList.push({})
				}
			},
			delItem(flag,index){
				//删除一行
            	this.$Modal.confirm({
                    title:'提示',
                    content:`确定要删除第${index+1}吗？`,
                    onOk: ()=>{
						if(flag=='nei'){
							this.neiList.splice(index,1);
						}else{
						 	this.waiList.splice(index,1);	
						}
						this.$Message.success('删除成功！');
					},
					onCancel () {
                		this.$Message.info('取消删除！');
            		}
				})
        }
		}
	}
</script>

<style lang="less">
.logic-main{
	width: 80%;
	margin:20px 10%;
	.logic-title{
		margin: 20px 0;
		font-size: 18px;
		line-height: 16px;
		color: #429FB8;
		font-weight: normal;
		i{
			display: inline-block;
			width: 4px;
			height: 18px;
			background-color: #429FB8;
			margin-right: 6px;
			vertical-align: middle;
			position: relative;
			top: -2px;
		}
	}
	.ivu-row{
		border: 1px solid #DBE3E3;
		background: #fff;
		.add-ico{
			text-align: center;
			padding: 20px;
			cursor: pointer;
			i{font-size: 15px;}
			&:hover div{
				color: #4297F1
			}
		}
		.logic-item{
			border-bottom: 1px solid #DBE3E3;
			padding: 10px;
		}
	}

}
</style>
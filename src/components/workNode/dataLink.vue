<template>
	<div class="dataLink">
		<Row :gutter="16">
			<Col span="6" v-for="(val,key,index) in dataLink" :key="index">
			<Card dis-hover :bordered="false">
				<p slot="title">{{key}}</p>
				<ul>
					<li v-for="(cval,ckey) in val" :key="ckey">
						{{cval.name}}
						<i-switch v-model="cval.show" />
					</li>
				</ul>
			</Card>
			</Col>
		</Row>
	</div>
</template>

<script>
	import axios from 'axios';
	export default {
		data() {
			return {
				dataLink: {},
				datas: [],
			}
		},
		mounted() {
			axios.get('./static/dataLink.json').then(response => {
				this.$nextTick(() => {
					this.dataLink = response.data;
					
					//跳转离开数据传递
					this.$router.beforeEach((to,from,next) => {
						if(to.name == "formCreate" && from.name=="dataLink"){
							for(let v in this.dataLink){ 
								for(let a of this.dataLink[v]){
									if(a.show){
										let include=false;
										for(let b of this.datas){ //1.是否已经包含该分类标题
											if(v==b.name){
												include = true;
												break;
											}
										}
										if(!include){ //2.如果不包含就添加标题
											this.datas.push({
												name: v,
												type: 'title'
											})
										}
										this.datas.push({ //3.添加show为true的数据
											name: a.name,
											type: a.type
										})
									}
								}
							}
						}
						this.$emit('dataLink',this.datas);
						next();
					})
				})
			})
			
		},
		methods: {

		},
		watch: {
		}
	}
</script>

<style lang="less">
	.dataLink {
		height: 100%;
		padding: 16px;
		.ivu-card-head {
			background: #279eb7;
			p {
				color: #fff;
			}
		}
		ul {
			list-style: none;
			li {
				clear: both;
				margin-bottom: 6px;
				&:last-child {
					margin: 0;
				}
				.ivu-switch {
					float: right;
				}
			}
		}
	}
</style>
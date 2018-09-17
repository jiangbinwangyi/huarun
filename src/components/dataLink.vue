<template>
	<div class="dataLink">
		<Row :gutter="16">
			<Col span="6" v-for="(val,key,index) in dataLink">
				<Card dis-hover bordered>
					 <p slot="title">{{key}}2</p>
					 <ul>
					 	<li v-for="(cval,ckey) in val">
					 		{{cval.name}}
					 		<i-switch v-model="cval.show" @on-change="change" />
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
				dataLink: "",
			}
		},
		mounted() {
			axios.get('../static/dataLink.json').then(response => {
				this.$nextTick(() => {
					this.dataLink = response.data;
				})
			})
		},
		methods: {
			change (status) {
             	console.log(status);
            }
		}
	}
</script>

<style lang="less">
	.dataLink{
		padding: 16px;
		ul{
			list-style: none;
			li{
				clear: both;
				margin-bottom: 6px;
				&:last-child{
					margin: 0;
				}
				.ivu-switch{
					float: right;
				}
			}
		}
	}
</style>
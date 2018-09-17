<template>
	<div>
		<div class="navicon-con">
			<h1>
    			<Icon type="md-desktop"></Icon>
				{{myTitle}}
    		</h1>
		</div>
		<div class="header-avator-con">
			<div @click="handleChange" v-if="showFullScreenBtn" class="full-screen-btn-con">
				<Tooltip :content="value ? '退出全屏' : '全屏'" placement="bottom">
					<Icon :type="value ? 'ios-contract' : 'md-contract'" :size="23"></Icon>
				</Tooltip>
			</div>
			<div class="lock-screen-btn-con">
				<Tooltip content="锁屏" placement="bottom">
					<Icon type="md-lock" :size="20"></Icon>
				</Tooltip>
			</div>
			<div class="message-con">
				<Tooltip :content="infoValue > 0 ? '有' + value + '条未读消息' : '无未读消息'" placement="bottom">
					<Badge :count="infoValue" dot>
						<Icon type="ios-bulb" :size="22"></Icon>
					</Badge>
				</Tooltip>
			</div>

			<div class="user-dropdown-menu-con">
				<Row type="flex" justify="end" align="middle" class="user-dropdown-innercon">
					<Dropdown transfer trigger="click">
						<a href="javascript:void(0)">
							<span class="main-user-name">huarun</span>
							<Icon type="md-arrow-dropdown" />
						</a>
						<DropdownMenu slot="list">
							<DropdownItem name="ownSpace">个人中心</DropdownItem>
							<DropdownItem name="loginout" divided>退出登录</DropdownItem>
						</DropdownMenu>
					</Dropdown>
					<Avatar :src="require('../../assets/avata.jpg')" style="background: #619fe7;margin-left: 10px;"></Avatar>
				</Row>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				infoValue: 0,
				value: false
			}
		},
		props: {
			myTitle: {
				type: String
			}
		},
		computed: {
			showFullScreenBtn() {
				return window.navigator.userAgent.indexOf('MSIE') < 0;
			}
		},
		methods: {
			handleFullscreen() {
				let main = document.body;
				if(this.value) {
					if(document.exitFullscreen) {
						document.exitFullscreen();
					} else if(document.mozCancelFullScreen) {
						document.mozCancelFullScreen();
					} else if(document.webkitCancelFullScreen) {
						document.webkitCancelFullScreen();
					} else if(document.msExitFullscreen) {
						document.msExitFullscreen();
					}
				} else {
					if(main.requestFullscreen) {
						main.requestFullscreen();
					} else if(main.mozRequestFullScreen) {
						main.mozRequestFullScreen();
					} else if(main.webkitRequestFullScreen) {
						main.webkitRequestFullScreen();
					} else if(main.msRequestFullscreen) {
						main.msRequestFullscreen();
					}
				}
			},
			handleChange() {
				this.handleFullscreen();
			}
		},
		created() {
			let isFullscreen = document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.fullScreen || document.mozFullScreen || document.webkitIsFullScreen;
			isFullscreen = !!isFullscreen;
			document.addEventListener('fullscreenchange', () => {
				this.$emit('input', !this.value);
				this.$emit('on-change', !this.value);
			});
			document.addEventListener('mozfullscreenchange', () => {
				this.$emit('input', !this.value);
				this.$emit('on-change', !this.value);
			});
			document.addEventListener('webkitfullscreenchange', () => {
				this.$emit('input', !this.value);
				this.$emit('on-change', !this.value);
			});
			document.addEventListener('msfullscreenchange', () => {
				this.$emit('input', !this.value);
				this.$emit('on-change', !this.value);
			});
			this.$emit('input', isFullscreen);
		}
	}
</script>

<style>

</style>
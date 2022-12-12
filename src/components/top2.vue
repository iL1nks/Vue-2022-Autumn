<template>
	<div id="top-nav">
		<img id="logo" src="../assets/logo.png" alt="logo"/>
		<span id="title">Temperature</span>
		<input id="search-box" type="text" />
		<div id="search-button"></div>
		<span id="msg-ctr">消息中心</span>
		<span id="fav">收藏夹</span>
		<span id="create" @click="topMenuToggle">创作<img src="../assets/menu.png" alt="按钮"/></span>
				<div id="top-menu" v-if="isMenuShow">
					<div id="t-m-publish-article" class="t-m-button" :style="{top: TMTop, left: MLeft + 'px'}">发表文章</div>
					<div id="t-m-publish-topic" class="t-m-button">发表话题</div>
					<div id="t-m-upload-image" class="t-m-button">上传图片</div>
				</div>
		<img id="avatar" src="../assets/logo.png" alt="用户">
		<span id="sign-in-up">登录|注册</span>
	</div>
   
</template>

<script>
	export default{
			name:"topNav",
			methods:{
				topMenuToggle(){
					this.isMenuShow = this.isMenuShow == false?true:false;
				}
			},
			data(){
				return {
					isMenuShow: false
				};
			}
		}
	
</script>

<style scoped>
	*{
		margin: 0px;
		padding: 0px;
	}
	#top-nav {
		position: absolute;
		width: 1540px;
		height: 59px;
		left: 0px;
		top: 0px;
		
		background: rgba(48, 46, 46, 0.77);
	}
	#logo{
		position:absolute;
		width: 38px;
		height: 38px;
		left: 26px;
		top: 10px;
	}
	#title{
		position:absolute;
		width: 173px;
		height: 33px;
		left: 81px;
		top: 13px;
		
		font-family: Lucida Handwriting;
		font-style: italic;
		font-weight: normal;
		font-size: 24px;
		line-height: 33px;
		
		color: #FFFFFF;
	}
	#search-box{
		position:absolute;
		width: 339px;
		height: 35px;
		left: 417px;
		top: 12px;
		
		background: #E8E2E2;
		border-radius: 30px;
		border-width: 0px;
	}
	#search-button{
		position:absolute;
		position: relative;
		width: 84px;
		height: 35px;
		left: 672px;
		top: 12px;
		
		background-image: url('../assets/search.png');
		background-size: contain;
		background-repeat: no-repeat;
		background-position: center;
		border-radius: 0px 30px 30px 0px;
	}
	#msg-ctr{
		position:absolute;
		width: 72px;
		height: 24px;
		left: 832px;
		top: 17px;
		
		font-family: Microsoft YaHei;
		font-style: normal;
		font-weight: normal;
		font-size: 18px;
		line-height: 24px;
		/* identical to box height */
		
		text-decoration-line: underline;
		
		color: #FFFFFF;
	}
	#fav{
		position:absolute;
		width: 54px;
		height: 24px;
		left: 969px;
		top: 17px;
		
		font-family: Microsoft YaHei;
		font-style: normal;
		font-weight: normal;
		font-size: 18px;
		line-height: 24px;
		/* identical to box height */
		
		text-decoration-line: underline;
		
		color: #FFFFFF;
	}
	#create{
		position:absolute;
		width: 111px;
		height: 59px;
		left: 1080px;
		top: 0px;
		
		background: rgba(254, 6, 6, 0.6);
		
		cursor: pointer;
		
				
	}
	#create>img{
			display: inline-block;
			vertical-align: top;
			width: 20px;
			height: 20px;
			margin: calc((59px - 20px) / 2) 0px calc((59px - 20px) / 2) 14px;
	}
	#top-menu{
		position: absolute;
		width: 130px;
		height: 175px;
		left: 1071px;
		top: 62px;
		
		background: rgba(48, 46, 46, 0.77);
		z-index:100;  /*赋值将模块置为最顶层*/
			
		}
	.t-m-button{
			display: block;
			width: calc(100% - 10px);
			height: 54px;
			
			margin: 4px 5px;
			
			text-align: center;
			line-height: 54px;
			font-size: 18px;
			color: #FFFFFF;
			background: rgba(48, 46, 46, 0.77);
			border-radius: 6px;
			
			background: rgba(48, 46, 46, 0.77);
			
			cursor: pointer;
		}	
	#avatar{
		position: absolute;
		width: 33px;
		height: 34px;
		left: 1244px;
		top: 15px;
	}
	#sign-in-up{
		position: absolute;
		width: 88px;
		height: 24px;
		left: 1304px;
		top: 20px;
		
		font-family: Microsoft YaHei;
		font-style: normal;
		font-weight: normal;
		font-size: 18px;
		line-height: 24px;
		
		text-decoration-line: underline;
		
		color: #FFFFFF;
	}
</style>
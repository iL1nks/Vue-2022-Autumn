<template>
	<div>
		<div id="left">
			<div id="search-container">
				<input id="search-info" placeholder="搜索我的收藏夹..." type="text" />
				<div id="search-button"></div>
			</div>
			<button id="add-favorite-button" @click="addFavourite">
				<span id="add-favorite-text">+新建收藏夹</span>
			</button>
			<button id="study-favorite-button">
				<span id="study-favorite-text">学习收藏夹</span>
			</button>
			<button id="play-favorite-button">
				<span id="play-favorite-text">娱乐收藏夹</span>
			</button>
			<button id="music-favorite-button">
				<span id="music-favorite-text">音乐收藏夹</span>
			</button>
		</div>
		<div id="right-top">
			<span id="favorite-name">学习收藏夹</span>
			<div id="editor-button"></div>
			<div id="delete-favorite-button">删除收藏夹</div>
		</div>
		<div id="favorite-list">
			<div class="f-item" v-for="item in favorite" :key="item.favoriteID">
				<span class="f-title">{{item.title}}</span>
				<div class="f-content">{{item.content}}</div>
				<span class="f-date">{{item.date}}</span>
				<span class="f-time">{{item.time}}</span>
				<span class="f-answerCount">回答：{{item.viewCount}}</span>
				<span class="f-delete">删除</span>
			</div>
		</div>

		</div>
</template>

<script>
	export default{
		name:'favorite',
		data(){
			return{
				favorite: [
						{
							favoriteID: 1,
							title: "学习1",
							content: "内容1",
							date: "2022-12-12",
							time: "22:20",

							viewCount: 22
						},
					{
						favoriteID: 2,
						title: "学习2",
						content: "内容2",
						date: "2022-12-12",
						time: "22:20",
						viewCount: 22
					}
					],
				pageNums:[
					{page: 1},
					{page: 2},
					{page: 3}
				],
				selectedPage: 1,
			}
		}
	}
	
</script>

<style>
	#left{
		position: absolute;
		width: 358px;
		height: 3000px;
		left: 400px;
		top: 0px;
		
		background: #FFFFFF;
	}
	#search-container{
		position: absolute;
		width: 358px;
		height: 91px;
		left: 0px;
		top: 0px;
		
		background: #FFFFFF;
		border: 1px solid #C5C5C5;
		box-sizing: border-box;
	}
	#search-info{
		position: absolute;
		width: 256px;
		height: 33.18px;
		left: 58px;
		top: 18.01px;
		
		background: #E8E2E2;
		border-radius: 8px;
	}
	#search-button{
		position: absolute;
		width: 75.08px;
		height: 33.18px;
		left: 238.92px;
		top: 18.01px;
		
		background-image: url('../assets/search.png');
		background-size: contain;
		background-repeat: no-repeat;
		background-position: center;
		border-radius: 0px 30px 30px 0px;
	}
	#add-favorite-button{
		position: absolute;
		width:358px;
		height: 87px;
		left: 0px;
		top: 91px;
		
		background: #FFFFFF;
		box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
		border: none;
	}
	#add-favorite-text{
		position: absolute;
		width:152px;
		height: 32px;
		left: 108px;
		top: 27px;
		
		font-family: Microsoft YaHei;
		font-style: normal;
		font-weight: normal;
		font-size: 24px;
		line-height: 32px;
		/* identical to box height */
		
		display: flex;
		align-items: center;
		letter-spacing: 0.75px;
		text-transform: uppercase;
		
		color: #000000;
	}
	#study-favorite-button{
		position: absolute;
		width:358px;
		height: 87px;
		left: 0px;
		top: 178px;
		
		background: #FFFFFF;
		box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
		border: none;
	}
	#study-favorite-text{
		position: absolute;
		width:142px;
		height: 32px;
		left: 108px;
		top: 27px;
		
		font-family: Microsoft YaHei;
		font-style: normal;
		font-weight: normal;
		font-size: 24px;
		line-height: 32px;
		/* identical to box height */
		
		display: flex;
		align-items: center;
		letter-spacing: 0.75px;
		text-transform: uppercase;
		
		color: #000000;
	}
	#play-favorite-button{
		position: absolute;
		width:358px;
		height: 87px;
		left: 0px;
		top: 265px;
		
		background: #FFFFFF;
		box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
		border: none;
	}
	#play-favorite-text{
		position: absolute;
		width:142px;
		height: 32px;
		left: 108px;
		top: 27px;
		
		font-family: Microsoft YaHei;
		font-style: normal;
		font-weight: normal;
		font-size: 24px;
		line-height: 32px;
		/* identical to box height */
		
		display: flex;
		align-items: center;
		letter-spacing: 0.75px;
		text-transform: uppercase;
		
		color: #000000;
	}
	#music-favorite-button{
		position: absolute;
		width:358px;
		height: 87px;
		left: 0px;
		top: 352px;
		
		background: #FFFFFF;
		box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
		border: none;
	}
	#music-favorite-text{
		position: absolute;
		width:142px;
		height: 32px;
		left: 108px;
		top: 27px;
		
		font-family: Microsoft YaHei;
		font-style: normal;
		font-weight: normal;
		font-size: 24px;
		line-height: 32px;
		/* identical to box height */
		
		display: flex;
		align-items: center;
		letter-spacing: 0.75px;
		text-transform: uppercase;
		
		color: #000000;
	}
	#right-top{
		position: absolute;
		width: 1060px;
		height: 91px;
		left: 760px;
		top: 0px;
		
		background: #FFFFFF;
	}
	#favorite-name{
		position: absolute;
		width: 136px;
		height: 51px;
		left: 10px;
		top: 26px;
		
		font-family: Microsoft YaHei;
		font-style: normal;
		font-weight: 290;
		font-size: 24px;
		line-height: 32px;
		display: flex;
		align-items: center;
		
		color: #000000;
	}
	#editor-button{
		position: absolute;
		width: 25px;
		height: 25px;
		left: 138px;
		top: 39px;
		
		/* Icons Color */
		background-image: url(../assets/评论.jpg);
		background-size: contain;
		background-repeat: no-repeat;
		background-position: center;
		border-radius: 0px 30px 30px 0px;
	}
	#delete-favorite-button{
		position: absolute;
		width: 90px;
		height: 24px;
		left: 843px;
		top: 43px;
		
		font-family: Microsoft YaHei;
		font-style: normal;
		font-weight: 290;
		font-size: 18px;
		line-height: 24px;
		/* identical to box height */
		
		display: flex;
		align-items: center;
		text-decoration-line: underline;
		
		color: rgba(16, 67, 247, 0.72);
	}
	
	
	
	#favorite-list{
		position: absolute;
		width: 1060px;
		height: 1000px;
		left: 760px;
		top: 90px;
		
		display: flex;
		flex-direction: column;
	}
	.f-item{
		margin-top: 5px;
		text-align: left;
		padding: 20px;
	
		background: #FFFFFF;
		box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.25);
		cursor: pointer;
	}
	.f-title{
		display: block;
		position: relative;
		font-size: 24px;
		line-height: 24px;
		color: #000000;

		/*实现超过一行的显示省略号*/
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
	}
	.f-content{
		margin-top: 10px;
		margin-bottom: 10px;
		height: 50px;
	
		font-size: 18px;
		line-height: 25px;
		color: #727272;

		/*实现显示两行文字后显示省略号*/
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		text-overflow: ellipsis;
		overflow: hidden;
	}
	.f-date{
		display: inline-block;
		width: max-content;
	
		font-size: 18px;
		line-height: 18px;
		color: #000000;
	}
	.f-time{
		display: inline-block;
		margin-left: 20px;
		width: fit-content;
		font-size: 18px;
		line-height: 18px;
		color: #000000;
	}
	.f-answerCount{
		display: inline-block;
		margin-left: 60px;
		width: fit-content;
	
		font-size: 18px;
		line-height: 18px;
	
		color: #000000;
	}
	.f-delete{
		display: inline-block;
		margin-left: 60px;
		width: fit-content;
	
		font-size: 18px;
		line-height: 25px;
		text-decoration-line: underline;
	
		color: #999494;
	}
	
	#favorite-page-controller{
		position: absolute;
		width: 982px;
		height: 100px;
		left: 414px;
		top: 1858px;

		display: flex;
		align-items: center;
		margin-top: 20px;
		font-size: 18px;
		line-height: 18px;
	}
	#f-last-page{
		flex-grow: 1;
		margin-right: 60px;
		text-align: right;
		cursor: pointer;
	}
	.f-page-num{
		display: flex;
		justify-content: center;
		align-items: center;
		width: 40px;
		height:40px;
		color: #727272;
		border-radius: 5px;
		cursor: pointer;
	}
	.f-page-num:hover{
		background: rgba(114, 114, 114, 0.2);
	}
	.f-page-num-selected{
		background: rgba(114, 114, 114, 0.3);
	}
	#f-next-page{
		flex-grow: 1;
		margin-left: 60px;
		text-align: left;
		cursor: pointer;
	}
</style>

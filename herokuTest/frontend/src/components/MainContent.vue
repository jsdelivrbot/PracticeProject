<template >
    <div class="content">
        <section class="foodList">
            <div class="chicken" v-on:mouseenter="enterCover" v-on:mouseleave="leaveCover">
                <span>치킨</span>
                <p class="chicken-cover"></p>
            </div>
            <div class="chinese" v-on:mouseenter="enterCover" v-on:mouseleave="leaveCover">
                <span>중국집</span>
                <p class="chinese-cover"></p>
            </div>
            <div class="pizza" v-on:mouseenter="enterCover" v-on:mouseleave="leaveCover">
                <span>피자</span>
                <p class="pizza-cover"></p>                
            </div>
            <div class="korea" v-on:mouseenter="enterCover" v-on:mouseleave="leaveCover">
                <span>한식</span>
                <p class="korea-cover"></p>
            </div>
            <div class="large event">
                <span>이벤트</span>
            </div>
            <div class="jokbal" v-on:mouseenter="enterCover" v-on:mouseleave="leaveCover">
                <span>족발</span>
                <p class="jokbal-cover"></p>
            </div>
            <div class="night" v-on:mouseenter="enterCover" v-on:mouseleave="leaveCover">
                <span>야식</span>
                <p class="night-cover"></p>
            </div>
            <div class="japanese" v-on:mouseenter="enterCover" v-on:mouseleave="leaveCover">
                <span>일식</span>
                <p class="japanese-cover"></p>
            </div>
            <div class="tang" v-on:mouseenter="enterCover" v-on:mouseleave="leaveCover">
                <span>탕</span>
                <p class="tang-cover"></p>
            </div>
            <div class="boxlunch" v-on:mouseenter="enterCover" v-on:mouseleave="leaveCover">
                <span>도시락</span>
                <p class="boxlunch-cover"></p>
            </div>
            <div class="fastfood" v-on:mouseenter="enterCover" v-on:mouseleave="leaveCover">
                <span>페스트푸드</span>
                <p class="fastfood-cover"></p>
            </div>
            <div class="large game">
                <span>사다리게임</span>
            </div>
            <div class="baro">
                <span>바로결제</span>
            </div>
            <div class="etc">
                <span>기타</span>
            </div>
        </section>

        <section class="boards">
            <div class="notice">
                <div>
                    <h3>공지사항</h3>
                     <div>
                        <span class="glyphicon glyphicon-chevron-left"></span>
                        <span class="glyphicon glyphicon-chevron-right"></span>
                    </div>
                </div>
                <div>
                    <h4>{{notice.subject}}</h4>
                    <p>{{notice.content}}</p>
                </div>
            </div>
            <div class="introduce">
                <div>
                    <h3>배달의민족 소개</h3>
                     <div>
                        <span class="glyphicon glyphicon-chevron-left"></span>
                        <span class="glyphicon glyphicon-chevron-right"></span>
                    </div>
                </div>
                <div>1</div>
            </div>
            <div class="campaign">
                <div>
                    <h3 class="title">우아한 캠페인</h3>
                    <div>
                        <span v-on:click="imageSlide('left','campaigns')" class="glyphicon glyphicon-chevron-left"></span>
                        <span v-on:click="imageSlide('right','campaigns')" class="glyphicon glyphicon-chevron-right"></span>
                    </div>
                </div>
                <div class="slide">
                    <ul>
                        <li v-for="campaign in campaigns" v-bind:style="campaign" v-on:click="goURL(campaign.href)">
                            <div><img v-bind:src="campaign.leftSrc" v-bind:alt="campaign.leftText"></div>
                            <div><img v-bind:src="campaign.rightSrc" v-bind:alt="campaign.rightText"></div>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="tips">
                <div>
                    <h3>바로결제 팁</h3>
                   <div>
                        <span v-on:click="imageSlide('left','tips')" class="glyphicon glyphicon-chevron-left"></span>
                        <span v-on:click="imageSlide('right','tips')" class="glyphicon glyphicon-chevron-right"></span>
                    </div>
                </div>
                <div class="slide">
                    <ul>
                        <li v-for="tip in tips" v-bind:style="tip"  v-on:click="goURL(tip.href)">
                            <div><img v-bind:src="tip.leftSrc" v-bind:alt="tip.leftText"></div>
                            <div><img v-bind:src="tip.rightSrc" v-bind:alt="tip.rightText"></div>
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    </div >
</template>

<script>
    export default {
        created : function(){
            window.addEventListener('resize', this.checkWindowWidth);
            this.getOneNotice();
        },
        name : 'mainContent',
        props : ['mainContent'],
        data : function() {
            return {
                notice : {
                    subject : "", 
                    content : "",
                    created : "",
                },
                windowWidth : window.innerWidth,
                campaigns : [
                    {
                        left:"0%",zIndex:"100",
                        href:"http://www.woowahan.com/?page_id=3749",
                        leftText:"365일 우유로 안부를 물어요! 배달의민족이 함께하는 나눔문화 혼자 사시는 노인분들께 우유를 배달해 드려요!", 
                        leftSrc:"https://img.woowahan.com/www/temp/bnr-txt-woowa01.gif", 
                        rightText:"우유 이미지", 
                        rightSrc:"https://img.woowahan.com/www/temp/bnr-img-woowa01.gif"
                     },
                    {
                        left:"100%",zIndex:"0",
                        href:"http://www.woowahan.com/?page_id=3985",
                        leftText:"우와!~한 무료글꼴, 배달의민족 한나체,주아체 배달의민족의 아이덴티티를 담은 한나체,주아체는 모두에게 무료로 제공되는 서체입니다.", 
                        leftSrc:"https://img.woowahan.com/www/temp/bnr-txt-woowa02-v2.gif", 
                        rightText:"주아체 이미지", 
                        rightSrc:"https://img.woowahan.com/www/temp/bnr-img-woowa02-v2.gif"
                    },
                    {
                        left:"-100%",zIndex:"100",
                        href:"http://www.woowahan.com/?page_id=5108",
                        leftText:"'풋~아~'이런 브랜드 제품, 즐겁지 아니한가! 배달의민족스러운 브랜드 제품들! 10x10에서 만나볼 수 있어요.", 
                        leftSrc:"https://img.woowahan.com/www/temp/bnr-txt-woowa03.gif", 
                        rightText:"브랜드 이미지", 
                        rightSrc:"https://img.woowahan.com/www/temp/bnr-img-woowa03.gif"
                    },
                ],
                campaignCheck : 0,
                tips : [
                     {
                        left:"0%",zIndex:"100",
                        href:"http://www.baemin.com/service/baro_tip",
                        leftText:"다양한 결제 수단을 사용할 수 있어요.", 
                        leftSrc:"https://img.woowahan.com/www/temp/bnr-txt-baro01.gif", 
                        rightText:"결제 수단 이미지", 
                        rightSrc:"https://img.woowahan.com/www/temp/bnr-img-baro01.gif"
                     },
                    {
                        left:"100%",zIndex:"0",
                        href:"http://www.baemin.com/service/baro_tip",
                        leftText:"포인트 모아 먹고 싶은 것 시켜 먹어요.", 
                        leftSrc:"https://img.woowahan.com/www/temp/bnr-txt-baro02.gif", 
                        rightText:"캐릭터 이미지", 
                        rightSrc:"https://img.woowahan.com/www/temp/bnr-img-baro02.gif"
                    },
                    {
                        left:"-100%",zIndex:"100",
                        href:"http://www.baemin.com/service/baro_tip",
                        leftText:"'한번 주문한 주소를 기억하고 있어요.", 
                        leftSrc:"https://img.woowahan.com/www/temp/bnr-txt-baro03.gif", 
                        rightText:"사람 이미지", 
                        rightSrc:"https://img.woowahan.com/www/temp/bnr-img-baro03.gif"
                    },
                ],
     

            }
        },

        methods: {
            getOneNotice : function() {
                this.$http.get(`/api/notice/1`)
                    .then( res => {
                        this.notice = {
                            subject : res.data[0].subject,
                            content : res.data[0].content,
                            created : res.data[0].created.split("T")[0],
                        }
                });
            },

            enterCover : function(event){
                var className = event.target.className + "-cover";
                var cover = document.getElementsByClassName(className)[0];
                
                cover.style.left = event.offsetX * 2 -220 + "px";
                cover.style.top = event.offsetY * 2 -220 + "px";
                cover.style.display = "block";
                cover.style.transition = "0.2s linear";

                setTimeout( function(){cover.style.left = "-20px"; cover.style.top="-20px";}, 0)
            },

            leaveCover : function(event){
                var className = event.target.className + "-cover";
                var cover = document.getElementsByClassName(className)[0];
                cover.style.left = event.offsetX * 2 -220 + "px";
                cover.style.top = event.offsetY * 2 -220 + "px";
                setTimeout( function(){cover.style.display="none";}, 200)
            },

            goURL : function( path ) {
                location.href=path;
            },
            checkWindowWidth : function() {
                console.log(window.innerWidth);
            },
            imageSlide : function( direction, target ) {
                if( this.campaignCheck !== 0) return;
                var that = this;
                var rightArr = ["0", "100", "-100"],
                    leftArr = ["100", "-100", "0"],
                    leftZArr = ["-100","100","100"];
                var tempArr = direction === "right"? rightArr : leftArr;
                var tempZArr = direction === "right"? rightArr : leftZArr;

                this.campaignCheck++;
      
                this[target].map( one => {
                    var num = +one.left.substring(0, one.left.length-1)/100 +1;
                    one.zIndex = tempZArr[num];
                    setTimeout( function(){one.left = tempArr[num] + "%";}, 200);
                } )
                
                setTimeout( function(){that.campaignCheck = 0}, 700);
            },
        }
    } 
</script>

<style>


.content{max-width: 960px; margin:50px auto 0px;}
.content .foodList{position:relative;height:1200px;}
.content .foodList div{transition:1s;position:absolute;float:left;width:200px;height:200px;margin:20px;
                       background-size:100%;background-repeat:no-repeat;background-size:200px;background-position:center;
                       text-indent:-9999px;box-sizing:border-box;overflow:hidden;border-radius:100px;}
.content .foodList:after{content:""; display:block; clear:both;}

.content .foodList .chicken{top:0px;left:0px;background-image:url(https://img.woowahan.com/www/main/cate01.png)}
.content .foodList .chinese{top:0px;left:240px;background-image:url(https://img.woowahan.com/www/main/cate02.png)}
.content .foodList .pizza{top:0px;left:480px;background-image:url(https://img.woowahan.com/www/main/cate03.png)}
.content .foodList .korea{top:0px;left:720px;background-image:url(https://img.woowahan.com/www/main/cate04.png)}
.content .foodList .jokbal{top:240px;left:480px;background-image:url(https://img.woowahan.com/www/main/cate05.png)}
.content .foodList .night{top:240px;left:720px;background-image:url(https://img.woowahan.com/www/main/cate06.png)}
.content .foodList .japanese{top:480px;left:480px;background-image:url(https://img.woowahan.com/www/main/cate08.png)}
.content .foodList .tang{top:480px;left:720px;background-image:url(https://img.woowahan.com/www/main/cate07.png)}
.content .foodList .boxlunch{top:720px;left:0px;background-image:url(https://img.woowahan.com/www/main/cate09.png)}
.content .foodList .fastfood{top:720px;left:240px;background-image:url(https://img.woowahan.com/www/main/cate10.png)}
.content .foodList .baro{top:960px;left:0px;background-image:url(https://img.woowahan.com/www/main/baro.png)}
.content .foodList .etc{top:960px;left:240px;background-image:url(https://img.woowahan.com/www/main/nothing.png)}

.content .foodList .large{float:left;width:480px;height:480px;background-size:440px;}

.content .foodList .event{top:240px;left:0px;background-image:url(http://file.smartbaedal.com/usr/promtxt/2017/4/28/201412050008_180343.png)}
.content .foodList .game{top:720px;left:480px;background-image:url(https://img.woowahan.com/www/main/game1.png)}

.content .foodList p{position:absolute;display:none;width:240px;height:240px;background-repeat:no-repeat;background-position:center;}
.content .foodList .chicken-cover{background-image:url(https://img.woowahan.com/www/main/cate01-over.png);}
.content .foodList .chinese-cover{background-image:url(https://img.woowahan.com/www/main/cate02-over.png);}
.content .foodList .pizza-cover{background-image:url(https://img.woowahan.com/www/main/cate03-over.png);}
.content .foodList .korea-cover{background-image:url(https://img.woowahan.com/www/main/cate04-over.png);}
.content .foodList .jokbal-cover{background-image:url(https://img.woowahan.com/www/main/cate05-over.png);}
.content .foodList .night-cover{background-image:url(https://img.woowahan.com/www/main/cate06-over.png);}
.content .foodList .japanese-cover{background-image:url(https://img.woowahan.com/www/main/cate07-over.png);}
.content .foodList .tang-cover{background-image:url(https://img.woowahan.com/www/main/cate08-over.png);}
.content .foodList .boxlunch-cover{background-image:url(https://img.woowahan.com/www/main/cate09-over.png);}
.content .foodList .fastfood-cover{background-image:url(https://img.woowahan.com/www/main/cate10-over.png);}

.boards{margin-top:70px;background-color:lightyellow;}
.boards>div{float:left;width:46%;min-height:120px;margin:0px 2% 40px 2%;}
.boards>div>div>h3{float:left;}
.boards>div>div>h4{font-weight:bold;}
.boards>div>div>p{margin-top:12px;font-size:0.8em;color:lightslategray;line-height:initial;height:20px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
.boards>div>div>div{text-align:right;}
.boards>div>div>div>span{margin-left:-6px;padding:3px;border:1px solid #eee;}
.boards>div>div>div>span:hover{background-color:#eee;cursor:pointer;}
.boards>div>div:first-child{padding-bottom:20px;border-bottom:2px solid black;font-weight:bold;}
.boards>div>div:last-child{padding-top:20px;border-top:2px solid black;}

.boards .slide{position:relative;height:170px;overflow:hidden;}
.boards .slide>ul{background-color:lightgray;}
.boards .slide>ul>li{position:absolute;width:100%;height:140px;padding:15px 10px;border:1px solid #eee;background-color:#fff;transition:0.5s linear;}
.boards .slide>ul>li>div{float:left;}
.boards .slide>ul>li>div:first-child{width:60%;}
.boards .slide>ul>li>div:last-child{width:40%;text-align:right;}
.boards .slide>ul>li>div img{width:80%;}

@media (max-width:960px) {
    .content{width:720px;height:1680px;background-color:#eee;}
    .content .foodList{height:1680px;}

    .content .foodList .korea{top:240px;left:0px}
    .content .foodList .jokbal{top:480px;left:0px}
    .content .foodList .night{top:720px;left:0px}
    .content .foodList .japanese{top:720px;left:240px}
    .content .foodList .tang{top:720px;left:480px}
    .content .foodList .boxlunch{top:960px;left:0px}
    .content .foodList .fastfood{top:960px;left:240px}
    .content .foodList .baro{top:960px;left:480px}
    .content .foodList .etc{top:1200px;left:480px}

    .content .foodList .event{top:240px;left:240px}
    .content .foodList .game{top:1200px;left:0px}
}

@media (max-width:740px) {
    .content{width:480px;height:2400px;;background-color:#eee;}
    .content .foodList{height:2400px;}

    .content .foodList .pizza{top:240px;left:0px}
    .content .foodList .korea{top:240px;left:240px}
    .content .foodList .jokbal{top:480px;left:0px}
    .content .foodList .night{top:480px;left:240px}
    .content .foodList .japanese{top:1200px;left:0px}
    .content .foodList .tang{top:1200px;left:240px}
    .content .foodList .boxlunch{top:1440px;left:0px}
    .content .foodList .fastfood{top:1440px;left:240px}
    .content .foodList .baro{top:2160px;left:0px}
    .content .foodList .etc{top:2160px;left:240px}

    .content .foodList .event{top:720px;left:0px}
    .content .foodList .game{top:1680px;left:0px}
}


</style> 
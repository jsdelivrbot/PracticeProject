<template >
    <div class="content">
        <section class="foodList">
        <!--<div class="chicken">치킨</div>
            <div class="chinese">중국집</div>
            <div class="pizza">피자</div>
            <div class="korea">한식</div>
            <div class="large event">이벤트</div>
            <div class="jokbal">족발</div>
            <div class="night">야식</div>
            <div class="japanese">일식</div>
            <div class="tang">탕</div>
            <div class="boxlunch">도시락</div>
            <div class="fastfood">페스트푸드</div>
            <div class="large game">사다리게임</div>
            <div class="baro">바로결제</div>
            <div class="etc">기타</div>-->
            <div v-for="(one, index) in categories" v-bind:style="one">
            {{categoryName[index]}}
            </div>
        </section>

        <section class="boards">
            <div class="notice">
                <div>공지사항</div>
                <div>1</div>
            </div>
            <div class="introduce">
                <div>배달의민족 소개</div>
                <div>1</div>
            </div>
            <div class="campaign">
                <div>우아한 캠페인</div>
                <div>1</div>
            </div>
            <div class="tips">
                <div>바로결제 팁</div>
                <div>1</div>
            </div>
        </section>
    </div >
</template>

<script>
    export default {
        created : function(){window.addEventListener('resize', this.checkWindowWidth)},
        name : 'mainContent',
        props : ['mainContent'],
        data : function() {
            return {
                windowWidth : window.innerWidth,
                categoryName : {"chicken":"치킨","chinese":"중국집","pizza":"피자","korea":"한식","event":"이벤트","jokbal":"족발","night":"야식","japanese":"일식","tang":"탕","boxlunch":"도시락","fastfood":"패스트푸드","game":"사다리게임","baro":"바로결제","etc":"낫띵"},
                categories : {
                    chicken : {"top":"0px", "left":"0px", "background-image":"url(https://img.woowahan.com/www/main/cate01.png)"},
                    chinese : {"top":"0px", "left":"240px", "background-image":"url(https://img.woowahan.com/www/main/cate02.png)"},
                    pizza : {"top":"0px", "left":"480px", "background-image":"url(https://img.woowahan.com/www/main/cate03.png)"},
                    korea : {"top":"0px", "left":"720px", "background-image":"url(https://img.woowahan.com/www/main/cate04.png)"},
                    event : {"width":"480px","height":"480px","background-size":"440px","top":"240px", "left":"0px", "background-image":"url(http://file.smartbaedal.com/usr/promtxt/2017/4/28/201412050008_180343.png)"},
                    jokbal : {"top":"240px", "left":"480px", "background-image":"url(https://img.woowahan.com/www/main/cate05.png)"},
                    night : {"top":"240px", "left":"720px", "background-image":"url(https://img.woowahan.com/www/main/cate06.png)"},
                    japanese : {"top":"480px", "left":"480px", "background-image":"url(https://img.woowahan.com/www/main/cate08.png)"},
                    tang : {"top":"480px", "left":"720px", "background-image":"url(https://img.woowahan.com/www/main/cate07.png)"},
                    boxlunch : {"top":"720px", "left":"0px", "background-image":"url(https://img.woowahan.com/www/main/cate09.png)"},
                    fastfood : {"top":"720px", "left":"240px", "background-image":"url(https://img.woowahan.com/www/main/cate10.png)"},
                    game : {"width":"480px","height":"480px","background-size":"440px","top":"720px", "left":"480px", "background-image":"url(https://img.woowahan.com/www/main/game1.png)"},
                    baro : {"top":"960px", "left":"0px", "background-image":"url(https://img.woowahan.com/www/main/baro.png)"},
                    etc : {"top":"960px", "left":"240px", "background-image":"url(https://img.woowahan.com/www/main/nothing.png)"},
                }

            }
        },

        methods: {
            checkWindowWidth : function() {
                alert('111');
            }
        }
    } 
</script>

<style>

.content{max-width: 960px; margin:50px auto 0px;}
.content .foodList{position:relative;height:1200px;}
.content .foodList div{position:absolute;float:left;width:240px;height:240px;padding:20px;background-size:100%;background-repeat:no-repeat;background-size:200px;background-position:center;text-indent:-9999px;box-sizing:border-box}
.content .foodList:after{content:""; display:block; clear:both;}
/*
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
.content .foodList .etc{top:960px;left:240px;background-image:url(https://img.woowahan.com/www/main/nothing.png)} */

.content .foodList .large{float:left;width:480px;height:480px;background-size:440px;}
/*.content .foodList .event{top:240px;left:0px;background-image:url(http://file.smartbaedal.com/usr/promtxt/2017/4/28/201412050008_180343.png)}
.content .foodList .game{top:720px;left:480px;background-image:url(https://img.woowahan.com/www/main/game1.png)}*/

.boards{margin-top:70px;background-color:lightyellow;}
.boards div{width:50%;float:left;}
.boards div div{width:100%;float:left; background-color:#eef}



</style> 
<template>
    <div v-bind:class="{'categories-text':isMain, 'categories-wrap':!isMain, 'none':notmenu}" >
        <div class="categories">
            <dl><dt>카테고리 : </dt>
            <dd><ul class="menus">
                <li class="chicken"><a href="/#/list/chicken/">치킨 <span>|</span></a></li>
                <li class="chinese"><a href="/#/list/chinese/">중국집 <span>|</span></a></li>
                <li class="pizza"><a href="/#/list/pizza/">피자 <span>|</span></a></li>
                <li class="korea"><a href="/#/list/korea/">한식,분식 <span>|</span></a></li>
                <li class="jokbal"><a href="/#/list/jokbal/">족발,보쌈 <span>|</span></a></li>
                <li class="night"><a href="/#/list/night/">야식 <span>|</span></a></li>
                <li class="japanese"><a href="/#/list/japanese/">돈까스,회,일식 <span>|</span></a></li>
                <li class="tang"><a href="/#/list/tang/">찜,탕 <span>|</span></a></li>
                <li class="boxlunch"><a href="/#/list/boxlunch/">도시락 <span>|</span></a></li>
                <li class="fastfood"><a href="/#/list/fastfood/">패스트푸드 <span>|</span></a></li>
                <li class="baro"><a href="/#/list/baro/">바로결제 <span>|</span></a></li>
                <li class="etc"><a href="/#/list/etc/">기타 <span>|</span></a></li>
                <li class="all"><a href="/#/list/all/">모아보기</a></li>
            </ul></dd></dl>
        </div>
    </div>
</template>



<script>
import EventHub from './EventHub'

export default {

    mounted : function(){
        // 이벤트 허브 관련 체크
        EventHub.$on('menushow-toggle', (message)=>{this.notmenu = !message;} );
        // resize 이벤트
        window.addEventListener('resize', ()=>{
            this.isMain = this.checkCategoryText();
            this.notmenu = this.checkWindowWidth();
        });
    },
    name : 'commonCategory',
    props : ['commonCategory'],
    data : function(){
        return {
            isMain : this.checkCategoryText(),   // 사이즈 무관 메인페이지 또는 740 이하 전영역 일때 true 이어야 한다.
            mobileMenuHide : false,
            notmenu : this.checkWindowWidth(),     // 740 이하일때에는 true 740 이상일때는 false이어야 한다.
        };
    },
    methods : {
        // 윈도우 사이즈 or 메인 페이지일때 보여줄 카테고리 추가
        checkCategoryText : function( ) {
            return ( this.checkMainPath || this.checkWindowWidth)? true: false;
        },
        checkWindowWidth : function() {
            return window.innerWidth <= 740;
        },
        checkMainPath : function() {
            return location.hash === "#/";
        },
    }
}

</script>


<style>
.none{display:none}
.categories-text .categories{width:626px;margin:0 auto;font-size:13px;}
.categories-text .categories dl dt{float:left;width:75px;height:40px;font-weight:bold; text-align:center;line-height:20px;}
.categories-text .categories dl dd{}
.categories-text .categories dl:after{content:""; display: block; clear: both;}
.categories-text .categories .menus li{float:left;padding-right:2px;line-height:20px;}
.categories-text .categories .menus a{color:black;font-size:0.9em;}
.categories-text .categories .menus a:hover{text-decoration:none;color:red;}
.categories-text .categories .menus a span{color:#eee;padding:0px 5px;}

.categories-wrap{background-color:#222;overflow:hidden; height:100px;transition: 0.5s}
.categories-wrap:hover{height:200px;transition: 0.5s}
.categories-wrap .categories{width:900px; margin:0 auto;}
.categories-wrap .categories dl dt{float: left; text-indent: -9999px;width:0px;}
.categories-wrap .categories dl dd{}
.categories-wrap .categories dl:after{content:""; display: block; clear: both;}
.categories-wrap .categories .menus li{float:left;width:100px; height:100px; text-indent: -9999px;}

.categories-wrap .categories .menus .chicken{background-image:url("https://img.woowahan.com/www/title/tl-cate.jpg?201404281135"); background-position: 0px 0px;}
.categories-wrap .categories .menus .chinese{background-image:url("https://img.woowahan.com/www/title/tl-cate.jpg?201404281135"); background-position: -112px 0px;}
.categories-wrap .categories .menus .pizza{background-image:url("https://img.woowahan.com/www/title/tl-cate.jpg?201404281135"); background-position: -224px 0px;}
.categories-wrap .categories .menus .korea{background-image:url("https://img.woowahan.com/www/title/tl-cate.jpg?201404281135"); background-position: -336px 0px;}
.categories-wrap .categories .menus .jokbal{background-image:url("https://img.woowahan.com/www/title/tl-cate.jpg?201404281135"); background-position: -448px 0px;}
.categories-wrap .categories .menus .night{background-image:url("https://img.woowahan.com/www/title/tl-cate.jpg?201404281135"); background-position: -560px 0px;}
.categories-wrap .categories .menus .japanese{background-image:url("https://img.woowahan.com/www/title/tl-cate.jpg?201404281135"); background-position: -672px 0px;}
.categories-wrap .categories .menus .tang{background-image:url("https://img.woowahan.com/www/title/tl-cate.jpg?201404281135"); background-position: -784px 0px;}

.categories-wrap .categories .menus .boxlunch{background-image:url("https://img.woowahan.com/www/title/tl-cate.jpg?201404281135"); background-position: 0px -98px;}
.categories-wrap .categories .menus .fastfood{background-image:url("https://img.woowahan.com/www/title/tl-cate.jpg?201404281135"); background-position: -112px -98px;}
.categories-wrap .categories .menus .baro{background-image:url("https://img.woowahan.com/www/title/tl-cate.jpg?201404281135"); background-position: -784px -98px;}
.categories-wrap .categories .menus .etc{background-image:url("https://img.woowahan.com/www/title/tl-cate.jpg?201404281135"); background-position: 0px -196px;}
.categories-wrap .categories .menus .all{background-image:url("https://img.woowahan.com/www/title/tl-cate.jpg?201404281135"); background-position: -112px -196px;}

.categories-wrap .categories .menus .chicken:hover{background-image:url("https://img.woowahan.com/www/title/tl-cate.jpg?201404281135"); background-position: 0px -304px;}
.categories-wrap .categories .menus .chinese:hover{background-image:url("https://img.woowahan.com/www/title/tl-cate.jpg?201404281135"); background-position: -112px -304px;}
.categories-wrap .categories .menus .pizza:hover{background-image:url("https://img.woowahan.com/www/title/tl-cate.jpg?201404281135"); background-position: -224px -304px;}
.categories-wrap .categories .menus .korea:hover{background-image:url("https://img.woowahan.com/www/title/tl-cate.jpg?201404281135"); background-position: -336px -304px;}
.categories-wrap .categories .menus .jokbal:hover{background-image:url("https://img.woowahan.com/www/title/tl-cate.jpg?201404281135"); background-position: -448px -304px;}
.categories-wrap .categories .menus .night:hover{background-image:url("https://img.woowahan.com/www/title/tl-cate.jpg?201404281135"); background-position: -560px -304px;}
.categories-wrap .categories .menus .japanese:hover{background-image:url("https://img.woowahan.com/www/title/tl-cate.jpg?201404281135"); background-position: -672px -304px;}
.categories-wrap .categories .menus .tang:hover{background-image:url("https://img.woowahan.com/www/title/tl-cate.jpg?201404281135"); background-position: -784px -304px;}

.categories-wrap .categories .menus .boxlunch:hover{background-image:url("https://img.woowahan.com/www/title/tl-cate.jpg?201404281135"); background-position: 0px -402px;}
.categories-wrap .categories .menus .fastfood:hover{background-image:url("https://img.woowahan.com/www/title/tl-cate.jpg?201404281135"); background-position: -112px -402px;}
.categories-wrap .categories .menus .baro:hover{background-image:url("https://img.woowahan.com/www/title/tl-cate.jpg?201404281135"); background-position: -784px -402px;}
.categories-wrap .categories .menus .etc:hover{background-image:url("https://img.woowahan.com/www/title/tl-cate.jpg?201404281135"); background-position: 0px -500px;}
.categories-wrap .categories .menus .all:hover{background-image:url("https://img.woowahan.com/www/title/tl-cate.jpg?201404281135"); background-position: -112px -500px;}


@media (max-width:740px) {
    .categories-text{width:100%;padding-top:65px;background-color:#000;color:#fff;}
    .categories-text .categories{width:100%;margin:0;}
    .categories-text .categories dl dt{float:none;position:absolute;left:-9999px;}
    .categories-text .categories dl dd li{width:33.3333%;padding:15px;text-align:center;border-top:1px solid #212121;box-sizing:box-sizing;cursor:pointer;}
    .categories-text .categories dl dd li:hover{background-color:#ff6c00;}
    .categories-text .categories dl dd li:nth-child(3n-1){border-left:1px solid #212121;border-right:1px solid #212121;}
    .categories-text .categories dl dd li:nth-child(11), li:nth-child(12){border-bottom:1px solid #212121;}
    .categories-text .categories dl dd li:last-child{margin-left:1px;border-right:1px solid #212121;}
    .categories-text .categories .menus a{color:#fff;}
    .categories-text .categories .menus a:hover{color:#fff;}
    .categories-text .categories dl dd li span{position:absolute;left:-9999px;}
}

</style>
<template>
    <div v-bind:class="{'categories-wrap':icon, 'categories-text':!icon}">
        <div class="categories">
            <dl><dt>카테고리</dt>
            <dd><ul class="menus">
                <li class="chicken">치킨 |</li>
                <li class="chinese">중국집 |</li>
                <li class="pizza">피자 |</li>
                <li class="korea">한식,분식 |</li>
                <li class="jokbal">족발,보쌈 |</li>
                <li class="night">야식 |</li>
                <li class="japanese">돈까스,회,일식 |</li>
                <li class="tang">찜,탕 |</li>
                <li class="boxlunch">도시락 |</li>
                <li class="fastfood">패스트푸드 |</li>
                <li class="baro">바로결제 |</li>
                <li class="etc">기타 |</li>
                <li class="all">모아보기</li>
            </ul></dd></dl>
        </div>
    </div>
</template>



<script>

export default {
    name : 'categoryIcon',
    props : ['categoryIcon'],
    data : function(){
        return {
            icon : true,
        };
    },
    method : {

    }
}

</script>


<style>
.categories-text .categories{width:900px; margin:0 auto;}
.categories-text .categories dl dt{float: left;}
.categories-text .categories dl dd{}
.categories-text .categories dl:after{content:""; display: block; clear: both;}
.categories-text .categories .menus li{float:left;}



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



</style>
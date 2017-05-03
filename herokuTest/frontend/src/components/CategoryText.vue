<template>

    <div class="categories">
        <dl><dt>카테고리</dt>
        <dd><ul class="menus">
            <li>치킨 |</li>
            <li>중국집 |</li>
            <li>피자 |</li>
            <li>한식,분식 |</li>
            <li>족발,보쌈 |</li>
            <li>야식 |</li>
            <li>돈까스,회,일식 |</li>
            <li>찜,탕 |</li>
            <li>도시락 |</li>
            <li>패스트푸드 |</li>
            <li>바로결제 |</li>
            <li>기타 |</li>
            <li>모아보기</li>
        </ul></dd></dl>
    </div>

</template>



<script>

</script>


<style>
.categories-wrap{background-color:#222;overflow:hidden; height:100px;transition: 0.5s}
.categories-wrap:hover{height:200px;transition: 0.5s}
.categories{width:980px; margin:0 auto;}
.categories dl dt{float: left; text-indent: -9999px;}
.categories dl dd{}
.categories dl:after{content:""; display: block; clear: both;}
.categories .menus li{float:left;width:100px; height:100px; text-indent: -9999px;}

.categories .menus .chicken{background-image:url("https://img.woowahan.com/www/title/tl-cate.jpg?201404281135"); background-position: 0px 0px;}
.categories .menus .chinese{background-image:url("https://img.woowahan.com/www/title/tl-cate.jpg?201404281135"); background-position: -112px 0px;}
.categories .menus .pizza{background-image:url("https://img.woowahan.com/www/title/tl-cate.jpg?201404281135"); background-position: -224px 0px;}
.categories .menus .korea{background-image:url("https://img.woowahan.com/www/title/tl-cate.jpg?201404281135"); background-position: -336px 0px;}
.categories .menus .jokbal{background-image:url("https://img.woowahan.com/www/title/tl-cate.jpg?201404281135"); background-position: -448px 0px;}
.categories .menus .night{background-image:url("https://img.woowahan.com/www/title/tl-cate.jpg?201404281135"); background-position: -560px 0px;}
.categories .menus .japanese{background-image:url("https://img.woowahan.com/www/title/tl-cate.jpg?201404281135"); background-position: -672px 0px;}
.categories .menus .tang{background-image:url("https://img.woowahan.com/www/title/tl-cate.jpg?201404281135"); background-position: -784px 0px;}

.categories .menus .boxlunch{background-image:url("https://img.woowahan.com/www/title/tl-cate.jpg?201404281135"); background-position: 0px -98px;}
.categories .menus .fastfood{background-image:url("https://img.woowahan.com/www/title/tl-cate.jpg?201404281135"); background-position: -112px -98px;}
.categories .menus .baro{background-image:url("https://img.woowahan.com/www/title/tl-cate.jpg?201404281135"); background-position: -784px -98px;}
.categories .menus .etc{background-image:url("https://img.woowahan.com/www/title/tl-cate.jpg?201404281135"); background-position: 0px -196px;}
.categories .menus .all{background-image:url("https://img.woowahan.com/www/title/tl-cate.jpg?201404281135"); background-position: -112px -196px;}

.categories .menus .chicken:hover{background-image:url("https://img.woowahan.com/www/title/tl-cate.jpg?201404281135"); background-position: 0px -304px;}
.categories .menus .chinese:hover{background-image:url("https://img.woowahan.com/www/title/tl-cate.jpg?201404281135"); background-position: -112px -304px;}
.categories .menus .pizza:hover{background-image:url("https://img.woowahan.com/www/title/tl-cate.jpg?201404281135"); background-position: -224px -304px;}
.categories .menus .korea:hover{background-image:url("https://img.woowahan.com/www/title/tl-cate.jpg?201404281135"); background-position: -336px -304px;}
.categories .menus .jokbal:hover{background-image:url("https://img.woowahan.com/www/title/tl-cate.jpg?201404281135"); background-position: -448px -304px;}
.categories .menus .night:hover{background-image:url("https://img.woowahan.com/www/title/tl-cate.jpg?201404281135"); background-position: -560px -304px;}
.categories .menus .japanese:hover{background-image:url("https://img.woowahan.com/www/title/tl-cate.jpg?201404281135"); background-position: -672px -304px;}
.categories .menus .tang:hover{background-image:url("https://img.woowahan.com/www/title/tl-cate.jpg?201404281135"); background-position: -784px -304px;}

.categories .menus .boxlunch:hover{background-image:url("https://img.woowahan.com/www/title/tl-cate.jpg?201404281135"); background-position: 0px -402px;}
.categories .menus .fastfood:hover{background-image:url("https://img.woowahan.com/www/title/tl-cate.jpg?201404281135"); background-position: -112px -402px;}
.categories .menus .baro:hover{background-image:url("https://img.woowahan.com/www/title/tl-cate.jpg?201404281135"); background-position: -784px -402px;}
.categories .menus .etc:hover{background-image:url("https://img.woowahan.com/www/title/tl-cate.jpg?201404281135"); background-position: 0px -500px;}
.categories .menus .all:hover{background-image:url("https://img.woowahan.com/www/title/tl-cate.jpg?201404281135"); background-position: -112px -500px;}



</style>
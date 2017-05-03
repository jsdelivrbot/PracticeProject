<template>
    <div class="categories-wrap">
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
    </div>

</template>



<script>

</script>


<style>

.categories-wrap .categories{width:900px; margin:0 auto;}
.categories-wrap .categories dl dt{float: left;}
.categories-wrap .categories dl dd{}
.categories-wrap .categories dl:after{content:""; display: block; clear: both;}
.categories-wrap .categories .menus li{float:left;}

.categories-wrap{background-color:#222;overflow:hidden; height:100px;transition: 0.5s}
.categories-wrap:hover{height:200px;transition: 0.5s}
.categories{width:980px; margin:0 auto;}
.categories dl dt{float: left; text-indent: -9999px;}
.categories dl dd{}
.categories dl:after{content:""; display: block; clear: both;}
.categories .menus li{float:left;width:100px; height:100px; text-indent: -9999px;}


</style>
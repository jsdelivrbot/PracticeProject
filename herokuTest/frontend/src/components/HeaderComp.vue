<template>

<div class="header">
    <section class="top-area">
        <div class="top">
            <h1><a href="">배달의 민족</a></h1>
            <ul>
                <li><a href="">로그인</a><em>|</em></li>
                <li><a href="">회원가입</a><em>|</em></li>
                <li><a href="">고객센터</a></li>
            </ul>
        </div>

        <div class="search">
            <div class="location">
                <span>서울 송파구 석촌동</span>
                <span>네모</span>
            </div>
            <div class="shop">
                <input class="shop-search" type="text" placeholder="업소명을 검색해 주세요">
                <span>?</span>
            </div>
        </div>
    </section>
</div>

</template>



<script>

export default {
    name : 'headerComp',
    props : ['headerComp'],
    data : {

    }
}

</script>


<style>
/* Reset Css */
html, body, div, span, applet, object, iframe,h1, h2, h3, h4, h5, h6, p, blockquote, pre,a, abbr, acronym, address, big, cite, code,del, dfn, em, img, ins, kbd, q, s, samp,small, strike, strong, sub, sup, tt, var,b, u, i, center,dl, dt, dd, ol, ul, li,fieldset, form, label, legend,table, caption, tbody, tfoot, thead, tr, th, td,article, aside, canvas, details, embed, figure, figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary,time, mark, audio, video {
margin: 0;padding: 0;border: 0;font-size: 100%;font: inherit;vertical-align: baseline;}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {display: block;}
body {line-height: 1;}
ol, ul {list-style: none;}
blockquote, q {quotes: none;}
blockquote:before, blockquote:after,
q:before, q:after {content: '';content: none;}
table {border-collapse: collapse;border-spacing: 0;}

/* Header 관련 CSS */

* {text-decoration : none;}
.content, .footer{max-width: 960px; margin:0px auto;}

.header{position:relative;}
.header .top-area{ max-width:1000px; margin:20px auto; position:relative;}
.header h1{height:75px;text-align:center;}
.header h1 a{background-image:url("https://img.woowahan.com/www/common/logo-bm-v2@2.png");background-repeat: no-repeat; background-size:100%; 
                display:inline-block; height:75px; width:250px; text-indent: -9999px; text-align: left;}

.header .top{}
.header .top ul{position:absolute; top:0;right:0;}
.header .top ul li{float:left;  font-size:12px;}
.header .top ul a{color:#aeaeae}
.header .top ul a:hover{color:black}
.header .top ul em{ margin:0px 10px;color:#aeaeae}
.header .top ul:after{content:"";display:block;clear:both;}

.header .search{margin:0px auto;}
.header .search .location{float:left;width:205px;height:39px;text-align: right;background-color:gray;}
.header .search .shop{float:left;width:400px;height:39px;}
.header .search .shop-search{width:100%; height:34px;}
.header .search:after{content:""; display:block; clear:both;}


</style>
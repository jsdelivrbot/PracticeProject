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
                <span class="location-search">서울 송파구 석촌동</span>
                <span class="location-search-btn"><i class="fa fa-crosshairs"></i></span>
                <div class="gudong">
                    <p>현재 설정된 주소가 맞지 않으세요?<br/> 동명을 검색해서 다시 설정해 주세요.</p>
                    <input id="gudong-search" type="text" placeholder="동명을 입력하세요" v-model="gudong" v-on:keyup="check">
                </div>
                <div class="gudong result">
                    <ul>
                        <li>관련된 동이름을 찾을수가 없습니다.</li>
                    </ul>
                </div>
                <div class="gudong">
                    <button>현재위치 자동검색</button>
                </div>


            </div>
            <div class="shop">
                <input class="shop-search" type="text" placeholder="업소명을 검색해 주세요">
                <span class="shop-search-btn" onclick="javascript:alert('test');"><i class="fa fa-search"></i></span>
            </div>
        </div>
    </section>
    <button v-on:click="searchGudong">확인용</button>
</div>

</template>



<script>

export default {
    name : 'headerComp',
    props : ['headerComp'],
    data : function(){
        return {
            gudong : "test",
            gudongResult : ""
        };
    },
    methods : {
        // 제대로 입력되는지를 확인.
        check : function(){
            console.log("vue data ==>" + this.gudong);
            console.log("not Vue data => "+document.getElementById("gudong-search").value);
        },
        searchGudong : function() {
            this.$http.get(`/api/gudong/${this.gudong}`)
                .then( res => {
                    this.gudongResult = res.data
                    console.log(this.gudongResult);
            });
        }
    },
}

</script>


<style>
/* Reset Css */
html, body, div, span, applet, object, iframe,h1, h2, h3, h4, h5, h6, p, blockquote, pre,a, abbr, acronym, address, big, cite, code,del, dfn, em, img, ins, kbd, q, s, samp,small, strike, strong, sub, sup, tt, var,b, u, i, center,dl, dt, dd, ol, ul, li,fieldset, form, label, legend,table, caption, tbody, tfoot, thead, tr, th, td,article, aside, canvas, details, embed, figure, figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary,time, mark, audio, video {margin: 0;padding: 0;border: 0;font-size: 100%;font: inherit;vertical-align: top;}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, footer, header, hgroup, menu, nav, section {display: block;}
body {line-height:1;}
ol, ul {list-style:none;}
blockquote, q {quotes:none;}
blockquote:before, blockquote:after,
q:before, q:after {content:'';content: none;}
table {border-collapse:collapse;border-spacing: 0;}

/* Header 관련 CSS */

* {text-decoration : none; box-sizing:border-box;}
.content, .footer{max-width: 960px; margin:0px auto;}


.header{position:relative;}
.header .top-area{ max-width:1000px; margin:25px auto 15px; position:relative;}
.header h1{height:75px;text-align:center;}
.header h1 a{display:inline-block; height:75px; width:250px;background-image:url("https://img.woowahan.com/www/common/logo-bm-v2@2.png");background-repeat: no-repeat; background-size:100%;text-indent: -9999px; text-align: left;}

.header .top{}
.header .top ul{position:absolute;top:0;right:0;}
.header .top ul li{float:left;font-size:12px;}
.header .top ul a{color:#aeaeae}
.header .top ul a:hover{color:black}
.header .top ul em{margin:0px 10px;color:#aeaeae}
.header .top ul:after{display:block;clear:both;content:"";}

.header .search{margin:25px auto 0px;padding:0px 192px;}
.header .search .location{float:left;width:205px;height:39px;border:1px solid #9B9D9F;background-color:#fff;text-align:right;box-sizing:border-box;}
.header .search .location-search{display:inline-block;width:75%;height:39px;box-sizing:border-box;line-height:39px;text-align:left;font-size:13px;font-weight:bold;}
.header .search .location-search-btn{display:inline-block;width:39px;height:38px;background-color:#9B9D9F;text-align:center;}
.header .search .gudong{width:250px;margin:-2px -46px;padding:15px;background-color:#fff;border:1px solid #9B9D9F;font-size:12px;text-align:left;}
.header .search .gudong p{line-height:20px;}
.header .search .gudong input{margin-top:10px;width:218px;padding:10px;border:3px solid #A9A9A9;}
.header .search .gudong input:focus{border:3px solid black;}
.header .search .gudong.result{font-weight:bold;}
.header .search .gudong.current{background-color:#eee;border-style:none;}

.header .search .fa-crosshairs{line-height:39px;font-size:20px;color:#fff}
.header .search .shop{float:left;width:400px;height:39px;margin-left:10px;}
.header .search .shop-search{width:360px;height:39px;padding-left:10px;box-sizing:border-box;}
.header .search .shop-search-btn{display:inline-block;width:39px;height:39px;margin-left:-6px;background-color:#333;text-align:center;}
.header .search .fa-search{color:#fff;line-height:39px;}
.header .search:after{display:block;clear:both;content:"";}


</style>
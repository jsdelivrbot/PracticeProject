<template>

<div class="header">
    <section class="top-area">
        <div class="top">
            <h1><a href="">배달의 민족</a></h1>
            <ul>
                <li><a href="">로그인</a><em>|</em></li>
                <li><a href="/#/signup">회원가입</a><em>|</em></li>
                <li><a href="/#/customer">고객센터</a></li>
            </ul>
        </div>

        <div class="search">
            <div class="location">
                <span class="location-search">{{gudongSelection.si}} {{gudongSelection.gu}} {{gudongSelection.dong}}</span>
                <span class="location-search-btn" v-on:click="showGudong"><i class="fa fa-crosshairs"></i></span>
                <div class="location-gudong" v-bind:class="{ none:gudongHide}">
                    <div class="gudong line">
                        <p>현재 설정된 주소가 맞지 않으세요?<br/> 동명을 검색해서 다시 설정해 주세요.</p>
                        <!-- 한글이 1글자씩 인식이 안되는 문제 때문에 v-model 사용하지 않음 -->
                        <input id="gudong-search" type="text" placeholder="동명을 입력하세요"v-on:keyup="enterGudong">
                    </div>
                    <div class="result">
                        <ul>
                            <li class="gudong"v-on:click="selectGudong(one.gu, one.dong)"  v-for="one in gudongResult">{{one.gu}} {{one.dong}}</li>
                        </ul>
                    </div>
                    <div class="gudong current">
                        <button>현재위치 자동검색</button>
                    </div>
                </div>


            </div>
            <div class="shop">
                <input class="shop-search" type="text" placeholder="업소명을 검색해 주세요">
                <span class="shop-search-btn" onclick="javascript:alert('test');"><i class="fa fa-search"></i></span>
            </div>
        </div>
    </section>
</div>

</template>



<script>

export default {
    name : 'commonHeader',
    props : ['commonHeader'],
    data : function(){
        return {
            gudong : "",
            gudongHide : true,
            gudongSelection : {"si":"서울시", "gu":"송파구", "dong" : "석촌동" },
            gudongResult : ""
        };
    },
    methods : {
        showGudong : function() {
            this.gudongHide = !this.gudongHide;
        },
        enterGudong : function(){
            this.gudong = document.getElementById("gudong-search").value;
            if( this.gudong.trim().length === 0) {
                this.gudongResult = ""; return;
            }
            this.searchGudong();
        },
        searchGudong : function() {
            this.$http.get(`/api/gudong/${this.gudong}`)
                .then( res => {
                    this.gudongResult = +res.data.length === 0? [{"gu" : "관련된 동이름을","dong" : "찾을수가 없습니다."}] : res.data;
            });
        },
        selectGudong : function(gu, dong) {
            this.gudongSelection["gu"] = gu;
            this.gudongSelection["dong"] = dong;
            this.showGudong();
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
.footer{max-width: 960px; margin:0px auto;}


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

.none{display:none}

.header .search{margin:25px auto 0px;padding:0px 192px;}
.header .search .location{float:left;width:205px;height:39px;border:1px solid #9B9D9F;background-color:#fff;text-align:right;box-sizing:border-box;}
.header .search .location-search{display:inline-block;width:75%;height:39px;box-sizing:border-box;line-height:39px;text-align:center;font-size:13px;font-weight:bold;}
.header .search .location-search-btn{display:inline-block;width:39px;height:38px;background-color:#9B9D9F;text-align:center;cursor:pointer;}
.header .search .location-gudong{position:absolute;margin-top:-3px;margin-left:-47px;width:251px;border:1px solid #9B9D9F;overflow:hidden;z-index:1000;}
.header .search .location-gudong .gudong{width:250px;padding:15px;background-color:#fff;font-size:12px;text-align:left;}
.header .search .location-gudong .gudong.line{border-bottom: 1px solid #9B9D9F;margin-bottom: -1px;}
.header .search .location-gudong .gudong p{line-height:20px;}
.header .search .location-gudong .gudong input{margin-top:10px;width:218px;padding:10px;border:3px solid #A9A9A9;}
.header .search .location-gudong .gudong input:focus{border:3px solid black;}
.header .search .location-gudong .gudong.current{border-top:1px solid #9B9D9F;}
.header .search .location-gudong .result{max-height:300px;overflow-y:auto;overflow-x:hidden; background-color:#fff;font-weight:bold;}
.header .search .location-gudong .result ul li{padding:18.6px 15px;border-top:1px solid #9B9D9F;}
.header .search .location-gudong .result ul li:hover{background:#f4f2ee}
.header .search .location-gudong .result ul li:last-child{}

.header .search .fa-crosshairs{line-height:39px;font-size:20px;color:#fff}
.header .search .shop{float:left;width:400px;height:39px;margin-left:10px;}
.header .search .shop-search{width:360px;height:39px;padding-left:10px;box-sizing:border-box;}
.header .search .shop-search-btn{display:inline-block;width:39px;height:39px;margin-left:-6px;background-color:#333;text-align:center;}
.header .search .fa-search{color:#fff;line-height:39px;}
.header .search:after{display:block;clear:both;content:"";}


</style>
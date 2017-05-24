<template>

<div class="header">
    <section class="top-area">
        <div class="top">
            <h1>
                <i class="glyphicon glyphicon-th-large" v-on:click="menuShowToggle('menu')"></i>
                <a href="">배달의 민족</a>
                <i class="glyphicon glyphicon-option-vertical" v-on:click="menuShowToggle('login')"></i>
                
            </h1>
            <ul v-bind:class="{none : !toggle.login}">
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
                        <button v-on:click="locationNow">현재위치 자동검색</button>
                    </div>
                </div>


            </div>
            <div class="shop" v-bind:class="{none : !toggle.menu}">
                <input class="shop-search" type="text" placeholder="업소명을 검색해 주세요">
                <span class="shop-search-btn" onclick="javascript:alert('test');"><i class="fa fa-search"></i></span>
            </div>
        </div>
    </section>
</div>

</template>



<script>
import EventHub from './EventHub'

export default {
     mounted : function(){
        // resize 이벤트
        window.addEventListener('resize', ()=>{
            this.allToggle(window.innerWidth > 740);
        });
    },
    name : 'commonHeader',
    props : ['commonHeader'],
    data : function(){
        return {
            locationCoord : {'latitude':0, 'longtude':0},
            gudong : "",
            gudongHide : true,
            gudongSelection : {"si":"서울시", "gu":"송파구", "dong" : "석촌동" },
            gudongResult : "",
            toggle : {"menu":!this.checkWindowWidth(), "login": !this.checkWindowWidth()}
        };
    },
    methods : {
        checkWindowWidth : function() {
            return window.innerWidth <= 740;
        },

        allToggle : function(bool) {
            for( var one in this.toggle ) {
                console.log(bool);
                this.toggle[one] = bool;
            }
        },

        // 현재 위치를 좌표로 가져 온다.
        locationNow : function() {
            var that = this;
            navigator.geolocation.getCurrentPosition( function( pos ) {
                var latitude = pos.coords.latitude;
                var longtude = pos.coords.longitude;
                that.locationCoord['lat'] = parseFloat(latitude);
                that.locationCoord['lng'] = parseFloat(longtude);
                console.log(`현재 위치는 ${latitude} , ${longtude}`);
                that.locationSearch();
            });
        },

        // 역으로 해당 좌표의 주소값을 가져온다.
        locationSearch : function() {
            var geocoder = new google.maps.Geocoder;
            var latlng = this.locationCoord;
            //var latlng = {lat:37.498610, lng:127.028045}; //테스트값
            var that = this;
            geocoder.geocode({'location': latlng}, function(results, status) {
                if (status === 'OK') {
                    if (results[1]) {
                        that.locationParsing(results);
                    } else {
                        window.alert('No results found');
                    }
                } else {
                window.alert('Geocoder failed due to: ' + status);
                }
            });

            
        },

        // 주소값 중 원하는 부분을 가져와서 저장하고 showGudong을 호출한다.
        locationParsing : function(locationObject) {
            var that = this;
            var cnt = 0;
            var lastWord = 0;
            var word = "";

            locationObject.some( x => {
                x.address_components.forEach( one => {
                    lastWord = one.long_name.length-1;
                    word = one.long_name;
                    if(word[lastWord] === "동") { that.gudongSelection["dong"] = word; cnt++; }
                    if(word[lastWord] === "구") { that.gudongSelection["gu"] = word; cnt++; }
                });
                return cnt === 2;
            });
            that.showGudong();
        },

        // 모바일 사이즈일 경우 카테고리를 숨겨놨다가 열어주는데 CommonCategory 컴포넌트에 메세지 보내줘야 함.
        menuShowToggle : function(selection) {
            for ( var one in this.toggle ) {
                if( one === selection ) { this.toggle[one] = !this.toggle[selection] }
                else{this.toggle[one] = false;}
            }
            EventHub.$emit('menushow-toggle', this.toggle.menu );
        },
        // 동네 검색 영역 보여줌
        showGudong : function() {
            this.gudongHide = !this.gudongHide;
            if(this.checkWindowWidth()) {
                this.menuShowToggle();
            }
        },
        // 동네 검색시에 입력 값을 data > gudong에 입력해줌. v-model을 쓰면 한글이 한글자씩 인식이 안되어 이렇게 처리.
        enterGudong : function(){
            this.gudong = document.getElementById("gudong-search").value;
            if( this.gudong.trim().length === 0) {
                this.gudongResult = ""; return;
            }
            this.searchGudong();
        },
        // 동네 검색 비동기 처리 메소드
        searchGudong : function() {
            this.$http.get(`/api/gudong/${this.gudong}`)
                .then( res => {
                    this.gudongResult = +res.data.length === 0 ? [{"gu" : "관련된 동이름을","dong" : "찾을수가 없습니다."}] : res.data;
            });
        },
        // 동네 검색 결과 클릭시에 data -> gudongSelection 에 결과 데이터를 입력한다.
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
.header h1 i{display:none;}

.header .top{}
.header .top ul{position:absolute;top:0;right:0;}
.header .top ul li{float:left;font-size:12px;}
.header .top ul a{color:#aeaeae}
.header .top ul a:hover{color:black}
.header .top ul em{margin:0px 10px;color:#aeaeae}
.header .top ul:after{display:block;clear:both;content:"";}

.none{display:none}

.header .search{width:640px;margin:25px auto 0px;}
.header .search .location{float:left;width:38%;height:39px;border:1px solid #9B9D9F;background-color:#fff;text-align:right;box-sizing:border-box;}
.header .search .location-search{display:inline-block;width:75%;height:39px;box-sizing:border-box;line-height:39px;text-align:center;font-size:13px;font-weight:bold;}
.header .search .location-search-btn{display:inline-block;width:39px;height:38px;background-color:#9B9D9F;text-align:center;cursor:pointer;}
.header .search .location-gudong{position:absolute;margin-top:-3px;margin-left:-9px;border:1px solid #9B9D9F;overflow:hidden;z-index:1000;}
.header .search .location-gudong .gudong{width:250px;padding:15px;background-color:#fff;font-size:12px;text-align:left;}
.header .search .location-gudong .gudong.line{border-bottom: 1px solid #9B9D9F;margin-bottom: -1px;}
.header .search .location-gudong .gudong p{line-height:20px;}
.header .search .location-gudong .gudong button{width:100%;padding:10px;background-color:#fff;border:1px solid #A9A9A9;}
.header .search .location-gudong .gudong input{margin-top:10px;width:218px;padding:10px;border:3px solid #A9A9A9;}
.header .search .location-gudong .gudong input:focus{border:3px solid black;}
.header .search .location-gudong .gudong.current{border-top:1px solid #9B9D9F;}
.header .search .location-gudong .result{max-height:300px;overflow-y:auto;overflow-x:hidden; background-color:#fff;font-weight:bold;}
.header .search .location-gudong .result ul li{padding:18.6px 15px;border-top:1px solid #9B9D9F;}
.header .search .location-gudong .result ul li:hover{background:#f4f2ee}
.header .search .location-gudong .result ul li:last-child{}

.header .search .fa-crosshairs{line-height:39px;font-size:20px;color:#fff}
.header .search .shop{float:left;width:60%;height:39px;margin-left:2%;}
.header .search .shop-search{width:calc(100% - 39px);height:39px;padding-left:10px;box-sizing:border-box;}
.header .search .shop-search-btn{display:inline-block;width:39px;height:39px;margin-left:-6px;background-color:#333;text-align:center;}
.header .search .fa-search{color:#fff;line-height:39px;}
.header .search:after{display:block;clear:both;content:"";}


@media (max-width:740px) {
    
.header .top{margin-top:39px;}
.header h1{height:60px;border-bottom:1px solid #DEDEDE;}
.header h1 a{height:100%;background-size:100px;background-position:center;background-image:url(https://img.woowahan.com/www/common/logo-bm-v2.png)}
.header h1 i{display:inline;position:absolute;line-height:57px;font-size:25px;cursor:pointer;}
.header h1 i:first-child{left:10px;}
.header h1 i:last-child{right:0px;}
.header .top-area{ width:100%; margin:0; position:relative;}

.header .top ul{width:100%;text-align:center;position:relative;}
.header .top ul li{float:none;padding:20px;background-color:#000;}
.header .top ul li em{display:none;}

.header .search{position:absolute;width:100%;margin:0;top:0px;}
.header .search .location{float:none;width:100%;margin-top:-39px;background-color:#3f3f3f;}
.header .search .location .location-search{float:left;width:90%;color:#fff;}
.header .search .location .location-search-btn{width:10%;background-color:#282522;color:#fff;}
.header .search .location .location-gudong{width:100%;margin:-3px 0px;}
.header .search .location .location-gudong .gudong{width:100%;}
.header .search .location .location-gudong input{width:100%;}

.header .search .shop{position:absolute;float:none;width:100%;padding:0px 10px;margin:0px;top:74px;font-size:0.8em;}
.header .search .shop input{background-color:#333;border:0;color:#fff;}
}
</style>
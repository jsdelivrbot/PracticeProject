<template>
<div>
    <header>
        <commonHeader></commonHeader>
        <commonCategory></commonCategory>
    </header>
    <div class="customer-area">
        <div class="path">홈 > 서비스소개</div>
        <div class="container">
            <!-- 상단 영역 -->
            <ul class="tabs">
                <li>서비스소개</li>
                <li>공지사항/이벤트</li>
                <li>자주묻는질문</li>
                <li>문의하기</li>
            </ul>
            <!-- 하단 영역 여기서 위의 4가지 영역을 다 포함한다.-->
            <div class="content">
                <!--서비스 소개-->
                <section class="introduction">
                    <h2>서비스 소개</h2>
                    <div class="explation">
                        <div class="first-img">배달의 민족 이미지</div>
                        <div class="first-text">
                            <strong>대학민국 1등 배달앱</strong><br/>
                            <strong>우리는 배달의민족 입니다.</strong>

                            <p class="text">업계 최초 2,000만 다운로드 돌파<br/>월간 순 사용자수 1위<br/>(닐슨 코리안클릭 PC, 모바일 통합 2015년 10월 기준)</p>

                            <a class="down-btn">모바일앱 다운로드</a>
                        </div>
                        <div class="video">
                            <iframe width="560" height="315" src="https://www.youtube.com/embed/pLbNcnU4gkc" frameborder="0" allowfullscreen></iframe>
                        </div>
                        <div>
                            사진리뷰로 확인하고
                        </div>
                        <div>
                            다양한 결제수단으로 주문하고
                        </div>
                    </div>
                    <div class="download">
                        <p>'배달의민족'은 <br/>
                        스마트폰으로 이용하면 더 편리합니다.</p>

                        <div>
                            <a>안드로이드 다운로드</a>
                            <a>iPhone 다운로드</a>
                        </div>
                        <div>
                            <div>구글플레이 배민 다운로드</div>
                            <div>
                                <input type="text" placeholder="전화번호를 입력해주세요"><span>전송</span>
                                <ol>
                                    <li>전송된 메세지 내의 URL를 클릭하면 앱스토어로 이동합니다.</li>
                                    <li>수신한 URL로 접속 시 무선 데이터 통화료가 발생할 수 있습니다.</li>
                                </ol>
                            </div>
                        </div>

                    </div>

                </section>
                <!--서비스 소개-->
                <section></section>
            </div>
        </div>
    </div>
</div>
</template>
 
<script>
import CommonHeader from './CommonHeader'
import CommonCategory from './CommonCategory'

// console.log("====================================");
// console.log( CommonHeader );
export default {
    name : 'customer',
    components : {
        CommonHeader,
        CommonCategory,
    }
}
</script>


<style>
.customer-area h2{font-size:2.5em;font-weight:bold;}
.customer-area{width:100%;background-color:#EDE6D7;}
.customer-area>div{max-width:980px;margin:0px auto;}
.customer-area .path{height:50px;line-height:50px;}
.customer-area .container{background-color:#fff;border:1px solid #DAD3C7;}
.customer-area .container .tabs li{float:left;width:25%;text-align:center;padding:20px;border-bottom:1px solid;border-left:1px solid;border-color:#DAD3C7}
.customer-area .container .tabs li:first-child{border-left:0px;}
.customer-area .container .tabs li:after{clear:both;overflow:hidden;content:"";}

.customer-area .container .content{padding:50px 60px;}

.content .introduction .explation{margin:25px auto;width:690px;}
.content .introduction .explation .first-img{float:left;width:238px;height:238px;margin-right:50px;background-image:url(https://img.woowahan.com/www/service/img-svc00-v3.png);background-repeat:no-repeat;text-indent:-9999px;}
.content .introduction .explation .first-text strong:first-child{margin:0px;font-size:1.5em;font-weight:bold;}
.content .introduction .explation .first-text strong{display:inline-block;margin-top:10px;font-size:2em;font-weight:bold;}
.content .introduction .explation .first-text p{margin-top:15px;}
.content .introduction .explation .first-text .text{line-height:25px;}
.content .introduction .explation .first-text .down-btn{display:inline-block;width:350px;height:100px;margin-top:20px;background-color:black;color:white;font-size:20px;text-align:center;line-height:100px;border-radius:10px;}

.content .introduction .explation .video{margin-top:70px;}
.content .introduction .explation .video iframe{width:100%;margin:0px auto;height:400px;}

.content .introduction .download{width:900px;}
</style>
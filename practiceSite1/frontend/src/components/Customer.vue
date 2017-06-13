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
            <customerIntro></customerIntro>
        </div>
    </div>
</div>
</template>
 
<script>
import CommonHeader from './CommonHeader'
import CommonCategory from './CommonCategory'
import CustomerIntro from './CustomerIntro'

// console.log("====================================");
// console.log( CommonHeader );
export default {
    name : 'customer',
    components : {
        CommonHeader,
        CommonCategory,
        CustomerIntro,
    }
}
</script>


<style>
.customer-area h2{font-size:2.5em;font-weight:bold;}
.customer-area{width:100%;background-color:#EDE6D7;}
.customer-area>div{max-width:980px;margin:0px auto;}
.customer-area .path{height:50px;line-height:50px;}
.customer-area .container{padding:0px;background-color:#fff;border:1px solid #DAD3C7;}
.customer-area .container .tabs li{float:left;width:25%;text-align:center;padding:20px;border-bottom:1px solid;border-left:1px solid;border-color:#DAD3C7}
.customer-area .container .tabs li:first-child{border-left:0px;}
.customer-area .container .tabs li:after{clear:both;overflow:hidden;content:"";}

.customer-area .container .content{padding:50px 60px;}


</style>
<template>

<div>
    <div>
        <commonHeader></commonHeader>
        <commonCategory></commonCategory>
        회원가입
    </div>
</div>


</template>
 
 
<script>
import CommonHeader from './CommonHeader'
import CommonCategory from './CommonCategory'

// console.log("====================================");
// console.log( HeaderComp );
export default {
    name : 'signup',
    components : {
        CommonHeader,
        CommonCategory,
    }
}


</script>


<style>


</style>
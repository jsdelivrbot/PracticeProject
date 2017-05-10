<template>

<div>
    <div>
        <commonHeader></commonHeader>
        <commonCategory></commonCategory>
        리스트
    </div>
</div>


</template>
 
 
<script>
import CommonHeader from './CommonHeader'
import CommonCategory from './CommonCategory'

// console.log("====================================");
// console.log( HeaderComp );
export default {
    name : 'list',
    components : {
        CommonHeader,
        CommonCategory,
    }
}


</script>


<style>


</style>
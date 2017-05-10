<template>

<div>
    <header>
        <commonHeader></commonHeader>
        <commonCategory></commonCategory>
    </header>
    <mainContent></mainContent>
</div>

</template>


 
<script>
import CommonHeader from './CommonHeader'
import CommonCategory from './CommonCategory'
import MainContent from './MainContent'

// console.log("====================================");
// console.log( HeaderComp );
export default {
    name : 'main',
    components : {
        CommonHeader,
        CommonCategory,
        MainContent,
    }
}


</script>


<style>


</style>
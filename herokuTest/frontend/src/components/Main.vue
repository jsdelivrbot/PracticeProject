<template>

<header>
    <headerComp></headerComp>
    <categoryIcon></categoryIcon>
</header>

</template>


 
<script>
import HeaderComp from './HeaderComp'
import CategoryIcon from './CategoryIcon'

// console.log("====================================");
// console.log( HeaderComp );
export default {
    name : 'main',
    components : {
        HeaderComp,
        CategoryIcon,
    }
}


</script>


<style>


</style>
<template>
  <div class="test">
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <ul v-for="one in t1">
      <li>one : {{one.one}} / two : {{one.two}} / three : {{one.three}}</li>
    </ul>
    <input type="button" value="test"v-on:click="test1">
  </div>
</template>

<script>
export default {
  name: 'test',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      t1 : [
        {one: '000', two: '001', three:'002'},
        {one: '010', two: '011', three:'012'},
        {one: '020', two: '021', three:'022'},
        {one: '030', two: '031', three:'032'}
      ],
    }
  },
  methods : {
    test1:function(){alert('test');},
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>

<template>
  <div id="app">
    <FundList />
  </div>
</template>

<script>
import FundList from "./components/FundAllList";

export default {
  name: "App",
  components: {
    FundList,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

  width: 90%; 
  margin: auto;
}
.red {
  color: #f00;
}
.redBg{
  background: #f00;
  color: #fff;
}
</style>

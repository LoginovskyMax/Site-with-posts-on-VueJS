<template>
  <div class="main" v-if="show" @click="closeWindow()">
    <div class="main_inside" @click.stop>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
name: "modalWindow",
props:{show:{
type: Boolean,
default:false
}},
methods:{
    closeWindow(){
        this.$emit("update:show",false)
    }
}
}
</script>

<style scoped>
.main{
    top:0;
    right:0;
    bottom:0;
    left:0;
    position:fixed;
    background-color:rgba(0, 0, 0, 0.473) ;
    display: flex;
}
.main_inside{
    margin: auto;
    padding: 15px;
    border-radius: 15px;
    background-color: bisque;
}
</style>
<template>
  <select v-model="modelValue" @change="onChange">
    <option disabled value="">Выберите из списка</option>
    <option v-for="option in options" :key="option.value" :value="option.value">{{option.name}}</option>
  </select>
</template>

<script>
export default {
name:'mySelect',
props:['modelValue','options'],
methods:{
    onChange(event){
        this.$emit('update:modelValue',event.target.value)
    }
}
}
</script>

<style>
select{
   background-color: rgba(127, 255, 212, 0.459);
   border-radius: 10px;
   padding: 5px;
   width: 200px;
}
</style>
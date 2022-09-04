<template>
  <div class="block">
        <slot></slot>
        <div class="text"> <strong>№ {{id}} Заголовок: </strong>{{title}}</div>
        <div class="text"><strong>Содержание: </strong>{{body}}</div>
        <button type="button" @click="Redact" >Лайк: {{redact}}</button>
        <button type="button"  @click="Dislike">Дизлайк: {{dislike}}</button>
        <button type="button" class="delete_btn" @click="DeleteTwit">Удалить пост</button>
  </div>
</template>

<script>
export default {
name: "Block",
props: ["body",'title',"id"],
data(){
  return{
    redact:0,
    dislike:0
  }
},
methods:{
  Redact(){
    this.redact+=1
  },
  Dislike(){
    this.dislike+=1
  },
  DeleteTwit(){
    this.$emit("deleteTwit",this.id) 
  }
}
}
</script>


<style scoped>
.text{
  padding: 10px;
}
.block{
  padding: 30px;
  border: 2px solid green;
  border-radius: 10px;
  margin-bottom: 10px;
}
.redact{
  display: flex;
  align-items: center;
  justify-content: space-between;
}
button{
  padding: 5px 20px;
  border-radius: 10px;
  background-color: aquamarine;
  margin-right: 5px;
}
@media screen and (max-width:640px) {
  button{
    width: 120px;
  }
  .block{
  padding: 10px;
  margin-bottom: 5px;
  display: flex;
  flex-direction: column;
  gap:5px;
  align-items: center;
}
}
</style>

<template>
 <div class="main">
  <p>Создание нового поста</p>
  <input type="text" v-model="obj.title" placeholder="Заголовок" id="input" v-focus>
  <textarea ref="ta" id="ta" cols="30" rows="10" placeholder="Текст поста" v-model="obj.body" :style="styles"></textarea>
   <button type="button" @click="click">Добавить новый пост</button>
 </div>
</template>

<script>
export default {
  name: "addBlock",
  data(){
    return{
        obj:{
            id:0,
            body:'',
            title:''
        },
        styles:{
            "background-color":"white"
        }
    }
  },
  methods:{
    click(){
        if(this.obj.body==""){
           this.$refs.ta.setAttribute("placeholder","Твит не может быть пустым");
           this.styles["background-color"]="orange"
           setTimeout(()=>{
                this.$refs.ta.setAttribute("placeholder","Ваш твит");
                this.styles["background-color"]="white"
           },2000)
        }else{
          this.obj.id=Date.now()
          let newobj = Object.assign({},this.obj)
          this.$emit("ad-block",newobj)
          this.$emit("changeVisible",false)
          this.obj.body=""
          this.obj.title=""
        }
         
    }
  }
}
</script>

<style scoped>
.main{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap:10px
}
#ta{
  padding: 20px;
  border: 2px solid green;
  white-space: pre;
  min-height: 50px;
    resize: none;
}
#input{
   border: 2px solid green;
}
button{
  padding: 5px 20px;
  border-radius: 10px;
  background-color: aquamarine;
}
</style>
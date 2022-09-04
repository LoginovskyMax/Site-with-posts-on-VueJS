<template>
  <div >
    <h1>Список постов</h1>
    <div class="buttons">
           <button @click="showWindow()">Создать пост</button>
           <mySelect v-model="selectedSort"
                      :options="sortOptions"></mySelect>
           <input type="text" v-model="searchQuery" placeholder="Поиск..." v-focus>
    </div>
 
    <modalWindow v-model:show="visible">
          <addBlock @ad-block="pushTo"/>
    </modalWindow>
       
          <div v-if="searchPost.length>0">
          <transition-group name="list" appear> 
          <Block v-for="block in searchPost" :body="block.body"
                                         :title="block.title" 
                                         :id="block.id" 
                                         :key="block.id" 
                                         @deleteTwit="deleteTwit" 
                                         class="blocks"
                                         ></Block> 
          </transition-group>
          </div>
          <div v-else style="color:red;textAlign:center;padding-bottom:50px ;">
            Постов пока нет, добавьте пост
          </div>
          <div class="observer" v-intersection="[fetchMorePosts,page]"></div>
  </div>
</template>

<script>

export default {
    name: "App",
    data() {
        return {
            blocks: [],
            visible: false,
            selectedSort:'',
            searchQuery:'',
            page:0,
            totalPages:10,
            sortOptions:[{value:'title',name:'По названию'},{value:'body',name:'По описанию'},{value:'id',name:'По номеру'}]
        };
    },
    methods: {
        pushTo(data) {
            this.blocks.push(data);
            this.visible = false;
        },
        deleteTwit(id) {
            this.blocks = this.blocks.filter(block => block.id != id);
        },
        showWindow() {
            this.visible = true;
        },
        fetchMorePosts() {
          this.page+=1
            fetch(`https://jsonplaceholder.typicode.com/posts?_page=${this.page}`)
                .then(response => {return response.json()})
                .then(data => {
                this.blocks = [...this.blocks,...data]
            })
                .catch(error => console.log("Ошибка:", error));
        }
    },
    mounted() {
      // //Обсервер наблюдающий за каким либо элдементом в доме
      // //его опции
      //   const options = {
      //     rootMargin:'0px',
      //     threshold:1.0,
      //   }
      //   //колбек функция выполняемая в момент пересечени элемента, и условие при котором она срабатыает только в момент пересечения
      //   const callBack = (entries,observer)=>{
      //     if(entries[0].isIntersecting && this.page<=10){
      //             this.fetchMorePosts()
      //     }
      //   }
      //   //переменная создаваемая из класса, принимаюего функцию и опции
      //   const observer = new IntersectionObserver(callBack,options);
      //   observer.observe(this.$refs.observer)
    },
    // watch:{
    //   selectedSort(newValue){
    //     if(newValue=='id'){
    //       this.blocks.sort((post1,post2)=>{
    //       return post1[newValue]- post2[newValue]
    //     })
    //     }else{
    //          this.blocks.sort((post1,post2)=>{
    //       return post1[newValue]?.localeCompare(post2[newValue])
    //     })
    //     }
       
    //   }
    // },
    computed:{
       sortedPost(){
         if(this.selectedSort=='id'){
         return [...this.blocks].sort((post1,post2)=>{
          return post1[this.selectedSort]- post2[this.selectedSort]
        })
        }else{
           return [...this.blocks].sort((post1,post2)=>{
          return post1[this.selectedSort]?.localeCompare(post2[this.selectedSort])
        })
        }
       },
       searchPost(){
        return this.sortedPost.filter(post=>post.title.toLowerCase().includes(this.searchQuery.toLowerCase()))
       }
    }
}
</script>

<style>

.blocks{
      margin-bottom: 10px;
      transition: all 0.8s;
 }
.list-enter, .list-leave-to
{
  opacity: 0;
  transform: translateX(40px);
}
.list-move {
  transition: transform 1s;
}
button{
  padding: 5px 20px;
  border-radius: 10px;
  background-color: aquamarine;
  width: 200px;
}
.buttons{
  display: flex;
  justify-content: space-around;
  padding: 20px;
}
.pages_wrap{
  display: flex;
  gap:2px;
}
.pages{
  border:1px solid teal;
  padding:10px
}
.current_page{
   border:2px solid teal;
   background-color: rgba(0, 128, 128, 0.356);
}
.observer{
  height: 50px;
}
h1{
  text-align: center;
}
</style>

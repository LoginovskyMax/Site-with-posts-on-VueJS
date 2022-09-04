<template>
  <div >
    <h1>Список постов</h1>
    <div class="buttons">
           <button @click="showWindow()">Создать пост</button>
           <mySelect :model-value="selectedSort"
                     @update:model-value="setSelectedSort"
                      :options="sortOptions"></mySelect>
                      <button @click="update2()"></button>
           <input type="text" :modelValue="searchQuery"
                              @update:modelValue="setSearchQuery" 
                              placeholder="Поиск...">
    </div>
 
    <modalWindow v-model:show="visible">
          <addBlock @ad-block="pushTo" @changeVisible="changeVisible" />
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
            <div class="pages_wrap">
              <div v-for="pageNumber in totalPages" 
              :key="pageNumber" 
              class="pages" 
              :class="{'current_page':pageNumber==page}"
              @click="changePage(pageNumber)">{{pageNumber}}</div>
            </div>
          </div>
          <div v-else style="color:red;textAlign:center;padding-bottom:50px ;">
            Постов пока нет, добавьте пост
          </div>
  </div>
</template>

<script>
import {mapState,mapGetters,mapMutations,mapActions} from "vuex"
export default {
    name: "vuex",
    data() {
        return {
              visible: false,
        }
    },
    methods: {
     
        changeVisible(bool){
                this.visible=bool
        },
        ...mapMutations({
            setPage:'post/setPage',
            setSelectedSort:'post/setSelectedSort',
            setSearchQuery:'post/setSearchQuery',
            deleteTwit:'post/deleteTwit',
            pushTo:'post/pushTo'
        }),
        ...mapActions({
            fetchPosts:'post/fetchPosts',
            changePage:'post/changePage'
        }),
        showWindow() {
            this.visible = true;
        },
         update2(){
         this.setSearchQuery("sunt")
      }
    },
    mounted() {
     this.fetchPosts()
    },
    computed:{
        ...mapState({
        blocks:state=>state.post.blocks,
        selectedSort:state=>state.post.selectedSort,
        searchQuery:state=>state.post.searchQuery,
        page:state=>state.post.page,
        totalPages:state=>state.post.totalPages,
        sortOptions:state=>state.post.sortOptions
        }),
        ...mapGetters({
            sortedPost:'post/sortedPost',
            searchPost:'post/searchPost'
        })
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
input{
   background-color: rgba(127, 255, 212, 0.459);
   border-radius: 10px;
   padding: 5px;
   width: 185px;
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
@media screen and (max-width:640px) {
  button{
    width: 100px;
  }
  .buttons{
    flex-direction: column;
    gap:5px;
    align-items: center;
  }
}
</style>

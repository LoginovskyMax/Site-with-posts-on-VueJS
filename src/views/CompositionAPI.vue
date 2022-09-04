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
          <addBlock @ad-block="pushTo" @changeVisible="changeVisible"/>
    </modalWindow>
       
          <div v-if="sortedAndSearchPosts.length>0">
          <transition-group name="list" appear> 
          <Block v-for="block in sortedAndSearchPosts" :body="block.body"
                                         :title="block.title" 
                                         :id="block.id" 
                                         :key="block.id" 
                                         @deleteTwit="deleteTwit" 
                                         class="blocks"
                                         ></Block> 
          </transition-group>
          </div>
          <div v-else style="color:red;textAlign:center;padding-bottom:50px;">
            Постов пока нет, добавьте пост
          </div>
          <div class="observer" v-intersection="[fetching,page]"></div>
  </div>
</template>

<script>
// import { ref } from 'vue';
import UsePost from '@/hooks/UsePost'
import useSortedPosts from '@/hooks/useSortedPosts'
import useSortedAndFindPosts from '@/hooks/useSortedAndFindPosts'
import addBlock from '@/hooks/addBlock'
export default {
    name: "App",
    data() {
        return {
            visible: false,
            sortOptions:[{value:'title',name:'По названию'},{value:'body',name:'По описанию'},{value:'id',name:'По номеру'}]
        };
    },
    methods: {
        showWindow() {
            this.visible = true;
        },
        changeVisible(bool){
                this.visible=bool
        },
    },
    setup(props){
        const {blocks,page,fetching} = UsePost();
        const {sortedPosts,selectedSort} = useSortedPosts(blocks)
        const {searchQuery,sortedAndSearchPosts} = useSortedAndFindPosts(sortedPosts)
        const {deleteTwit,pushTo} = addBlock(blocks)
        return{
         blocks,
         page,
         fetching,
         pushTo,
         deleteTwit,
         sortedPosts,
         selectedSort,
         searchQuery,
         sortedAndSearchPosts
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

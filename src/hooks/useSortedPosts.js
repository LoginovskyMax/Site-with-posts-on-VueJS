import { ref,computed } from "vue"
export default function useSortePosts(blocks){
    let selectedSort = ref('');
    let sortedPosts = computed (()=>{
        if(selectedSort.value=='id'){
            return [...blocks.value].sort((post1,post2)=>{
             return post1[selectedSort.value]- post2[selectedSort.value]
           })
           }else{
              return [...blocks.value].sort((post1,post2)=>{
             return post1[selectedSort.value]?.localeCompare(post2[selectedSort.value])
           })
           }
    })
    return{
        selectedSort,sortedPosts
    }
}
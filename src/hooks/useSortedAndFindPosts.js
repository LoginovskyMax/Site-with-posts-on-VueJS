import { ref,computed } from "vue"
export default function useSortedAndFindPosts(sortedPosts){
    let searchQuery = ref('');
    let sortedAndSearchPosts = computed (()=>{
        return sortedPosts.value.filter(post=>post.title.toLowerCase().includes(searchQuery.value.toLowerCase()))
    })
    return{
        searchQuery,sortedAndSearchPosts
    }

}
export const PostModule = {
    state:()=>({
        blocks:[],
        selectedSort:'',
        searchQuery:'',
        page:1,
        totalPages:10,
        sortOptions:[{value:'title',name:'По названию'},{value:'body',name:'По описанию'},
        {value:'id',name:'По номеру'}]
    }),
    getters:{
        sortedPost(state){
            if(state.selectedSort=='id'){
            return [...state.blocks].sort((post1,post2)=>{
             return post1[state.selectedSort]- post2[state.selectedSort]
           })
           }else{
              return [...state.blocks].sort((post1,post2)=>{
             return post1[state.selectedSort]?.localeCompare(post2[state.selectedSort])
           })
           }
          },
          searchPost(state,getters){
            console.log(state.searchQuery)
           return getters.sortedPost.filter(post=>post.title.toLowerCase().includes(state.searchQuery.toLowerCase()))
          }
    },
    mutations:{
        pushTo(state,data) {
            state.blocks.push(data);
        },
        deleteTwit(state,id) {
            state.blocks = state.blocks.filter(block => block.id != id);
        },
      setBlock(state,blocks){
        state.blocks = blocks
      },
      setPage(state,page){
        state.page = page
      },
      setSelectedSort(state,selectedSort){
        state.selectedSort = selectedSort
      },
      setSearchQuery(state,searchQuery){
        state.searchQuery = searchQuery
      },
    setTotalPages(state,totalPages){
        state.totalPages=totalPages
    }
    },
    actions:{
        async fetchPosts({state}) {
            fetch(`https://jsonplaceholder.typicode.com/posts?_page=${state.page}`)
                .then(response => {return response.json()})
                .then(data => {
                    state.blocks = [...data]
            })
                .catch(error => console.log("Ошибка:", error));
        },
        changePage({state,dispatch},pageNumber){
          state.page=pageNumber
          dispatch('fetchPosts')
        }
    },
    namespaced:true
}
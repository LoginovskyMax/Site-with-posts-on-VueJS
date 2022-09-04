import { ref } from "vue";

export default function UsePost(){
        let blocks = ref([]);
        let page = ref(0);
        let fetching = ()=>{
            page.value +=1
            fetch(`https://jsonplaceholder.typicode.com/posts?_page=${page.value}`)
                .then(response => {return response.json()})
                .then(data => {
                blocks.value = [...blocks.value,...data]
            })
                .catch(error => console.log("Ошибка:", error));
        }
            return{
                blocks,page,fetching
            }
        
       
      
}
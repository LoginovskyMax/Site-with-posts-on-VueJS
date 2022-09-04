import { ref } from "vue";
export default function AddBlock(blocks){
    let pushTo= (data) =>{
        blocks.value.push(data);
    }
    let deleteTwit=(id) =>{
        blocks.value = blocks.value.filter(block => block.id != id);
    }
    return{
        pushTo,deleteTwit
    }
}
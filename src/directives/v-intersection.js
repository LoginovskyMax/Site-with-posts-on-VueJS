export default{
    mounted(el,binding){
        //Обсервер наблюдающий за каким либо элдементом в доме
      //его опции
      const options = {
        rootMargin:'0px',
        threshold:1.0,
      }
      //колбек функция выполняемая в момент пересечени элемента, и условие при котором она срабатыает только в момент пересечения
      const callBack = (entries,observer)=>{
        if(entries[0].isIntersecting && binding.value[1]<=10){
              binding.value[0]()
        }
      }
      //переменная создаваемая из класса, принимаюего функцию и опции
      const observer = new IntersectionObserver(callBack,options);
      observer.observe(el)
        },
        name:'intersection'
}

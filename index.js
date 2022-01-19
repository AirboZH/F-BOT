import { getPage } from "./query.js";

for(let i = 0;i<250;i+=25){
    setTimeout(()=>{
        getPage(i);
        console.log('延迟请求防止封ip')
        console.log(`第${(i/25+1)}次请求`)
    },(i/25)*2500)
}
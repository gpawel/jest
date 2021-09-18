console.log("Hello World!!")
import { Config } from './config/Config'; 
let con = Config.getContext();
con.showOptions();
//con.showOptions();
//let opt = con.getOptions();
//console.log(opt);
//console.log(opt.browser);


//console.log("time:", con.timestmp);

//setTimeout(() => {  let con1 = Context.getContext(); console.log("time:", con1.timestmp);; }, 5000);
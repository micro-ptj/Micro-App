import{_ as e,j as t,p as l,k as a,o,c as s,w as i,a as r,q as u,t as n,b as d,y as c,u as f,z as p,J as _,L as m,i as y,A as h,d as g,G as b,D as v,r as k,ao as w,K as x,ap as z,M as S,f as C,n as I,l as j,m as L,aq as $}from"./index.d4fd57a9.js";import{_ as B}from"./u-empty.f913144f.js";import{_ as N}from"./u-image.431b9d49.js";import{_ as T}from"./u-button.68d3804d.js";import{_ as V}from"./u-popup.1e1348c5.js";var q=e({emits:["click"],name:"u-section",props:{title:{type:String,default:""},subTitle:{type:String,default:"更多"},right:{type:Boolean,default:!0},fontSize:{type:[Number,String],default:28},bold:{type:Boolean,default:!0},color:{type:String,default:"#303133"},subColor:{type:String,default:"#909399"},showLine:{type:Boolean,default:!0},lineColor:{type:String,default:""},arrow:{type:Boolean,default:!0}},computed:{lineStyle(){return{left:-.9*Number(this.fontSize)+"rpx",top:-Number(this.fontSize)*("ios"==this.$u.os()?.14:.15)+"rpx"}}},methods:{rightClick(){this.$emit("click")}}},[["render",function(e,g,b,v,k,w){const x=t(a("u-icon"),l),z=y,S=h;return o(),s(z,{class:"u-section"},{default:i((()=>[r(z,{class:f(["u-section__title",{"u-section--line":b.showLine}]),style:u({fontWeight:b.bold?"bold":"normal",color:b.color,fontSize:b.fontSize+"rpx",paddingLeft:b.showLine?.7*b.fontSize+"rpx":0})},{default:i((()=>[b.showLine?(o(),s(z,{key:0,class:"u-section__title__icon-wrap u-flex",style:u([w.lineStyle])},{default:i((()=>[r(x,{top:"0",name:"column-line",size:1.25*b.fontSize,bold:"",color:b.lineColor?b.lineColor:b.color},null,8,["size","color"])])),_:1},8,["style"])):n("",!0),r(S,{class:"u-flex u-section__title__text"},{default:i((()=>[d(c(b.title),1)])),_:1})])),_:1},8,["style","class"]),b.right||e.$slots.right?(o(),s(z,{key:0,class:"u-section__right-info",style:u({color:b.subColor}),onClick:w.rightClick},{default:i((()=>[e.$slots.right?p(e.$slots,"right",{key:0},void 0,!0):(o(),_(m,{key:1},[d(c(b.subTitle)+" ",1),b.arrow?(o(),s(z,{key:0,class:"u-section__right-info__icon-arrow u-flex"},{default:i((()=>[r(x,{name:"arrow-right",size:"24",color:b.subColor},null,8,["color"])])),_:1})):n("",!0)],64))])),_:3},8,["style","onClick"])):n("",!0)])),_:3})}],["__scopeId","data-v-077c610c"]]);var D=e(g({__name:"order",setup(e){b((()=>{A()}));const u=v(!1),f=v(!1),p=k({pageNum:1,pageSize:15}),h=k({address:{}}),g=k({orderId:"",addressId:""}),D=v(),A=()=>{w(p).then((e=>{0!=e.rows.length&&(f.value=!1,D.value=e.rows)}))},G=e=>{u.value=!0,$().then((e=>{h.address=e.data,g.addressId=h.address.id})),g.orderId=e},J=()=>{console.log(g),z(g).then((e=>{u.value=!1,A()}))};return(e,p)=>{const g=t(a("u-empty"),B),b=y,v=t(a("u-col"),j),k=S("DictTag"),w=t(a("u-row"),L),z=t(a("u-image"),N),$=t(a("u-button"),T),A=t(a("u-section"),q),K=t(a("u-icon"),l),M=t(a("u-popup"),V);return o(),s(b,null,{default:i((()=>[f.value?(o(),s(b,{key:0},{default:i((()=>[r(g,{mode:"list",icon:"https://cdn.uviewui.com/uview/demo/empty/list.png"})])),_:1})):n("",!0),(o(!0),_(m,null,x(D.value,((e,t)=>(o(),s(b,{class:"order-box"},{default:i((()=>[r(b,{onClick:t=>{return l=e.id,void I({url:"/pages/order/contentInfo?id="+l+"&type=micro_order"});var l}},{default:i((()=>[r(w,null,{default:i((()=>[r(v,{span:"6",style:{"font-size":"medium","font-weight":"550"}},{default:i((()=>[d(c(e.name),1)])),_:2},1024),r(v,{span:"3",offset:"3"},{default:i((()=>[r(k,{type:"micro_order_status",value:e.status},null,8,["value"])])),_:2},1024)])),_:2},1024),r(w,null,{default:i((()=>[r(v,{span:"2"},{default:i((()=>{return[r(z,{"border-radius":"10rpx",width:"110rpx",height:"110rpx",src:(t=e.image,C.base_url+t)},null,8,["src"])];var t})),_:2},1024),r(v,{span:"9"},{default:i((()=>[r(w,{style:{color:"#ccc"}},{default:i((()=>[d(c(e.amount),1)])),_:2},1024),r(w,{style:{color:"#ccc"}},{default:i((()=>[d(c(e.orderTime),1)])),_:2},1024),r(w,null,{default:i((()=>[0==e.status?(o(),s(b,{key:0},{default:i((()=>[r($,{type:"error",size:"mini",plain:"",onClick:t=>G(e.id)},{default:i((()=>[d("提货")])),_:2},1032,["onClick"])])),_:2},1024)):n("",!0)])),_:2},1024)])),_:2},1024)])),_:2},1024)])),_:2},1032,["onClick"])])),_:2},1024)))),256)),r(M,{modelValue:u.value,"onUpdate:modelValue":p[0]||(p[0]=e=>u.value=e),mode:"bottom",width:"100%",height:"300px"},{default:i((()=>[r(b,{style:{margin:"20rpx"}},{default:i((()=>[r(A,{title:"地址","sub-title":"默认"})])),_:1}),r(b,{class:"address-box"},{default:i((()=>[r(b,null,{default:i((()=>[r(K,{label:"姓名:",size:"30",name:"account-fill"}),d(c(h.address.name),1)])),_:1}),r(b,null,{default:i((()=>[r(K,{label:"电话:",size:"30",name:"phone-fill"}),d(c(h.address.phone),1)])),_:1}),r(b,null,{default:i((()=>[r(K,{label:"地址:",size:"30",name:"map-fill"}),d(c(h.address.address),1)])),_:1})])),_:1}),r($,{style:{position:"fixed",bottom:"0",width:"100%"},onClick:J,type:"error"},{default:i((()=>[d("确定")])),_:1})])),_:1},8,["modelValue"])])),_:1})}}}),[["__scopeId","data-v-56c9e3e2"]]);export{D as default};

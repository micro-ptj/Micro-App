import{_ as a}from"./u-empty.b2ed54df.js";import{_ as e,d as s,A as t,B as u,r as l,C as o,o as d,c as n,w as r,a as i,m,D as f,E as p,F as _,j as c,k as g,i as v,G as b,b as w,u as h,f as x}from"./index.c7325688.js";import{_ as y,a as j,b as k}from"./u-image.fe1d4026.js";var z=e(s({__name:"bid",setup(e){const s=t(!1);u((()=>{I()})),l({amount:"",goodsId:"",secret:"",weiValue:0});const z=t(),D=l({pageNum:1,pageSize:10}),I=()=>{o(D).then((a=>{console.log(a),0!=a.rows.length&&(s.value=!1,z.value=a.rows)}))};return(e,t)=>{const u=c(g("u-empty"),a),l=v,o=c(g("u-col"),y),D=b("DictTag"),I=c(g("u-row"),j),T=c(g("u-image"),k);return d(),n(l,null,{default:r((()=>[s.value?(d(),n(l,{key:0},{default:r((()=>[i(u,{mode:"list",icon:"https://cdn.uviewui.com/uview/demo/empty/list.png"})])),_:1})):m("",!0),(d(!0),f(_,null,p(z.value,((a,e)=>(d(),n(l,{class:"bid-box"},{default:r((()=>[i(I,null,{default:r((()=>[i(o,{span:"6",style:{"font-size":"medium","font-weight":"600"}},{default:r((()=>[w(h(a.name),1)])),_:2},1024),i(o,{span:"3",offset:"3"},{default:r((()=>[i(D,{type:"micro_bid_status",value:a.status},null,8,["value"])])),_:2},1024)])),_:2},1024),i(I,null,{default:r((()=>[i(o,{span:"2"},{default:r((()=>{return[i(T,{"border-radius":"10rpx",width:"110rpx",height:"110rpx",src:(e=a.image,x.base_url+e)},null,8,["src"])];var e})),_:2},1024),i(o,{span:"9"},{default:r((()=>[i(I,null,{default:r((()=>[w(h(a.amount),1)])),_:2},1024),i(I,null,{default:r((()=>[w(h(a.bidTime),1)])),_:2},1024)])),_:2},1024)])),_:2},1024)])),_:2},1024)))),256))])),_:1})}}}),[["__scopeId","data-v-2e68f68f"]]);export{z as default};
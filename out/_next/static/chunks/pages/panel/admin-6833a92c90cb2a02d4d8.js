(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[81],{5311:function(e,n,t){"use strict";t.r(n),t.d(n,{default:function(){return Y}});var i=t(6265),r=t(5893),o=t(6010),a=t(1120),s=t(2112),c=t(5258),l=t(8358),d=t(2822),h=t(2318),u=t(5517),p=t(1749),g=t(998),f=t(5757),x=t(7294),m=t(1049),j=t(9983),b=t(8274),y=t(9227),Z=t(4670),w=t(7623),v=t(2302),O=t(9613),k=t(8222),C=t(6847),P=t(3750),S=t(7394),N=t(9895),D=t(4096),E=t(276),T=t(1267),_=t(9992),U=t(282),W=t(1738),z=t(5946),A=t(3989),B=t(3431),I=t(381),R=t.n(I);function H(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);n&&(i=i.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,i)}return t}var M=(0,Z.Z)({root:{borderBottom:"1px solid #e8e8e8",display:"flex"},indicator:{backgroundColor:"#1890ff"}})(D.Z),X=(0,Z.Z)((function(e){return(0,w.Z)({root:{textTransform:"none",minWidth:72,fontWeight:e.typography.fontWeightRegular,marginRight:e.spacing(4),fontFamily:["-apple-system"].join(","),"&:hover":{color:"#40a9ff",opacity:1},"&$selected":{color:"#1890ff",fontWeight:e.typography.fontWeightMedium},"&:focus":{color:"#40a9ff"}},selected:{}})}))((function(e){return(0,r.jsx)(E.Z,function(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?H(Object(t),!0).forEach((function(n){(0,i.Z)(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):H(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}({disableRipple:!0},e))})),G=(0,a.Z)((function(e){return{root:{display:"flex",height:"100%",padding:"2rem"},padding:{padding:e.spacing(3)},demo1:{backgroundColor:e.palette.background.paper,width:"100%",maxWidth:"100%",minWidth:"100%",height:"100%",minHeight:"70vh",maxHeight:"70vh"},demo2:{backgroundColor:"#2e1534"},table:{}}})),F=(0,Z.Z)((function(e){return(0,w.Z)({head:{backgroundColor:e.palette.common.black,color:e.palette.common.white},body:{fontSize:14}})}))(k.Z),L=(0,Z.Z)((function(e){return(0,w.Z)({root:{"&:nth-of-type(odd)":{backgroundColor:e.palette.action.hover}}})}))(S.Z),$=function(){var e=G(),n=(0,x.useState)(j.Z3),t=n[0],i=n[1],o=(0,x.useContext)(B.ZP),a=o.childrens,s=o.getUserChildrens,c=o.suspendUser,l=o.deleteUser,d=o.selectUser,h=o.selectedUser;(0,x.useEffect)((function(){s()}),[]);var u=a.users,p=(0,x.useState)(5),g=p[0],f=p[1],m=x.useState(0),b=(0,y.Z)(m,2),Z=b[0],w=b[1],k=(0,x.useState)(!1),D=k[0],E=k[1],I=(0,x.useState)(!1),H=I[0],$=I[1],q=(0,x.useState)(!1),J=q[0],K=q[1],Q=(0,x.useState)(!1),V=Q[0],Y=Q[1],ee=function(){E(!0)},ne=function(){K(!J)},te=function(){Y(!V)};return(0,r.jsxs)("div",{className:e.root,children:[D&&(0,r.jsx)(W.Z,{type:1,isOpen:D,handleClose:function(){E(!1)},handleOpen:ee}),(0,r.jsx)(z.Z,{isOpen:H,handleClose:function(){$(!1)}}),(0,r.jsx)(A.Z,{isOpen:J,handleClose:ne,handleOk:function(){l(),ne()},okText:"Sure",cancelText:"Cancel",title:"Delete User",subtitle:"Are you sure you want to delete ".concat(h?"to "+h.name+"?":"this user?")}),(0,r.jsx)(A.Z,{isOpen:V,handleClose:te,handleOk:function(){c(),te()},okText:"Sure",cancelText:"Cancel",title:"Suspend User",subtitle:"Are you sure you want to ".concat(h.isActive?"suspend":"activate","  ").concat(h?"to "+h.name+"?":"this user?")}),(0,r.jsxs)("div",{className:e.demo1,children:[(0,r.jsxs)(M,{value:t,onChange:function(e,n){i(n)},"aria-label":"ant example",children:[(0,r.jsx)(X,{label:"Companies"}),(0,r.jsx)(U.Z,{style:{height:"80%",margin:"auto"},onClick:ee,variant:"contained",color:"primary",children:"New guest"})]}),(0,r.jsx)(C.Z,{component:N.Z,children:(0,r.jsxs)(v.Z,{className:e.table,"aria-label":"customized table",children:[(0,r.jsx)(P.Z,{children:(0,r.jsxs)(S.Z,{children:[(0,r.jsx)(F,{align:"center",children:"Name"}),(0,r.jsx)(F,{align:"center",children:"Email"}),(0,r.jsx)(F,{align:"center",children:"Registration Date"}),(0,r.jsx)(F,{align:"center",children:"Edit"}),(0,r.jsx)(F,{align:"center",children:"Suspend"}),(0,r.jsx)(F,{align:"center",children:"Delete"})]})}),(0,r.jsx)(O.Z,{children:u.map((function(e){return(0,r.jsxs)(L,{children:[(0,r.jsx)(F,{align:"center",component:"th",scope:"user",children:e.name}),(0,r.jsx)(F,{align:"center",children:e.email}),(0,r.jsx)(F,{align:"center",children:R()(e.lastSuscription.finishedAt).from(R()())}),(0,r.jsx)(F,{align:"right",children:(0,r.jsx)(T.Z,{size:"small",label:"Edit",clickable:!0,onClick:function(){$(!0)},color:"primary"})}),(0,r.jsxs)(F,{align:"right",children:[" ",(0,r.jsx)(T.Z,{size:"small",label:"".concat(e.isActive?"suspend":"activate"),clickable:!0,onClick:function(){return n=e,Y(!0),void d(n,j.nb.GUEST);var n},color:"primary"})]}),(0,r.jsxs)(F,{align:"right",children:[" ",(0,r.jsx)(T.Z,{size:"small",label:"Delete",onClick:function(){return n=e,ne(),void d(n,j.nb.GUEST);var n},clickable:!0,color:"secondary"})," "]})]},e.name)}))}),(0,r.jsx)(_.Z,{rowsPerPageOptions:[5,10,25],count:u.length,rowsPerPage:g,page:Z,onChangePage:function(e,n){w(n)},onChangeRowsPerPage:function(e){f(parseInt(e.target.value,10)),w(0)}})]})})]})]})},q=t(9029),J=t(7067);function K(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);n&&(i=i.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,i)}return t}function Q(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?K(Object(t),!0).forEach((function(n){(0,i.Z)(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):K(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}var V=(0,a.Z)((function(e){var n;return{root:{display:"flex",height:"100vh",overflow:"hidden"},inner:{display:"flex",paddingTop:"4.1rem",height:"100%",width:"100%"},toolbar:{paddingRight:24},toolbarIcon:Q({display:"flex",alignItems:"center",justifyContent:"flex-end",padding:"0 8px"},e.mixins.toolbar),appBar:{zIndex:e.zIndex.drawer+1,transition:e.transitions.create(["width","margin"],{easing:e.transitions.easing.sharp,duration:e.transitions.duration.leavingScreen})},appBarShift:{marginLeft:240,width:"calc(100% - ".concat(240,"px)"),transition:e.transitions.create(["width","margin"],{easing:e.transitions.easing.sharp,duration:e.transitions.duration.enteringScreen})},menuButton:{marginRight:36},menuButtonHidden:{display:"none"},title:{flexGrow:1},link:{color:"white",fontWeight:"bold"},drawerPaper:{position:"static",width:240,height:"100%",justifyContent:"space-between",backgroundColor:j.DM.gray},drawerPaperClose:(n={overflowX:"hidden",transition:e.transitions.create("width",{easing:e.transitions.easing.sharp,duration:e.transitions.duration.leavingScreen}),width:e.spacing(0)},(0,i.Z)(n,e.breakpoints.up("sm"),{width:e.spacing(0)}),(0,i.Z)(n,e.breakpoints.up("lg"),{width:e.spacing(9)}),n),appBarSpacer:e.mixins.toolbar,content:{height:"100%",display:"flex",flexDirection:"column",overflow:"auto",overflowX:"hidden",width:"100%",backgroundColor:j.DM.gray},container:{paddingTop:e.spacing(4),paddingBottom:e.spacing(4),height:"100%"},paper:{padding:e.spacing(2),display:"flex",overflowX:"hidden",overflow:"auto",flexDirection:"column"},fixedHeight:{height:"100%"},innerCard:{height:"100vh"}}})),Y=function(){var e=V(),n=(0,x.useState)(!0),t=(n[0],n[1],(0,o.Z)(e.paper,e.fixedHeight),(0,x.useState)(0)),i=t[0],a=t[1];return(0,r.jsx)("div",{className:e.root,children:(0,r.jsxs)("div",{className:e.inner,children:[(0,r.jsx)(c.Z,{style:{backgroundColor:j.DM.gray},children:(0,r.jsx)(l.Z,{className:e.toolbar,children:(0,r.jsx)(h.Z,{component:"h1",variant:"h6",color:"inherit",noWrap:!0,className:e.title,children:"OCUPATH"})})}),(0,r.jsxs)(s.ZP,{variant:"permanent",classes:{paper:e.drawerPaper},children:[(0,r.jsx)(d.Z,{children:(0,r.jsxs)("div",{children:[(0,r.jsx)(g.Z,{button:!0,selected:0===i,onClick:function(){a(0)},children:(0,r.jsx)(f.Z,{className:e.link,primary:"Profile"})}),(0,r.jsx)(g.Z,{button:!0,selected:2===i,onClick:function(){a(2)},children:(0,r.jsx)(f.Z,{className:e.link,primary:"Files"})}),(0,r.jsx)(g.Z,{button:!0,className:e.link,selected:1===i,onClick:function(){a(1)},children:(0,r.jsx)(f.Z,{primary:"User"})})]})}),(0,r.jsx)(u.Z,{}),(0,r.jsx)(d.Z,{children:m.e})]}),(0,r.jsx)("main",{className:e.content,children:(0,r.jsxs)(p.Z,{justify:"center",alignItems:"center",direction:"row",container:!0,style:{height:"85%"},children:[(0,r.jsx)(p.Z,{item:!0,xs:12,md:11,lg:11,justify:"center",style:{marginTop:J.Z.spacing(3),height:"8%"},children:(0,r.jsx)(h.Z,{style:{fontWeight:"bold",color:"white"},component:"h1",variant:"h4",children:"Profile"})}),(0,r.jsxs)(p.Z,{item:!0,xs:12,md:11,lg:11,style:{height:"100%"},children:[0===i&&(0,r.jsx)(b.Z,{type:j.nb.ADMIN}),2===i&&(0,r.jsx)(q.Z,{}),1===i&&(0,r.jsx)($,{})]})]})})]})})}},6446:function(e,n,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/panel/admin",function(){return t(5311)}])}},function(e){e.O(0,[885,544,282,253,325,584,390,972,576,608,480,774,888,179],(function(){return n=6446,e(e.s=n);var n}));var n=e.O();_N_E=n}]);
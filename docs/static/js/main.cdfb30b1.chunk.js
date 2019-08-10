(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{62:function(e,t,n){e.exports=n(84)},84:function(e,t,n){"use strict";n.r(t);var r=n(1),a=n.n(r),c=n(24),o=n.n(c),u=n(35),s=n(20),l=n(85),i=n(86),d=n(87),m=n(111),p=n(88),f=n(89),b=n(90),v=n(17),h=function(e){try{var t=e.split("."),n=JSON.parse(atob(t[1]));return{expireTimeSecond:n.expire_time_second,userId:n.user_id,token:e}}catch(r){return void console.error(r)}},E=function(e){return e.expireTimeSecond>Date.now()/1e3},k=Object(v.b)(function(e){return{token:e.token}},function(e){return{}})(function(e){return r.createElement(l.a,{color:"light",light:!0,expand:"md"},r.createElement(i.a,{tag:u.b,to:"/"},"Problem Pool"),r.createElement(d.a,{className:"ml-auto",navbar:!0},r.createElement(m.a,{nav:!0,inNavbar:!0},r.createElement(p.a,{nav:!0,caret:!0},e.token&&E(e.token)?e.token.userId:"Settings"),r.createElement(f.a,{right:!0},e.token&&E(e.token)?null:r.createElement(b.a,{tag:u.b,to:"./login"},"Login"),r.createElement(b.a,{tag:u.b,to:"./settings"},"User IDs"))),r.createElement(m.a,{nav:!0,inNavbar:!0},r.createElement(p.a,{nav:!0,caret:!0},"Links"),r.createElement(f.a,{right:!0},r.createElement(b.a,{href:"https://github.com/kenkoooo/problem-pool",target:"_blank"},"GitHub"),r.createElement(b.a,{href:"https://onlinejudge.u-aizu.ac.jp/",target:"_blank"},"AOJ"),r.createElement(b.a,{href:"https://atcoder.jp/",target:"_blank"},"AtCoder"),r.createElement(b.a,{href:"https://codeforces.com/",target:"_blank"},"Codeforces"),r.createElement(b.a,{href:"https://yukicoder.me/",target:"_blank"},"yukicoder")))))}),g=n(109),j=n(26),O=n(27),y=n(29),x=n(28),w=n(30),S=n(91),I=n(92),C=n(93),T=n(94),A=n(60),R="SAVE_USER_IDS",D=function(e){function t(e){var n;return Object(j.a)(this,t),(n=Object(y.a)(this,Object(x.a)(t).call(this,e))).state={atcoder:e.userIds.atcoder,yukicoder:e.userIds.yukicoder,codeforces:e.userIds.codeforces,aoj:e.userIds.aoj},n}return Object(w.a)(t,e),Object(O.a)(t,[{key:"render",value:function(){var e=this,t=this.state,n=t.atcoder,a=t.codeforces,c=t.yukicoder,o=t.aoj,u=n===this.props.userIds.atcoder&&a===this.props.userIds.codeforces&&c===this.props.userIds.yukicoder&&o===this.props.userIds.aoj;return r.createElement("div",null,r.createElement(S.a,null,r.createElement(I.a,null,r.createElement(C.a,null,"AtCoder ID"),r.createElement(T.a,{onChange:function(t){return e.setState({atcoder:t.target.value})},type:"text",placeholder:"AtCoder ID",value:n}))),r.createElement(S.a,null,r.createElement(I.a,null,r.createElement(C.a,null,"AOJ ID"),r.createElement(T.a,{onChange:function(t){return e.setState({aoj:t.target.value})},type:"text",placeholder:"AOJ ID",value:o}))),r.createElement(S.a,null,r.createElement(I.a,null,r.createElement(C.a,null,"yukicoder ID"),r.createElement(T.a,{onChange:function(t){return e.setState({yukicoder:t.target.value})},type:"text",placeholder:"yukicoder ID",value:c}))),r.createElement(S.a,null,r.createElement(I.a,null,r.createElement(C.a,null,"Codeforces ID"),r.createElement(T.a,{onChange:function(t){return e.setState({codeforces:t.target.value})},type:"text",placeholder:"Codeforces ID",value:a}))),r.createElement(S.a,null,u?r.createElement(A.a,{disabled:!0},"Saved"):r.createElement(A.a,{color:"danger",onClick:function(){return e.props.save({atcoder:n,codeforces:a,yukicoder:c,aoj:o})}},"Save")))}}]),t}(r.Component),_=Object(v.b)(function(e){return{userIds:e.userIds}},function(e){return{save:function(t){return e(function(e){return{type:R,userIds:e}}(t))}}})(D),N=n(104),M=n(95),U=n(96),L=n(98),J=n(97),B=n(99),K=n(100),V=n(110),z=n(101),F=n(102),P=n(103),G=function(e){var t=new Date(1e3*e),n=t.getFullYear(),r=("0"+(t.getMonth()+1)).slice(-2),a=("0"+t.getDate()).slice(-2);return"".concat(n,"-").concat(r,"-").concat(a)},H=function(e){return 24*e*3600},q=function(e){var t=parseInt(e.slice(0,4)),n=parseInt(e.slice(5,7)),r=parseInt(e.slice(8,10)),a=new Date;return a.setFullYear(t),a.setMonth(n-1),a.setDate(r),a.getTime()/1e3},Y=function(e){function t(e){var n;return Object(j.a)(this,t),(n=Object(y.a)(this,Object(x.a)(t).call(this,e))).state={modalSolvedDate:null,modalReviewDate:null,isModalOpen:!1,modalType:"Remove"},n}return Object(w.a)(t,e),Object(O.a)(t,[{key:"render",value:function(){var e=this,t=this.state,n=t.isModalOpen,a=t.modalType,c=t.modalSolvedDate,o=t.modalReviewDate,u=Date.now()/1e3,s=this.props,l=s.title,i=s.url,d=s.taskKey,m=s.lastJudgeAccepted,p=s.lastSolvedByUser,f=s.nextReviewTime,b=s.judge,v="Remove"!==a?function(e,t){var n=Date.now()/1e3,r=e?n-e:0;switch(t){case"Solved":return Math.max(2*r,H(4))+n;case"Good":return Math.max(r,H(4))+n;case"Hard":return Math.max(r/2,H(4))+n;case"Failed":return H(4)+n}}(p,a):-1,h=null!==c?c:G(u),E=null!==o?o:G(v),k=G(u)>=G(f);return r.createElement(M.a,null,r.createElement(U.a,null,r.createElement(J.a,null,l&&i&&b?r.createElement("div",null,r.createElement(L.a,null,b)," ",r.createElement("a",{href:i,target:"_blank"},l)):d),r.createElement(B.a,null,r.createElement("tbody",null,r.createElement("tr",null,r.createElement("th",{scope:"row"},"Next review"),k?r.createElement("td",{style:{color:"red"}},r.createElement("strong",null," ",G(f))):r.createElement("td",null,G(f))),void 0!==p?r.createElement("tr",null,r.createElement("th",{scope:"row"},"Last solved"),r.createElement("td",null,G(p))):null,void 0!==m?r.createElement("tr",null,r.createElement("th",{scope:"row"},"Last accepted"),r.createElement("td",null,G(m))):null)),r.createElement(K.a,{className:"d-flex justify-content-end"},r.createElement(A.a,{key:"solved",color:"success",onClick:function(){return e.setState({isModalOpen:!0,modalType:"Solved"})}},"Solved"),r.createElement(A.a,{key:"good",onClick:function(){return e.setState({isModalOpen:!0,modalType:"Good"})}},"Good"),r.createElement(A.a,{key:"hard",color:"warning",onClick:function(){return e.setState({isModalOpen:!0,modalType:"Hard"})}},"Hard"),r.createElement(A.a,{key:"failed",color:"danger",onClick:function(){return e.setState({isModalOpen:!0,modalType:"Failed"})}},"Failed"),r.createElement(A.a,{key:"remove",color:"dark",onClick:function(){return e.setState({isModalOpen:!0,modalType:"Remove"})}},"Remove")),r.createElement(V.a,{isOpen:n,toggle:function(){return e.setState({isModalOpen:!n})}},"Remove"===a?r.createElement("div",null,r.createElement(z.a,null,"Remove this card?"),r.createElement(F.a,null,l||d),r.createElement(P.a,null,r.createElement(A.a,{onClick:function(){e.setState({isModalOpen:!1}),e.props.remove()}},"Remove"),r.createElement(A.a,{onClick:function(){return e.setState({isModalOpen:!1})}},"Cancel"))):r.createElement("div",null,r.createElement(z.a,null,"Next review will be ..."),r.createElement(F.a,null,r.createElement(I.a,null,r.createElement(C.a,null,"Solved:"),r.createElement(T.a,{type:"date",value:h,onChange:function(t){return e.setState({modalSolvedDate:t.target.value})}})),r.createElement(C.a,null,"Next Review:"),r.createElement(T.a,{type:"date",value:E,onChange:function(t){return e.setState({modalReviewDate:t.target.value})}})),r.createElement(P.a,null,r.createElement(A.a,{onClick:function(){e.setState({isModalOpen:!1});var t=q(h),n=q(E);e.props.review(t,n)}},"Submit"),r.createElement(A.a,{onClick:function(){return e.setState({isModalOpen:!1})}},"Cancel"))))))}}]),t}(r.Component),Q="CREATE_TASK",W="DELETE_TASK",X="UPDATE_TASK",Z=Object(v.b)(function(e){return{tasks:e.tasks,submissions:e.submissions,problems:e.problems}},function(e){return{remove:function(t){return e(function(e){return{type:W,key:e}}(t))},solve:function(t,n,r){return e(function(e,t,n){return{type:X,key:e,solvedSecond:t,nextReviewSecond:n}}(t,n,r))}}})(function(e){return r.createElement("div",null,e.tasks.valueSeq().sort(function(e,t){return e.nextReviewTime-t.nextReviewTime}).map(function(t){var n=t.validUrl?e.problems.get(t.validUrl):void 0,a=t.lastJudgeAccepted,c=t.lastSolvedByUser,o=t.nextReviewTime;return r.createElement(S.a,{key:t.key},r.createElement(N.a,null,r.createElement(Y,{taskKey:t.key,url:t.validUrl,title:n?n.title:null,lastJudgeAccepted:a,lastSolvedByUser:c,nextReviewTime:o,remove:function(){return e.remove(t.key)},review:function(n,r){return e.solve(t.key,n,r)},judge:n?n.judge:null})))}))}),$=function(e){function t(e){var n;return Object(j.a)(this,t),(n=Object(y.a)(this,Object(x.a)(t).call(this,e))).setSuggestions=function(e){var t=e.toLocaleLowerCase().split(" ").filter(function(e){return e.length>0});if(t.length>0){var r=n.props.problems.valueSeq().filter(function(e){var n=(e.title+" "+e.url+" "+e.judge).toLocaleLowerCase();return t.every(function(e){return-1!==n.indexOf(e)})}).slice(0,10).toArray();n.setState({suggestions:r,focusing:-1})}else n.setState({suggestions:[],focusing:-1})},n.submit=function(e){n.props.submit(e),n.setState({input:"",suggestions:[],focusing:-1})},n.state={input:"",suggestions:[],focusing:-1},n}return Object(w.a)(t,e),Object(O.a)(t,[{key:"render",value:function(){var e=this,t=this.state,n=t.suggestions,a=t.focusing,c=this.props.submissions,o=function(e){var t=c.get(e.url);return void 0!==t&&void 0!==t.find(function(e){return"Accepted"===e.result})};return r.createElement("div",null,r.createElement(S.a,null,r.createElement(N.a,null,r.createElement(T.a,{onKeyDown:function(t){"Enter"===t.key?0<=a&&a<n.length?e.submit(n[a].url):e.submit(e.state.input):"ArrowDown"===t.key?e.setState({focusing:Math.min(a+1,n.length-1)}):"ArrowUp"===t.key&&e.setState({focusing:Math.max(a-1,-1)})},type:"text",onChange:function(t){var n=t.target.value;e.setState({input:n}),e.setSuggestions(n)},value:this.state.input}))),r.createElement(S.a,null,r.createElement(N.a,null,r.createElement(M.a,null,this.state.suggestions.map(function(t,n){return r.createElement(U.a,{color:o(t)?"success":void 0,active:n===a,key:t.url,onClick:function(){return e.submit(t.url)},action:!0},t.title," ",r.createElement(L.a,{pill:!0},t.judge))})))),r.createElement(Z,null))}}]),t}(r.Component),ee=Object(v.b)(function(e){return{problems:e.problems,submissions:e.submissions}},function(e){return{submit:function(t){return e({type:Q,input:t})}}})($),te=n(105),ne=n(106),re=n(107),ae=n(108),ce="REQUEST_LOGIN",oe="RECEIVE_TOKEN",ue="RECEIVE_DATA",se=function(e){return{type:oe,token:e}},le=function(){return{type:"CLEAR_TOKEN"}},ie=function(e){return{type:ue,rawData:e}},de=function(e){function t(e){var n;return Object(j.a)(this,t),(n=Object(y.a)(this,Object(x.a)(t).call(this,e))).state={activeTab:"Login",userId:"",password:""},n}return Object(w.a)(t,e),Object(O.a)(t,[{key:"render",value:function(){var e=this,t=this.state,n=t.activeTab,a=t.userId,c=t.password;return r.createElement(r.Fragment,null,this.props.token?r.createElement(s.a,{to:"/"}):null,r.createElement(d.a,{tabs:!0},r.createElement(te.a,null,r.createElement(ne.a,{active:"Register"===n,onClick:function(){return e.setState({activeTab:"Register"})}},"Register")),r.createElement(te.a,null,r.createElement(ne.a,{active:"Login"===n,onClick:function(){return e.setState({activeTab:"Login"})}},"Login"))),r.createElement(re.a,{activeTab:1},r.createElement(ae.a,{tabId:1},r.createElement(S.a,null,r.createElement(N.a,null,r.createElement(I.a,null,r.createElement(C.a,null,"User ID"),r.createElement(T.a,{type:"text",name:"user_id",id:"user_id",onChange:function(t){return e.setState({userId:t.target.value})},value:a})),r.createElement(I.a,null,r.createElement(C.a,null,"Password"),r.createElement(T.a,{type:"password",name:"password",id:"password",onChange:function(t){return e.setState({password:t.target.value})},value:c}),r.createElement(A.a,{onClick:function(){return e.props.login(a,c,"Register"===n)}},n)))))))}}]),t}(r.Component),me=Object(v.b)(function(e){return{token:e.token}},function(e){return{login:function(t,n,r){return e(function(e,t,n){return{type:ce,userId:e,password:t,register:n}}(t,n,r))}}})(de),pe=function(){return r.createElement(u.a,null,r.createElement(k,null),r.createElement(g.a,null,r.createElement(s.d,null,r.createElement(s.b,null,r.createElement(s.b,{exact:!0,path:"/",component:ee}),r.createElement(s.b,{exact:!0,path:"/settings",component:_}),r.createElement(s.b,{exact:!0,path:"/login",component:me})))))},fe=(n(82),n(12)),be=n.n(fe),ve=n(8),he=n(14),Ee=function(e){return fetch("https://kenkoooo.com/atcoder/atcoder-api/results?user=".concat(e)).then(function(e){return e.json()}).then(function(e){return Object(he.a)(e.map(function(e){return{url:"https://atcoder.jp/contests/".concat(e.contest_id,"/submissions/").concat(e.id),userId:e.user_id,result:"AC"===e.result?"Accepted":"Rejected",problemUrl:"https://atcoder.jp/contests/".concat(e.contest_id,"/tasks/").concat(e.problem_id),creationTimeSecond:e.epoch_second}}))})},ke=function(){return fetch("https://kenkoooo.com/atcoder/resources/problems.json").then(function(e){return e.json()}).then(function(e){return Object(he.a)(e.map(function(e){return{url:"https://atcoder.jp/contests/".concat(e.contest_id,"/tasks/").concat(e.id),title:e.title,judge:"AtCoder"}}))})},ge=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:1e5;return fetch("https://codeforces.com/api/user.status?handle=".concat(e,"&from=").concat(t,"&count=").concat(n)).then(function(e){return e.json()}).then(function(e){return Object(he.a)(e.result.map(function(e){return{url:"https://codeforces.com/contest/".concat(e.problem.contestId,"/submission/").concat(e.id),userId:e.author.members[0].handle,result:"OK"===e.verdict?"Accepted":"Rejected",problemUrl:"https://codeforces.com/contest/".concat(e.problem.contestId,"/problem/").concat(e.problem.index),creationTimeSecond:e.creationTimeSecond}}))})},je=function(){return fetch("https://codeforces.com/api/problemset.problems").then(function(e){return e.json()}).then(function(e){return Object(he.a)(e.result.problems.map(function(e){return{url:"https://codeforces.com/contest/".concat(e.contestId,"/problem/").concat(e.index),title:e.name,judge:"Codeforces"}}))})},Oe=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1e4;return fetch("https://judgeapi.u-aizu.ac.jp/problems?page=".concat(e,"&size=").concat(t)).then(function(e){return e.json()}).then(function(e){return Object(he.a)(e.map(function(e){return{url:"https://onlinejudge.u-aizu.ac.jp/problems/".concat(e.id),title:"".concat(e.id,": ").concat(e.name),judge:"AOJ"}}))})},ye=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:1e5;return fetch("https://judgeapi.u-aizu.ac.jp/solutions/users/".concat(e,"?page=").concat(t,"&size=").concat(n)).then(function(e){return e.json()}).then(function(e){return Object(he.a)(e.map(function(e){return{url:"https://onlinejudge.u-aizu.ac.jp/solutions/problem/".concat(e.problemId,"/review/").concat(e.judgeId,"/").concat(e.userId,"/").concat(e.language),problemUrl:"https://onlinejudge.u-aizu.ac.jp/problems/".concat(e.problemId),userId:e.userId,result:"Accepted",creationTimeSecond:e.submissionDate/1e3}}))})},xe=function(){return fetch("https://yukicoder.me/api/v1/problems").then(function(e){return e.json()}).then(function(e){return Object(he.a)(e.map(function(e){return{url:"https://yukicoder.me/problems/no/".concat(e.No),title:"No.".concat(e.No," ").concat(e.Title),judge:"yukicoder"}}))})},we=function(e){return fetch("https://yukicoder.me/api/v1/solved/name/".concat(e)).then(function(e){return e.json()}).then(function(t){return Object(he.a)(t.map(function(t){return{url:"https://yukicoder.me/problems/no/".concat(t.No),userId:e,result:"Accepted",problemUrl:"https://yukicoder.me/problems/no/".concat(t.No),creationTimeSecond:void 0}}))})},Se=function(e){return{type:"RECEIVE_PROBLEMS",problems:e}},Ie=function(e){return{type:"RECEIVE_SUBMISSIONS",submissions:e}},Ce=be.a.mark(Ae),Te=be.a.mark(Re);function Ae(){var e;return be.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return e=[ke,je,Oe,xe],t.next=3,Object(ve.a)(e.map(function(e){return Object(ve.b)(be.a.mark(function t(){var n;return be.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,Object(ve.b)(e);case 3:return n=t.sent,t.next=6,Object(ve.c)(Se(n));case 6:t.next=11;break;case 8:t.prev=8,t.t0=t.catch(0),console.error("Failed to fetch problems. "+t.t0);case 11:case"end":return t.stop()}},t,null,[[0,8]])}))}));case 3:case"end":return t.stop()}},Ce)}function Re(){var e,t;return be.a.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,Object(ve.d)(function(e){return e.userIds});case 2:return e=n.sent,t=[{f:Ee,id:e.atcoder},{f:ge,id:e.codeforces},{f:ye,id:e.aoj},{f:we,id:e.yukicoder}],n.next=6,Object(ve.a)(t.filter(function(e){return e.id.length>0}).map(function(e){return Object(ve.b)(be.a.mark(function t(){var n;return be.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,Object(ve.b)(e.f,e.id);case 3:return n=t.sent,t.next=6,Object(ve.c)(Ie(n));case 6:t.next=11;break;case 8:t.prev=8,t.t0=t.catch(0),console.error("Failed to fetch submissions. "+t.t0);case 11:case"end":return t.stop()}},t,null,[[0,8]])}))}));case 6:case"end":return n.stop()}},Te)}var De=n(37),_e="https://pool-api.kenkoooo.com/v1",Ne=function(e,t,n){return fetch(_e+"/login",{method:"POST",body:JSON.stringify({user_id:e,password:t,register:n})}).then(function(e){return e.json()}).then(function(e){return e})},Me=function(e,t){var n=JSON.stringify({token:e,saved_data:t});return fetch(_e+"/sync",{method:"POST",body:n}).then(function(e){return e.json()}).then(function(e){return{refreshedToken:e.token,loadedData:e.loaded_data}})},Ue=be.a.mark(Le);function Le(e){var t,n,r,a,c,o;return be.a.wrap(function(u){for(;;)switch(u.prev=u.next){case 0:if(e.type!==ce){u.next=10;break}return t=e.userId,n=e.password,r=e.register,u.next=4,Object(De.b)(Ne,t,n,r);case 4:if(a=u.sent,c=a.token,void 0===(o=h(c))){u.next=10;break}return u.next=10,Object(De.c)(se(o));case 10:case"end":return u.stop()}},Ue)}var Je=function(e){var t=Ke(e);localStorage.setItem("SAVE_DATA",JSON.stringify(t))},Be=function(e){try{var t=JSON.parse(e);return{userIds:t.userIds,tasks:Object(he.b)(t.tasks),token:t.token}}catch(n){return void console.error(n)}},Ke=function(e){return{tasks:e.tasks,userIds:e.userIds,token:e.token}},Ve=be.a.mark(Pe),ze=be.a.mark(Ge),Fe=be.a.mark(He);function Pe(){var e,t,n;return be.a.wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return console.log("About to send data..."),r.next=3,Object(ve.d)(function(e){return Ke(e)});case 3:if(void 0===(e=r.sent).token){r.next=25;break}return r.prev=5,r.next=8,Object(ve.b)(Me,e.token.token,JSON.stringify(e));case 8:if(t=r.sent,void 0===(n=h(t.refreshedToken))){r.next=15;break}return r.next=13,Object(ve.c)(se(n));case 13:r.next=17;break;case 15:return r.next=17,Object(ve.c)(le());case 17:r.next=23;break;case 19:return r.prev=19,r.t0=r.catch(5),r.next=23,Object(ve.c)(le());case 23:r.next=27;break;case 25:return r.next=27,Object(ve.c)(le());case 27:case"end":return r.stop()}},Ve,null,[[5,19]])}function Ge(){var e;return be.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Object(ve.d)(function(e){return e});case 2:return e=t.sent,t.next=5,Object(ve.b)(Je,e);case 5:case"end":return t.stop()}},ze)}function He(){var e,t,n;return be.a.wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,Object(ve.d)(function(e){return e.token});case 2:if(void 0===(e=r.sent)){r.next=22;break}return r.prev=4,r.next=7,Object(ve.b)(Me,e.token,void 0);case 7:if(t=r.sent,void 0===(n=h(t.refreshedToken))){r.next=12;break}return r.next=12,Object(ve.c)(se(n));case 12:if(void 0===t.loadedData){r.next=15;break}return r.next=15,Object(ve.c)(ie(t.loadedData));case 15:r.next=22;break;case 17:return r.prev=17,r.t0=r.catch(4),console.error(r.t0),r.next=22,Object(ve.c)(le());case 22:case"end":return r.stop()}},Fe,null,[[4,17]])}var qe=be.a.mark($e),Ye=be.a.mark(et),Qe=be.a.mark(tt),We=be.a.mark(nt),Xe=be.a.mark(rt),Ze=be.a.mark(at);function $e(){return be.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(ve.f)(ce,be.a.mark(function e(t){return be.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(ve.b)(Le,t);case 2:return e.next=4,Object(ve.b)(He);case 4:return e.next=6,Object(ve.b)(Pe);case 6:case"end":return e.stop()}},e)}));case 2:case"end":return e.stop()}},qe)}function et(){return be.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(ve.f)(R,Re);case 2:case"end":return e.stop()}},Ye)}function tt(){return be.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(ve.f)([Q,W,X,R,oe,ue],Ge);case 2:case"end":return e.stop()}},Qe)}function nt(){return be.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(ve.f)([Q,W,X,R],Pe);case 2:case"end":return e.stop()}},We)}function rt(){return be.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(ve.e)(oe);case 2:return e.next=4,Object(ve.b)(He);case 4:return e.next=6,Object(ve.b)(Pe);case 6:case"end":return e.stop()}},Xe)}function at(){return be.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(ve.a)([Object(ve.b)(rt),Object(ve.b)(tt),Object(ve.b)(nt),Object(ve.b)(He),Object(ve.b)(Ae),Object(ve.b)(et),Object(ve.b)($e)]);case 2:case"end":return e.stop()}},Ze)}var ct=at,ot=n(61),ut=n(31),st=n(50),lt=function(e){try{return new URL(e),!0}catch(t){return!1}},it=function(){var e=function(){var e=localStorage.getItem("SAVE_DATA");return null===e?void 0:Be(e)}();if(void 0===e){var t=localStorage.getItem("TASKS");return{tasks:t?Object(he.b)(JSON.parse(t)):Object(he.b)(),userIds:{atcoder:"",codeforces:"",aoj:"",yukicoder:""},submissions:Object(he.b)(),problems:Object(he.b)(),token:void 0}}return Object(st.a)({submissions:Object(he.b)(),problems:Object(he.b)()},e)},dt=function(e,t){switch(t.type){case Q:var n=function(e){var t=lt(e)?e:void 0,n=Date.now()/1e3;return{key:e,validUrl:t,createdAt:n,nextReviewTime:n,lastJudgeAccepted:void 0,lastSolvedByUser:void 0}}(t.input);return e.has(n.key)?e:e.set(n.key,n);case W:var r=t.key;return e.remove(r);case X:var a=t.key,c=t.solvedSecond,o=t.nextReviewSecond,u=e.get(a);if(void 0===u)return e;var s=Object(st.a)({},u,{lastSolvedByUser:c,nextReviewTime:o});return e.set(a,s);case ue:var l=t.rawData,i=Be(l);return void 0===i?e:i.tasks.merge(e);default:return e}},mt=function(e,t){switch(t.type){case R:return t.userIds;default:return e}},pt=function(e,t){switch(t.type){case"RECEIVE_PROBLEMS":return e.merge(t.problems.map(function(e){return[e.url,e]}));default:return e}},ft=function(e,t){switch(t.type){case"RECEIVE_SUBMISSIONS":var n=t.submissions.reduce(function(e,t){return e.update(t.problemUrl,Object(he.a)(),function(e){return e.push(t)})},Object(he.b)());return e.mergeWith(function(e,t){return e.merge(t)},n);default:return e}},bt=function(e,t){switch(t.type){case oe:return t.token;default:return e}},vt=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:it(),t=arguments.length>1?arguments[1]:void 0;return console.log(t),{tasks:dt(e.tasks,t),userIds:mt(e.userIds,t),submissions:ft(e.submissions,t),problems:pt(e.problems,t),token:bt(e.token,t)}},ht=Object(ot.a)(),Et=Object(ut.d)(vt,Object(ut.c)(Object(ut.a)(ht)));ht.run(ct),o.a.render(a.a.createElement(v.a,{store:Et},a.a.createElement(pe,null)),document.getElementById("root"))}},[[62,1,2]]]);
//# sourceMappingURL=main.cdfb30b1.chunk.js.map
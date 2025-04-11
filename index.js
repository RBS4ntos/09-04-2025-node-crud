// function openNewBackgroundTab() {
//     var a = document.createElement("a");
//     a.href = event.target.dataset.source;
//     a.target = "_blank"; // garante que abre em nova aba
//     a.rel = "noopener noreferrer"; // segurança adicional

//     // Criação moderna do evento de clique com a tecla Ctrl ativada
//     var evt = new MouseEvent("click", {
//         bubbles: true,
//         cancelable: true,
//         view: window,
//         ctrlKey: true
//     });

//     a.dispatchEvent(evt);

//     // console.log(window.location.pathname);

//     window.open(window.location.pathname);

//     window.close();
// }

// document.getElementById('frmCadastro').addEventListener('submit', async (e) => {
//     e.preventDefault();
//     const nome = document.getElementById('txtNome').value;
//     const login = document.getElementById('txtLogin').value;
//     const senha = document.getElementById('txtSenha').value;
//     const tipo = 'cadastro';

//     const response = await fetch('/api/mysql', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ nome, login, senha, tipo })
//     });

//     const result = await response.json();
//     console.log(result.message);

//     localStorage.setItem('firstname', nome);
//     localStorage.setItem('email', login);
//     localStorage.setItem('senha', senha);
// });

// // var cliques = 0;

// // function newBackgroundTab(btnObj) {
// //     // console.log(btnObj);
// //     let dataSourceObj = btnObj.dataset.source;

// //     const a = document.createElement('a');
// //     a.href = dataSourceObj;
// //     a.target = "_blank";
// //     const e = new MouseEvent('click', {
// //         ctrlKey: true // for Windows or Linux
// //         // metaKey: true, // for MacOS
// //     });
// //     a.dispatchEvent(e);
// //     // return false;

// //     // window.focus();
// //     // document.body.children[0].focus();
// //     cliques++;
// //     console.log("clicou" + cliques);
// // };

// // function openNewBackgroundTab(){
// //     // var a = document.createElement("a");
// //     // // console.log(event.target.dataset.source);
// //     // a.href = event.target.dataset.source;
// //     // var evt = document.createEvent("MouseEvents");
// //     // //the tenth parameter of initMouseEvent sets ctrl key
// //     // evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0,
// //     //                             true, false, false, false, 0, null);
// //     // a.dispatchEvent(evt);
// //     window.open(event.target.dataset.source, "_blank");
// // }

// // var is_chrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
// // if(!is_chrome) {
// //     var url = window.location.pathname;
// //     var win = window.open(url, '_blank');
// // } else {
// //     openNewBackgroundTab();
// // }

// // const newTab = window.open('./login.html');

// // espera 2 segundos e tenta focar de volta na aba original
// // setInterval(() => {
// //     window.focus(); // foca esta aba
// //     console.log("contando..." + Math.random());
// //     // ou: newTab.focus(); para focar a nova aba (se ainda permitido)
// // }, 2000);
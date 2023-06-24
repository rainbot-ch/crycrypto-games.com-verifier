/**
 * @CryptoGamesVerifier
 *
 * crypto.games (formerly crypto-games.com) verifier
 *
 * @bookmarklet javascript:(async()=>await fetch('https://raw.githubusercontent.com/rainbot-ch/crypto-games.com-verifier/main/crypto-games.com-verifier.js').then((response)=>response.text()).then((data)=>eval(data)))()
 * @version 1.0.0
 * @author rainbot.ch
 * @telegram rain3t
 * @copyright rainbot.ch 2023
 * @license opensource
 * @require https://github.com/emn178/js-sha512/blob/master/src/sha512.js @copyright Chen, Yi-Cyuan 2014-2018
 *
**/

/*jshint esversion:12*/

function verify(serverSeed,clientSeed,serverHash){
    let matching=sha512(`${serverSeed}${clientSeed}`)===serverHash;
    let hex=sha512(`${serverSeed}${clientSeed}`).substring(0,5);
    let decimal=String(parseInt(sha512(`${serverSeed}${clientSeed}`).substring(0,5),16));
    let result=decimal.length==6?decimal.substr(1)/1000:decimal/1000;
    if(serverHash){console.log(matching?'sha512 matching:%cTRUE':'hash match:%cFALSE',matching?'color:rgb(22,255,2)':'color:rgb(255,0,33)');}
    if(serverHash&&document.querySelector('iframe.fancybox-iframe')){appendTable(hex,decimal,result,matching);}
    console.log('result:',String(result));
    return result;
}
function check(selector){
    if(selector){
        selector.click();
        console.log('%cawait %c\[%ciframe%c\]','color:rgb(217,246,59)','color:rgb(128,128,128)','color:rgb(173,7,173)','color:rgb(128,128,128)');
        document.querySelector('iframe.fancybox-iframe').addEventListener('load',(event)=>{
            console.log('%c\[%ciframe%c\] %cload%o','color:rgb(128,128,128)','color:rgb(173,7,173)','color:rgb(128,128,128)','color:rgb(255,177,2)',[event]);
            document.querySelector('iframe.fancybox-iframe').contentDocument.addEventListener('DOMContentLoaded',(event)=>{
                console.log('%c\[%ciframe%c\] %cDOMContentLoaded%o','color:rgb(128,128,128)','color:rgb(173,7,173)','color:rgb(128,128,128)','color:rgb(0,224,0)',[event]);
                document.querySelector('iframe.fancybox-iframe').contentDocument.querySelector('.nav.nav-tabs>li').nextElementSibling.firstElementChild.click();
                let serverSeed=document.querySelector('iframe.fancybox-iframe').contentDocument.querySelector('#ContentPlaceHolder1_txtDiceIdServerSeed').value;
                let clientSeed=document.querySelector('iframe.fancybox-iframe').contentDocument.querySelector('#ContentPlaceHolder1_txtDiceIdClientSeed').value;
                let serverHash=document.querySelector('iframe.fancybox-iframe').contentDocument.querySelector('#ContentPlaceHolder1_txtDiceIdSha512').value;
                console.log(JSON.stringify({serverSeed,clientSeed,serverHash},null,1).replace(/^\s+|[\"\,]/gm,'').slice(2,-2));
                verify(serverSeed,clientSeed,serverHash);
                return;
            })
        });
        return;
    }
    if(document.querySelector('iframe.fancybox-iframe')){
        document.querySelector('iframe.fancybox-iframe').contentDocument.querySelector('.nav.nav-tabs>li').nextElementSibling.firstElementChild.click();
        let serverSeed=document.querySelector('iframe.fancybox-iframe').contentDocument.querySelector('#ContentPlaceHolder1_txtDiceIdServerSeed').value;
        let clientSeed=document.querySelector('iframe.fancybox-iframe').contentDocument.querySelector('#ContentPlaceHolder1_txtDiceIdClientSeed').value;
        let serverHash=document.querySelector('iframe.fancybox-iframe').contentDocument.querySelector('#ContentPlaceHolder1_txtDiceIdSha512').value;
        console.log(JSON.stringify({serverSeed,clientSeed,serverHash},null,1).replace(/^\s+|[\"\,]/gm,'').slice(2,-2));
        verify(serverSeed,clientSeed,serverHash);
        return;
    }
    console.log('to verify your bets use:\n\n\t%cverify(serverSeed,clientSeed,serverHash?optional)\n','font-style:oblique;font-weight:600');
}
function appendTable(hex,decimal,result,matching){
    if(document.querySelector('iframe.fancybox-iframe').contentDocument.querySelector('body>form #ContentPlaceHolder1_pnlDiceId .table.table-striped>tbody').childElementCount==2){
        document.querySelector('iframe.fancybox-iframe').contentDocument.querySelector('body>form #ContentPlaceHolder1_pnlDiceId .table.table-striped>tbody:first-child').insertCell(-1).textContent='Matching:';
        let body=document.querySelector('iframe.fancybox-iframe').contentDocument.querySelector('body>form #ContentPlaceHolder1_pnlDiceId .table.table-striped>tbody');
        let row=body.insertRow(-1);
        let step=row.insertCell(-1);
        let Hex=row.insertCell(-1);
        let Decimal=row.insertCell(-1);
        let Digits=row.insertCell(-1);
        let Result=row.insertCell(-1);
        let verified=row.insertCell(-1);
        let symbol=matching?' ✓':' ✗';
        step.textContent='verifier';
        step.style.color='rgb(0,255,255)';
        Hex.textContent=hex+symbol;
        Hex.style.color='rgb(0,255,255)';
        Decimal.textContent=decimal+symbol;
        Decimal.style.color='rgb(0,255,255)';
        Digits.textContent=result+symbol;
        Digits.style.color='rgb(0,255,255)';
        Result.textContent=result+symbol;
        Result.style.color='rgb(0,255,255)';
        verified.textContent=matching+symbol;
        verified.style.color=matching?'rgb(22,255,2)':'rgb(176,0,23)';
        row.style.backgroundColor=matching?'rgb(24,84,69)':'rgb(255,99,71,1)';
        body.appendChild(row);
        let table=document.querySelector('iframe.fancybox-iframe').contentDocument.querySelector('body>form #ContentPlaceHolder1_pnlDiceId .table.table-striped');
        let ctable=document.createElement('table');
        let credits=table.createTHead();
        credits.style='color:rgb(0,211,176,1);font-style:oblique;';
        credits.textContent='made with ♥ in switzerland by rainbot.ch';
        table.after(document.createElement('br'));
        table.after(credits);
    }
}
function makeButton(selector){
    let cell=document.createElement('td');
    cell.append(Object.assign(document.createElement('input'),{
        type:'button',
        value:'verify',
        style:'background:#023A62;color:#fff;border-radius:6px;width:auto;line-height:25px;border:none;-webkit-transition:0.1s;-o-transition:0.1s;transition:0.1s;margin-bottom:0;',
        onclick:function(){return check(this.parentElement.parentNode.firstElementChild.firstChild);}
    }));
    if(selector){selector.appendChild(cell);}else{document.querySelector('#table_my_bets_head').nextElementSibling.appendChild(cell);}
}
function betListener(){
    return document.querySelector('#table_my_bets').addEventListener('DOMSubtreeModified',(event)=>{
        makeButton();
        betListener();
    },{once:true});
}

document.head.appendChild(Object.assign(document.createElement('script'),{
    src:'https://cdnjs.cloudflare.com/ajax/libs/js-sha512/0.8.0/sha512.min.js',
    charset:'UTF-8',
    type:'text/javascript',
    onload:this.onreadystatechange=function(event){return console.log('%c'+event.type,'color:rgb(38,255,3)',[event.path[0].src.substr(event.path[0].src.lastIndexOf('/')+1)],[event]);},
}));
Promise.resolve(document.querySelector('.fixed-tabs[href=\'#my_bets\']').click());
document.querySelector('#table_my_bets_head').appendChild(Object.assign(document.createElement('th'),{textContent:'\u3164\x83',}));
Array.prototype.slice.call(document.querySelector('#table_my_bets>tbody').children,1).forEach((v)=>makeButton(v));
setTimeout(()=>betListener(),1e3);

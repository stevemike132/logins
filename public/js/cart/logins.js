let items = [];
var table1 = jQuery('#example1').DataTable();
var setBtn = document.getElementById('settings');

if(localStorage.getItem('banklogs') && ((JSON.parse(localStorage.getItem('banklogs')).length) > 0)){
    items = JSON.parse(localStorage.getItem('banklogs'));
    document.getElementById('cartlength').innerText = (JSON.parse(localStorage.getItem('banklogs')).length);

    items.map(data=>{
        var image = `<td><img src=${data.image}></td>`
        var balance = `<td class="btn-balance">${data.balance}</td>`
        var price = `<td class="btn-price">${data.price}</td>`
        var remove = `<td><button class="btn-cloze btn-remove"></button></td>`
        var account = `<td>${data.account}</td>`
        var website = `<td>${data.website}</td>`
        var info1 = `<td>${data.info1}</td>`
        var info2 = `<td>${data.info2}</td>`
        var info3 = `<td>${data.info3}</td>`
        var info4 = `<td>${data.info4}</td>`
        var info5 = `<td>${data.info5}</td>`
        var info6 = `<td>${data.info6}</td>`
        
        table1.row.add([
            image,
            balance,      
            account,   
            remove,
            price,
            info1,   
            info2,   
            info3,   
            info4,   
            info5,   
            info6,   
            website,      
        ]).draw();
    });

    var removeFromCartButtons = document.getElementsByClassName('btn-remove');
    for(var i = 0; i <removeFromCartButtons.length; i++){
        var button = removeFromCartButtons[i];
        button.addEventListener('click', removeCartItem)
    }
    updateCartTotal();
} else {
    document.getElementById('cartlength').style.display = 'none';
    setBtn.innerHTML = `Cart: $0 <img src="img/partners/bitcoin.png">`;
    setBtn.style.left = '27%';
    setBtn.style.right = '27%';

    var profileModal = document.getElementById('profileModal');
    var modalDialog = profileModal.getElementsByClassName('modal-dialog')[0];

    if (window.innerWidth > 1092) {
        modalDialog.style.top = '5vh';
        modalDialog.style.minWidth = '85vw';
    } 
}

if(localStorage.getItem('banklogs') && ((JSON.parse(localStorage.getItem('banklogs')).length) > 3)){
    document.getElementsByClassName('dataTables_paginate')[0].style.display = 'block';
    document.getElementsByClassName('dataTables_length')[0].style.display = 'block'
}

var addToCartButtons = document.getElementsByClassName('money');
for(var i = 0; i <addToCartButtons.length; i++){
    var button = addToCartButtons[i];
    button.addEventListener('click', addToCartClicked)
}

function addToCartClicked(event) {
    var button = event.target;
    var pri = button.innerText;
    var pric = pri.replace('Buy: ','');
    var price3 = 'Price: '+  pric;
    var price = price3.substring(0, price3.length - 1);
    var balance = button.parentElement.parentElement.parentElement.children[0].children[1].innerText;
    var website = button.parentElement.parentElement.children[0].children[0].innerText;
    var info1 = button.parentElement.parentElement.children[1].children[0].innerText;
    var info2 = button.parentElement.parentElement.children[2].children[0].innerText;
    var info3 = button.parentElement.parentElement.children[3].children[0].innerText;
    var info4 = button.parentElement.parentElement.children[4].children[0].innerText;
    var info5 = button.parentElement.parentElement.children[5].children[0].innerText;
    var info6 = button.parentElement.parentElement.children[6].children[0].innerText;

    var image = button.parentElement.parentElement.parentElement.children[0].children[0].src;
    var accoun = button.parentElement.parentElement.children[7].children[0].innerText;
    var account = accoun.replace(' ACCOUNT]',']');

    addItemToCart(price, balance, account,website,image,info1,info2,info3,info4,info5,info6);

    updateCartTotal();

    $('#profileModal').modal('show');
    $('#exampleModal').modal('hide');
    event.preventDefault();
}


function removeCartItem(event) {
    var buttonClicked = event.target
    var cartItem = buttonClicked.parentElement.parentElement;
    var price = cartItem.children[4].innerText;
    var balance = cartItem.children[1].innerText;
    var account = cartItem.children[2].innerText;
    var website = cartItem.children[11].innerText;
    var image = cartItem.children[0].children[0].src;
    var info1 = cartItem.children[5].innerText;
    var info2 = cartItem.children[6].innerText;
    var info3 = cartItem.children[7].innerText;
    var info4 = cartItem.children[8].innerText;
    var info5 = cartItem.children[9].innerText;
    var info6 = cartItem.children[10].innerText;
    var remove = `<td><button class="btn-cloze btn-remove"></button></td>`

    removeItemFromCart(price, balance, account,website,image,info1,info2,info3,info4,info5,info6);
    buttonClicked.parentElement.parentElement.remove();
    
    updateCartTotal2();

    table1.row(({
        image,
        balance,      
        account,   
        remove,
        price,
        info1,   
        info2,   
        info3,   
        info4,   
        info5,   
        info6,   
        website,      
    })).remove();

    var logsContainer =  document.getElementsByClassName('gallery')[0];
    var singleLog = logsContainer.getElementsByClassName('butn');
    for(var i = 0; i < singleLog.length; i++){
        if((singleLog[i].innerText) == price.replace('Price: ', 'In Cart ') && (singleLog[i].parentElement.children[0].innerHTML) == website){
            singleLog[i].innerHTML = `
                ${price.replace('Price: ', 'Buy: ')}
            `;
            singleLog[i].classList.remove('in-cart');
            var bunist = singleLog[i].parentElement.parentElement;
            bunist.classList.remove('display-nones');
            singleLog[i].disabled = false;
        } 
    }

    window.location.reload();
}

function addItemToCart(price, balance, account,website, image,info1,info2,info3,info4,info5,info6){

    var image1 = `<td><img src=${image}></td>`
    var balance1 = `<td class="btn-balance">${balance}</td>`
    var price1 = `<td class="btn-price">${price}</td>`
    var remove1 = `<td><button class="btn-cloze btn-remove"></button></td>`
    var account1 = `<td>${account}</td>`
    var website1 = `<td>${website}</td>`
    var info11 = `<td>${info1}</td>`
    var info21 = `<td>${info2}</td>`
    var info31 = `<td>${info3}</td>`
    var info41 = `<td>${info4}</td>`
    var info51 = `<td>${info5}</td>`
    var info61 = `<td>${info6}</td>`

    if(localStorage.getItem('banklogs') && ((JSON.parse(localStorage.getItem('banklogs')).length) > 0)){
        var cartItemNames = JSON.parse(localStorage.getItem('banklogs'));
        for(var i = 0; i < cartItemNames.length; i++) {
            if(cartItemNames.length > 2.5) {

                var shortCutFunction = 'success';
                var msg = `
                    Cart is full 
                    <hr class="to-hr">
                    Checkout the 3 logs in cart first, follow the steps to cashout carefully, then buy more later
                `;
                toastr.options = {
                    closeButton: true,
                    debug: false,
                    newestOnTop: true,
                    progressBar: true,
                    positionClass: 'toast-top-full-width',
                    preventDuplicates: true,
                    onclick: null
                };
                var $toast = toastr[shortCutFunction](msg);
                $toastlast = $toast;

                return
            }
            if(cartItemNames.length > 2.5) {
                document.getElementsByClassName('dataTables_paginate')[0].style.display = 'block';
                document.getElementsByClassName('dataTables_length')[0].style.display = 'block'
            }
        }
    } 

    addToLocalStorage(price, balance, account,website,image,info1,info2,info3,info4,info5,info6);

    table1.row.add([
        image1,
        balance1,      
        account1,   
        remove1,
        price1,
        info11,   
        info21,   
        info31,   
        info41,   
        info51,   
        info61,   
        website1,      
    ]).draw();

    updateCartTotal();

    var removeFromCartButtons = document.getElementsByClassName('btn-remove');
    for(var i = 0; i <removeFromCartButtons.length; i++){
        var button = removeFromCartButtons[i];
        button.addEventListener('click', removeCartItem)
    }
}


function addToLocalStorage(price, balance, account,website, image,info1,info2,info3,info4,info5,info6){
    let item = {
        price: price,
        balance: balance,
        account: account,
        website: website,
        image: image,
        info1: info1,
        info2: info2,
        info3: info3,
        info4: info4,
        info5: info5,
        info6: info6
    }
    items.push(item);
    localStorage.setItem('banklogs', JSON.stringify(items));
    if(localStorage.getItem('banklogs')){
        document.getElementById('cartlength').innerText = (JSON.parse(localStorage.getItem('banklogs')).length);
        document.getElementById('cartlength').style.display = 'block';
    }
}

function removeItemFromCart(price, balance,account,website,image,info1,info2,info3,info4,info5,info6){
    let item = {
        price: price,
        balance: balance,
        account: account,
        website: website,
        image: image,
        info1: info1,
        info2: info2,
        info3: info3,
        info4: info4,
        info5: info5,
        info6: info6
    }
    function checkAdult(items) {
        return JSON.stringify(items) !== JSON.stringify(item)
    }
    localStorage.setItem('banklogs', JSON.stringify(items.filter(checkAdult)));
    items = items.filter(checkAdult);
}

function updateCartTotal() {
    let items3 = (JSON.parse(localStorage.getItem('banklogs')));
    var total = 0;
    items3.map(data=>{
        var price4 = data.price.replace('Price: ','').replace(',','').replace('$','');
        total = total + (price4 * 1);
    });
    document.getElementById('thetot1').innerHTML = `
        Checkout:  $${total.toLocaleString()}
        <img src="img/partners/bitcoin.png"> 
    `;
    document.getElementById('thetot').innerHTML = `View Cart: $${total.toLocaleString()}`;
    setBtn.innerHTML = `Cart: $${total.toLocaleString()} <img src="img/partners/bitcoin.png">`;
    setBtn.style.left = '25.5%';
    setBtn.style.right = '25.5%';

    document.getElementById('theno1').innerHTML = 'Cart: ' + JSON.parse(localStorage.getItem('banklogs')).length + ' , Total: $' + total.toLocaleString();

    var logsContainer =  document.getElementsByClassName('gallery')[0];
    var singleLog = logsContainer.getElementsByClassName('butn');
    for(var i = 0; i < singleLog.length; i++){
        let cart = JSON.parse(localStorage.getItem('banklogs'));
        cart.map(data=>{
            data.price3 = data.price.replace('Price: ','');
            if((singleLog[i].innerText) == data.price.replace('Price: ', 'Buy: ') && (singleLog[i].parentElement.children[0].innerHTML) == data.website){
                singleLog[i].innerHTML = `
                In Cart ${data.price3}
                `;
                singleLog[i].classList.add('in-cart');
                var bunist = singleLog[i].parentElement.parentElement;
                bunist.classList.add('display-nones');
                singleLog[i].disabled = 'disabled';
            } 
        });
    }
    localStorage.setItem('time-left',600);

    var profileModal = document.getElementById('profileModal');
    var modalDialog = profileModal.getElementsByClassName('modal-dialog')[0];

    if(JSON.parse(localStorage.getItem('banklogs')).length == 1) {
        if (window.innerWidth > 1092) {
            modalDialog.style.top = '5vh';
            modalDialog.style.minWidth = '85vw';
        } 
    } else if(JSON.parse(localStorage.getItem('banklogs')).length == 2) {
        if (window.innerWidth > 1092) {
            modalDialog.style.top = '3vh';
            modalDialog.style.minWidth = '92vw';
        } 
    } else if(JSON.parse(localStorage.getItem('banklogs')).length >= 3) {
        if (window.innerWidth > 1092) {
            modalDialog.style.top = '-4vh';
            modalDialog.style.minWidth = '97vw';
        } 
    }
}


function updateCartTotal2() {
    let items3 = (JSON.parse(localStorage.getItem('banklogs')));
    var total = 0;
    items3.map(data=>{
        var price4 = data.price.replace('Price: ','').replace(',','').replace('$','');
        total = total + (price4 * 1);
    });
    document.getElementById('thetot1').innerHTML = `
        Checkout:  $${total.toLocaleString()}
        <img src="img/partners/bitcoin.png"> 
    `;
    document.getElementById('thetot').innerHTML = `View Cart: $${total.toLocaleString()}`;
    setBtn.innerHTML = `Cart: $${total.toLocaleString()} <img src="img/partners/bitcoin.png">`;
    document.getElementById('cartlength').innerText = (JSON.parse(localStorage.getItem('banklogs')).length);
    var profileModal = document.getElementById('profileModal');
    var modalDialog = profileModal.getElementsByClassName('modal-dialog')[0];

    if(JSON.parse(localStorage.getItem('banklogs')).length == 1) {
        if (window.innerWidth > 1092) {
            modalDialog.style.top = '5vh';
            modalDialog.style.minWidth = '85vw';
        } 
    } else if(JSON.parse(localStorage.getItem('banklogs')).length == 2) {
        if (window.innerWidth > 1092) {
            modalDialog.style.top = '3vh';
            modalDialog.style.minWidth = '92vw';
        } 
    } else if(JSON.parse(localStorage.getItem('banklogs')).length >= 3) {
        if (window.innerWidth > 1092) {
            modalDialog.style.top = '-4vh';
            modalDialog.style.minWidth = '97vw';
        } 
    }
    document.getElementById('theno1').innerHTML = 'Cart: ' + JSON.parse(localStorage.getItem('banklogs')).length + ' , Total: $' + total.toLocaleString();
    localStorage.setItem('time-left',600);
}














!function(e){e(["jquery"],(function(e){return function(){function t(t,n){return t||(t=a()),(l=e("#"+t.containerId)).length||n&&(l=function(t){return(l=e("<div/>").attr("id",t.containerId).addClass(t.positionClass)).appendTo(e(t.target)),l}(t)),l}function n(t){for(var n=l.children(),o=n.length-1;o>=0;o--)s(e(n[o]),t)}function s(t,n,s){var o=!(!s||!s.force)&&s.force;return!(!t||!o&&0!==e(":focus",t).length||(t[n.hideMethod]({duration:n.hideDuration,easing:n.hideEasing,complete:function(){r(t)}}),0))}function o(e){c&&c(e)}function i(n){function s(e){return null==e&&(e=""),e.replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/'/g,"&#39;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function i(t){var n=t&&!1!==m.closeMethod?m.closeMethod:m.hideMethod,s=t&&!1!==m.closeDuration?m.closeDuration:m.hideDuration,i=t&&!1!==m.closeEasing?m.closeEasing:m.hideEasing;if(!e(":focus",v).length||t)return clearTimeout(b.intervalId),v[n]({duration:s,easing:i,complete:function(){r(v),clearTimeout(h),m.onHidden&&"hidden"!==D.state&&m.onHidden(),D.state="hidden",D.endTime=new Date,o(D)}})}function c(){(m.timeOut>0||m.extendedTimeOut>0)&&(h=setTimeout(i,m.extendedTimeOut),b.maxHideTime=parseFloat(m.extendedTimeOut),b.hideEta=(new Date).getTime()+b.maxHideTime)}function p(){clearTimeout(h),b.hideEta=0,v.stop(!0,!0)[m.showMethod]({duration:m.showDuration,easing:m.showEasing})}function g(){var e=(b.hideEta-(new Date).getTime())/b.maxHideTime*100;T.width(e+"%")}var m=a(),f=n.iconClass||m.iconClass;if(void 0!==n.optionsOverride&&(m=e.extend(m,n.optionsOverride),f=n.optionsOverride.iconClass||f),!function(e,t){if(e.preventDuplicates){if(t.message===d)return!0;d=t.message}return!1}(m,n)){u++,l=t(m,!0);var h=null,v=e("<div/>"),C=e("<div/>"),w=e("<div/>"),T=e("<div/>"),O=e(m.closeHtml),b={intervalId:null,hideEta:null,maxHideTime:null},D={toastId:u,state:"visible",startTime:new Date,options:m,map:n};return n.iconClass&&v.addClass(m.toastClass).addClass(f),function(){if(n.title){var e=n.title;m.escapeHtml&&(e=s(n.title)),C.append(e).addClass(m.titleClass),v.append(C)}}(),function(){if(n.message){var e=n.message;m.escapeHtml&&(e=s(n.message)),w.append(e).addClass(m.messageClass),v.append(w)}}(),m.closeButton&&(O.addClass(m.closeClass).attr("role","button"),v.prepend(O)),m.progressBar&&(T.addClass(m.progressClass),v.prepend(T)),m.rtl&&v.addClass("rtl"),m.newestOnTop?l.prepend(v):l.append(v),function(){var e="";switch(n.iconClass){case"toast-success":case"toast-info":e="polite";break;default:e="assertive"}v.attr("aria-live",e)}(),v.hide(),v[m.showMethod]({duration:m.showDuration,easing:m.showEasing,complete:m.onShown}),m.timeOut>0&&(h=setTimeout(i,m.timeOut),b.maxHideTime=parseFloat(m.timeOut),b.hideEta=(new Date).getTime()+b.maxHideTime,m.progressBar&&(b.intervalId=setInterval(g,10))),m.closeOnHover&&v.hover(p,c),!m.onclick&&m.tapToDismiss&&v.click(i),m.closeButton&&O&&O.click((function(e){e.stopPropagation?e.stopPropagation():void 0!==e.cancelBubble&&!0!==e.cancelBubble&&(e.cancelBubble=!0),m.onCloseClick&&m.onCloseClick(e),i(!0)})),m.onclick&&v.click((function(e){m.onclick(e),i()})),o(D),m.debug&&console&&console.log(D),v}}function a(){return e.extend({},{tapToDismiss:!0,toastClass:"toast",containerId:"toast-container",debug:!1,showMethod:"fadeIn",showDuration:700,showEasing:"swing",onShown:void 0,hideMethod:"fadeOut",hideDuration:700,hideEasing:"swing",onHidden:void 0,closeMethod:!1,closeDuration:!1,closeEasing:!1,closeOnHover:!0,extendedTimeOut:13e3,iconClasses:{error:"toast-error",info:"toast-info",success:"toast-success",warning:"toast-warning"},iconClass:"toast-info",positionClass:"toast-top-right",timeOut:13e3,titleClass:"toast-title",messageClass:"toast-message",escapeHtml:!1,target:"body",closeHtml:'<button type="button">&times;</button>',closeClass:"toast-close-button",newestOnTop:!0,preventDuplicates:!1,progressBar:!1,progressClass:"toast-progress",rtl:!1},g.options)}function r(e){l||(l=t()),e.is(":visible")||(e.remove(),e=null,0===l.children().length&&(l.remove(),d=void 0))}var l,c,d,u=0,p={error:"error",info:"info",success:"success",warning:"warning"},g={clear:function(e,o){var i=a();l||t(i),s(e,i,o)||n(i)},remove:function(n){var s=a();return l||t(s),n&&0===e(":focus",n).length?void r(n):void(l.children().length&&l.remove())},error:function(e,t,n){return i({type:p.error,iconClass:a().iconClasses.error,message:e,optionsOverride:n,title:t})},getContainer:t,info:function(e,t,n){return i({type:p.info,iconClass:a().iconClasses.info,message:e,optionsOverride:n,title:t})},options:{},subscribe:function(e){c=e},success:function(e,t,n){return i({type:p.success,iconClass:a().iconClasses.success,message:e,optionsOverride:n,title:t})},version:"2.1.3",warning:function(e,t,n){return i({type:p.warning,iconClass:a().iconClasses.warning,message:e,optionsOverride:n,title:t})}};return g}()}))}("function"==typeof define&&define.amd?define:function(e,t){"undefined"!=typeof module&&module.exports?module.exports=t(require("jquery")):window.toastr=t(window.jQuery)});
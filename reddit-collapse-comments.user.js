// ==UserScript==
// @name         Reddit - Collapse Comments
// @namespace    http://your.homepage/
// @version      0.1
// @description  enter something useful
// @author       You
// @match        https://*.reddit.com/r/*/comments/*
// @grant        none
// ==/UserScript==

function collapseAll() {
    Array.prototype.forEach.call(document.querySelectorAll('.commentarea > .sitetable > .comment'), function(it) {
        it.classList.add('collapsed');
        it.classList.remove('noncollapsed');
        if (it.querySelector('.rc-preview')) return;
        var prev = document.createElement('div');
        prev.classList.add('rc-preview');
        prev.textContent = it.querySelector('.entry > .usertext > .usertext-body > .md').textContent;
        it.querySelector('.entry > .tagline').appendChild(prev);
    });
}
function removeCollapsed() {
    Array.prototype.forEach.call(document.querySelectorAll('.commentarea > .sitetable > .comment.collapsed'), function(it) {
        it.remove();
    });
    document.querySelector('.commentarea > .sitetable > .morechildren > .entry > .morecomments > a').click();
}

var style = document.createElement('style');
style.innerHTML = '.rc-container { position: fixed; left: -52px; top: 92px; background: rgb(69,78,89); width: 71px; box-shadow: 0 8px 6px -6px rgba(0,0,0,0.3); color: rgb(204,204,204); font-family: sans-serif; font-size: 11px; font-weight: bold; transition: ease-in-out 200ms; z-index: 1000; }';
style.innerHTML += '.rc-container:hover { left: 0; }';
style.innerHTML += '.rc-element { text-align: center; cursor: pointer; background: rgba(0,0,0,0); font-family: sans-serif; font-size: 10px; padding: 11px 8px 10px 8px; font-weight: 600; text-transform: uppercase; color: rgb(255,255,255); line-height: 19px; transition: 100ms ease-in-out; }';
style.innerHTML += '.rc-element:hover { background: rgb(52, 152, 219); }';
style.innerHTML += '.rc-preview { display: inline-block; white-space: nowrap; text-overflow: ellipsis; overflow: hidden; height: 14px; width: 100%; vertical-align: bottom; font-style: normal; }';
document.body.appendChild(style);

var container = document.createElement('div');
container.classList.add('rc-container');
document.body.appendChild(container);

var coll = document.createElement('div');
coll.classList.add('rc-element');
coll.textContent = 'Collapse';
container.appendChild(coll);
coll.addEventListener('click', collapseAll);

var rem = document.createElement('div');
rem.classList.add('rc-element');
rem.textContent = 'Remove';
container.appendChild(rem);
rem.addEventListener('click', removeCollapsed);

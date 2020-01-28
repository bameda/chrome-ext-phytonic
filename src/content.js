replacements = [
    {'find': 'python',        'replace': 'phyton'},
    {'find': 'Python',        'replace': 'Phyton'},
    {'find': 'PYTHON',        'replace': 'PHYTON'},

    {'find': 'PyCon',         'replace': 'PhyCon'},
    {'find': 'pycon',         'replace': 'phycon'},
    {'find': 'PYCON',         'replace': 'PHYCON'},
];

var observeDOM = (function(){
    var MutationObserver = window.MutationObserver || window.WebKitMutationObserver,
        eventListenerSupported = window.addEventListener;

    return function(obj, callback){
        if(MutationObserver){
            var obs = new MutationObserver(function(mutations, observer){
				mutations[0].addedNodes.forEach(function(node, idx) {
                    callback(node);
				})
            });
            obs.observe(obj, {childList:true, subtree:true});
        }
        else if(eventListenerSupported){
            obj.addEventListener('DOMNodeInserted', callback, false);
        }
    }
})();

// replace after the page is load
replacements.forEach(function(elem, idx) {
    findAndReplaceDOMText(document.body, {'find': elem.find, 'replace': elem.replace});
});

// replace at every change
observeDOM(document.body ,function(node){
    replacements.forEach(function(elem, idx) {
        findAndReplaceDOMText(node, {'find': elem.find, 'replace': elem.replace});
    });
});

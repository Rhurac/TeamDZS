var marked = require('marked');

window.commentBox = function(comm){
var commbox = comm.parentElement.nextElementSibling;
if(commbox.classList.contains("hidden")){
commbox.classList.remove("hidden");
}
else{
commbox.classList.add("hidden");
}
};

window.preview = function(btn){
var parent = btn.parentElement;
var commParent = parent.previousSibling;
var commBox = commParent.firstChild;
var input = commBox.value;
commBox.innerHTML = marked(input);
};
module.exports['commentBox'] = commentBox;
module.exports['preview'] = preview;

// pzplJS - 0.1 - Copyleft 2020 ProgramistaZpolski
function $(h){
    return document.querySelector(h);
}
function qfetch(fg1) {
  fetch(fg1)   
    .then(function (resp) { return resp.json() }) 
    .then(function (data) {
        console.log(data);
        return data;
    })
    .catch(function () {
    });
}

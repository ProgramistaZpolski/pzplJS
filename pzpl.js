// pzplJS - 0.1 - Copyleft 2020 ProgramistaZpolski
function $(h){
    return document.querySelector(h);
}
function fetcher(farg1) {
  fetch(farg1)   
    .then(function (resp) { return resp.json() }) 
    .then(function (data) {
        console.log(data);
        return data;
    })
    .catch(function () {
    });
}
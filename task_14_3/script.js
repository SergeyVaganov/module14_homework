function setLimit() {
    clearHtml();
    const lim = +document.getElementById("input").value;
    if ((Number.isInteger(lim)) && (lim <= 10) && (lim >= 1)) {
        useRequest(lim);
    }
    else {
        errorMsg();
    }
}

function useRequest(num) {
    const reqUrl = `https://jsonplaceholder.typicode.com/photos?_limit=${num}`;
    const xhr = new XMLHttpRequest();
    xhr.open('GET', reqUrl, true);
    xhr.send();
    xhr.onload = function () {
        const res = JSON.parse(xhr.response);
        listUrl = [];
        res.forEach((obj) => listUrl.push(obj.url));
        listUrl.forEach(draw);
    };
};

function clearHtml() {
    document.getElementsByClassName('error')[0].innerHTML = ''
    document.getElementsByClassName('gallery')[0].innerHTML = ''
}

function errorMsg(){
        const err = document.getElementsByClassName("error");
        const txt = document.createElement('div');
        txt.innerText = 'число вне диапазона от 1 до 10'
        err[0].append(txt);
}

function draw(urls) {
    const image = document.createElement("img");
    image.src = urls;
    image.style.width = "100%";
    const gallery = document.getElementsByClassName("gallery");
    gallery[0].append(image);
}
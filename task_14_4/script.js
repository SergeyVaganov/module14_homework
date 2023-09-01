function setLimit() {
    clearHtml();
    const width = +document.getElementById("input1").value;
    const height = +document.getElementById("input2").value;
    
    if ((Number.isInteger(width)) && (width <= 300) && (width >= 100) &&
        (Number.isInteger(height)) && (height <= 300) && (height >= 100)) {
        useRequest(width, height);
    }
    else {
        errorMsg('одно из чисел вне диапазона от 100 до 300');
    }
}

function useRequest(width, height) {
    const url = `https://dummyimage.com/${width}x${height}/`
    fetch(url)
    .then((response) => { draw(response.url, width, height )})
    .catch(() => {errorMsg('ошибка подключения к серверу'); });
};


function clearHtml() {
    document.getElementsByClassName('error')[0].innerHTML = ''
    document.getElementsByClassName('gallery')[0].innerHTML = ''
}

function errorMsg(msg){
        const err = document.getElementsByClassName("error");
        const txt = document.createElement('div');
        txt.innerText = msg;
        err[0].append(txt);
}

function draw(urls, width, height) {
    const image = document.createElement("img");
    image.src = urls;
    image.style.width = `${width}px`;
    image.style.height = `${height}px`;
    const gallery = document.getElementsByClassName("gallery");
    gallery[0].append(image);
}


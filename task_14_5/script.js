function setLimit() {
    clearHtml();
    const numberPage = +document.getElementById("number-page").value;
    const limit = +document.getElementById("limit").value;
    let err = 0;
    if ((!Number.isInteger(numberPage)) || (numberPage > 10) || (numberPage < 1)){
        err += 1
    }
    if ((!Number.isInteger(limit)) || (limit > 10) || (limit < 1)){
        err += 10;
    }
    switch(err){
        case 1: 
            errorMsg('Номер страницы вне диапазона от 1 до 10');
            break;
        case 10:
            errorMsg('Лимит вне диапазона от 1 до 10');
            break;            
        case 11:
            errorMsg('Номер страницы и лимит вне диапазона от 1 до 10');
            break;        
        default:
            useRequest(numberPage, limit);
    }
}

function useRequest(numberPage, limit) {
    const params = new URLSearchParams({
        _page: numberPage,
        _limit: limit,
      })
    fetch(`https://jsonplaceholder.typicode.com/photos?${params}`) 
    .then((response) => { return response.json() })
    .then((data) => {data.forEach((item) => draw(item.url, item.title))})
    .then(() => {localStorage.setItem("galleryNumberPage", numberPage);
                 localStorage.setItem("galleryLimit", limit)})
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

function draw(urls, alt) {
    const image = document.createElement("img");
    image.src = urls;
    image.style.width = `250px`;
    image.alt = alt;
    const gallery = document.getElementsByClassName("gallery");
    gallery[0].append(image);
}

function initGallery(){
    const limit = localStorage.getItem("galleryLimit");
    const numberPage = localStorage.getItem("galleryNumberPage");
    if ((limit) && (numberPage)){
        useRequest(numberPage, limit);
        document.getElementById("number-page").value = numberPage;
        document.getElementById("limit").value = limit;            
    }
}

//localStorage.removeItem("galleryLimit");
//localStorage.removeItem("galleryNumberPage");


initGallery();
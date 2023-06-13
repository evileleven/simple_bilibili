var app = document.querySelector(".APP");
var dropdown = document.querySelector(".dropdown");
app.onmouseover = function () {
    dropdown.style.display = 'block';
}
app.onmouseout = function () {
    dropdown.style.display = 'none';
}


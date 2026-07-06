requestAnimationFrame(function update() {
    for (let element of document.querySelectorAll(`.parentmeasure`)) {
        element.style.setProperty("--parent-measure-offset-height", String(element.parentElement.offsetHeight));
        element.style.setProperty("--parent-measure-offset-left", String(element.parentElement.offsetLeft));
        element.style.setProperty("--parent-measure-offset-top", String(element.parentElement.offsetTop));
        element.style.setProperty("--parent-measure-offset-width", String(element.parentElement.offsetWidth));
    };
    requestAnimationFrame(update);
});
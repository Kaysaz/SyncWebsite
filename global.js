// @ts-check
window.addEventListener("DOMContentLoaded", ev => {
    for (let burgerButton of document.querySelectorAll(`.burger-button`)) {
        burgerButton.addEventListener("click", cev => {
            "open" in burgerButton.attributes ? burgerButton.removeAttribute("open") : burgerButton.setAttribute("open", "");
        });
    };
});
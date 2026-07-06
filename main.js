// @ts-check

window.addEventListener("load", ev => {
    document.body.style.setProperty("--loaded", "1");
    // @ts-ignore
    document.querySelector(`.logo > lottie-player`).play();
});

const scroller = new Scroller(document.querySelector(".wrapper"));

(async () => {
    const faqc = document.querySelector(`#faq > main > ul`);
    const faqs = await (await fetch("https://syncstatic.cf/faq.json")).json();
    const faqt = await (await fetch("./../templates/faq.xml")).text();
    for (let faq of faqs) {
        faqc.innerHTML += String(faqt).replace("??", faq.q).replace("!!", faq.a);
    };
})();
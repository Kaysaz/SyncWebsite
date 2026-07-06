// @ts-check
class Scroller {
    /**
     * @property {HTMLElement} target
     * @property {Number} scrollMult
     * @property {Number} currScroll
     * @property {String} targetTransition
     */
    target = null;
    scrollMult = 1;
    currScroll = 0;
    targetTransition = "";
    /**
     * 
     * @param {Number} val 
     * @param {Number} min 
     * @param {Number} max 
     * @returns 
     */
     clamp(val, min, max) { return val > max ? max : val < min ? min : val };
    /**
     * 
     * @param {Number} deltaY 
     * @param {Boolean} setTo
     */
     updateScroll(deltaY, setTo = false) {
        if (setTo) window.scrollTo({top: deltaY, behavior: "smooth"});
        let max = this.target.getBoundingClientRect().height - window.innerHeight;
        document.body.style.height = `${this.target.getBoundingClientRect().height}px`;
        let currScroll = !setTo ? this.clamp(Number(document.body.style.getPropertyValue("--scroll")) + (deltaY * this.scrollMult), 0, max) : deltaY;
        this.currScroll = currScroll;
        if (!("frozen" in this.target.attributes)) {
            requestAnimationFrame(time => {
                document.body.style.setProperty("--scroll", String(currScroll));
                document.body.style.setProperty("--max-scroll", String(max));
            });
        };
        return true
    };

    /**
     * @param {HTMLElement} target 
     * @param {Number} scrollMult
     * @param {Boolean} smoothTouch
     */
    constructor(target, scrollMult = 1, smoothTouch = false) {
        this.target = target;
        this.scrollMult = scrollMult;
        this.targetTransition = getComputedStyle(target).transition.toString();
        target.style.position = "fixed";
        for (let a of document.querySelectorAll("a[href^=\"#\"]")) {
            a.addEventListener("click", e => {try {this.updateScroll(this.currScroll + document.querySelector(a.getAttribute("href")).getBoundingClientRect().top, true)} catch {}});
        };
        if (window.location.hash) try {this.updateScroll(this.currScroll + document.querySelector(window.location.hash).getBoundingClientRect().top, true)} catch {};
        this.updateScroll(0);
        if (!smoothTouch) {
            window.addEventListener("touchmove", async  ev => {
                target.style.transition = "none";
                for (let parallaxElement of document.querySelectorAll(`.is-parallax`)) {
                    // @ts-ignore
                    parallaxElement.style.transition = "none";
                };
            });
        };
        const returnTransition = () => {
            target.style.transition = this.targetTransition;
            for (let parallaxElement of document.querySelectorAll(`.is-parallax`)) {
                // @ts-ignore
                parallaxElement.style.transition = "";
            };
        };
        window.addEventListener("scroll", ev => this.updateScroll(window.scrollY, true));
        window.addEventListener("wheel", ev => this.updateScroll(ev.deltaY) && !smoothTouch && returnTransition());
        window.addEventListener("resize", ev => this.updateScroll(0));
    };
};
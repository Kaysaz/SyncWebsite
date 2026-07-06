// @ts-check

/**
 * 
 * @param {function} `callback` will only be called once.
 */
const once = callback => {
    if (callback.prototype.called === true) return;
    callback();
    Object.defineProperty(callback.prototype, "called", true);
};

/**
 * 
 * @param {number} val
 * @param {number} min
 * @param {number} max
 * @returns number
 */
const clamp = (val, min, max) => val > max ? max : val < min ? min : val;
/**
 * Updates the content of the iframe with current html and css.
 * @param {Window} frame - the window of the HTMLIframe that needs to be updated
 */
function updateIframe(frame) {
    frame.document.body.style.backgroundColor = "#fff";
    // Prepare HTML
    const html = document.querySelector("#inputHtml");
    if (html) {
        frame.document.body.innerHTML = html.value;
    }
    // Prepare css
    const css = document.querySelector("#inputCss").value;
    // Update only if there's some value
    if (css) {
        const cssVal = document.createTextNode(css);
        let style;
        // check if the style element exists
        if (!frame.document.querySelector("style")) {
            // create and append the style element to the head
            style = document.createElement("style");
            frame.document.head.append(style);
            style.type = "text/css";
            style.appendChild(cssVal);
        } else {
            // update the style element
            style = frame.document.querySelector("style");
            style.innerHTML = css;
        }
    }
    // Prepare js
    const js = document.querySelector("#inputJs").value;
    // Update only if there's a value
    if (js) {
        const scriptVal = document.createTextNode(js);
        let script;
        // Check if the script element exists
        if (!frame.document.querySelector("script")) {
            // Create and append the script element to head
            script = document.createElement("script");
            frame.document.body.appendChild(script);
            script.type = "text/javascript";
            script.appendChild(scriptVal);
        } else {
            // update the script element
            script = frame.document.querySelector("script");
            script.innerHTML = js;
        }
    }
}
const iframe = document.querySelector("iframe").contentWindow;
document.querySelector("#inputHtml").addEventListener("keyup", function(e) {
    if (e.target.value.endsWith("<") || e.target.value.endsWith("/")) {
        return;
    }
    updateIframe(iframe);
});
document.querySelector("#inputCss").addEventListener("keyup", function(e) {
    updateIframe(iframe);
});

document.querySelector("#inputJs").addEventListener("keyup", function(e) {
    updateIframe(iframe);
});
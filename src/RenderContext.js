export class RenderContext {
    constructor(component) {
        this.component = component;
    }

    $(selector) {
        return this.component.querySelector(selector);
    }

    sendKey(selector, text) {
        const input = this.component
            .querySelector(selector)
            .shadowRoot.querySelector("input");

        input.value = text;
        input.dispatchEvent(new InputEvent("input", {
            bubbles: true
        }));
    }

    static render(ComponentConstructor) {
        const component = new ComponentConstructor();

        document.body.innerHTML = "";
        document.body.appendChild(component);

        return new RenderContext(component);
    }
}

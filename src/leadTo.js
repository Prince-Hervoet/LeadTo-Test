class LeadToObject {
    constructor(steps, parentDom, highLightDom) {
        this.currentStep = -1;
        this.steps = steps;
        this.parentDom = parentDom;
        this.highLightDom = highLightDom;
    }
    next() {
        if (this.currentStep === this.steps.length) {
            return;
        }
        this.currentStep += 1;
        this.leadToShow(this.currentStep);
    }
    leadToShow(index) {
        if (index < 0 || index >= this.steps.length) {
            this.cancel();
            return;
        }
        const step = this.steps[index];
        let styleStr = "";
        for (const key in step.highLightBlockProps) {
            styleStr += `${key}: ${step.highLightBlockProps[key]}px;`;
        }
        if (!this.parentDom.contains(this.highLightDom)) {
            this.parentDom.appendChild(this.highLightDom);
        }
        this.highLightDom.setAttribute("style", styleStr);
    }
    cancel() {
        if (this.currentStep === -1) {
            return;
        }
        if (this.parentDom.contains(this.highLightDom)) {
            this.highLightDom.setAttribute("style", "display: none;");
        }
    }
    reset() {
        this.currentStep = -1;
        if (this.parentDom.contains(this.highLightDom)) {
            this.parentDom.removeChild(this.highLightDom);
        }
    }
}
export function leadTo(obj) {
    let parentDom = document.querySelector(obj.parentElementFlag);
    if (!parentDom) {
        parentDom = document.querySelector("body");
    }
    const hd = createHighLightBlock();
    const steps = obj.steps;
    const res = new LeadToObject(steps, parentDom, hd);
    return res;
}
function createHighLightBlock() {
    const highLightBlock = document.createElement("div");
    highLightBlock.classList.add("leadTo-highLightBlock");
    return highLightBlock;
}

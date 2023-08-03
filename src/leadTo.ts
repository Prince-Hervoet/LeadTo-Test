type Dom = HTMLElement | null;

export interface cssObject {}

export interface HighLightBlockProps {
  left: number;
  top: number;
  width: number;
  height: number;
}

export interface StepObject {
  highLightBlockProps: HighLightBlockProps;
}

export interface ShowObject {
  parentElementFlag: string;
  steps: StepObject[];
}

class LeadToObject {
  private steps: StepObject[];
  private parentDom: HTMLElement;
  private highLightDom: HTMLElement;
  private currentStep: number = -1;

  constructor(
    steps: StepObject[],
    parentDom: HTMLElement,
    highLightDom: HTMLElement
  ) {
    this.steps = steps;
    this.parentDom = parentDom;
    this.highLightDom = highLightDom;
  }

  public next() {
    if (this.currentStep === this.steps.length) {
      return;
    }
    this.currentStep += 1;
    this.leadToShow(this.currentStep);
  }

  public leadToShow(index: number) {
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

  public cancel() {
    if (this.currentStep === -1) {
      return;
    }
    if (this.parentDom.contains(this.highLightDom)) {
      this.highLightDom.setAttribute("style", "display: none;");
    }
  }

  public reset() {
    this.currentStep = -1;
    if (this.parentDom.contains(this.highLightDom)) {
      this.parentDom.removeChild(this.highLightDom);
    }
  }
}

export function leadTo(obj: ShowObject) {
  let parentDom: Dom = document.querySelector(obj.parentElementFlag);
  if (!parentDom) {
    parentDom = document.querySelector("body");
  }
  const hd = createHighLightBlock();
  const steps = obj.steps;
  const res = new LeadToObject(steps, parentDom!, hd);
  return res;
}

function createHighLightBlock() {
  const highLightBlock = document.createElement("div");
  highLightBlock.classList.add("leadTo-highLightBlock");
  return highLightBlock;
}

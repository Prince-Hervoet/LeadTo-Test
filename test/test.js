import { leadTo } from "../src/leadTo.js";
const testObj = leadTo({
  parentElementFlag: "body",
  steps: [
    { highLightBlockProps: { left: 0, top: 0, width: 100, height: 100 } },
    { highLightBlockProps: { left: 200, top: 200, width: 100, height: 100 } },
    { highLightBlockProps: { left: 200, top: 400, width: 100, height: 100 } },
  ],
});
testObj.next();
setTimeout(() => {
  testObj.next();
}, 2000);
setTimeout(() => {
  testObj.next();
}, 4000);

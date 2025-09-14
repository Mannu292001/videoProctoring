import * as cocoSsd from "@tensorflow-models/coco-ssd";
import { initTF } from "./initTF";

let model;

export async function loadObjectModel() {
  if (!model) {
    await initTF();
    model = await cocoSsd.load();
    console.log("✅ COCO-SSD object detection model loaded");
  }
  return model;
}

// Detect objects (phone, book, laptop, etc.)
export async function detectObjects(videoEl) {
  const objectModel = await loadObjectModel();
  const predictions = await objectModel.detect(videoEl);

  // filter for suspicious items
  const flagged = predictions.filter(pred =>
    ["cell phone", "book", "laptop"].includes(pred.class.toLowerCase())
  );

  return flagged;
}

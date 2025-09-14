import * as blazeface from "@tensorflow-models/blazeface";
import { initTF } from "./initTF";

let model;

export async function loadFaceModel() {
  if (!model) {
    await initTF();
    model = await blazeface.load();
    console.log("✅ Blazeface model loaded");
  }
  return model;
}

// Detect face(s) in a video element
export async function detectFace(videoEl) {
  const faceModel = await loadFaceModel();
  const predictions = await faceModel.estimateFaces(videoEl, false);
  return predictions; // array of faces with bounding boxes
}

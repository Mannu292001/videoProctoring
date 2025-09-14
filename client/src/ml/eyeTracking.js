// src/ml/eyeTracking.js
import * as poseDetection from "@tensorflow-models/pose-detection";
import "@tensorflow/tfjs-backend-webgl";

let detector;

export const loadEyeTrackingModel = async () => {
  if (detector) return detector;

  try {
    // ✅ Use enum, not raw string
    detector = await poseDetection.createDetector(
      poseDetection.SupportedModels.MoveNet,
      {
        modelType: poseDetection.movenet.modelType.SINGLEPOSE_LIGHTNING, // ✅ FIX
      }
    );

    console.log("✅ Eye tracking model loaded (MoveNet Lightning)");
    return detector;
  } catch (err) {
    console.error("❌ Failed to load eye tracking model:", err);
    return null;
  }
};

export const detectEyes = async (video) => {
  if (!detector) await loadEyeTrackingModel();
  if (!detector) return [];

  try {
    const poses = await detector.estimatePoses(video);
    return poses; // Includes keypoints for eyes, nose, shoulders, etc.
  } catch (err) {
    console.error("❌ Eye detection failed:", err);
    return [];
  }
};

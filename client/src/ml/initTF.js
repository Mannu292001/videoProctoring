import * as tf from "@tensorflow/tfjs";

// Initialize TensorFlow.js backend
export async function initTF() {
  try {
    await tf.setBackend("webgl"); // use webgl (faster than cpu)
    await tf.ready();
    console.log("✅ TensorFlow.js ready with backend:", tf.getBackend());
  } catch (err) {
    console.error("❌ Error initializing TensorFlow.js:", err);
  }
}

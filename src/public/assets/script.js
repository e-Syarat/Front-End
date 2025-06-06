let model;
const classNames = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i)); // A-Z
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Load model
async function loadModel() {
  model = await tf.loadGraphModel('static/tfjs_model/model.json');
  console.log("✅ Model loaded:", model);
  document.getElementById("output").innerText = "Model loaded!";
}
loadModel();

// Convert uploaded image to tensor
function preprocessImage(image) {
  return tf.tidy(() => {
    return tf.browser.fromPixels(image)
      .resizeNearestNeighbor([128, 128])
      .toFloat()
      .div(255.0)
      .expandDims(0); // [1, 128, 128, 3]
  });
}

// Convert normalized bbox to pixel coordinates
function denormBBox(box, width, height) {
  const [x, y, w, h] = box;
  const x1 = (x - w / 2) * width;
  const y1 = (y - h / 2) * height;
  const x2 = (x + w / 2) * width;
  const y2 = (y + h / 2) * height;
  return [x1, y1, x2, y2];
}

// Prediction handler
document.getElementById('imageUpload').addEventListener('change', async (event) => {
  const file = event.target.files[0];
  if (!file || !model) {
    console.error("❌ No file uploaded or model not loaded.");
    return;
  }

  const img = new Image();
  img.onload = async () => {
    canvas.width = img.width;
    canvas.height = img.height;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    let tensor;
    try {
      tensor = preprocessImage(img);
      const predictions = await model.predict(tensor).array();

      if (predictions && predictions[0]) {
        const bbox = predictions[0].slice(0, 4);
        const classProbs = predictions[0].slice(4);
        const predIndex = classProbs.indexOf(Math.max(...classProbs));
        const label = classNames[predIndex] || "Unknown";

        const [x1, y1, x2, y2] = denormBBox(bbox, canvas.width, canvas.height);

        ctx.strokeStyle = 'red';
        ctx.lineWidth = 2;
        ctx.strokeRect(x1, y1, x2 - x1, y2 - y1);

        ctx.fillStyle = 'red';
        ctx.font = '16px sans-serif';
        ctx.fillText(label, x1, y1 > 20 ? y1 - 5 : y1 + 20);

        document.getElementById('output').innerText = `Detected: ${label}`;
      } else {
        console.error("⚠️ Invalid prediction output:", predictions);
      }
    } catch (error) {
      console.error("❌ Prediction failed:", error);
    } finally {
      if (tensor) tf.dispose(tensor);
    }
  };

  img.src = URL.createObjectURL(file);
});

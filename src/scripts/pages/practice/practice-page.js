// import { Camera } from "../../utils/camera.js";

export default class PracticePage {
  constructor(root) {
    this.root = root;
    this.stream = null;
    this.selectedDeviceId = null;
    this.model = null;
    this.isDetecting = false;
    this.animationFrameId = null;
  }

  async render() {
    this.root.innerHTML = `
      <section class="practice-section" style="display:flex; flex-direction:column; align-items:center;">
        <h2 class="practice-title">Mulai Belajar Bahasa Isyarat</h2>
        <p class="practice-desc">Gunakan kamera Anda untuk mulai belajar bahasa isyarat secara langsung.<br>Pastikan tangan Anda terlihat jelas di kamera.</p>
        <div class="practice-camera-card" style="margin: 0 auto; display: flex; flex-direction: column; align-items: center;">
          <label for="camera-select" style="margin-bottom:8px; font-size:1rem;">Pilih Kamera:</label>
          <select id="camera-select" style="margin-bottom:12px; padding:6px 12px; border-radius:6px; border:1px solid #ccc;"></select>
          <div class="practice-camera-view" style="display:flex; flex-direction:column; align-items:center;">
            <video id="practice-video" autoplay playsinline style="background:#222; border-radius:12px; width:480px; max-width:100%;"></video>
            <span class="camera-status">Kamera <span id="camera-status-label">Nonaktif</span></span>
            <div id="prediction-result" style="margin-top:12px; font-size:1.2rem; font-weight:600;">
              <span>Prediksi: </span><span id="prediction-label">-</span>
              <div style="font-size:0.9rem; color:#666;">
                Confidence: <span id="prediction-confidence">-</span>
              </div>
            </div>
          </div>
          <div class="practice-controls" style="margin-top:16px; display:flex; gap:12px;">
            <button class="btn" id="start-camera">Nyalakan Kamera</button>
            <button class="btn btn-danger" id="stop-camera">Matikan Kamera</button>
          </div>
          <div id="loading-model" style="display:none; margin-top:12px;">
            <p>Memuat model bahasa isyarat...</p>
          </div>
        </div>
      </section>
      <!-- Section Kategori di bawah kamera -->
      <section class="practice-category-section" style="width:100%; max-width:1100px; margin: 40px auto 0 auto;">
        <h3 style="font-size:1.4rem; font-weight:700; margin-bottom:18px;">Pilih Kategori untuk Berlatih</h3>
        <div style="display:flex; gap:24px; flex-wrap:wrap; justify-content:center;">
          <!-- Alphabet Card -->
          <div class="practice-category-card" id="category-alphabet" style="flex:1 1 260px; min-width:260px; max-width:320px; background:#fff; border-radius:16px; box-shadow:0 2px 8px #0001; padding:24px; cursor:pointer; display:flex; flex-direction:column; gap:8px; align-items:flex-start; transition:box-shadow .2s;">
            <div style="display:flex; align-items:center; gap:12px;">
              <div style="background:#e6edff; color:#3b5bfd; border-radius:50%; width:38px; height:38px; display:flex; align-items:center; justify-content:center; font-weight:700; font-size:1.2rem;">A</div>
              <span style="font-weight:600; font-size:1.1rem;">Alphabet</span>
            </div>
            <div style="font-size:.98rem; color:#444; margin-bottom:8px;">Belajar Simbol ABC's</div>
            <div style="font-size:.95rem; color:#888;">26 lessons</div>
            <div style="font-size:.95rem; color:#3b5bfd; margin-bottom:4px;">85% complete</div>
            <div style="width:100%; height:6px; background:#e6edff; border-radius:4px; overflow:hidden;">
              <div style="width:85%; height:100%; background:#3b5bfd; border-radius:4px;"></div>
            </div>
          </div>
          <!-- Numbers Card -->
          <div class="practice-category-card" id="category-numbers" style="flex:1 1 260px; min-width:260px; max-width:320px; background:#fff; border-radius:16px; box-shadow:0 2px 8px #0001; padding:24px; cursor:pointer; display:flex; flex-direction:column; gap:8px; align-items:flex-start; transition:box-shadow .2s;">
            <div style="display:flex; align-items:center; gap:12px;">
              <div style="background:#f3eaff; color:#a259e6; border-radius:50%; width:38px; height:38px; display:flex; align-items:center; justify-content:center; font-weight:700; font-size:1.2rem;">#</div>
              <span style="font-weight:600; font-size:1.1rem;">Angka</span>
            </div>
            <div style="font-size:.98rem; color:#444; margin-bottom:8px;">Menguasai angka dan berhitung</div>
            <div style="font-size:.95rem; color:#888;">20 lessons</div>
            <div style="font-size:.95rem; color:#a259e6; margin-bottom:4px;">60% complete</div>
            <div style="width:100%; height:6px; background:#f3eaff; border-radius:4px; overflow:hidden;">
              <div style="width:60%; height:100%; background:#a259e6; border-radius:4px;"></div>
            </div>
          </div>
        </div>
      </section>
    `;

    // --- Integrasi deteksi seperti detection.js ---
    // Load library tfjs jika belum ada
    if (!window.tf) {
      const tfScript = document.createElement('script');
      tfScript.src = 'https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@latest/dist/tf.min.js';
      document.head.appendChild(tfScript);
      await new Promise(resolve => tfScript.onload = resolve);
    }

    // Inisialisasi elemen
    const video = document.getElementById("practice-video");
    const cameraStatus = document.getElementById("camera-status-label");
    const startBtn = document.getElementById("start-camera");
    const stopBtn = document.getElementById("stop-camera");
    const loadingModel = document.getElementById("loading-model");
    const predictionLabel = document.getElementById("prediction-label");
    const predictionConfidence = document.getElementById("prediction-confidence");
    const cameraSelect = document.getElementById("camera-select");

    // Path model Anda (ubah sesuai kebutuhan)
    const MODEL_PATH = '/assets/tfjs_model/model.json';
    const IMAGE_SIZE = 128;
    const CLASS_NAMES = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));

    let model = null;

    // Kamera
    let stream = null;
    let isDetecting = false;
    let animationFrameId = null;

    // Fungsi untuk mengisi dropdown kamera
    async function populateCameraOptions() {
      cameraSelect.innerHTML = '<option value="">Memuat kamera...</option>';
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices.filter(device => device.kind === 'videoinput');
        cameraSelect.innerHTML = '';
        videoDevices.forEach((device, idx) => {
          const option = document.createElement('option');
          option.value = device.deviceId;
          option.text = device.label || `Kamera ${idx + 1}`;
          cameraSelect.appendChild(option);
        });
      } catch (err) {
        cameraSelect.innerHTML = '<option value="">Tidak dapat memuat kamera</option>';
      }
    }
    await populateCameraOptions();

    async function startCamera() {
      try {
        loadingModel.style.display = "block";
        if (!model) {
          model = await tf.loadGraphModel(MODEL_PATH);
          // Warmup
          const dummy = tf.zeros([1, IMAGE_SIZE, IMAGE_SIZE, 3]);
          await model.executeAsync(dummy);
          dummy.dispose();
        }
        loadingModel.style.display = "none";
        const selectedDeviceId = cameraSelect.value;
        const constraints = selectedDeviceId ? { video: { deviceId: { exact: selectedDeviceId } } } : { video: true };
        stream = await navigator.mediaDevices.getUserMedia(constraints);
        video.srcObject = stream;
        await video.play();
        cameraStatus.textContent = "Aktif";
        isDetecting = true;
        detectLoop();
      } catch (err) {
        loadingModel.style.display = "none";
        cameraStatus.textContent = "Gagal";
        alert("Tidak dapat mengakses kamera: " + err.message);
      }
    }

    function stopCamera() {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
        stream = null;
      }
      cameraStatus.textContent = "Nonaktif";
      predictionLabel.textContent = "-";
      predictionConfidence.textContent = "-";
      isDetecting = false;
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    }

    async function detectLoop() {
      if (!isDetecting) return;
      if (video.readyState === 4) {
        // Ambil frame dari video, resize, normalisasi
        const input = tf.tidy(() => {
          let img = tf.browser.fromPixels(video);
          img = tf.image.resizeBilinear(img, [IMAGE_SIZE, IMAGE_SIZE]);
          img = tf.div(img, 255.0);
          return img.expandDims(0);
        });
        // Prediksi
        const prediction = await model.executeAsync(input);
        let data;
        if (Array.isArray(prediction)) {
          data = prediction[0].dataSync();
        } else if (typeof prediction.dataSync === 'function') {
          data = prediction.dataSync();
        } else {
          data = Object.values(prediction)[0].dataSync();
        }
        const classIndex = data.indexOf(Math.max(...data));
        const confidence = data[classIndex];
        predictionLabel.textContent = CLASS_NAMES[classIndex] || '-';
        predictionConfidence.textContent = `${(confidence * 100).toFixed(1)}%`;
        tf.dispose([input, prediction]);
      }
      animationFrameId = requestAnimationFrame(detectLoop);
    }
    detectLoop = detectLoop.bind(this);

    startBtn.onclick = startCamera;
    stopBtn.onclick = stopCamera;

    // Redirect kategori
    document.getElementById("category-alphabet").onclick = () => {
      window.location.hash = "#/dictionary/alphabet";
    };
    document.getElementById("category-numbers").onclick = () => {
      window.location.hash = "#/dictionary/numbers";
    };
  }
}

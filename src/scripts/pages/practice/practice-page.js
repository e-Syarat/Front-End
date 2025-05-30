export default class PracticePage {
  constructor(root) {
    this.root = root;
    this.stream = null;
    this.selectedDeviceId = null;
  }

  async render() {
    this.root.innerHTML = `
      <section class="practice-section" style="display:flex; flex-direction:column; align-items:center;">
        <h2 class="practice-title">Mulai Belajar Bahasa Isyarat</h2>
        <p class="practice-desc">Gunakan kamera Anda untuk mulai belajar bahasa isyarat secara langsung.<br>Pastikan tangan Anda terlihat jelas di kamera.</p>
        <div class="practice-camera-card" style="margin: 0 auto; display: flex; flex-direction: column; align-items: center;">
          <div style="margin-bottom:12px;">
            <label for="camera-select"><b>Pilih Kamera:</b></label>
            <select id="camera-select" style="padding:6px 12px; border-radius:6px; margin-left:8px;"></select>
          </div>
          <div class="practice-camera-view" style="display:flex; flex-direction:column; align-items:center;">
            <video id="practice-video" autoplay playsinline style="background:#222; border-radius:12px; width:480px; max-width:100%;"></video>
            <span class="camera-status">Kamera <span id="camera-status-label">Nonaktif</span></span>
          </div>
          <div class="practice-controls" style="margin-top:16px; display:flex; gap:12px;">
            <button class="btn" id="start-camera">Nyalakan Kamera</button>
            <button class="btn btn-danger" id="stop-camera">Matikan Kamera</button>
            <button class="btn" id="start-detect">Mulai Deteksi</button>
            <button class="btn btn-danger" id="stop-detect">Berhenti</button>
          </div>
          <div class="practice-result" style="margin-top:24px;">
            <h4>Hasil Deteksi</h4>
            <div id="detection-result">
              <span style="font-size:2rem;">🖐️</span>
              <b>---</b>
              <p>Gerakan tangan tidak terdeteksi</p>
            </div>
            <!--
              TODO: Integrasi API machine learning untuk deteksi gesture tangan.
              - Ambil frame dari video
              - Kirim ke API ML
              - Tampilkan hasil di #detection-result
            -->
          </div>
        </div>
      </section>
      <!-- Section Kategori di bawah kamera -->
      <section class="practice-category-section" style="width:100%; max-width:1100px; margin: 40px auto 0 auto;">
        <h3 style="font-size:1.4rem; font-weight:700; margin-bottom:18px;">Choose a Category to Practice</h3>
        <div style="display:flex; gap:24px; flex-wrap:wrap; justify-content:center;">
          <!-- Alphabet Card -->
          <div class="practice-category-card" id="category-alphabet" style="flex:1 1 260px; min-width:260px; max-width:320px; background:#fff; border-radius:16px; box-shadow:0 2px 8px #0001; padding:24px; cursor:pointer; display:flex; flex-direction:column; gap:8px; align-items:flex-start; transition:box-shadow .2s;">
            <div style="display:flex; align-items:center; gap:12px;">
              <div style="background:#e6edff; color:#3b5bfd; border-radius:50%; width:38px; height:38px; display:flex; align-items:center; justify-content:center; font-weight:700; font-size:1.2rem;">A</div>
              <span style="font-weight:600; font-size:1.1rem;">Alphabet</span>
            </div>
            <div style="font-size:.98rem; color:#444; margin-bottom:8px;">Learn to sign the ABC's</div>
            <div style="font-size:.95rem; color:#888;">26 lessons <!-- TODO: Ganti jumlah lesson dari database --></div>
            <div style="font-size:.95rem; color:#3b5bfd; margin-bottom:4px;">85% complete <!-- TODO: Ganti progress dari database --></div>
            <div style="width:100%; height:6px; background:#e6edff; border-radius:4px; overflow:hidden;">
              <div style="width:85%; height:100%; background:#3b5bfd; border-radius:4px;"></div> <!-- TODO: Ganti width dari progress database -->
            </div>
          </div>
          <!-- Numbers Card -->
          <div class="practice-category-card" id="category-numbers" style="flex:1 1 260px; min-width:260px; max-width:320px; background:#fff; border-radius:16px; box-shadow:0 2px 8px #0001; padding:24px; cursor:pointer; display:flex; flex-direction:column; gap:8px; align-items:flex-start; transition:box-shadow .2s;">
            <div style="display:flex; align-items:center; gap:12px;">
              <div style="background:#f3eaff; color:#a259e6; border-radius:50%; width:38px; height:38px; display:flex; align-items:center; justify-content:center; font-weight:700; font-size:1.2rem;">#</div>
              <span style="font-weight:600; font-size:1.1rem;">Numbers</span>
            </div>
            <div style="font-size:.98rem; color:#444; margin-bottom:8px;">Master numbers and counting</div>
            <div style="font-size:.95rem; color:#888;">20 lessons <!-- TODO: Ganti jumlah lesson dari database --></div>
            <div style="font-size:.95rem; color:#a259e6; margin-bottom:4px;">60% complete <!-- TODO: Ganti progress dari database --></div>
            <div style="width:100%; height:6px; background:#f3eaff; border-radius:4px; overflow:hidden;">
              <div style="width:60%; height:100%; background:#a259e6; border-radius:4px;"></div> <!-- TODO: Ganti width dari progress database -->
            </div>
          </div>
          <!-- Daily Phrases Card -->
          <div class="practice-category-card" id="category-phrases" style="flex:1 1 260px; min-width:260px; max-width:320px; background:#fff; border-radius:16px; box-shadow:0 2px 8px #0001; padding:24px; cursor:pointer; display:flex; flex-direction:column; gap:8px; align-items:flex-start; transition:box-shadow .2s;">
            <div style="display:flex; align-items:center; gap:12px;">
              <div style="background:#ffe9d6; color:#ff9900; border-radius:50%; width:38px; height:38px; display:flex; align-items:center; justify-content:center; font-weight:700; font-size:1.2rem;">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2C5.58 2 2 5.13 2 9c0 1.61.7 3.09 1.88 4.27-.13.44-.47 1.56-.6 2.01-.1.33.24.62.54.48.66-.3 1.98-.91 2.67-1.22C7.7 14.84 8.82 15 10 15c4.42 0 8-3.13 8-7s-3.58-7-8-7z"></path></svg>
              </div>
              <span style="font-weight:600; font-size:1.1rem;">Daily Phrases</span>
            </div>
            <div style="font-size:.98rem; color:#444; margin-bottom:8px;">Common everyday expressions</div>
            <div style="font-size:.95rem; color:#888;">30 lessons <!-- TODO: Ganti jumlah lesson dari database --></div>
            <div style="font-size:.95rem; color:#ff9900; margin-bottom:4px;">40% complete <!-- TODO: Ganti progress dari database --></div>
            <div style="width:100%; height:6px; background:#ffe9d6; border-radius:4px; overflow:hidden;">
              <div style="width:40%; height:100%; background:#ff9900; border-radius:4px;"></div> <!-- TODO: Ganti width dari progress database -->
            </div>
          </div>
        </div>
      </section>
    `;

    // Kamera logic
    const video = document.getElementById("practice-video");
    const cameraStatus = document.getElementById("camera-status-label");
    const startBtn = document.getElementById("start-camera");
    const stopBtn = document.getElementById("stop-camera");
    const cameraSelect = document.getElementById("camera-select");

    // Populate camera options
    if (navigator.mediaDevices && navigator.mediaDevices.enumerateDevices) {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const videoDevices = devices.filter((d) => d.kind === "videoinput");
      cameraSelect.innerHTML = videoDevices
        .map(
          (d, i) =>
            `<option value="${d.deviceId}">${
              d.label || "Kamera " + (i + 1)
            }</option>`
        )
        .join("");
      this.selectedDeviceId = videoDevices[0]?.deviceId || null;
      cameraSelect.onchange = (e) => {
        this.selectedDeviceId = e.target.value;
        if (this.stream) {
          // Ganti kamera jika sedang aktif
          stopCamera();
          startCamera();
        }
      };
    }

    const startCamera = async () => {
      if (!this.selectedDeviceId) return;
      if (!this.stream) {
        try {
          this.stream = await navigator.mediaDevices.getUserMedia({
            video: { deviceId: { exact: this.selectedDeviceId } },
          });
          video.srcObject = this.stream;
          cameraStatus.textContent = "Aktif";
        } catch (err) {
          video.parentElement.innerHTML =
            '<p style="color:red">Tidak dapat mengakses kamera.</p>';
        }
      }
    };
    const stopCamera = () => {
      if (this.stream) {
        this.stream.getTracks().forEach((track) => track.stop());
        video.srcObject = null;
        this.stream = null;
        cameraStatus.textContent = "Nonaktif";
      }
    };

    // Pasang event listener tombol dengan error handling
    try {
      startBtn.onclick = startCamera;
      stopBtn.onclick = stopCamera;
      document.getElementById("start-detect").onclick = () => {
        document.getElementById("detection-result").innerHTML =
          '<span style="font-size:2rem;">🖐️</span><b>Halo</b><p>Gerakan tangan terdeteksi</p>';
      };
      document.getElementById("stop-detect").onclick = () => {
        document.getElementById("detection-result").innerHTML =
          '<span style="font-size:2rem;">🖐️</span><b>---</b><p>Gerakan tangan tidak terdeteksi</p>';
      };
    } catch (e) {
      console.error("Error memasang event listener tombol kamera/deteksi:", e);
    }

    // Otomatis matikan kamera saat pindah halaman
    window.addEventListener("hashchange", () => {
      stopCamera();
    });

    // Tambahkan event listener untuk redirect kartu kategori
    document.getElementById("category-alphabet").onclick = () => {
      window.location.hash = "#/dictionary/alphabet";
    };
    document.getElementById("category-numbers").onclick = () => {
      window.location.hash = "#/dictionary/numbers";
    };
    // Daily Phrases belum diarahkan, bisa ditambah nanti jika ada halaman khusus
  }
}

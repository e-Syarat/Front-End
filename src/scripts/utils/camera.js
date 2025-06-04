export class Camera {
  constructor(videoElement) {
    this.videoElement = videoElement;
    this.stream = null;
    this._onHashChange = this._onHashChange.bind(this);
  }

  async startCamera(constraints = { video: { facingMode: "environment" } }) {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      throw new Error("Camera API tidak didukung browser ini");
    }
    this.stream = await navigator.mediaDevices.getUserMedia(constraints);
    this.videoElement.srcObject = this.stream;
    await this.videoElement.play();
    window.addEventListener("hashchange", this._onHashChange);
  }

  stopCamera() {
    if (this.stream) {
      this.stream.getTracks().forEach((track) => track.stop());
      this.videoElement.srcObject = null;
      this.stream = null;
    }
    window.removeEventListener("hashchange", this._onHashChange);
  }

  _onHashChange() {
    this.stopCamera();
  }
}

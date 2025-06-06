import { SignLanguageModel } from './sign-language-model';

export class Camera {
  constructor(videoElement) {
    this.videoElement = videoElement;
    this.stream = null;
    this._onHashChange = this._onHashChange.bind(this);
    this.signLanguageModel = new SignLanguageModel();
    this.isModelRunning = false;
    this.predictionCallback = null;
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
    this.stopPrediction();
  }

  async initializeModel() {
    try {
      await this.signLanguageModel.loadModel();
      console.log('Sign language model initialized');
    } catch (error) {
      console.error('Failed to initialize sign language model:', error);
      throw error;
    }
  }

  startPrediction(callback) {
    if (!this.signLanguageModel.isModelLoaded) {
      throw new Error('Model not initialized. Call initializeModel() first.');
    }

    this.predictionCallback = callback;
    this.isModelRunning = true;
    this._predict();
  }

  stopPrediction() {
    this.isModelRunning = false;
  }

  async _predict() {
    if (!this.isModelRunning || !this.stream) return;

    try {
      const result = await this.signLanguageModel.predict(this.videoElement);

      if (this.predictionCallback) {
        this.predictionCallback(result);
      }
    } catch (error) {
      console.error('Prediction error:', error);
    }

    // Continue prediction loop
    if (this.isModelRunning) {
      requestAnimationFrame(() => this._predict());
    }
  }

  _onHashChange() {
    this.stopCamera();
  }
}

import * as tf from '@tensorflow/tfjs';
import * as handpose from '@tensorflow-models/handpose';

export class SignLanguageModel {
    constructor() {
        this.model = null;
        this.handposeModel = null;
        this.isModelLoaded = false;
        this.predictionCallback = null;
        this.inputShape = [128, 128];
    }

    async loadModel() {
        try {
            // Load handpose model for hand detection
            this.handposeModel = await handpose.load();

            // Load your custom sign language model
            this.model = await tf.loadLayersModel('/assets/tfjs_model/tfjs_model/model.json', {
                strict: false
            });

            // Warm up the model
            const dummyInput = tf.zeros([1, ...this.inputShape, 3]); // 3 channel input (RGB)
            const warmupResult = await this.model.predict(dummyInput);
            tf.dispose([dummyInput, ...Array.isArray(warmupResult) ? warmupResult : [warmupResult]]);

            this.isModelLoaded = true;
            console.log('Model loaded successfully');
        } catch (error) {
            console.error('Error loading model:', error);
            throw error;
        }
    }

    async detectHands(video) {
        if (!this.handposeModel) {
            throw new Error('Handpose model not loaded');
        }

        // Get hand landmarks
        const predictions = await this.handposeModel.estimateHands(video);
        return predictions;
    }

    preprocessImage(video) {
        return tf.tidy(() => {
            // Capture the video frame (RGB)
            const videoFrame = tf.browser.fromPixels(video);
            // Resize to model input size
            const resized = tf.image.resizeBilinear(videoFrame, this.inputShape);
            // Normalize pixel values to [0,1]
            const normalized = tf.div(resized, 255.0);
            // Add batch dimension
            return normalized.expandDims(0);
        });
    }

    async predict(video) {
        if (!this.isModelLoaded) {
            throw new Error('Model not loaded');
        }

        try {
            // Detect hands first
            const hands = await this.detectHands(video);

            if (hands.length === 0) {
                return { label: 'No hands detected', confidence: 0 };
            }

            // Preprocess the image
            const input = this.preprocessImage(video);

            // Make prediction
            const prediction = this.model.predict(input);

            // Get class with highest probability
            const classIndex = tf.argMax(prediction, 1).dataSync()[0];
            const confidence = prediction.max().dataSync()[0];

            // Cleanup tensors
            tf.dispose([input, prediction]);

            // Get label for the predicted class
            const label = this.getLabel(classIndex);

            return {
                label,
                confidence,
                bbox: {
                    x: hands[0].boundingBox.topLeft[0] / video.width,
                    y: hands[0].boundingBox.topLeft[1] / video.height,
                    width: (hands[0].boundingBox.bottomRight[0] - hands[0].boundingBox.topLeft[0]) / video.width,
                    height: (hands[0].boundingBox.bottomRight[1] - hands[0].boundingBox.topLeft[1]) / video.height
                }
            };
        } catch (error) {
            console.error('Prediction error:', error);
            throw error;
        }
    }

    getLabel(index) {
        // Map index to alphabet (0-25 to A-Z)
        return String.fromCharCode(65 + index);
    }

    setPredictionCallback(callback) {
        this.predictionCallback = callback;
    }
} 
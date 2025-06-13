import { getQuiz } from "../../../data/api";

export default class QuizModel {
  constructor() {
    this.quizData = [];
    this.currentIndex = 0;
    this.score = 0;
    this.answered = false;
  }

  async fetchQuiz() {
    try {
      const token = localStorage.getItem("token");
      const res = await getQuiz(token);
      if (res.status === "ok" && res.data) {
        // Jika data array, return langsung. Jika object, bungkus ke array.
        this.quizData = Array.isArray(res.data) ? res.data : [res.data];
        this.reset();
        return this.quizData;
      }
      return [];
    } catch (e) {
      return [];
    }
  }

  reset() {
    this.currentIndex = 0;
    this.score = 0;
    this.answered = false;
  }

  getCurrentQuiz() {
    return this.quizData[this.currentIndex];
  }

  isQuizDataValid(data) {
    if (!data) return false;
    const requiredFields = [
      "question",
      "image",
      "opsi1",
      "opsi2",
      "opsi3",
      "opsi4",
      "answer",
    ];
    return requiredFields.every(
      (f) =>
        typeof data[f] !== "undefined" && data[f] !== null && data[f] !== ""
    );
  }

  checkAnswer(userAnswer, correctAnswer) {
    return (
      userAnswer &&
      correctAnswer &&
      userAnswer.trim().toLowerCase() === correctAnswer.trim().toLowerCase()
    );
  }

  submitAnswer(userAnswer) {
    if (this.answered) return false;

    this.answered = true;
    const currentQuiz = this.getCurrentQuiz();
    const isCorrect = this.checkAnswer(userAnswer, currentQuiz.answer);

    if (isCorrect) {
      this.score++;
    }

    return {
      isCorrect,
      correctAnswer: currentQuiz.answer,
    };
  }

  nextQuestion() {
    this.currentIndex++;
    this.answered = false;
    return this.currentIndex < this.quizData.length;
  }

  getScore() {
    return {
      score: this.score,
      total: this.quizData.length,
    };
  }
}

import QuizModel from "./quiz-model.js";
import QuizPage from "./quiz-page.js";

export default class QuizPresenter {
  constructor(root) {
    this.root = root;
    this.model = new QuizModel();
    this.view = new QuizPage(root);
    this.quizData = [];
    this.currentIndex = 0;
    this.score = 0;
    this.answered = false;
  }

  async init() {
    this.root.innerHTML = "<p>Loading quiz...</p>";
    const token = localStorage.getItem("token");
    this.quizData = await this.model.fetchQuiz(token);
    this.currentIndex = 0;
    this.score = 0;
    this.answered = false;
    if (Array.isArray(this.quizData) && this.quizData.length > 0) {
      this.renderCurrentQuiz();
    } else {
      this.view.renderError(
        "Quiz tidak tersedia, gagal dimuat, atau data quiz tidak lengkap.<br>Silakan cek koneksi atau hubungi admin."
      );
    }
  }

  renderCurrentQuiz() {
    const currentQuiz = this.quizData[this.currentIndex];
    if (!this.isQuizDataValid(currentQuiz)) {
      this.view.renderError(
        "Data quiz tidak lengkap pada soal ke-" + (this.currentIndex + 1)
      );
      return;
    }
    this.answered = false;
    this.view.render(currentQuiz, this.currentIndex + 1, this.quizData.length);
    this.view.onAnswer = this.handleAnswer.bind(this);
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

  handleAnswer(userAnswer) {
    if (this.answered) return;
    this.answered = true;
    const currentQuiz = this.quizData[this.currentIndex];
    const isCorrect = this.model.checkAnswer(userAnswer, currentQuiz.answer);
    if (isCorrect) this.score++;
    this.view.showResult(isCorrect, currentQuiz.answer);
    setTimeout(() => {
      this.currentIndex++;
      if (this.currentIndex < this.quizData.length) {
        this.renderCurrentQuiz();
      } else {
        this.view.showFinalScore(this.score, this.quizData.length);
      }
    }, 1200);
  }
}

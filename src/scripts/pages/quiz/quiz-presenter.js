import QuizModel from "./quiz-model.js";
import QuizPage from "./quiz-page.js";

export default class QuizPresenter {
  constructor(root) {
    this.model = new QuizModel();
    this.view = new QuizPage(root);
    this.view.onAnswer = this.handleAnswer.bind(this);
    this.view.onRetry = this.handleRetry.bind(this);
  }

  async init() {
    this.view.showLoading();
    const quizData = await this.model.fetchQuiz();

    if (Array.isArray(quizData) && quizData.length > 0) {
      this.renderCurrentQuiz();
    } else {
      this.view.renderError(
        "Quiz tidak tersedia, gagal dimuat, atau data quiz tidak lengkap.<br>Silakan cek koneksi atau hubungi admin."
      );
    }
  }

  renderCurrentQuiz() {
    const currentQuiz = this.model.getCurrentQuiz();
    if (!this.model.isQuizDataValid(currentQuiz)) {
      this.view.renderError(
        "Data quiz tidak lengkap pada soal ke-" + (this.model.currentIndex + 1)
      );
      return;
    }

    this.view.render(
      currentQuiz,
      this.model.currentIndex + 1,
      this.model.quizData.length
    );
  }

  handleAnswer(userAnswer) {
    const result = this.model.submitAnswer(userAnswer);
    if (!result) return;

    this.view.showResult(result.isCorrect, result.correctAnswer);

    setTimeout(() => {
      if (this.model.nextQuestion()) {
        this.renderCurrentQuiz();
      } else {
        const score = this.model.getScore();
        this.view.showFinalScore(score.score, score.total);
      }
    }, 1200);
  }

  handleRetry() {
    this.init();
  }
}

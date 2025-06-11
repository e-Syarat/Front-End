export default class QuizPage {
  constructor(root) {
    this.root = root;
    this.onAnswer = null;
  }

  render(quiz, index, total) {
    this.root.innerHTML = `
      <section class="quiz-section">
        <h2>Quiz Bahasa Isyarat</h2>
        <div class="quiz-progress">Soal ${index} dari ${total}</div>
        <div class="quiz-question">${quiz.question}</div>
        <div class="quiz-image" style="margin:16px 0;">
          <img src="${quiz.image}" alt="quiz" style="max-width:220px; max-height:220px; border-radius:12px; border:1px solid #eee;" />
        </div>
        <form id="quiz-form">
          <div class="quiz-options">
            <label><input type="radio" name="quiz-option" value="${quiz.opsi1}" required /> ${quiz.opsi1}</label><br>
            <label><input type="radio" name="quiz-option" value="${quiz.opsi2}" /> ${quiz.opsi2}</label><br>
            <label><input type="radio" name="quiz-option" value="${quiz.opsi3}" /> ${quiz.opsi3}</label><br>
            <label><input type="radio" name="quiz-option" value="${quiz.opsi4}" /> ${quiz.opsi4}</label>
          </div>
          <button type="submit" class="btn" style="margin-top:16px;">Kirim Jawaban</button>
        </form>
        <div id="quiz-feedback"></div>
      </section>
    `;
    const form = document.getElementById("quiz-form");
    form.onsubmit = (e) => {
      e.preventDefault();
      const answer = form.querySelector(
        'input[name="quiz-option"]:checked'
      ).value;
      if (this.onAnswer) this.onAnswer(answer);
    };
  }

  showResult(isCorrect, correctAnswer) {
    const feedback = document.getElementById("quiz-feedback");
    if (isCorrect) {
      feedback.innerHTML = `<div style='color:green; font-weight:bold;'>Benar!</div>`;
    } else {
      feedback.innerHTML = `<div style='color:red; font-weight:bold;'>Salah! Jawaban yang benar: <b>${correctAnswer}</b></div>`;
    }
  }

  showFinalScore(score, total) {
    this.root.innerHTML = `
      <section class="quiz-section">
        <h2>Quiz Selesai!</h2>
        <div class="quiz-score">Skor Anda: <b>${score}</b> dari <b>${total}</b></div>
        <button class="btn" id="quiz-retry">Ulangi Quiz</button>
      </section>
    `;
    document.getElementById("quiz-retry").onclick = () => {
      window.location.reload();
    };
  }

  renderError(msg) {
    this.root.innerHTML = `<div class='quiz-error'>${msg}</div>`;
  }
}

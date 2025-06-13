export default class AlphabetPage {
  constructor(root) {
    this.root = root;
    this.onAnswer = null;
    this.onRetry = null;
  }

  showLoading() {
    this.root.innerHTML = `<section class="quiz-section"><p style="text-align:center;">Loading quiz...</p></section>`;
  }

  render(quiz, index, total) {
    this.root.innerHTML = `
      <section class="quiz-section">
        <h2>Quiz Bahasa Isyarat</h2>
        <div class="quiz-progress">Soal ${index} dari ${total}</div>
        <div class="quiz-image" style="margin:16px 0;">
        <img src="${quiz.image}" alt="quiz" style="max-width:220px; max-height:220px; border-radius:12px; border:1px solid #eee;" />
        </div>
        <div class="quiz-question">${quiz.question}</div>
        <form id="quiz-form">
          <div class="quiz-options">
            <label><input type="radio" name="quiz-option" value="${quiz.opsi1}" required /> ${quiz.opsi1}</label><br>
            <label><input type="radio" name="quiz-option" value="${quiz.opsi2}" /> ${quiz.opsi2}</label><br>
            <label><input type="radio" name="quiz-option" value="${quiz.opsi3}" /> ${quiz.opsi3}</label><br>
            <label><input type="radio" name="quiz-option" value="${quiz.opsi4}" /> ${quiz.opsi4}</label>
          </div>
          <button type="submit" class="btn" style="margin-top:16px;">Kirim Jawaban</button>
        </form>
      </section>
    `;

    this._setupEventListeners();
  }

  _setupEventListeners() {
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
    // Hapus feedback lama jika ada
    const oldModal = document.getElementById("quiz-modal-feedback");
    if (oldModal) oldModal.remove();

    // Buat overlay
    const overlay = document.createElement("div");
    overlay.id = "quiz-modal-feedback";
    overlay.className = "quiz-modal-overlay";

    // Buat box modal
    const box = document.createElement("div");
    box.className = `quiz-modal-box ${isCorrect ? "correct" : "wrong"}`;
    box.innerHTML = isCorrect
      ? "<div style='font-size:2.2rem;'>🎉</div>Jawaban Anda <b>Benar!</b>"
      : `Jawaban <b>Salah</b>!<br><span style='color:#222;font-weight:400;'>Jawaban yang benar: <b>${correctAnswer}</b></span>`;

    overlay.appendChild(box);
    document.body.appendChild(overlay);
    setTimeout(() => {
      overlay.remove();
    }, 1200);
  }

  showFinalScore(score, total) {
    this.root.innerHTML = `
      <section class="quiz-section">
        <h2>Quiz Selesai!</h2>
        <div class="quiz-score">Skor Anda: <b>${score}</b> dari <b>${total}</b></div>
        <div style="display: flex; justify-content: center;">
          <button class="btn" id="quiz-retry">Ulangi Quiz</button>
        </div>
      </section>
    `;

    const retryButton = document.getElementById("quiz-retry");
    if (retryButton && this.onRetry) {
      retryButton.onclick = this.onRetry;
    }
  }

  renderError(msg) {
    this.root.innerHTML = `<div class='quiz-error'>${msg}</div>`;
  }
}

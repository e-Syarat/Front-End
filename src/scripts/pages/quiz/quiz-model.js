import { getQuiz } from "../../data/api";

export default class QuizModel {
  async fetchQuiz(token) {
    try {
      const res = await getQuiz(token);
      if (res.status === "ok" && res.data) {
        // Jika data array, return langsung. Jika object, bungkus ke array.
        return Array.isArray(res.data) ? res.data : [res.data];
      }
      return [];
    } catch (e) {
      return [];
    }
  }

  checkAnswer(userAnswer, correctAnswer) {
    return (
      userAnswer &&
      correctAnswer &&
      userAnswer.trim().toLowerCase() === correctAnswer.trim().toLowerCase()
    );
  }
}

export default class DailyWordsModel {
  constructor() {
    this.data = [
      { word: "Hello", image: "/src/assets/daily-words/hello.png" },
      { word: "Thank You", image: "/src/assets/daily-words/thankyou.png" },
      { word: "Please", image: "/src/assets/daily-words/please.png" },
      { word: "Sorry", image: "/src/assets/daily-words/sorry.png" },
      { word: "Yes", image: "/src/assets/daily-words/yes.png" },
      { word: "No", image: "/src/assets/daily-words/no.png" },
      { word: "Help", image: "/src/assets/daily-words/help.png" },
      { word: "Good", image: "/src/assets/daily-words/good.png" },
      { word: "Bad", image: "/src/assets/daily-words/bad.png" },
      { word: "Morning", image: "/src/assets/daily-words/morning.png" },
      { word: "Night", image: "/src/assets/daily-words/night.png" },
      { word: "Eat", image: "/src/assets/daily-words/eat.png" },
      { word: "Drink", image: "/src/assets/daily-words/drink.png" },
      { word: "Love", image: "/src/assets/daily-words/love.png" },
      { word: "Friend", image: "/src/assets/daily-words/friend.png" },
    ];
  }

  fetchAll() {
    return this.data;
  }

  search(query) {
    if (!query) return this.data;
    return this.data.filter((item) =>
      item.word.toLowerCase().includes(query.toLowerCase())
    );
  }
}

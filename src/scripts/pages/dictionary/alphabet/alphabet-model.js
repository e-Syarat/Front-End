import { getDictionary } from "../../../data/api";

export default class AlphabetModel {
  constructor() {
    this.data = [];
  }

  async fetchAll() {
    try {
      const token = localStorage.getItem("token");
      const res = await getDictionary(token);
      if (res.status === "ok") {
        // Jika data array, map ke format lama, jika objek tunggal, bungkus array
        const dataArr = Array.isArray(res.data) ? res.data : [res.data];
        this.data = dataArr.map((item) => ({
          letter: item.alfabet,
          image: item.image,
        }));
        return this.data;
      }
      return [];
    } catch (error) {
      console.error("Error fetching alphabet:", error);
      return [];
    }
  }

  search(query) {
    if (!query) return this.data;
    return this.data.filter((item) =>
      item.letter.toLowerCase().includes(query.toLowerCase())
    );
  }

  async fetchById(id, token) {
    try {
      const res = await getDictionaryById(id, token);
      if (res.status === "ok") {
        return {
          letter: res.data.alfabet,
          image: res.data.image,
        };
      }
      return null;
    } catch (e) {
      return null;
    }
  }
}

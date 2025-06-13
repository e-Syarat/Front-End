import {
  getDictionaryNumber,
  getDictionaryNumberById,
} from "../../../data/api";

export default class NumbersModel {
  constructor() {
    this.data = [];
  }

  async fetchAll() {
    try {
      const token = localStorage.getItem("token");
      const res = await getDictionaryNumber(token);
      if (res.status === "ok") {
        // Jika data array, map ke format lama, jika objek tunggal, bungkus array
        const dataArr = Array.isArray(res.data) ? res.data : [res.data];
        this.data = dataArr.map((item) => ({
          number: item.number,
          image: item.image,
        }));
        return this.data;
      }
      return [];
    } catch (error) {
      console.error("Error fetching numbers:", error);
      return [];
    }
  }

  async fetchById(id, token) {
    try {
      const res = await getDictionaryNumberById(id, token);
      if (res.status === "ok") {
        return {
          number: res.data.number,
          image: res.data.image,
        };
      }
      return null;
    } catch (e) {
      return null;
    }
  }

  search(query) {
    if (!query) return this.data;
    return this.data.filter((item) =>
      item.number.toString().toLowerCase().includes(query.toLowerCase())
    );
  }
}

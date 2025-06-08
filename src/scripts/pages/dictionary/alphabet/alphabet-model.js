import { getDictionary, getDictionaryById } from "../../../data/api";

export default class AlphabetModel {
  async fetchAll(token) {
    try {
      const res = await getDictionary(token);
      if (res.status === "ok") {
        // Jika data array, map ke format lama, jika objek tunggal, bungkus array
        const dataArr = Array.isArray(res.data) ? res.data : [res.data];
        return dataArr.map((item) => ({
          letter: item.alfabet,
          image: item.image,
        }));
      }
      return [];
    } catch (e) {
      return [];
    }
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

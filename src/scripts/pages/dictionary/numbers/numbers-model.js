import {
  getDictionaryNumber,
  getDictionaryNumberById,
} from "../../../data/api";

export default class NumbersModel {
  async fetchAll(token) {
    try {
      const res = await getDictionaryNumber(token);
      if (res.status === "ok") {
        // Jika data array, map ke format lama, jika objek tunggal, bungkus array
        const dataArr = Array.isArray(res.data) ? res.data : [res.data];
        return dataArr.map((item) => ({
          number: item.number,
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
}

import { register as registerApi } from "../../../data/api";

export default class RegisterModel {
  async register(username, email, password) {
    try {
      const res = await registerApi(username, email, password);
      if (res.message === "registered berhasil") {
        return { success: true, message: res.message };
      } else if (res.status === 400) {
        return {
          success: false,
          message: res.message || "Email sudah terdaftar",
        };
      } else {
        return {
          success: false,
          message: res.message || "Terjadi kesalahan pada server.",
        };
      }
    } catch (error) {
      return { success: false, message: "Terjadi kesalahan pada server." };
    }
  }
}

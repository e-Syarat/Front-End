import { login as loginApi } from "../../../data/api";

export default class LoginModel {
  // login sementara
  // login(email, password) {
  //   // Simulasi login, bisa diganti nanti pakai API
  //   if (email === 'user@gmail.com' && password === '123456') {
  //     return { success: true, message: 'Login successful!' };
  //   }
  //   return { success: false, message: 'Invalid credentials' };
  // }

  // login integrasi API
  async login(email, password) {
    try {
      const res = await loginApi(email, password);
      if (res.token) {
        localStorage.setItem("token", res.token);
        return { success: true, message: res.message || "Login berhasil!" };
      } else {
        // Penyesuaian pesan error berdasarkan status
        if (res.status === 400) {
          return { success: false, message: res.message || "Email dan password harus diisi" };
        } else if (res.status === 401) {
          return { success: false, message: res.message || "Email atau password salah" };
        } else if (res.status === 429) {
          return { success: false, message: res.message || "Terlalu banyak percobaan login. Silakan coba lagi dalam 15 menit." };
        } else {
          return { success: false, message: res.message || "Terjadi kesalahan pada server." };
        }
      }
    } catch (error) {
      return { success: false, message: "Terjadi kesalahan pada server." };
    }
  }
}

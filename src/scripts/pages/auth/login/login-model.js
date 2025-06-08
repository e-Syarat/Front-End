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
        return {
          success: false,
          message: res.message || "Email atau password salah.",
        };
      }
    } catch (error) {
      return { success: false, message: "Terjadi kesalahan pada server." };
    }
  }
}

export default class LoginModel {
  login(email, password) {
    // Simulasi login, bisa diganti nanti pakai API
    if (email === 'a@a.com' && password === '111111') {
      return { success: true, message: 'Login successful!' };
    }
    return { success: false, message: 'Invalid credentials' };
  }
}

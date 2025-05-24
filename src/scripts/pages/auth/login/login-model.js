export default class LoginModel {
  login(email, password) {
    // Simulasi login, bisa diganti nanti pakai API
    if (email === 'admin@esy.com' && password === '123456') {
      return { success: true, message: 'Login successful!' };
    }
    return { success: false, message: 'Invalid credentials' };
  }
}

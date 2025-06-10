import CONFIG from "../utils/config";

// 1. Login
export async function login(email, password) {
  try {
    const response = await fetch(`${CONFIG.BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.status === 200) {
      return data;
    } else if (response.status === 400) {
      return {
        message: data.message || "Email dan password harus diisi",
        status: 400,
      };
    } else if (response.status === 401) {
      return {
        message: data.message || "Email atau password salah",
        status: 401,
      };
    } else if (response.status === 429) {
      return {
        message:
          data.message ||
          "Terlalu banyak percobaan login. Silakan coba lagi dalam 15 menit.",
        status: 429,
      };
    } else {
      return {
        message: data.message || "Terjadi kesalahan pada server.",
        status: response.status,
      };
    }
  } catch (error) {
    return { message: "Terjadi kesalahan pada server.", status: 500 };
  }
}

// 2. Get dictionary (huruf)
export async function getDictionary(token) {
  const response = await fetch(`${CONFIG.BASE_URL}/dictionary`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
}

// 3. Get dictionary by id (huruf)
export async function getDictionaryById(id, token) {
  const response = await fetch(`${CONFIG.BASE_URL}/dictionary/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
}

// 4. Get dictionary number (angka)
export async function getDictionaryNumber(token) {
  const response = await fetch(`${CONFIG.BASE_URL}/dictionary-number`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
}

// 5. Get dictionary number by id (angka)
export async function getDictionaryNumberById(id, token) {
  const response = await fetch(`${CONFIG.BASE_URL}/dictionary-number/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
}

// 6. Get quiz
export async function getQuiz(token) {
  const response = await fetch(`${CONFIG.BASE_URL}/quiz`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
}

// 7. Get about
export async function getAbout() {
  const response = await fetch(`${CONFIG.BASE_URL}/about`);
  return response.json();
}

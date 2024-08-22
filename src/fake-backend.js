const users = [
  { email: "user1@example.com", password: "password123" },
  { email: "user2@example.com", password: "mypassword" },
];

const simulateDelay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const fakeBackend = {
  register: async (email, password) => {
    await simulateDelay(1000); // Имитация задержки 1 секунда
    const userExists = users.some((user) => user.email === email);
    if (userExists) {
      return { success: false, message: "User already exists" };
    }
    users.push({ email, password });
    return { success: true, message: "Registration successful" };
  },

  login: async (email, password) => {
    await simulateDelay(1000); // Имитация задержки 1 секунда
    const user = users.find(
      (user) => user.email === email && user.password === password
    );
    if (user) {
      return { success: true, message: "Login successful" };
    }
    return { success: false, message: "Invalid email or password" };
  },
};

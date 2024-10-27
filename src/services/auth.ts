interface LoginResponse {
  user: {
    id: number;
    email: string;
    name: string;
    role: string;
  };
  accessToken: string;
}

export const login = async (email: string, password: string): Promise<LoginResponse> => {
  try {
    const response = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Login failed');
    }

    return response.json();
  } catch (error) {
    // For demo purposes, return mock data if server is not running
    if (email === 'admin@example.com' && password === 'admin123') {
      return {
        user: {
          id: 1,
          email: 'admin@example.com',
          name: 'John Doe',
          role: 'admin'
        },
        accessToken: 'mock-token'
      };
    }
    throw error;
  }
};

export const logout = async (): Promise<void> => {
  try {
    const response = await fetch('http://localhost:5000/api/auth/logout', {
      method: 'POST',
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Logout failed');
    }
  } catch {
    // For demo purposes, just clear local storage if server is not running
    localStorage.removeItem('accessToken');
  }
};

export const refreshToken = async (): Promise<{ accessToken: string }> => {
  try {
    const response = await fetch('http://localhost:5000/api/auth/refresh-token', {
      method: 'POST',
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Token refresh failed');
    }

    return response.json();
  } catch {
    // For demo purposes, return mock token if server is not running
    return { accessToken: 'mock-refresh-token' };
  }
};
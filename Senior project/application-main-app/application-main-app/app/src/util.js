export const fetchFromTable = async (table, column, equals) => {
    try {
      const response = await fetch('http://localhost:3001/api/fetch', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ table, column, equals }),
      });
  
      const result = await response.json();
  
      if (result.success) {
        return result.data; 
      } else {
        console.error("Fetch failed:", result.message);
        window.alert(result.message)
        return null;
      }
    } catch (err) {
      console.error("Network or server error:", err);
      window.alert("Network or server error")
      return null;
    }
  };
  
export const insertIntoTable = async (table, row) => {
    try {
      const response = await fetch('http://localhost:3001/api/insert', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ table, row }),
      });
  
      const result = await response.json();
      if (result.success) {
        return result.success;
      } else {
        console.error("Insert failed:", result.message);
        return null;
      }
    } catch (err) {
      console.error("Insert error:", err);
      return null;
    }
  };
  



export const deleteFromTable = async (table, column, equals) => {
    try {
      const response = await fetch('http://localhost:3001/api/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ table, column, equals }),
      });
  
      const result = await response.json();
  
      if (result.success) {
        console.log(result.message);
        return result.success;
      } else {
        console.error("Delete failed:", result.message);
        return null;
      }
    } catch (err) {
      console.error("Delete error:", err);
      return null;
    }
  };
export const signup = async (email, password) => {
    const res = await fetch('http://localhost:3001/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    });
    return res.json();
};

export const login = async (email, password) => {
    const res = await fetch('http://localhost:3001/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    });
    return res.json();
};

export const checkUserSession = async () => {
    const res = await fetch('http://localhost:3001/api/check-session');
    return res.json();
};


export const logoutUser = async (accessToken) => {
  try {
      const response = await fetch('http://localhost:3001/api/logout', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ access_token: accessToken }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
          return { success: true, message: result.message };
      } else {
          return { success: false, message: result.message || 'Logout failed' };
      }
  } catch (error) {
      console.error("Logout error:", error);
      return { success: false, message: error.message };
  }
};



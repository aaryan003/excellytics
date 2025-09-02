import api from "./axiosConfig";
const authSerivce = {
  login: async (email, password) => {
    try {
      const response = await api.post("/auth/login", { email, password });
      return response.data;
    } catch (error) {
      throw new Error("Error occured", error);
    }
  },

  signup: async (name, organizationName, email, password, role) => {
    try {
      const response = await api.post("/auth/signup", {
        name, 
        organizationName,
        email,
        password,
        role, 
    });
      console.log(response.data.newUser);
      console.log("response message", response.data.message);
      return response.data;
    } catch (error) {
      throw new Error("Error occured", error);
    }
  },

  logout: async () => {
    try {
      const response = await api.post("/auth/logout", {});
      return response.data;
    } catch (error) {
      throw new Error("Error occured", error);
    }
  },
};

export default authSerivce;

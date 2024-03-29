import API from "../shared/axios";
// user routes

// get locations/account types
export const getAccountTypesAndLocations = () =>
  API.get("/api/user/get-account-types-locations/");
// signup
export const signupUser = (newUser) => API.post("/api/user/signup/", newUser);
// activate user account
export const activateAccount = (activation_token) =>
  API.post("/api/user/activate-user-account/", { activation_token });

// resend account activation email
export const resendActivation = (email) =>
  API.post("/api/user/resend-account-activation-link/", { email });

// sign in user
export const signIn = (loginData) => API.post("/api/user/login/", loginData);

// send password reset email
export const resetPassword = (email) =>
  API.post("/api/user/user-request-password-reset/", { email });

// set new password using reset link sent from above
export const setPassword = (newPasswords, password_token) =>
  API.post("/api/user/user-set-new-password/", {
    ...newPasswords,
    password_token,
  });

// patch user data
export const updateUser = (updatedUser, userId) =>
  API.patch(`/api/user/update-user-details/${userId}/`, updatedUser);

// user change password
export const changePassword = (passwords, userId) =>
  API.post(`/api/user/change-user-password/${userId}/`, passwords);

// get user data
export const getUser = () => API.get("/api/user/get-user-data/");

// LISTING API'S
export const createNewListing = (userId, body) =>
  API.post(`/api/agent/create-new-listing/${userId}/`, body);

// get listings
export const getListings = () => API.get(`/api/agent/get-listings/`);

// tenant book appointment to view listing
export const tenantBookAppointment = (userId, body) =>
  API.post(`/api/tenant/book-viewing-appointment/${userId}/`, body);

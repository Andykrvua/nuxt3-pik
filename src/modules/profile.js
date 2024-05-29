export default (fetch) => ({
  getProfile() {
    return fetch(`/my/profile`);
  },
  setProfile(payload) {
    return fetch(`/my/profile`, { body: payload, method: "post" });
  },
  setNewPassword(payload) {
    return fetch(`/my/profile/password`, { body: payload, method: "post" });
  },
});

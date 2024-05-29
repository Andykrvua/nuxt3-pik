export default (fetch) => ({
  login(payload) {
    return fetch(`/login`, { body: payload, method: "post" });
  },
  logout() {
    return fetch(`/logout`, { method: "post" });
  },
  socialLogin(payload) {
    return fetch(
      `/socialite/${payload.provider}?access_token=${payload.access_token}`
    );
  },
  register(payload) {
    return fetch(`/register`, { body: payload, method: "post" });
  },
  resendCodeVerified(payload) {
    return fetch(`/verify/resend`, { body: payload, method: "post" });
  },
  forgotPassw(payload) {
    return fetch(`/password/forgot`, { body: payload, method: "post" });
  },
  resetPassw(payload) {
    return fetch(`/password/reset`, { body: payload, method: "post" });
  },
  codeVerified(payload) {
    return fetch(
      `/verify?` +
        new URLSearchParams({
          code: payload.code,
          email: payload.email,
        })
    );
  },
});

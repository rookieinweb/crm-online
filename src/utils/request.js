import { getToken, clearToken } from "./auth";

const BASE_URL = import.meta.env.VITE_API_URL;
console.log("import.meta.env", import.meta.env);
console.log("BASE_URL", BASE_URL);
function goLogin() {
  const pages = typeof getCurrentPages === "function" ? getCurrentPages() : [];
  const current = pages[pages.length - 1];
  if (current?.route === "pages/login/index") return;
  uni.reLaunch({ url: "/pages/login/index" });
}

function request(options) {
  console.log("BASE_URL", BASE_URL, options.url);
  return new Promise((resolve, reject) => {
    const token = getToken();
    uni.request({
      url: `${BASE_URL}${options.url}`,
      method: options.method || "GET",
      data: options.data,
      header: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options.header,
      },
      success(res) {
        const { statusCode, data } = res;
        // if (statusCode === 401) {
        //   clearToken();
        //   goLogin();
        //   reject(new Error("登录已过期"));
        //   return;
        // }
        if (statusCode >= 200 && statusCode < 300) {
          resolve(data?.data !== undefined ? data.data : data);
          return;
        }
        reject(new Error(data?.message || "请求失败"));
      },
      fail(err) {
        reject(err);
      },
    });
  });
}

export function get(url, data) {
  return request({ url, method: "GET", data });
}

export function post(url, data) {
  return request({ url, method: "POST", data });
}

export function put(url, data) {
  return request({ url, method: "PUT", data });
}

export default request;

import { post, get } from "@/utils/request";

export function login(data) {
  return post("/auth/login", data);
}
/**
 *
 * @param {*} data
 * @returns
 */
export function getDashboardOverview(data) {
  return get("/dashboard/overview", data);
}

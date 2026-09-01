"use strict";const e=require("../utils/request.js");exports.getDashboardOverview=function(t){return e.get("/dashboard/overview",t)},exports.login=function(t){return e.post("/auth/login",t)};

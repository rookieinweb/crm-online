"use strict";const e=require("../common/vendor.js"),t="zhike_user";exports.getUser=function(){return e.index.getStorageSync(t)||null},exports.setUser=function(n){e.index.setStorageSync(t,n)};

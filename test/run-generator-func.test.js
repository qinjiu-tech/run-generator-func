import { runGeneratorFunc } from "../src/run-generator-func.js";

// 登录
function login() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // 服务器响应
      if (Math.random() > 0.2) {
        // 成功
        if (Math.random() > 0.2) {
          resolve({
            code: 0,
            message: "登录成功！",
            result: null,
          });
        }
        // 失败
        else {
          resolve({
            code: -1,
            message: "账号或密码错误！",
            result: null,
          });
        }
      }
      // 服务器报错
      else {
        reject(new Error("server internet error!"));
      }
    }, 1000);
  });
}

// 获取用户信息
function getUserInfo() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // 服务器响应
      if (Math.random() > 0.2) {
        // 成功
        if (Math.random() > 0.2) {
          resolve({
            code: 0,
            message: "获取用户信息成功！",
            result: {
              name: "admin",
              role: "admin",
              age: 20,
              address: "江苏省南京市",
            },
          });
        }
        // 失败
        else {
          resolve({
            code: -1,
            message: "获取用户信息失败！",
            result: null,
          });
        }
      }
      // 服务器报错
      else {
        reject(new Error("server internet error!"));
      }
    }, 1000);
  });
}

function* asyncLogin() {
  // ...
  // 一些逻辑
  // ...
  return yield login();
}

function* asyncGetUserInfo() {
  // ...
  // 一些逻辑
  // ...
  return yield getUserInfo();
}

function* generatorLogin() {
  console.log("第1次运行");
  // ====================================================
  const [loginErr, loginRes] = yield* asyncLogin();
  console.log("第2次运行", [loginErr, loginRes]);
  // 登录失败
  if (loginErr || loginRes?.code !== 0) {
    console.log(
      loginErr?.message || loginRes?.message || "失败！",
      "停止后面的逻辑！！！"
    );
    return;
  }
  // ====================================================
  const [userErr, userRes] = yield* asyncGetUserInfo();
  console.log("第3次运行", [userErr, userRes]);
  // 获取用户信息失败
  if (userErr || userRes?.code !== 0) {
    console.log(
      userErr?.message || userRes?.message || "失败！",
      "停止后面的逻辑！！！"
    );
    return;
  }
  // ...
  console.log("获取用户信息成功，继续后面的一些逻辑！！！");
  // ...
}

runGeneratorFunc(generatorLogin);

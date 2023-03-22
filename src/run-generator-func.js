/**
 * 运行生成器函数
 */
export function runGeneratorFunc(generatorFunc) {
  // 生成器
  const generator = generatorFunc();

  // 开始迭代
  next();

  // 封装迭代函数
  function next(data) {
    const { value, done } = generator.next(data);

    // 迭代完成
    if (done) return;
    // promise
    if (value instanceof Promise) {
      // 得到结果继续迭代
      value.then(
        (res) => next([null, res]),
        (err) => next([err, null])
      );
    }
    // 其他值
    else {
      next(value);
    }
  }
}

export default runGeneratorFunc;

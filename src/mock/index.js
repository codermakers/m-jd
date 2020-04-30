var Mock = require("mockjs");

let data = Mock.mock({
  status: 0,
  "list|1-10": [
    {
      // 属性 id 是一个自增数，起始值为 1，每次增 1
      "id|+1": 1,
      imgUrl: Mock.Random.image("375×186")
    }
  ]
});
// 输出结果
console.log(JSON.stringify(data, null, 4));

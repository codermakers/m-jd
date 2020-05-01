import Vue from "vue";

/**
 * 金额数据处理
 *  @param  value 金额
 *
 *  */
Vue.filter("formatPrice", function(value) {
  if (!value) return "";
  let result = parseFloat(value);

  //注意：0是整数，0.0也是整数,金额是整数,直接返回
  if (Number.isInteger(result)) {
    return result;
  }

  //金额是小数,返回小数点后2位
  return result.toFixed(2);
});

/**
 * @param  处理时间
 *
 * */

Vue.filter("formatTime", function(value) {
  if (!value) return "";

  // 对于不是时：分：秒格式，直接返回
  if (value.indexOf(":") === -1) {
    return value;
  }

  let result = "";

  let arr = value.split(":");
  /**
   * arr[0]->小时
   * arr[1]->分钟
   * arr[2]->秒数
   * */
  // 时
  if (parseInt(arr[0]) < 10) {
    result = "0" + arr[0];
  } else {
    result = arr[0];
  }

  // 分
  if (parseInt(arr[1]) < 10) {
    result = result + ":" + "0" + arr[1];
  } else {
    result = result + ":" + arr[1];
  }

  // 秒
  if (parseInt(arr[2]) < 10) {
    result = result + ":" + "0" + arr[2];
  } else {
    result = result + ":" + arr[2];
  }
  // 最终返回这个拼接的时间
  return result;
});

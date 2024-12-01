// 判断传入的字符串是否为JSON格式
export const isJson = (str) => {
  // 尝试将传入的字符串解析为JSON格式
  try {
    JSON.parse(str)
  // 如果解析失败，则返回false
  } catch (e) {
    return false
  }
  // 如果解析成功，则返回true
  return true
}
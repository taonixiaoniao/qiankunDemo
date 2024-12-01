/**
 * 工具类 - 时间相关
 * @module  utils/time
 * @description 常用时间工具方法集合
 */

const REG = {
  TIME: /^([0-1][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/,
  DATE: /^\d{4}-(0[0-9]|1[0-2])-([0-2][0-9]|3[0-1]) ([0-1][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/,
  DATE_Z: /^\d{4}(0[0-9]|1[0-2])([0-2][0-9]|3[0-1])T([0-1][0-9]|2[0-3])[0-5][0-9][0-5][0-9]Z$/
}

/**
* add Zero 月日时分秒补0函数
*/
function addZero(time) {
  const newTime = time > 9 ? time : '0' + time
  return newTime
}

/**
* 校验时间格式
* @param {string} time 时间格式，如 10:00:00
*/
function valifyTime(time) {
  const reg = /^\d{2}:\d{2}:\d{2}$/
  return reg.test(time)
}

/**
* 判定两组时间序列是否存在重复（交叉或包含）
* @param {array} time1Arr 时间范围，如 [10:00:00, 12:00:00]
* @param {array} time2Arr 时间范围，如 [09:00:00, 23:00:00]
*/
function isTimeContainTime(time1Arr, time2Arr) {
  let timeArr = null
  let validate = true
  // 确保两组时间范围格式正确
  if (!Array.isArray(time1Arr) || !Array.isArray(time2Arr)) {
      throw new Error('Please enter two array.')
  }
  if (time1Arr.length !== 2 || time2Arr.length !== 2) {
      throw new Error('Please enter currect time.')
  }
  timeArr = [...time1Arr, ...time2Arr]
  for (const time of timeArr) {
      if (!valifyTime(time)) {
          throw new Error('Please enter currect time.')
      }
  }

  // 检验时间是否存在重复
  if (time2Arr[0] > time1Arr[0] && time2Arr[0] < time1Arr[1] ||
      time2Arr[1] > time1Arr[0] && time2Arr[1] < time1Arr[1]) {
      validate = false
  }
  if (time1Arr[0] > time2Arr[0] && time1Arr[0] < time2Arr[1] ||
      time1Arr[1] > time2Arr[0] && time1Arr[1] < time2Arr[1]) {
      validate = false
  }

  return validate
}

/**
* 时间格式转成项目所需字符串
* @param {Date} date 标准时间格式
*/
function dateToTimeStr(date) {
  if (typeof date !== 'object') {
      return ''
  }
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  const h = String(date.getHours()).padStart(2, '0')
  const min = String(date.getMinutes()).padStart(2, '0')
  const s = String(date.getSeconds()).padStart(2, '0')

  return `${y}-${m}-${d} ${h}:${min}:${s}`
}

/**
* 将时间转换为UTC时间字符串，支持格式 hh:mm:ss
* @description 按源格式返回
* @param {string} timeStr 源时间
* @returns {object} 包含time和日期偏差
*/
function toISOStringByTime(timeStr) {
  const time = {}
  const date = new Date(`2000/10/24 ${timeStr}`)
  time.d = date.getUTCDate()
  time.h = addZero(date.getUTCHours())
  time.min = addZero(date.getUTCMinutes())
  time.s = addZero(date.getUTCSeconds())

  return {
      offset: time.d - 24,
      time: `${time.h}:${time.min}:${time.s}`
  }
}

/**
* 将时间转换为UTC时间字符串，支持格式 yyyy-mm-dd hh:mm:ss
* @description 按源格式返回
* @param {string} timeStr 源时间
* @param {string} type str 普通时间格式， utcStr yyyymmddThhmmssZ格式
*/
function toISOStringByDate(timeStr, type = 'str') {
  const time = {}
  let newTime
  const date = new Date(timeStr.replace(/-/g, '/'))
  time.y = date.getUTCFullYear()
  time.m = addZero(date.getUTCMonth() + 1)
  time.d = addZero(date.getUTCDate())
  time.h = addZero(date.getUTCHours())
  time.min = addZero(date.getUTCMinutes())
  time.s = addZero(date.getUTCSeconds())

  if (type === 'utcStr') {
      newTime = `${time.y}${time.m}${time.d}T${time.h}${time.min}${time.s}Z`
  } else {
      newTime = `${time.y}-${time.m}-${time.d} ${time.h}:${time.min}:${time.s}`
  }

  return newTime
}

/**
* 将时间转换为UTC时间字符串
* @description 按源格式返回，目前支持格式1970-01-01 00:00:00
* @param {string} type str 普通时间格式， utcStr yyyymmddThhmmssZ格式
* @param {string} timeStr 源时间
*/
function toISOString(timeStr, type) {
  try {
      if (REG.DATE.test(timeStr)) {
          // 格式 yyyy-mm-dd hh:mm:ss
          return toISOStringByDate(timeStr, type)
      } else if (REG.TIME.test(timeStr)) {
          // 格式 hh:mm:ss
          return toISOStringByTime(timeStr)
      }
  } catch (e) {
      return ''
  }
  throw new Error('Please enter date as yyyy-mm-dd hh:mm:ss')
}

/**
* 将UTC时间转换为本地时间字符串，支持格式 hh:mm:ss
* @description 默认传入的为UTC时间，此处由于各版本浏览器支持性不一，故使用Date.UTC()
* @param {string} timeStr 源时间
* @returns {object} 包含time和日期偏差
*/
function toLocaleStringByTime(timeStr) {
  const time = {}

  const timeList = timeStr.split(':')

  const utcDate = Date.UTC(2000, 10, 24, timeList[0], timeList[1], timeList[2])
  const date = new Date(utcDate)

  time.d = date.getDate()
  time.h = addZero(date.getHours())
  time.min = addZero(date.getMinutes())
  time.s = addZero(date.getSeconds())

  return {
      offset: time.d - 24,
      time: `${time.h}:${time.min}:${time.s}`
  }
}

/**
* 将UTC时间转换为本地时间字符串，支持格式 yyyy-mm-dd hh:mm:ss
* @description 默认传入的为UTC时间，此处由于各版本浏览器支持性不一，故使用Date.UTC()
* @param {string} timeStr 源时间
*/
function toLocaleStringByDate(timeStr) {
  const time = {}

  const newTime = timeStr.split(' ')
  const dateList = newTime[0].split('-')
  const timeList = newTime[1].split(':')

  const utcDate = Date.UTC(dateList[0], dateList[1] - 1, dateList[2], timeList[0], timeList[1], timeList[2])
  const date = new Date(utcDate)

  time.y = date.getFullYear()
  time.m = addZero(date.getMonth() + 1)
  time.d = addZero(date.getDate())
  time.h = addZero(date.getHours())
  time.min = addZero(date.getMinutes())
  time.s = addZero(date.getSeconds())
  return `${time.y}-${time.m}-${time.d} ${time.h}:${time.min}:${time.s}`
}

/**
* 将UTC时间转换为本地时间字符串
* @description 默认传入的为UTC时间，目前支持格式1970-01-01 00:00:00
* @param {string} timeStr 源时间
*/
function toLocaleString(timeStr) {
  try {
      if (REG.DATE.test(timeStr)) {
          // 格式 yyyy-mm-dd hh:mm:ss
          return toLocaleStringByDate(timeStr)
      } else if (REG.TIME.test(timeStr)) {
          // 格式 hh:mm:ss
          return toLocaleStringByTime(timeStr)
      } else if (REG.DATE_Z.test(timeStr)) {
          // 格式 yyyymmddThhmmssZ
          const newTime = timeStr.replace(/[^0-9]/g, '')
          const date = `${newTime.slice(0, 4)}-${newTime.slice(4, 6)}-${newTime.slice(6, 8)}`
          const time = `${newTime.slice(8, 10)}:${newTime.slice(10, 12)}:${newTime.slice(12, 14)}`
          return toLocaleStringByDate(`${date} ${time}`)
      }
  } catch (e) {
      console.log('Please enter date as yyyy-mm-dd hh:mm:ss')
      return ''
  }
  throw new Error('Please enter date as yyyy-mm-dd hh:mm:ss')
}

/**
* 获取当前浏览器客户端的时区
* @description +0800为东八区
* @returns {string} such as +0000 +0545
*/
function getTimezoon() {
  let timezoonOffset = new Date().getTimezoneOffset()
  const flag = timezoonOffset > 0 ? '-' : '+'

  timezoonOffset = Math.abs(timezoonOffset)

  const hours = Math.floor(timezoonOffset / 60)
  const minute = timezoonOffset % 60
  return flag + addZero(hours) + addZero(minute)
}

/**
* 将毫秒时间转换为本地时间字符串，支持格式毫秒
* @description 返回格式：yyyy-mm-dd hh:mm:ss
* @param {string} timeStr 源时间，毫秒格式
*/
function toLocaleStringByMs(timeStr) {
  const time = {}
  const date = new Date(timeStr)

  time.y = date.getFullYear()
  time.m = addZero(date.getMonth() + 1)
  time.d = addZero(date.getDate())
  time.h = addZero(date.getHours())
  time.min = addZero(date.getMinutes())
  time.s = addZero(date.getSeconds())
  return `${time.y}-${time.m}-${time.d} ${time.h}:${time.min}:${time.s}`
}

/**
* valifyTime 校验时间格式
* isTimeContainTime 判定两组时间序列是否存在重复（交叉或包含）
* toISOString 将时间转换为UTC时间字符串
* toLocaleString 将时间转换为本地时间字符串
* getTimezoon 获取当前时区
*/
export {
  valifyTime,
  isTimeContainTime,
  toISOString,
  toLocaleString,
  getTimezoon,
  toLocaleStringByMs,
  dateToTimeStr
}



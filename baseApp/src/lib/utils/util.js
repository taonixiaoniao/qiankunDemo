/*
 * @Description 公共业务工具库
 */

/**
 * 获取url中指定参数
 *
 * @method getUrlParamByName
 * @returns {String} 指定参数
 */
export function getUrlParamByName(name) {
  const params = getUrlParams()
  return params && params[name] ? unescape(params[name]) : ''
}

/**
 * 获取cookie
 *
 * @method getCookie
 * @param key cookie中存储字段key
 * @returns {String} 返回匹配到的cookie内容
 */
export function getCookie(key) {
  if (document.cookie.length > 0) {
    let start = document.cookie.indexOf(key + '=')
    if (start !== -1) {
      start = start + key.length + 1
      let end = document.cookie.indexOf(';', start)
      if (end === -1) {
        end = document.cookie.length
      }
      return decodeURIComponent(document.cookie.substring(start, end))
    }
    return ''
  }
  return ''
}

/**
 * 设置cookie
 *
 * @method setCookie
 * @param key 储字段key
 * @param value 存储内容
 * @param expire 超时时间（分钟）,非必填
 */
export function setCookie(key, value, expire) {
  if (expire) {
    document.cookie =
      key +
      '=' +
      encodeURIComponent(value) +
      ';expires=' +
      new Date(new Date().getTime() + expire * 60 * 1000).toGMTString()
  } else {
    document.cookie = key + '=' + encodeURIComponent(value)
  }
}

/**
 * 删除cookie
 *
 * @method delCookie
 * @param key 储字段key
 */
export function delCookie(key) {
  if (getCookie(key)) {
    document.cookie = key + '=' + ';expires=Thu, 01-Jan-1970 00:00:01 GMT'
  }
}

/**
 * 随机生成字符串，长度为len
 *
 * @method randomStr
 * @param len 随机串长度
 * @returns {string}
 */
export function randomStr(len) {
  const char = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  const arr = []
  const length = Number(len)
  if (length) {
    for (let i = 0; i < length; i++) {
      const r = Math.floor(Math.random() * char.length)
      arr.push(char[r])
    }
  }
  return arr.join('')
}

// 导出一个函数joinUrl，用于拼接url
export const joinUrl = (urlList) => {
  // 初始化结果字符串
  let res = ''
  // 遍历urlList数组
  urlList.forEach(item => { 
    // 检查结果字符串是否以'/'结尾
    const checkResLast = res.lastIndexOf('/') === res.length - 1
    // 检查当前url是否以'/'开头
    const checkItemFirst = item.indexOf('/') === 0
    // 如果结果字符串以'/'结尾且当前url以'/'开头，则将当前url去掉开头的'/'并拼接
    if (checkResLast && checkItemFirst) {
      res += item.substring(1)
    // 如果结果字符串不以'/'结尾且当前url不以'/'开头，则在结果字符串后拼接'/'和当前url
    } else if (!checkResLast && !checkItemFirst) {
      res += `/${item}`
    // 否则直接拼接当前url
    } else {
      res += item
    }
  })
  return res
}

// 深拷贝方法
export const deepClone = (obj, hash = new WeakMap()) => {
  if (obj === null) return obj
  if (obj instanceof Date) return new Date(obj)
  if (obj instanceof RegExp) return new RegExp(obj)
  if (typeof obj !== 'object') return obj
  if (hash.get(obj)) return hash.get(obj)
  const cloneObj = new obj.constructor()
  // 找到的是所属类原型上的constructor,而原型上的 constructor指向的是当前类本身
  hash.set(obj, cloneObj)
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      // 实现一个递归拷贝
      cloneObj[key] = deepClone(obj[key], hash)
    }
  }
  return cloneObj
}

/**
 * @description 简单数据结构转树方法，递归法，有个缺点就是必须传入正确的pid
 * @param arr 节点数据集合
 * @param pid 每个节点的父节点id
 * @param idConfig 用来配置父子节点的关联键，默认是 {pKey:'pid', cKey:'id'}
 * @param fn 自定义父子节点的关联关系，默认是(cur, pid) => cur[pKey] === pid
 * */
export const buildTree = (arr, pid = null, idConfig = {}, fn) => {
  const pKey = idConfig.pKey || 'pid'
  const cKey = idConfig.cKey || 'id'
  if (!fn) {
    fn = (cur, pid) => cur[pKey] === pid
  }
  return arr.reduce((res, current) => {
    const flag = fn(current, pid)
    // console.log(current['pid'], pid)
    if (flag) {
      current.children = buildTree(arr, current[cKey], idConfig, fn)
      return [...res, current]
    }
    return res
  }, [])
}

/**
 * @description 简单数据结构转树方法，循环法
 * @param arr 节点数据集合
 * @param pid 每个节点的父节点id
 * @param idConfig 用来配置父子节点的关联键，默认是 {pKey:'pid', cKey:'id'}
 * */
export const buildTreeLoop = (arr, pid = null, idConfig = {}) => {
  const pKey = idConfig.pKey || 'pid'
  const cKey = idConfig.cKey || 'id'
  const map = new Map()
  arr.forEach(item => {
    map.set(item[cKey], item)
  })
  const res = []
  arr.forEach(item => {
    const parent = map.get(item[pKey])
    if (parent) {
      !parent.children && (parent.children = [])
      parent.children.push(item)
    } else {
      res.push(item)
    }
  })
  return res
}

/**
 * @description 根据条件过滤树节点
 * @param tree 树数据
 * @param arr 输出结果
 * @param fn 条件函数，该函数输出一个条件
 * */
export const filterTree = (tree, arr = [], fn) => { }

// 简单数据结构转树方法,根据数据做了特殊处理
export const buildTree2 = (arr, pid = null) => {
  const judge = (cur, id) => {
    const arr = ['sgsx', 'clsx', 'rysx']
    if (arr.indexOf(cur.pcode) !== -1) {
      return cur.pcode === id
    } else {
      return cur.pid === id
    }
  }
  return arr.reduce((res, current) => {
    if (judge(current, pid)) {
      current.children = buildTree2(arr, current.code)
      return [...res, current]
    }
    return res
  }, [])
}

/**
 * @description 判断对象是否为空
 * @param obj 对象
 */
export const judgeEmptyObj = obj => {
  const falg = obj instanceof Object && Object.keys(obj).length > 0
  return falg
}

/**
 * @description 判断数组是否为空
 * @param obj 数组
 */
export const judgeEmptyArr = arr => {
  return Array.isArray(arr) && arr.length > 0
}

/**
 * @description 组装合并行数组
 * @param list 列表数据
 * @key 列表项需要合并的字段
 * @return rowSpanArr[]
 * */
export const initRowSpanArr = (list, key) => {
  const rowSpanArr = []
  // 保存上一个code
  let oldCode = ''
  // 相同code出现的次数
  let count = 0
  // 该code第一次出现的位置
  let startIndex = 0

  list.forEach((item, index) => {
    // 根据code进行合并
    const code = list[index][key]
    if (index == 0) {
      oldCode = code
      count = 1
      rowSpanArr[0] = 1
    } else {
      if (code == oldCode) {
        count++
        rowSpanArr[startIndex] = count
        rowSpanArr[index] = 0
      } else {
        count = 1
        oldCode = code
        startIndex = index
        rowSpanArr[index] = 1
      }
    }
  })
  return rowSpanArr
}

/**
 * TODO 此方法replace本身就能实现，没必要封装，应删除
 * @description 获取正则替换结果
 * @param data 原始数据，被替换值
 * @param reg 正则表达式
 * @param all 为true全部替换，否则替换一次
 * @param toStr 替换值
 * @return String
 */
export const getStrByReg = params => {
  const { data, reg, toStr } = params
  const arrStr = `${data}`
  const str = arrStr.replace(reg, toStr)
  return str
}

/**
 * 根据路径获取一个对象中深层次的属性——支持对象，数组混合
 * @param {Object} obj 获取数据所在的对象,例如：{a:{b:'b',c:['c1','c2','c3']},d:'d'}
 * @param {String} str 路径字符串，例如：a.b;  a.c[1];  d
 * @return {Object} 返回的值，可为任意值
 */
export const getProperty = (obj = {}, str = '') => {
  const dealStr = str.replace(/\[(\w+)\]/g, '.$1') // 处理数组下标
  const arr = dealStr.split('.')
  for (const i in arr) {
    obj = obj[arr[i]] || ''
  }
  return obj
}

/**
 * 把时间切割成独立的年月日时分秒
 * @param {Date} date 传入的时间
 */
export const splitDate = date => {
  const curDate = new Date(date)
  const year = curDate.getFullYear()
  const month = curDate.getMonth() + 1
  const day = curDate.getDate()
  const hour = curDate.getHours()
  const min = curDate.getMinutes()
  const sec = curDate.getSeconds()
  return {
    year: `${year}`,
    month: month > 9 ? `${month}` : `0${month}`,
    day: day > 9 ? `${day}` : `0${day}`,
    hour: hour > 9 ? `${hour}` : `0${hour}`,
    min: min > 9 ? `${min}` : `0${min}`,
    sec: sec > 9 ? `${sec}` : `0${sec}`
  }
}

/**
 * @description 将url下载为图片
 * @param {string} url 传入的时间
 * @param {string} fileName 文件名称
 */
export const downLoadUrl = (url, fileName) => {
  const link = document.createElement('a')
  link.href = url
  const decodeFileName = `${fileName || Date.now()}.png`
  link.setAttribute('download', decodeFileName)
  document.body.appendChild(link)
  link.click()
}

// 获取全屏相关的API
export const fullScreenApi = {
  /**
   * 请求进入全屏模式
   * @returns {Function} 返回一个函数，该函数用于触发进入全屏模式的操作
   */
  requestFullScreen: function () {
    // 返回一个可用于请求全屏模式的函数，考虑了不同浏览器的兼容性
    return (
      document.requestFullScreen ||
      document.mozRequestFullScreen ||
      document.webkitRequestFullScreen ||
      document.msRequestFullscreen
    )
  },

  /**
   * 退出全屏模式
   * @returns {Function} 返回一个函数，该函数用于触发退出全屏模式的操作
   */
  cancelFullScreen: function () {
    // 返回一个可用于退出全屏模式的函数，考虑了不同浏览器的兼容性
    return (
      document.cancelFullScreen ||
      document.mozCancelFullScreen ||
      document.webkitCancelFullScreen ||
      document.exitFullscreen
    )
  },

  /**
   * 获取当前全屏元素
   * @returns {Element|null} 返回当前处于全屏模式的元素，如果没有则返回null
   */
  fullScreenElement: function () {
    // 返回当前处于全屏模式的元素，考虑了不同浏览器的兼容性
    return (
      document.fullscreenElement ||
      document.mozFullScreenElement ||
      document.webkitFullscreenElement ||
      document.msFullscreenElement
    )
  }
}



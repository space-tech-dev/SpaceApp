import Taro from '@tarojs/taro'

// HTTP 状态码错误说明
const errorMsg = {
  200: "服务器成功返回请求的数据。",
  201: "新建或修改数据成功。",
  202: "一个请求已经进入后台排队（异步任务）。",
  204: "删除数据成功。",
  400: "发出的请求有错误，服务器没有进行新建或修改数据的操作。",
  401: "没有权限",
  403: "用户得到授权，但是访问是被禁止的。",
  404: "发出的请求针对的是不存在的记录，服务器没有进行操作。",
  406: "请求的格式不可得。",
  410: "请求的资源被永久删除，且不会再得到的。",
  422: "当创建一个对象时，发生一个验证错误。",
  500: "服务器发生错误，请检查服务器。",
  502: "网关错误。",
  503: "服务不可用，服务器暂时过载或维护。",
  504: "网关超时。",
};

// 判断当前环境
const getBaseUrl = () => {
  let BASE_URL = '';
  if (process.env.NODE_ENV === 'development') {
    //开发环境 - 根据请求不同返回不同的BASE_URL
    BASE_URL = '开发环境'
  } else {
    // 生产环境
    BASE_URL = '生产环境'
  }
  return BASE_URL
};

// 获取当前页url
const getCurrentPageUrl = () => {
  let pages = Taro.getCurrentPages()
  let currentPage = pages[pages.length - 1]
  let url = currentPage.route
  return url
};

// 判断是否登录
const pageToLogin = () => {
  let path: any = getCurrentPageUrl()
  Taro.clearStorage()
  // 跳转到登录页面
  if (!path.includes('login')) {
    Taro.reLaunch({
      url: "/pages/login/login"
    });
  };
}

// 请求拦截
const customInterceptor = (chain: any) => {
  const requestParams = chain.requestParams
  Taro.showLoading({
    title: '加载中',
  })
  return chain.proceed(requestParams).then(res => {
    Taro.hideLoading()
    // 只要请求成功，不管返回什么状态码，都走这个回调
    if (errorMsg[res.statusCode]) {
      if (errorMsg[res.statusCode] === 403 || errorMsg[res.statusCode] === 401) {
        Taro.setStorageSync("Authorization", "")
        pageToLogin()
      } else if (errorMsg[res.statusCode] === 200) {
        return res.data
      }
      return Promise.reject({ desc: errorMsg[res.statusCode] })
    }
  }).catch((error: any) => {
    Taro.hideLoading()
    console.error(error)
    return Promise.reject(error)
  })
};
// Taro 提供了两个内置拦截器
// logInterceptor - 用于打印请求的相关信息
// timeoutInterceptor - 在请求超时时抛出错误。
// const interceptors = [customInterceptor, Taro.interceptors.logInterceptor]
const interceptors = [customInterceptor]
//添加拦截器
interceptors.forEach(interceptorItem => Taro.addInterceptor(interceptorItem))

// 配置请求api
const request = {
  get: (url: string, data: any) => {
    const BASE_URL = getBaseUrl();
    // let contentType = "application/x-www-form-urlencoded";
    // let contentType = "application/json;charset=UTF-8";
    const option: any = {
      url: BASE_URL + url,  //地址
      data: data,   //传参
      method: "get", //请求方式
      timeout: 50000, // 超时时间
      header: {  //请求头
        'content-type': "application/json;charset=UTF-8",
        'Authorization': Taro.getStorageSync('Authorization')
      }
    };
    return Taro.request(option);
  },
  post: (url: string, data: any) => {
    const BASE_URL = getBaseUrl();
    const option: any = {
      url: BASE_URL + url,  //地址
      data: data,   //传参
      method: "post", //请求方式
      timeout: 50000, // 超时时间
      header: {  //请求头
        'content-type': "application/json;charset=UTF-8",
        'Authorization': Taro.getStorageSync('Authorization')
      }
    };
    return Taro.request(option);
  }
};

export { errorMsg, request };

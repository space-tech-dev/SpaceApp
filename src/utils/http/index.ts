import Taro from '@tarojs/taro';
import env from './env';
import errorMsg from './errorMsg';

interface configType {
  url: string,
  method: any,
  data?: any,
  headers?: string,
  errorToast?: boolean,
  successToast?: boolean,
}

const CODE: string = 'code';

const fetch = Taro.request;



interface toastType {
  errorToast: boolean | undefined | string;
  successToast: boolean | undefined | string;
}

const toast: toastType = {
  errorToast: undefined,
  successToast: undefined,
};

// 获取当前页url
const getCurrentPageUrl = () => {
  let pages = Taro.getCurrentPages();
  let currentPage = pages[pages.length - 1];
  let url = currentPage.route;
  return url;
};

// 判断是否登录
const pageToLogin = () => {
  let path: any = getCurrentPageUrl();
  Taro.clearStorage();
  // 跳转到登录页面
  if (!path.includes('login')) {
    Taro.reLaunch({
      url: '/pages/login/login'
    });
  };
};

const handleStatus = (res) => {
  if (res['statusCode'] !== 200) {
    if (res['statusCode'] === 403 || res['statusCode'] === 401) {
      Taro.setStorageSync('Authorization', '');
      pageToLogin();
    }
    return Promise.reject({ desc: errorMsg['statusCode'] });
  } else {
    if (res.data[CODE] == 0) {
      if(toast.successToast) Taro.showToast({
        title: '成功',
      });
      return Promise.resolve(res.data);
    } else {
      return Promise.reject({ desc: errorMsg[res.data[CODE]] });
    }
  }
};

// 请求拦截
const customInterceptor = (chain: any) => {
  // 请求前的参数处理
  const requestParams = chain.requestParams;
  // 请求后的结果处理
  return chain.proceed(requestParams).then(res => {
    // 只要请求成功，不管返回什么状态码，都走这个函数

    return handleStatus(res);
  }).catch((error: any) => {
    const type = typeof toast.errorToast;
    if(toast.errorToast) Taro.showToast({
      title: type == 'string' ? toast.errorToast : error.desc,
      icon: 'error'
    });
    return Promise.reject({ ...error });
  });
};
// Taro 提供了两个内置拦截器
// logInterceptor - 用于打印请求的相关信息
// timeoutInterceptor - 在请求超时时抛出错误。
// const interceptors = [customInterceptor, Taro.interceptors.logInterceptor]
// const interceptors = [customInterceptor];
// //添加拦截器
// interceptors.forEach(interceptorItem => Taro.addInterceptor(interceptorItem));

Taro.addInterceptor(customInterceptor);

// 配置请求api
const request = async (config: configType) => {
  let { url, method, data, headers } = config;
  // let contentType = "application/x-www-form-urlencoded";
  let contentType: string = 'application/json;charset=UTF-8';
  contentType = headers || contentType;
  toast.errorToast = config.errorToast;
  toast.successToast = config.successToast;
  let res = await fetch({
    url: env.API_MAIN + url,  //地址
    data,   //传参
    method, //请求方式
    timeout: 50000, // 超时时间
    header: {  //请求头
      'content-type': contentType,
      'Authorization': Taro.getStorageSync('Authorization'),
    }
  });
  return res;

};

export default request;

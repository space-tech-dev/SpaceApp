import indexApi from '../pageApi/index';
import request from '../../index';

const indexServer = {
  fetchBanner: async (data: any) => {
    const res = await request({ ...data, method: 'POST', url: indexApi.banner, errorToast: true });
    // res 做一些处理
    return res;
  },
};

export default indexServer;
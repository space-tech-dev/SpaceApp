import { request } from '../../index';

interface configType {
  url: string,
  method: any,
  data?: any,
  headers?: string
}

const testApi = async (config:configType) => {
  const res = await request(config);
  return res;
};

export {
  testApi,
};
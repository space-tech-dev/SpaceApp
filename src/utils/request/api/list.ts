import { request } from "../index";
import ApiConfig from './api';

const listName = async (config: any) => {
    const res = await request.get(ApiConfig.apiName, config);
    return res
}

export {
    listName,
}
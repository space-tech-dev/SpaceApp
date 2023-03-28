interface envType {
  appName: string,
  codeEnv: string,
  API_MAIN?: string,
}

const env: envType = {
  appName: 'space-app',
  codeEnv: ''
};

const appConstMap = {
  dev: {
    API_MAIN: 'https://aws-taishan-dev.spacecycle.cn',
    // API_MAIN: 'http://127.0.0.1:3333',
  },
  test: {
    API_MAIN: 'https://aws-taishan-test.spacecycle.cn',
  },
  stg: {
    API_MAIN: 'https://aws-taishan-stg.spacecycle.cn',
  },
  pre: {
    API_MAIN: 'https://heroku-pre.spacecycle.cn',
  },
  pro: {
    API_MAIN: 'https://aws-taishan.spacecycle.cn',
  },
};

export function setEnv(codeEnv = 'pro') {
  if (env.codeEnv === codeEnv) {
    return;
  }
  env.codeEnv = codeEnv;
  Object.assign(env, appConstMap[codeEnv] ? appConstMap[codeEnv] : 'pro');
}

setEnv('dev');

export default env;

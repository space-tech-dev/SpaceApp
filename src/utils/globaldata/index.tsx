import React, { useState, useEffect } from 'react';
import Taro from '@tarojs/taro';

interface INavInfo {
  statusBarHeight: number | undefined;
  screenHeight: number;
  screenWidth: number,
  windowHeight: number;
}

function useNavInfo(): INavInfo {
  const [navInfo, setNavInfo] = useState({
    statusBarHeight: 0,
    screenHeight: 0,
    screenWidth: 0,
    windowHeight: 0,
  });

  useEffect(() => {
    const { statusBarHeight, screenWidth, screenHeight, windowHeight } =
      Taro.getSystemInfoSync();

    setNavInfo({
      statusBarHeight: statusBarHeight, //状态栏高度
      screenHeight: screenHeight,
      screenWidth: screenWidth,
      windowHeight: windowHeight,
    });
  }, []);

  return navInfo;
}

export default useNavInfo;

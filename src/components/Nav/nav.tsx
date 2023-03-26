import React, { useState, useEffect } from 'react';
import { View, Image } from '@tarojs/components';
import useNavInfo from '@/utils/globaldata/index';
import './nav.less'

interface navProps {
  title?: string,
  bgColor?: string,
  isHide?: boolean,
  navBgColor?: string,
}

const Nav: React.FC<navProps> = (props) => {
  const { statusBarHeight } = useNavInfo();
  const [barHeight, setBarHeight] = useState(statusBarHeight)
  useEffect(()=>{
    setBarHeight(statusBarHeight)
  }, [statusBarHeight])
  const { title, bgColor, isHide, navBgColor } = props; 
  return (
    <View className={['nav', isHide? 'hideAnimate' : 'show'].join(',')}>
      <View style={{height: barHeight, backgroundColor: bgColor}}></View>
      <View style={{backgroundColor: navBgColor}}  className='nav-title'>{ title ? title : '标题'}</View>
    </View>
  )
}

export default Nav;
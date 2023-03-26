import { Component, PropsWithChildren } from 'react'
import { View, Text } from '@tarojs/components'
import Nav from '@/components/Nav/nav';
import '@/assets/less/common.less'
import './index.less'

export default class Index extends Component<PropsWithChildren> {

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className={['index-container'].join(',')}>
        <Nav title='首页' bgColor='#ccc' navBgColor='#999'  />
        <View className={['content'].join(',')}></View>
      </View>
    )
  }
}

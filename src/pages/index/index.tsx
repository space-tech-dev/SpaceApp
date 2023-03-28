import { Component, PropsWithChildren } from 'react';
import { View, Text } from '@tarojs/components';
import Nav from '@/components/Nav/nav';
import indexServer from '@/utils/http/api/list/indexService';
import '@/assets/less/common.less';
import './index.less';

export default class Index extends Component<PropsWithChildren> {
  async componentDidMount() {
    // const res = await indexServer.fetchBanner({
    //   data: {
    //     city: '上海'
    //   }
    // });
    // console.log('res=-=-=-=');
    // console.log(res);
  }

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    return (
      <View className={['index-container'].join(',')}>
        {/* <Nav title='首页' bgColor='#ccc' navBgColor='#999' /> */}
        <View className={['content'].join(',')}></View>
      </View>
    );
  }
}

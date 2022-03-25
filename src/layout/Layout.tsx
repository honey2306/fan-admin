import React, { useState } from 'react'
import { Layout, Menu } from 'antd'
import User from "./User"
import classNames from "classnames"
import { pageList } from "./page"
import { IconFont } from "../utils"
import Technology from "../view/technology"
import FootPrint from "../view/footPrint"

const { Header, Sider, Content } = Layout

const LayoutIndex = () => {
  const [collapsed, setCollapsed] = useState(false)
  const [activeName, setActiveName] = useState('technology')
  const toggle = () => {
    setCollapsed(!collapsed)
  }
  const getText = (text: string) => {
    console.log(text)
  }
  return (<div className={'layout-index'}>
    <Layout className={'layout-main'}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className={'layout-title'}>
          {
            !collapsed ? 'fan后台管理系统' : <span className={'fan'}>Fan</span>
          }
        </div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['0']}>
          {
            pageList.map((item: any, index: number) => {
              return <Menu.Item key={index} icon={<IconFont type={item.icon}/>}
                onClick={() => setActiveName(item.name)}> {item.label}</Menu.Item>
            })
          }
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background header">
          <span className={classNames('collapsed', { 'small': collapsed })} onClick={toggle}/>
          <User/>
        </Header>
        <Content className="site-layout-background content">
          {activeName === 'technology' && <Technology/>}
          {activeName === 'footprint' && <FootPrint/>}
        </Content>
      </Layout>
    </Layout>
  </div>)
}

export default LayoutIndex

import React from 'react';
import PropTypes from 'prop-types';
import { Link, Route } from 'dva/router';
import DocumentTitle from 'react-document-title';
import { Icon } from 'antd';
import GlobalFooter from '../components/GlobalFooter';
import styles from './UserLayout.less';

const links = [
  {
    title: "帮助",
    href: ""
  },
  {
    title: "隐私",
    href: ""
  },
  {
    title: "条款",
    href: ""
  }
];

const copyright = (
  <div>
    Copyright <Icon type="copyright" /> 2017 核桃编程技术部出品
  </div>
);

class UserLayout extends React.PureComponent {
  static childContextTypes = {
    location: PropTypes.object
  };
  getChildContext() {
    const { location } = this.props;
    return { location };
  }
  getPageTitle() {
    const { getRouteData, location } = this.props;
    const { pathname } = location;
    let title = "核桃后台";
    getRouteData("UserLayout").forEach(item => {
      if (item.path === pathname) {
        title = `${item.name} - 核桃后台`;
      }
    });
    return title;
  }
  render() {
    const { getRouteData } = this.props;

    return (
      <DocumentTitle title={this.getPageTitle()}>
        <div className={styles.container}>
          <div className={styles.top}>
            <div className={styles.header}>
              <Link to="/">
                <img
                  alt=""
                  className={styles.logo}
                  src="http://img.pipacoding.com/icon/logotext.png"
                />
                <span className={styles.title}>核桃后台</span>
              </Link>
            </div>
            <div className={styles.desc}>Powered by Ant Design</div>
          </div>
          {getRouteData("UserLayout").map(item => (
            <Route
              exact={item.exact}
              key={item.path}
              path={item.path}
              component={item.component}
            />
          ))}
          <GlobalFooter
            className={styles.footer}
            links={links}
            copyright={copyright}
          />
        </div>
      </DocumentTitle>
    );
  }
}

export default UserLayout;

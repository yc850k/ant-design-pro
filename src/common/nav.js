import dynamic from "dva/dynamic";
import _ from "lodash";

import { isLogin } from "../utils/utils";
// power = { 1: "查看菜单", 2: "查看详情", 3: "新增", 4: "修改", 5: "删除", 6: "审核", 7: "上传" }
// options = { MENU: "查看菜单", DETAIL: "查看详情", ADD: "新增", UPDATE: "修改", DELETE: "删除", CHECK: "审核", UPLOAD: "上传" }

// wrapper of dynamic
const dynamicWrapper = (app, models, component) => {
  if (!app) return null;
  return dynamic({
    app,
    models: () => models.map(m => import(`../models/${m}.js`)),
    component
  });
};

function redirectToLogin(nextState, replace) {
  if (!isLogin()) {
    replace({
      pathname: "/user/login",
      state: {
        nextPathname: nextState.location.pathname,
        nextSearch: location.search
      }
    });
  }
}

function redirectToDashboard(nextState, replace) {
  if (isLogin()) {
    replace("/dashboard");
  }
}

export var Menu = [];
// nav data
export const getNavData = app => {
  const data = [
    {
      component: dynamicWrapper(app, ["user", "login"], () =>
        import("../layouts/BasicLayout")
      ),
      layout: "BasicLayout",
      name: "首页", // for breadcrumb
      onEnter: redirectToLogin,
      path: "/",
      power: [1],
      children: [
        {
          id: _.uniqueId(),
          name: "Dashboard",
          icon: "dashboard",
          path: "dashboard",
          children: [
            {
              id: _.uniqueId(),
              name: "分析页",
              path: "analysis",
              component: dynamicWrapper(app, ["chart"], () =>
                import("../routes/Dashboard/Analysis")
              ),
              power: [1]
            },
            {
              id: _.uniqueId(),
              name: "工作台",
              path: "workplace",
              component: dynamicWrapper(
                app,
                ["project", "activities", "chart"],
                () => import("../routes/Dashboard/Workplace")
              ),
              power: [1, 2, 3, 4, 5]
            }
          ]
        },
        {
          id: _.uniqueId(),
          name: "表单页",
          path: "form",
          icon: "form",
          children: [
            {
              id: _.uniqueId(),
              name: "基础表单",
              path: "basic-form",
              component: dynamicWrapper(app, ["form"], () =>
                import("../routes/Forms/BasicForm")
              )
            },
            {
              id: _.uniqueId(),
              name: "分步表单",
              path: "step-form",
              component: dynamicWrapper(app, ["form"], () =>
                import("../routes/Forms/StepForm")
              ),
              children: [
                {
                  id: _.uniqueId(),
                  path: "confirm",
                  component: dynamicWrapper(app, ["form"], () =>
                    import("../routes/Forms/StepForm/Step2")
                  )
                },
                {
                  id: _.uniqueId(),
                  path: "result",
                  component: dynamicWrapper(app, ["form"], () =>
                    import("../routes/Forms/StepForm/Step3")
                  )
                }
              ]
            },
            {
              id: _.uniqueId(),
              name: "高级表单",
              path: "advanced-form",
              component: dynamicWrapper(app, ["form"], () =>
                import("../routes/Forms/AdvancedForm")
              )
            }
          ]
        },
        {
          id: _.uniqueId(),
          name: "列表页",
          path: "list",
          icon: "table",
          children: [
            {
              id: _.uniqueId(),
              name: "查询表格",
              path: "table-list",
              component: dynamicWrapper(app, ["rule"], () =>
                import("../routes/List/TableList")
              )
            },
            {
              id: _.uniqueId(),
              name: "标准列表",
              path: "basic-list",
              component: dynamicWrapper(app, ["list"], () =>
                import("../routes/List/BasicList")
              )
            },
            {
              id: _.uniqueId(),
              name: "卡片列表",
              path: "card-list",
              component: dynamicWrapper(app, ["list"], () =>
                import("../routes/List/CardList")
              )
            },
            {
              id: _.uniqueId(),
              name: "搜索列表（项目）",
              path: "cover-card-list",
              component: dynamicWrapper(app, ["list"], () =>
                import("../routes/List/CoverCardList")
              )
            },
            {
              id: _.uniqueId(),
              name: "搜索列表（应用）",
              path: "filter-card-list",
              component: dynamicWrapper(app, ["list"], () =>
                import("../routes/List/FilterCardList")
              )
            },
            {
              id: _.uniqueId(),
              name: "搜索列表（文章）",
              path: "search",
              component: dynamicWrapper(app, ["list"], () =>
                import("../routes/List/SearchList")
              )
            }
          ]
        },
        {
          id: _.uniqueId(),
          name: "详情页",
          path: "profile",
          icon: "profile",
          children: [
            {
              id: _.uniqueId(),
              name: "基础详情页",
              path: "basic",
              component: dynamicWrapper(app, ["profile"], () =>
                import("../routes/Profile/BasicProfile")
              )
            },
            {
              id: _.uniqueId(),
              name: "高级详情页",
              path: "advanced",
              component: dynamicWrapper(app, ["profile"], () =>
                import("../routes/Profile/AdvancedProfile")
              )
            }
          ]
        },
        {
          id: _.uniqueId(),
          name: "结果",
          path: "result",
          icon: "check-circle-o",
          children: [
            {
              id: _.uniqueId(),
              name: "成功",
              path: "success",
              component: dynamicWrapper(app, [], () =>
                import("../routes/Result/Success")
              )
            },
            {
              id: _.uniqueId(),
              name: "失败",
              path: "fail",
              component: dynamicWrapper(app, [], () =>
                import("../routes/Result/Error")
              )
            }
          ]
        },
        {
          id: _.uniqueId(),
          name: "异常",
          path: "exception",
          icon: "warning",
          children: [
            {
              id: _.uniqueId(),
              name: "403",
              path: "403",
              component: dynamicWrapper(app, [], () =>
                import("../routes/Exception/403")
              )
            },
            {
              id: _.uniqueId(),
              name: "404",
              path: "404",
              component: dynamicWrapper(app, [], () =>
                import("../routes/Exception/404")
              )
            },
            {
              id: _.uniqueId(),
              name: "500",
              path: "500",
              component: dynamicWrapper(app, [], () =>
                import("../routes/Exception/500")
              )
            }
          ]
        }
      ]
    },
    {
      id: _.uniqueId(),
      component: dynamicWrapper(app, [], () => import("../layouts/UserLayout")),
      path: "/user",
      layout: "UserLayout",
      children: [
        {
          id: _.uniqueId(),
          name: "帐户",
          icon: "user",
          path: "user",
          children: [
            {
              id: _.uniqueId(),
              name: "登录",
              path: "login",
              component: dynamicWrapper(app, ["login"], () =>
                import("../routes/User/Login")
              )
            }
            // {
            //   name: '注册',
            //   path: 'register',
            //   component: dynamicWrapper(app, ['register'], () => import('../routes/User/Register')),
            // },
            // {
            //   name: '注册结果',
            //   path: 'register-result',
            //   component: dynamicWrapper(app, [], () => import('../routes/User/RegisterResult')),
            // },
          ]
        }
      ]
    },
    {
      id: _.uniqueId(),
      component: dynamicWrapper(app, [], () =>
        import("../layouts/BlankLayout")
      ),
      layout: "BlankLayout",
      children: {
        id: _.uniqueId(),
        name: "使用文档",
        path: "http://pro.ant.design/docs/getting-started",
        target: "_blank",
        icon: "book"
      }
    }
  ];
  if (Menu.length === 0) {
    Menu = data[0].children;
  }
  return data;
};

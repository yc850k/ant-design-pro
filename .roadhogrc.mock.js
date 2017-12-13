import mockjs from "mockjs";
import { getRule, postRule } from "./mock/rule";
import { getActivities, getNotice, getFakeList } from "./mock/api";
import { getFakeChartData } from "./mock/chart";
import { imgMap } from "./mock/utils";
import { getProfileBasicData } from "./mock/profile";
import { getProfileAdvancedData } from "./mock/profile";
import { getNotices } from "./mock/notices";
import { format, delay } from "roadhog-api-doc";

// 是否禁用代理
const noProxy = process.env.NO_PROXY === "true";

// 代码中会兼容本地 service mock 以及部署站点的静态数据
const proxy = {
  // 支持值为 Object 和 Array
  "GET /api/currentUser": {
    $desc: "获取当前用户接口",
    $params: {
      pageSize: {
        desc: "分页",
        exp: 2
      }
    },
    $body: {
      name: 'Serati Ma',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
      userid: '00000001',
      notifyCount: 12,
      role: [
        { id: 1, name: "htbcadmin2017", menu: 1, power: "[1,2]" },
        { id: 2, name: "htbcadmin2017", menu: 2, power: "[1]" },
        { id: 3, name: "htbcadmin2017", menu: 3, power: "[1,2,3,4,5]" },
        { id: 4, name: "htbcadmin2017", menu: 4, power: "[1,2,3,4,5]" },
        { id: 5, name: "htbcadmin2017", menu: 5, power: "[1,2,3,4,5]" },
        { id: 6, name: "htbcadmin2017", menu: 6, power: "[1,2,3,4,5]" },
        { id: 7, name: "htbcadmin2017", menu: 7, power: "[1,2,3,4,5]" },
        { id: 8, name: "htbcadmin2017", menu: 8, power: "[1,2,3,4,5]" },
        { id: 9, name: "htbcadmin2017", menu: 9, power: "[1,2,3,4,5]" },
        { id: 10, name: "htbcadmin2017", menu: 10, power: "[1,2,3,4,5]" },
        { id: 12, name: "htbcadmin2017", menu: 12, power: "[1]" },
        { id: 13, name: "htbcadmin2017", menu: 13, power: "[1,2]" },
        { id: 14, name: "htbcadmin2017", menu: 14, power: "[1,2]" }
      ]
    }
  },
  // GET POST 可省略
  "GET /api/users": [
    {
      key: "1",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park"
    },
    {
      key: "2",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park"
    },
    {
      key: "3",
      name: "Joe Black",
      age: 32,
      address: "Sidney No. 1 Lake Park"
    }
  ],
  "GET /api/project/notice": getNotice,
  "GET /api/activities": getActivities,
  "GET /api/rule": getRule,
  "POST /api/rule": {
    $params: {
      pageSize: {
        desc: "分页",
        exp: 2
      }
    },
    $body: postRule
  },
  "POST /api/forms": (req, res) => {
    res.send({ message: "Ok" });
  },
  "GET /api/tags": mockjs.mock({
    "list|100": [{ name: "@city", "value|1-100": 150, "type|0-2": 1 }]
  }),
  'GET /api/fake_list': getFakeList,
  'GET /api/fake_chart_data': getFakeChartData,
  'GET /api/profile/basic': getProfileBasicData,
  'GET /api/profile/advanced': getProfileAdvancedData,
  'POST /api/login/account': (req, res) => {
    const { password, userName, type } = req.body;
    res.send({
      status: password === '888888' && userName === 'admin' ? 'ok' : 'error',
      type,
    });
  },
  "POST /api/register": (req, res) => {
    res.send({ status: "ok" });
  },
  "GET /api/notices": getNotices
};

export default (noProxy ? {} : delay(proxy, 1000));

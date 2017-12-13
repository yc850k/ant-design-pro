import { query as queryUsers, queryCurrent } from "../services/user";
import { Menu } from "../common/nav";

function getAllPathPowers(menuArray, curPowers) {
  return menuArray.reduce((dir, item) => {
    dir[`/${item.path}`] = curPowers[item.id];
    let children = item.children;
    if (children) {
      if (!Array.isArray(children)) {
        children = [children];
      }
      children.reduce((cdir, cur) => {
        dir[`/${cdir}/${cur.path}`] = curPowers[cur.id];
        return cdir;
      }, item.path);
      getAllPathPowers(children, curPowers);
    }
    return dir;
  }, {});
}

export default {
  namespace: "user",

  state: {
    list: [],
    loading: false,
    currentUser: {}
  },

  effects: {
    *fetch(_, { call, put }) {
      yield put({
        type: "changeLoading",
        payload: true
      });
      const response = yield call(queryUsers);
      yield put({
        type: "save",
        payload: response
      });
      yield put({
        type: "changeLoading",
        payload: false
      });
    },
    *fetchCurrent(_, { call, put }) {
      const response = yield call(queryCurrent);
      const data = response;
      if (data && data.role) {
        const role = data.role;
        data.role = role.reduce((dir, item) => {
          dir[item.menu] = JSON.parse(item.power);
          return dir;
        }, {});
        const nav = Menu;
        // alert(JSON.stringify(nav));
        data.power = getAllPathPowers(nav, data.role);
      }
      yield put({
        type: "saveCurrentUser",
        payload: data
      });
    }
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        list: action.payload
      };
    },
    changeLoading(state, action) {
      return {
        ...state,
        loading: action.payload
      };
    },
    saveCurrentUser(state, action) {
      return {
        ...state,
        currentUser: action.payload
      };
    },
    changeNotifyCount(state, action) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload
        }
      };
    }
  }
};

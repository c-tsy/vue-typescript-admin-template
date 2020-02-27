import Vue from 'vue'
import Vuex from 'vuex'
import { IAppState } from './modules/app'
import { IUserState } from './modules/user'
import { ITagsViewState } from './modules/tags-view'
import { IErrorLogState } from './modules/error-log'
import { IPermissionState } from './modules/permission'
import { ISettingsState } from './modules/settings'
import auth from './tsy/auth'
import users from './tsy/common/users'
declare let window: any;
Vue.use(Vuex)

export interface IRootState {
  app: IAppState
  user: IUserState
  tagsView: ITagsViewState
  errorLog: IErrorLogState
  permission: IPermissionState
  settings: ISettingsState,
  auth: auth
}

// Declare empty store first, dynamically register all modules later.
const store = new Vuex.Store<IRootState>({
  modules: {
    auth, users
  }
})
export default store;
window.Store = store;
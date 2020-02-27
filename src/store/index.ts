import Vue from 'vue'
import Vuex from 'vuex'
import auth from './tsy/auth'
import { IAppState } from './modules/app'
import { IUserState } from './modules/user'
import { ITagsViewState } from './modules/tags-view'
import { IErrorLogState } from './modules/error-log'
import { IPermissionState } from './modules/permission'
import { ISettingsState } from './modules/settings'
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
    auth
  }
})
export default store;
window.Store = store;
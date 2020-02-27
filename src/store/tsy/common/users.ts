import { VuexModule, Module, Action, Mutation, getModule } from 'vuex-module-decorators'
import store from '@/store'
import User from "@ctsy/api-sdk/dist/modules/User";
import { SearchResult, SearchWhere } from '@ctsy/api-sdk/dist/lib'
import hook, { HookWhen } from '@ctsy/hook';

@Module({})
export default class users extends VuexModule {
    Result: SearchResult<any> = new SearchResult();
    Where: SearchWhere = new SearchWhere();
    @Mutation
    set_users_where(data: any) {
        this.Where = data;
    }
    @Mutation
    set_users_result(data: any) {
        this.Result = data;
    }
    get users_result() {
        return this.Result;
    }
    @Action({ rawError: true })
    async get_users_list(where: SearchWhere) {
        let w = where || this.Where;
        // try {
        this.context.commit('set_users_result', await User.UsersApi.search(w.W, w))
        return this.Result;
    }

}
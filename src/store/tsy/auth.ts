import { VuexModule, Module, Action, Mutation, getModule } from 'vuex-module-decorators'
import store from '@/store'
import User from "@ctsy/api-sdk/dist/modules/User";
import hook, { HookWhen } from '@ctsy/hook';

@Module({})
export default class auth extends VuexModule {
    User: { UID: 0 } | any = { UID: 0 };
    @Mutation
    protected set_user(user: any) {
        this.User = user;
        hook.emit('loginsuccess', HookWhen.After, this, user);
    }
    @Action({ rawError: true })
    async login(data: { username: string, password: string }) {
        let rs = await User.AuthApi.login(data.username, data.password);
        if (rs.UID && rs.UID > 0) {
            this.context.commit('set_user', rs);
            return rs;
        }
        return this.User;
    }
    @Action
    async relogin() {
        let rs = await User.AuthApi.relogin();
        if (rs.UID && rs.UID > 0) {
            this.context.commit('set_user', rs);
            return rs;
        }
        return this.User;
    }
    @Action
    async logout() {
        let rs = await User.AuthApi.logout();
        this.context.commit('set_user', { UID: 0 });
        return this.User;
    }
}
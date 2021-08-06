// eslint-disable-next-line import/no-cycle
import { loginOutService, loginService } from '@s/loginService';

const userStore = {
	state: {
		token: null,
		isRefreshAside: false
	},
	mutations: {
		setToken(state, token) {
			state.token = token;
		}
	},
	getters: {
		getToken(state) {
			return state.token;
		}
	},
	actions: {
		async loginStore(context, data) {
			await loginService(data);
			context.commit('setToken');
		},
		loginOutStore(context) {
			loginOutService();
			context.commit('setToken', '');
		}
	}
};

export default userStore;

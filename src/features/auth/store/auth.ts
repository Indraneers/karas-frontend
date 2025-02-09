import createRefresh from 'react-auth-kit/createRefresh';
import createStore from 'react-auth-kit/createStore';
import { create } from 'zustand';
import { getAccessToken, requestWithRefreshToken } from '../utils/auth';

const refresh = createRefresh({
  interval: 5,
  refreshApiCallback: async (param) => {
    try {
      const response = await requestWithRefreshToken(param.refreshToken);
      
      if (response.type === 'success') {
        return {
          isSuccess: true,
          newAuthTokenType: 'Bearer',
          newAuthToken: response.access_token,
          newRefreshToken: response.refresh_token,
          newAuthTokenExpireIn: response.refresh_expires_in/60,
          newRefreshTokenExpiresIn: response.expires_in/60
        };
      }
      else {
        return {
          isSuccess: false,
          newAuthToken: '',
          newAuthTokenExpireIn: 5,
          newRefreshTokenExpiresIn: 15
        }; 
      }
    }
    catch(error){
      console.error(error);
      return {
        isSuccess: false,
        newAuthToken: '',
        newAuthTokenExpireIn: 5,
        newRefreshTokenExpiresIn: 15
      }; 
    }
  }
});

export const store = createStore({
  authName: 'karas-auth',
  authType: 'localstorage',
  refresh
});

interface AuthStoreState {
  auth: boolean;
  setAuth: (isAuth: boolean) => void
}

export const useAuthStore = create<AuthStoreState>((set) => ({
  auth: !!getAccessToken(),
  setAuth: (isAuth: boolean) => set(() => ({ auth: isAuth }))
}));
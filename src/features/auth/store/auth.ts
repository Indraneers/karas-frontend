import createRefresh from 'react-auth-kit/createRefresh';
import createStore from 'react-auth-kit/createStore';
import { postTokenKeycloak } from '../api/auth';
import { create } from 'zustand';

const refresh = createRefresh({
  interval: 10,
  refreshApiCallback: async (param) => {
    try {
      const formData = new URLSearchParams();
      formData.append('client_id', 'karas-frontend');
      formData.append('grant_type', 'refresh_token');
      formData.append('refresh_token', param.refreshToken || '');

      const response = await postTokenKeycloak(
        formData
      );
      
      if (response.type === 'success') {
        return {
          isSuccess: true,
          newAuthToken: response.access_token,
          newRefreshToken: response.refresh_token,
          newAuthTokenExpireIn: 5,
          newRefreshTokenExpiresIn: 15
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
  auth: false,
  setAuth: (isAuth: boolean) => set(() => ({ auth: isAuth }))
}));
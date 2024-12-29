import createRefresh from 'react-auth-kit/createRefresh';
import createStore from 'react-auth-kit/createStore';
import { postTokenKeycloak } from '../api/auth';

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
    

      return {
        isSuccess: true,
        newAuthToken: response.data.access_token,
        newRefreshToken: response.data.refresh_token,
        newAuthTokenExpireIn: 10,
        newRefreshTokenExpiresIn: 60
      };
    }
    catch(error){
      console.error(error);
      return {
        isSuccess: false,
        newAuthToken: '',
        newAuthTokenExpireIn: 10,
        newRefreshTokenExpiresIn: 60
      }; 
    }
  }
});

export const store = createStore({
  authName: 'karas-auth',
  authType: 'localstorage',
  refresh
});
import { request } from "@/lib/request";
import { AppConfig } from "../types/app-config";

export const getConfig = (): Promise<AppConfig> =>
  request({
    method: 'GET',
    url: '/config'
  });

export const setConfig = (appConfig: AppConfig, file: File): Promise<AppConfig> => {
  const formData = new FormData();
  
  // Append the categoryDto as a JSON string
  formData.append('data', new Blob([JSON.stringify(appConfig)], { type: 'application/json' }));
  
  // Append the file if provided
  if (file) {
    formData.append('file', file);
  }

  return request({
    url: '/config',
    method: 'PUT',
    data: formData,
    headers: {
      "Content-Type": 'multipart/form-data'
    }
  });
};
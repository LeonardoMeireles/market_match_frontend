import axios, { ResponseType } from 'axios';

const getAccessToken = () => {
  return 'testToken';
};

const axiosApiInstance = axios.create();

// Request interceptor for API calls
axiosApiInstance.interceptors.request.use(
  async (config) => {
    config.headers = {
      Authorization: `Bearer ${getAccessToken()}`,
    };
    return config;
  },
  (error) => Promise.reject(error),
);

// Response interceptor for API calls
axiosApiInstance.interceptors.response.use(
  (response) => response,
  async function (error) {

    const originalRequest = error.config;
    if ((error.response.status === 403 || error.response.status === 401) && !originalRequest._retry) {
      originalRequest._retry = true;
      axios.defaults.headers.common['Authorization'] = `Bearer ${getAccessToken()}`;
      return axiosApiInstance(originalRequest);
    }
    return Promise.reject(error);
  },
);

const get = async (url: string, params?: any) => {
  return axiosApiInstance.get(url, {
    headers: {
      Authorization: `Bearer ${getAccessToken()}`,
    },
    params,
  });
}

const patch = async (url: string, bodyData: any) => {
  return axiosApiInstance.patch(url, bodyData, {
    headers: {
      Authorization: `Bearer ${getAccessToken()}`,
    },
  });
};

const put = async (url: string, bodyData: any) => {
  return axiosApiInstance.put(url, bodyData, {
    headers: {
      Authorization: `Bearer ${getAccessToken()}`,
    },
  });
};

const post = async (url: string, bodyData: any, responseType?: ResponseType) => {
  return axiosApiInstance.post(url, bodyData, {
    responseType,
    headers: {
      Authorization: `Bearer ${getAccessToken()}`,
    },
  });
};

const deleteMethod = async (url: string) => {
  return axiosApiInstance.delete(url, {
    headers: {
      Authorization: `Bearer ${getAccessToken()}`,
    },
  });
};

const downloadFile = async (url: string, params?: any) => {
  return axios.get(url, {
    headers: {
      Authorization: `Bearer ${getAccessToken()}`,
    },
    responseType: 'blob',
    params,
  });
};

const downloadFileOrJson = async (url: string, params?: any) => {
  const response: any = await axiosApiInstance.post(url, params, {
    responseType: 'blob',
    headers: {
      Authorization: `Bearer ${getAccessToken()}`,
    },
  });
  return response;
};

export const API = {
  post,
  get,
  patch,
  put,
  delete: deleteMethod,
  downloadFile,
  downloadFileOrJson,
};
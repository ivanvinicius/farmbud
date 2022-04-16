import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  // useEffect,
} from 'react';
// import { toast } from 'react-toastify';

import api from '../services/api';

interface IUserProps {
  email: string;
  id: string;
  name: string;
}

interface IAuthState {
  token: string;
  user: IUserProps;
}

interface ISignInData {
  email: string;
  password: string;
}

interface IContextData {
  user: IUserProps;
  signIn(credential: ISignInData): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<IContextData>({} as IContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<IAuthState>(() => {
    const token = localStorage.getItem('@FarmBud:token');
    const user = localStorage.getItem('@FarmBud:user');

    if (token && user) {
      api.defaults.headers.authorization = `Bearer ${token}`;

      return { token, user: JSON.parse(user) };
    }

    return {} as IAuthState;
  });

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('sessions', { email, password });

    const { token, user } = response.data;

    api.defaults.headers.authorization = `Bearer ${token}`;

    localStorage.setItem('@FarmBud:token', token);
    localStorage.setItem('@FarmBud:user', JSON.stringify(user));

    setData({ token, user });
  }, []);

  const signOut = useCallback(async () => {
    localStorage.removeItem('@FarmBud:token');
    localStorage.removeItem('@FarmBud:user');

    setData({} as IAuthState);
  }, []);

  // /* When the token is expired obligate a sign-out action */
  // useEffect(() => {
  //   const interceptor = api.interceptors.response.use(
  //     (res) => res,
  //     (err) => {
  //       const url = new URL(err.config.url, err.config.baseURL);

  //       if (err.response.status === 401 && url.pathname !== '/signin') {
  //         toast.error('Sua sessão expirou, faça login novamente.');

  //         signOut();
  //       }

  //       return Promise.reject(err);
  //     },
  //   );

  //   return () => {
  //     api.interceptors.response.eject(interceptor);
  //   };
  // }, [signOut]);

  return (
    <AuthContext.Provider value={{ user: data.user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = (): IContextData => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};

export { AuthProvider, useAuth };

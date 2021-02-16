import { act, renderHook } from '@testing-library/react-hooks';
import MockAdapter from 'axios-mock-adapter';
import { AuthProvider, useAuth } from '../../hooks/auth';
import api from '../../services/api';

const apiMock = new MockAdapter(api);

const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');
const removeItemSpy = jest.spyOn(Storage.prototype, 'removeItem');
const responseMock = {
  user: {
    id: '123',
    name: 'john doe',
    email: 'johndoe@email.com',
  },
  token: 'token-123',
};
apiMock.onPost('sessions').reply(200, responseMock);

describe.only('Auth hook', () => {
  beforeEach(() => {
    removeItemSpy.mockClear();
    setItemSpy.mockClear();
  });
  it('Should be able to sign in', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });
    result.current.signIn({
      email: 'johndoe@email.com',
      password: 'veryhardpassword',
    });

    await waitForNextUpdate();
    expect(result.current.user.email).toEqual('johndoe@email.com');
    expect(setItemSpy).toHaveBeenCalledWith(
      '@gobarber:token',
      responseMock.token,
    );
    expect(setItemSpy).toHaveBeenCalledWith(
      '@gobarber:user',
      JSON.stringify(responseMock.user),
    );
  });
  it('Should restore user data from storage', () => {
    jest.spyOn(Storage.prototype, 'getItem').mockImplementation(
      key =>
        ({
          '@gobarber:token': responseMock.token,
          '@gobarber:user': JSON.stringify(responseMock.user),
        }[key]),
    );

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    expect(result.current.user.email).toEqual('johndoe@email.com');
  });
  it('Should be able to sign out', async () => {
    jest.spyOn(Storage.prototype, 'getItem').mockImplementation(
      key =>
        ({
          '@gobarber:token': responseMock.token,
          '@gobarber:user': JSON.stringify(responseMock.user),
        }[key]),
    );

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });
    act(() => {
      result.current.signOut();
    });
    expect(result.current.user).toBeUndefined();
    expect(removeItemSpy).toHaveBeenCalledTimes(2);
  });
  it('Should be able to update user', () => {
    jest.spyOn(Storage.prototype, 'getItem').mockImplementation(
      key =>
        ({
          '@gobarber:token': responseMock.token,
          '@gobarber:user': JSON.stringify(responseMock.user),
        }[key]),
    );
    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });
    const updatedUser = {
      ...result.current.user,
      email: 'joaoninguem@email.com',
    };
    act(() => {
      result.current.updateUser(updatedUser);
    });
    expect(setItemSpy).toHaveBeenCalledWith(
      '@gobarber:user',
      JSON.stringify(updatedUser),
    );
    expect(result.current.user.email).toEqual('joaoninguem@email.com');
  });
});

import nock from "nock";

import { mockRefreshTokenAPI, mockUserAPI } from "./mocks";
import { useMe } from "./use-me";
import { removeHeaderToken, setHeaderToken } from "./client";
import { renderHook, waitFor } from "@testing-library/react";
import { createRQWrapper } from "./test-utils";
import * as ApiUtils from "./refresh-auth-logic";

const fetchNewTokenSpy = jest.spyOn(ApiUtils, "fetchNewToken");

afterEach(() => {
  fetchNewTokenSpy.mockClear();
  removeHeaderToken();
  nock.cleanAll();
});

describe("Refresh token Logic", () => {
  it("should return error if the the api return error 500 + no call for refresh token api", async () => {
    mockUserAPI("error");
    const { result } = renderHook(() => useMe(), {
      wrapper: createRQWrapper(),
    });
    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(fetchNewTokenSpy).toHaveBeenCalledTimes(0);
  });

  it("Should return error if we didn't set token to our axios client + no call for refresh token api", async () => {
    mockUserAPI("success");
    const { result } = renderHook(() => useMe(), {
      wrapper: createRQWrapper(),
    });
    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(fetchNewTokenSpy).toHaveBeenCalledTimes(0);
  });

  it("should return the correct user if set valid token + no call to refresh token", async () => {
    mockUserAPI("success");
    setHeaderToken("valid-token");
    const { result } = renderHook(() => useMe(), {
      wrapper: createRQWrapper(),
    });
    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
      expect(result.current.data.email).toEqual("test@email.com");
    });

    expect(fetchNewTokenSpy).toHaveBeenCalledTimes(0);
  });

  it("Should return error on refresh token call return error + refresh token should be called", async () => {
    mockUserAPI("success");
    mockRefreshTokenAPI("error");
    setHeaderToken("invalid-valid-token");
    const { result } = renderHook(() => useMe(), {
      wrapper: createRQWrapper(),
    });
    await waitFor(() => {
      expect(result.current.isError).toBe(true);
      expect(fetchNewTokenSpy).toHaveBeenCalledTimes(1);
    });
  });

  it("should call refresh token on error 401 and return success after refreshing token successfully", async () => {
    mockUserAPI("success");
    mockRefreshTokenAPI("success");
    setHeaderToken("invalid-valid-token");
    const { result } = renderHook(() => useMe(), {
      wrapper: createRQWrapper(),
    });
    await waitFor(() => {
      expect(fetchNewTokenSpy).toHaveBeenCalledTimes(1);
      expect(result.current.isSuccess).toBe(true);
      expect(result.current.data.email).toEqual("test@email.com");
    });
  });
});

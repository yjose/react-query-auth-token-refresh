import { nockInstance } from "./test-utils";

import type { User } from "./types";

const userMock: Partial<User> = {
  email: "test@email.com",
  firstName: "test",
  lastName: "user",
};

type StatusType = "success" | "error";

export const mockUserAPI = (status: StatusType) => {
  if (status === "success")
    return nockInstance()
      .persist() // this is important as on refresh we are calling this api again
      .get("/user/me")
      .reply(function () {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        if (this?.req?.headers.authorization === "Bearer valid-token") {
          return [200, userMock];
        } else {
          if (this?.req?.headers?.authorization?.length > 0) {
            return [401, { message: "invalid-auth-header" }];
          }
          return [403, { message: "no-auth-token" }];
        }
      });
  else
    return nockInstance()
      .get("/user/me")
      .reply(500, { message: "server-error" });
};

export const mockRefreshTokenAPI = (status: StatusType) => {
  if (status === "success")
    return nockInstance()
      .get("/refresh-token")
      .reply(200, { token: "valid-token" });
  else
    return nockInstance()
      .get("/refresh-token")
      .reply(403, { message: "token-refresh-error" });
};

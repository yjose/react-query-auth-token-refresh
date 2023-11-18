import type { AxiosError } from "axios";
import { useQuery } from "@tanstack/react-query";

import { client } from "./client";
import type { User } from "./types";

type Response = User;

export const useMe = () =>
  useQuery<Response, AxiosError>({
    queryKey: ["me"],
    queryFn: () => client.get(`/user/me`).then((res) => res.data),
  });

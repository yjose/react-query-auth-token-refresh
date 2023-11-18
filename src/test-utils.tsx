import nock from "nock";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import * as React from "react";

export const nockInstance = (options?: nock.Options) =>
  nock(`https://test-api.example.com`, options);

// its always good to create a separate instance of query client for tests while testing hooks
const createRQClient = () => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // ✅ turns retries off
        retry: false,
      },
    },
  });
};

export const createRQWrapper = () => {
  const queryClientTest = createRQClient();
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClientTest}>
      {children}
    </QueryClientProvider>
  );
};

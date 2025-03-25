"use client";
import { SessionProvider } from "next-auth/react";
import React from "react";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

export const Providers: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <>
      <SessionProvider refetchInterval={0} refetchOnWindowFocus={false}>
        <QueryClientProvider client={queryClient}>
          {children}
          <Toaster />
        </QueryClientProvider>
      </SessionProvider>
    </>
  );
};

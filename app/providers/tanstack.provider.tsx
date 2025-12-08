"use client"

import React from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
//import { ReactQueryDevtools } from '@tanstack/react-query-devtools'


type TanstackProviderProps = {
  children: React.ReactNode;
};

const TanstackProvider = ({ children }: TanstackProviderProps): React.ReactElement => {
  // Provider logic 
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
  );
};

export default TanstackProvider

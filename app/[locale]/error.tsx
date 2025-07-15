"use client"
import { Result, Button } from 'antd';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';


export default function Error({ 
  error, 
  reset 
}: { 
  error: Error & { digest?: string };
  reset: () => void;
}) {
  // Log the error to an error reporting service
  useEffect(() => {
    console.error(error);
  }, [error]);

  const router = useRouter();
  
  return (
    <Result
      status="error"
      title="Something went wrong"
      subTitle="Sorry, an unexpected error has occurred."
      extra={[
        <Button key="retry" type="primary" onClick={() => reset()}>
          Try again
        </Button>,
        <Button key="home" onClick={() => router.push('/')}>
          Back Home
        </Button>,
      ]}
    />
  );
}
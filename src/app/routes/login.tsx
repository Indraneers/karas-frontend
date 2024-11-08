
import { createFileRoute } from '@tanstack/react-router';

import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';

export const Route = createFileRoute('/login')({
  component: () => <LoginPage />
});

function LoginPage() {
  return (
    <div className='place-content-center grid bg-background h-screen font-body font-medium'>
      <div className='w-[30vw] h-full'>
        <img src="/logo.png" alt="Twister Logo" />
        <div className='flex justify-between mt-4 px-2'>
          <div className='flex items-center gap-2 cursor-pointer'>
            <Checkbox id="remember-me" />
            <label className='cursor-pointer' htmlFor="remember-me">Remember Me</label>
          </div>
          <Button className='font-medium text-base' variant='link'>Forget Password?</Button>
        </div>
        <Button className='mt-24 py-6 rounded-full w-full font-semibold text-background text-xl'>
          Log In
        </Button>
        <Button className='mt-24 w-full font-medium text-base text-center hover:underline no-underline' variant='link'>
          <span className='mr-1 font-light'>{"Don't have an acccount?"}</span> Sign up
        </Button>
      </div>
    </div>
  );
}
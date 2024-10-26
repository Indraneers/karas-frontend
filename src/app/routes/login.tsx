import { InputWithIcon } from '@/components/ui/input-with-button';
import { createFileRoute } from '@tanstack/react-router';

import LockIcon from '@/features/auth/assets/lock.svg?react';
import UserIcon from '@/features/auth/assets/user.svg?react';
import VisibilityIcon from '@/features/auth/assets/visibility.svg?react';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';

export const Route = createFileRoute('/login')({
  component: () => <LoginPage />
});

function LoginPage() {
  const LockIconElement = <LockIcon className='h-6' />;
  const UserIconElement = <UserIcon className='h-6' />;
  const visibilityIconElement = <button><VisibilityIcon /></button>;
  return (
    <div className='place-content-center grid bg-background h-screen font-body font-medium'>
      <div className='w-[30vw] h-full'>
        <img src="/logo.png" alt="Twister Logo" />
        <InputWithIcon 
          className='border-primary-foreground/50 bg-white mt-12 py-4 pl-12 rounded-full text-xl placeholder:text-xl' 
          startIconWrapperClassName='left-4'
          startIcon={LockIconElement} 
          placeholder='username' 
        />
        <InputWithIcon 
          type="password"
          className='border-primary-foreground/50 bg-white mt-4 py-4 pl-12 rounded-full text-xl placeholder:text-xl' 
          startIconWrapperClassName='left-4'
          endIconWrapperClassName='right-4'
          startIcon={UserIconElement} 
          endIcon={visibilityIconElement}
          placeholder='password' 
        />
        <div className='flex justify-between mt-4 px-2'>
          <div className='flex items-center gap-2 cursor-pointer'>
            <Checkbox id="remember-me" />
            <label className='cursor-pointer' htmlFor="remember-me">Remember Me</label>
          </div>
          <Button className='font-medium text-base' variant='link'>Forget Password?</Button>
        </div>
        <Button className='bg-primary-foreground mt-24 py-6 rounded-full w-full font-semibold text-background text-xl'>
          Log In
        </Button>
        <Button className='mt-24 w-full font-medium text-base text-center hover:underline no-underline' variant='link'>
          <span className='mr-1 font-light text-primary-foreground/80'>{"Don't have an acccount?"}</span> Sign up
        </Button>
      </div>
    </div>
  );
}
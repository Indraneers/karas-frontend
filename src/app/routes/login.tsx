 

import { createFileRoute, redirect, useNavigate } from '@tanstack/react-router';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import useSignIn from 'react-auth-kit/hooks/useSignIn';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { postTokenKeycloak } from '@/features/auth/api/auth';

interface LoginSearch {
  redirect: string;
}

export const Route = createFileRoute('/login')({
  validateSearch: (search: Record<string, unknown>): LoginSearch => {
    return {
      redirect: String(search?.redirect || '')
    };
  },
  beforeLoad: ({ context, search }) => {
    if (context.isAuthenticated) {
      console.log(search.redirect);
      throw redirect({
        to: search.redirect ? search.redirect : '/'
      });
    }
  },
  component: () => <LoginPage />
});

const formSchema = z.object({
  username: z.string({ message: 'Username is required' }),
  password: z.string({ message: 'Password is required' })
});


function LoginPage() {
  const search = Route.useSearch();
  const navigate = useNavigate();
  const signIn = useSignIn();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema)
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const formData = new URLSearchParams();
    formData.append('username', values.username);
    formData.append('password', values.password);
    formData.append('client_id', 'karas-frontend');
    formData.append('client_secret', 'secret');
    formData.append('grant_type', 'password');

    postTokenKeycloak(formData)
      .then((res) => {
        const signInSuccess = signIn({
          auth: {
            token: res.data.access_token,
            type: 'Bearer'
          },
          refresh: res.data.refresh_token
        });

        if (signInSuccess) {
          navigate({ to: search.redirect ?? '/' });
          return;
        }
        else {
          console.log('error');
        }
      });
  }
  

  return (
    <div className='place-content-center grid bg-muted h-screen'>
      <div className={cn("flex flex-col gap-6")}>
        <Card className="overflow-hidden">
          <CardContent className="grid md:grid-cols-2 p-0">
            <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 md:p-8">
              <Form {...form}>
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col items-center text-center">
                    <h1 className="font-bold text-2xl">Welcome back</h1>
                    <p className="text-balance text-muted-foreground">
                  Login to your Twister Cambodia Account
                    </p>
                  </div>
                  <div className="gap-2 grid">
                    <FormField
                      control={form.control}
                      name="username"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Username</FormLabel>
                          <FormControl>
                            <Input
                              className='border-border'
                              {...field}
                              required
                            />
                          </FormControl>
                          <FormDescription>
                            Enter your username
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="gap-2 grid">
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input className='border-border' type="password" {...field} required />
                          </FormControl>
                          <FormDescription>
                            Enter your password
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <Button type="submit" className="mt-16 w-full">
                    Login
                  </Button>
                </div>
              </Form>
            </form>
            <div className="md:block relative hidden p-8">
              <div className='relative w-full h-full'>
                <img
                  src="/logo.png"
                  alt="Image"
                  className="dark:brightness-[0.2] absolute inset-0 w-full h-full dark:grayscale object-contain"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';


interface RouterContext {
  // The ReturnType of your useAuth hook or the value of your AuthContext
  auth: boolean;
}


export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => (
    <div className='font-body'>
      <Outlet />
      <TanStackRouterDevtools />
    </div>
  )
});
import { LoadingSpinner } from "./loading-spinner";

export function LoadingPage() {
  return (
    <div className='relative place-content-center space-y-4 grid bg-background h-screen font-body'>
      <LoadingSpinner className='w-[250px] h-[250px] text-accent' />
      <p className="font-medium text-xl text-center">Loading...</p>
    </div>
  );
}
import { LoadingSpinner } from "./loading-spinner";

export function PageLoading() {
  return (
    <div className="place-content-center grid p-4">
      <LoadingSpinner className="w-60 h-60" />
    </div>
  );
}
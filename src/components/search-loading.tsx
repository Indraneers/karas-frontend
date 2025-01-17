import { LoadingSpinner } from "./loading-spinner";

export function SearchLoading() {
  return (
    <div className="place-content-center grid py-10 h-60">
      <LoadingSpinner className="w-40 h-40" />
    </div>
  );
}
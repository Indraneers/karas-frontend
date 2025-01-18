import { LoadingSpinner } from "./loading-spinner";

export function SearchLoading() {
  return (
    <div className="place-content-center grid py-10 h-60">
      <LoadingSpinner className="w-20 h-20" />
    </div>
  );
}
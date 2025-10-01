import { Spinner } from "./spinner";

interface PageLoadingProps {
  message?: string;
}

export function PageLoading({ message = "Loading..." }: PageLoadingProps) {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center gap-4 animate-fadeIn">
      <div className="relative">
        <Spinner size="lg" className="text-blue-600" />
      </div>
      <p className="text-sm text-gray-600 animate-pulse font-medium">{message}</p>
    </div>
  );
}

export function ButtonLoading() {
  return (
    <div className="flex items-center">
      <Spinner size="sm" className="mr-2" />
      <span className="animate-pulse">Please wait...</span>
    </div>
  );
}
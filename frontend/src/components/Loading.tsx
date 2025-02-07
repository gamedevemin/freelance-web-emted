export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-[200px]">
      <div className="relative">
        <div className="h-12 w-12">
          <div className="absolute h-12 w-12 rounded-full border-4 border-solid border-gray-200"></div>
          <div className="absolute h-12 w-12 rounded-full border-4 border-solid border-blue-600 border-t-transparent animate-spin"></div>
        </div>
        <div className="mt-4 text-center text-sm text-gray-500">Yükleniyor...</div>
      </div>
    </div>
  );
}

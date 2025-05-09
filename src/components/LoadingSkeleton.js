const LoadingSkeleton = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array(8)
        .fill()
        .map((_, index) => (
          <div
            key={index}
            className="bg-gray-100 rounded-xl h-80 animate-pulse overflow-hidden"
          >
            <div className="h-48 bg-gray-200"></div>
            <div className="p-5 space-y-3">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-3 bg-gray-200 rounded w-full"></div>
              <div className="h-3 bg-gray-200 rounded w-5/6"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2 mt-4"></div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default LoadingSkeleton;

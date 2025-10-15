export const SkeletonLoader = () => {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="h-7 w-2/5 bg-gray-200 rounded"></div>
      <div className="h-64 bg-gray-200 rounded-lg"></div>
      <div className="space-y-2">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-8 w-full bg-gray-200 rounded-md"></div>
        ))}
      </div>
    </div>
  );
};

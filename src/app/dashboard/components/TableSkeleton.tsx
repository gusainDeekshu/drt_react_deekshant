// app/dashboard/components/TableSkeleton.tsx
const SkeletonRow = () => (
  <div className="flex w-full items-center h-[50px] border-t border-slate-600">
    <div className="p-3 w-1/7 flex items-center justify-center">
      <div className="w-4 h-4 bg-slate-600 rounded"></div>
    </div>
    <div className="p-3 w-1/7"><div className="h-4 bg-slate-600 rounded w-3/4"></div></div>
    <div className="p-3 w-1/7"><div className="h-4 bg-slate-600 rounded w-1/2"></div></div>
    <div className="p-3 w-1/7"><div className="h-4 bg-slate-600 rounded w-1/3"></div></div>
    <div className="p-3 w-1/7"><div className="h-4 bg-slate-600 rounded w-2/3"></div></div>
    <div className="p-3 w-1/7"><div className="h-4 bg-slate-600 rounded w-1/4"></div></div>
    <div className="p-3 w-1/7"><div className="h-4 bg-slate-600 rounded w-1/2"></div></div>
  </div>
);

const TableSkeleton = () => {
  return (
    <div className="overflow-x-auto bg-slate-700 rounded-2xl animate-pulse">
      {/* Table Header */}
      <div className="bg-slate-800">
        <div className="flex w-full min-w-full">
          <div className="p-3 w-1/7 h-[50px]"></div>
          <div className="p-3 w-1/7 h-[50px]"></div>
          <div className="p-3 w-1/7 h-[50px]"></div>
          <div className="p-3 w-1/7 h-[50px]"></div>
          <div className="p-3 w-1/7 h-[50px]"></div>
          <div className="p-3 w-1/7 h-[50px]"></div>
          <div className="p-3 w-1/7 h-[50px]"></div>
        </div>
      </div>
      {/* Skeleton Body */}
      <div className="text-sm text-left text-slate-200">
        {Array.from({ length: 10 }).map((_, i) => <SkeletonRow key={i} />)}
      </div>
    </div>
  );
};

export default TableSkeleton;
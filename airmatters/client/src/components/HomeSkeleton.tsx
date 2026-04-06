import { Skeleton } from "@/components/ui/skeleton";

export default function HomeSkeleton() {
  return (
    <div className="w-full bg-background overflow-hidden">
      {/* 1. Hero Skeleton */}
      <div className="relative h-screen w-full flex items-center justify-center p-6">
        <div className="w-full max-w-7xl space-y-8">
          <Skeleton className="h-12 w-1/3" />
          <Skeleton className="h-32 w-2/3" />
          <div className="flex gap-4">
            <Skeleton className="h-14 w-40 rounded-full" />
            <Skeleton className="h-14 w-40 rounded-full" />
          </div>
        </div>
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/3 h-2/3 opacity-20">
          <Skeleton className="w-full h-full rounded-l-[10rem]" />
        </div>
      </div>

      {/* 2. Air Quality Skeleton */}
      <div className="py-24 px-6 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-6">
          <Skeleton className="h-10 w-1/2" />
          <Skeleton className="h-24 w-full" />
          <div className="grid grid-cols-3 gap-4">
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-20 w-full" />
          </div>
        </div>
        <div className="flex justify-center items-center">
          <Skeleton className="w-64 h-64 rounded-full" />
        </div>
      </div>

      {/* 3. Bento Impact Skeleton */}
      <div className="py-24 px-6 max-w-[90rem] mx-auto space-y-12">
        <div className="flex justify-between items-end">
          <div className="space-y-4">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-20 w-96" />
          </div>
          <Skeleton className="h-6 w-64" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-[800px]">
          <Skeleton className="md:col-span-8 md:row-span-2 rounded-[3rem]" />
          <Skeleton className="md:col-span-4 md:row-span-1 rounded-[2.5rem]" />
          <Skeleton className="md:col-span-4 md:row-span-1 rounded-[2.5rem]" />
          <Skeleton className="md:col-span-12 md:row-span-1 rounded-[3rem]" />
        </div>
      </div>

      {/* 4. Air Tokens Skeleton */}
      <div className="py-24 px-6 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-8">
          <Skeleton className="h-6 w-40 rounded-full" />
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-14 w-48 rounded-full" />
        </div>
        <div className="flex justify-center">
          <Skeleton className="w-96 h-96 rounded-full" />
        </div>
      </div>

      {/* 5. Process Teaser Skeleton */}
      <div className="py-32 bg-muted/10 h-screen w-full flex items-center justify-center">
        <div className="max-w-7xl w-full px-6 grid grid-cols-1 lg:grid-cols-2 gap-24">
          <div className="space-y-12">
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-48 w-3/4" />
          </div>
          <Skeleton className="h-full w-full rounded-3xl" />
        </div>
      </div>
    </div>
  );
}

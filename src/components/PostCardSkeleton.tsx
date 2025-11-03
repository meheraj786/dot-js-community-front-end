export default function PostCardSkeleton() {
  return (
    <article className="bg-gray-900 rounded-xl border border-gray-800 animate-pulse">
      <div className="p-4 sm:p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gray-800" />
            <div className="space-y-2">
              <div className="w-24 h-3 sm:h-4 bg-gray-800 rounded" />
              <div className="w-16 h-2 bg-gray-800 rounded" />
              <div className="w-20 h-2 bg-gray-800 rounded" />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-20 h-6 bg-gray-800 rounded-full" />
            <div className="w-16 h-6 bg-gray-800 rounded-full" />
            <div className="w-6 h-6 bg-gray-800 rounded-full" />
          </div>
        </div>

        {/* Content */}
        <div className="space-y-3 mb-4">
          <div className="w-full h-3 bg-gray-800 rounded" />
          <div className="w-5/6 h-3 bg-gray-800 rounded" />
          <div className="w-4/6 h-3 bg-gray-800 rounded" />
        </div>

        {/* Image */}
        <div className="mb-4 w-full h-56 bg-gray-800 rounded-lg" />

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          <div className="w-16 h-6 bg-gray-800 rounded-full" />
          <div className="w-14 h-6 bg-gray-800 rounded-full" />
          <div className="w-20 h-6 bg-gray-800 rounded-full" />
        </div>

        {/* Buttons (Like / Comment / Share / Save) */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-800">
          <div className="flex items-center gap-2">
            <div className="w-16 h-8 bg-gray-800 rounded-lg" />
            <div className="w-16 h-8 bg-gray-800 rounded-lg" />
            <div className="w-16 h-8 bg-gray-800 rounded-lg" />
          </div>
          <div className="w-8 h-8 bg-gray-800 rounded-lg" />
        </div>

        {/* Comment Box */}
        <div className="mt-4 pt-4 border-t border-gray-800">
          <div className="flex gap-3">
            <div className="w-8 h-8 bg-gray-800 rounded-full" />
            <div className="flex-1 space-y-2">
              <div className="w-full h-12 bg-gray-800 rounded-lg" />
              <div className="flex justify-end">
                <div className="w-24 h-8 bg-gray-800 rounded-lg" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

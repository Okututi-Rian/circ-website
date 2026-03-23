export default function Loading() {
  return (
    <div className="min-h-screen bg-surface animate-pulse">
      <div className="max-w-7xl mx-auto px-6 py-20 space-y-6">
        <div className="h-12 bg-surface-2 rounded-xl w-1/3" />
        <div className="h-4 bg-surface-2 rounded-lg w-2/3" />
        <div className="grid grid-cols-3 gap-6 mt-12">
          {[...Array(6)].map((_,i) => <div key={i} className="h-48 bg-surface-2 rounded-xl" />)}
        </div>
      </div>
    </div>
  )
}

export default function Dashboard() {
  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold text-slate-900 mb-8">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-slate-600">Total Projects</h3>
          <p className="text-3xl font-bold text-slate-900 mt-2">0</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-slate-600">Total Reviews</h3>
          <p className="text-3xl font-bold text-slate-900 mt-2">0</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-slate-600">Plan</h3>
          <p className="text-3xl font-bold text-slate-900 mt-2">Free</p>
        </div>
      </div>
    </div>
  );
}

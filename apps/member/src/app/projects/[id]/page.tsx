export default function ProjectDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold text-slate-900 mb-8">
        Project {params.id}
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Reviews</h3>
          <p className="text-slate-600">No reviews yet</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">
            Embed Code
          </h3>
          <pre className="bg-slate-100 p-4 rounded text-xs overflow-auto">
            {`<script src="..." />`}
          </pre>
        </div>
      </div>
    </div>
  );
}

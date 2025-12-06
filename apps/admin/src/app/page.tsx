import Link from "next/link";

export default function Page() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">RateCoo Admin Panel</h1>
      <p className="text-gray-600 mb-8">
        Welcome to the admin panel. Manage users, projects, and reviews here.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-2">Users</h2>
          <p className="text-gray-600 mb-4">Manage user accounts and tiers</p>
          <Link
            href="/admin/users"
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            View Users →
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-2">Projects</h2>
          <p className="text-gray-600 mb-4">View all widget projects</p>
          <Link
            href="/admin/projects"
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            View Projects →
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-2">Reviews</h2>
          <p className="text-gray-600 mb-4">Approve and manage reviews</p>
          <Link
            href="/admin/reviews"
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            View Reviews →
          </Link>
        </div>
      </div>

      <div className="mt-12 p-6 bg-blue-50 rounded-lg">
        <h2 className="text-lg font-semibold mb-2">API Documentation</h2>
        <p className="text-gray-600 mb-4">
          Use these endpoints to integrate with RateCoo:
        </p>
        <ul className="space-y-2 text-sm font-mono">
          <li className="text-gray-700">
            <span className="bg-gray-200 px-2 py-1 rounded">
              GET
            </span>{" "}
            /api/custom/widget/:projectId
          </li>
          <li className="text-gray-700">
            <span className="bg-gray-200 px-2 py-1 rounded">
              POST
            </span>{" "}
            /api/reviews
          </li>
        </ul>
      </div>
    </div>
  );
}

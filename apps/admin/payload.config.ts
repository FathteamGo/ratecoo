import { buildConfigWithDefaults } from "@payloadcms/next/utilities";
import { sqliteAdapter } from "@payloadcms/db-sqlite";
import { slateEditor } from "@payloadcms/richtext-slate";
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import path from "path";

import { Users } from "./collections/Users";
import { Projects } from "./collections/Projects";
import { Reviews } from "./collections/Reviews";

const filename = new URL(import.meta.url).pathname;
const dirname = path.dirname(filename);

export default buildConfigWithDefaults({
  admin: {
    user: Users.slug,
  },
  collections: [Users, Projects, Reviews],
  editor: slateEditor({}),
  secret: process.env.PAYLOAD_SECRET || "your-secret-key",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: sqliteAdapter({
    url: process.env.TURSO_DATABASE_URL || ":memory:",
  }),
  cors: ["*"],
});

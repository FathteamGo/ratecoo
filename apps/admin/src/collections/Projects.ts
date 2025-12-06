import { CollectionConfig } from "payload";

export const Projects: CollectionConfig = {
  slug: "projects",
  admin: {
    useAsTitle: "name",
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
    },
    {
      name: "user_id",
      type: "relationship",
      relationTo: "users",
      required: true,
    },
    {
      name: "settings",
      type: "json",
      admin: {
        description: "Widget configuration (color, branding, etc)",
      },
    },
    {
      name: "api_key",
      type: "text",
      unique: true,
    },
  ],
};

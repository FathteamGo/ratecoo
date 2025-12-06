import { CollectionConfig } from "payload";

export const Users: CollectionConfig = {
  slug: "users",
  auth: true,
  admin: {
    useAsTitle: "email",
  },
  fields: [
    {
      name: "email",
      type: "email",
      required: true,
      unique: true,
    },
    {
      name: "name",
      type: "text",
    },
    {
      name: "tier",
      type: "select",
      options: ["free", "pro"],
      defaultValue: "free",
      required: true,
    },
    {
      name: "image",
      type: "text",
    },
  ],
};

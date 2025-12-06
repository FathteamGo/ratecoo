import { CollectionConfig } from "payload";

export const Reviews: CollectionConfig = {
  slug: "reviews",
  admin: {
    useAsTitle: "customer_name",
  },
  fields: [
    {
      name: "customer_name",
      type: "text",
      required: true,
    },
    {
      name: "rating",
      type: "number",
      required: true,
      min: 1,
      max: 5,
    },
    {
      name: "comment",
      type: "richText",
    },
    {
      name: "project_id",
      type: "relationship",
      relationTo: "projects",
      required: true,
    },
    {
      name: "source",
      type: "select",
      options: ["widget", "import"],
      defaultValue: "widget",
    },
    {
      name: "status",
      type: "select",
      options: ["pending", "approved", "rejected"],
      defaultValue: "pending",
    },
    {
      name: "is_featured",
      type: "checkbox",
      defaultValue: false,
    },
  ],
};

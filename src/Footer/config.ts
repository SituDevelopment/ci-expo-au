import { link } from "@/fields/link";
import type { GlobalConfig } from "payload";

import { revalidateFooter } from "./hooks/revalidateFooter";

export const Footer: GlobalConfig = {
  slug: "footer",
  admin: {
    group: "Global Settings",
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "navItems",
      type: "array",
      fields: [
        link({
          appearances: false,
        }),
      ],
      maxRows: 6,
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: "@/Footer/RowLabel#RowLabel",
        },
      },
    },
  ],
  hooks: {
    afterChange: [revalidateFooter],
  },
};

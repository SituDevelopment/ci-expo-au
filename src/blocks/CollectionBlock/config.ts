import { link } from "@/fields/link";
import { Block } from "payload";

export const CollectionBlock: Block = {
    slug: "collectionBlock",
    interfaceName: "CollectionBlock",
    labels: {
        singular: "Collection Block",
        plural: "Collection Blocks",
    },
    fields: [
        {
            name: "title",
            label: "Section Heading",
            type: "text",
        },
        {
            name: "collectionSelect",
            label: "Select Collection",
            type: "select",
            required: true,
            options: [
                { label: "Sponsors", value: "sponsors" },
                { label: "Exhibitors", value: "exhibitors" },
            ],
        },
        {
            name: "displayMode",
            label: "Display Mode",
            type: "radio",
            admin: {
                layout: "horizontal",
                width: "50%",
            },
            defaultValue: "all",
            options: [
                { label: "All Items", value: "all" },
                { label: "Selected Items", value: "selected" },
            ],
            required: true,
        },
        {
            name: "limit",
            label: "Limit Number of Items",
            type: "number",
            admin: {
                condition: (_, siblingData) => siblingData.displayMode === "all",
            },
        },
        {
            name: "selectedItems",
            label: "Choose Items",
            type: "relationship",
            relationTo: ["sponsors", "exhibitors"],
            hasMany: true,
            admin: {
                condition: (_, siblingData) => siblingData.displayMode === "selected",
            },
        },
        {
            name: "layoutSettings",
            label: "Layout Settings",
            type: "group",
            fields: [
                {
                    name: "columns",
                    type: "select",
                    label: "Number of Columns",
                    defaultValue: "auto",
                    options: [
                        { label: "Auto (2 mobile / 6 desktop)", value: "auto" },
                        { label: "1 Column", value: "1" },
                        { label: "2 Columns", value: "2" },
                        { label: "3 Columns", value: "3" },
                        { label: "4 Columns", value: "4" },
                        { label: "5 Columns", value: "5" },
                        { label: "6 Columns", value: "6" },
                    ],
                },
                {
                    name: "imageSize",
                    type: "select",
                    label: "Logo Size",
                    defaultValue: "medium",
                    options: [
                        { label: "Small", value: "small" },
                        { label: "Medium", value: "medium" },
                        { label: "Large", value: "large" },
                        { label: "Extra Large", value: "extra-large" },
                    ],
                },
                {
                    name: "alignment",
                    type: "select",
                    label: "Content Alignment",
                    defaultValue: "start",
                    options: [
                        { label: "Start", value: "start" },
                        { label: "Center", value: "center" },
                        { label: "End", value: "end" },
                        { label: "Space Between", value: "between" },
                    ],
                },
            ],
        },
        {
            name: "enableLink",
            type: "checkbox",
        },
        link({
            overrides: {
                admin: {
                    condition: (_, { enableLink }) => Boolean(enableLink),
                },
            },
        }),
    ],
};

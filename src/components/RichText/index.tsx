import { BannerBlock } from "@/blocks/Banner/Component";
import { CallToActionBlock } from "@/blocks/CallToAction/Component";
import { CodeBlock, CodeBlockProps } from "@/blocks/Code/Component";
import { MediaBlock } from "@/blocks/MediaBlock/Component";
import type {
    BannerBlock as BannerBlockProps,
    CallToActionBlock as CTABlockProps,
    MediaBlock as MediaBlockProps,
} from "@/payload-types";
import { cn } from "@/utilities/ui";
import {
    DefaultNodeTypes,
    SerializedBlockNode,
    SerializedLinkNode,
} from "@payloadcms/richtext-lexical";
import { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";
import {
    JSXConvertersFunction,
    LinkJSXConverter,
    RichText as RichTextWithoutBlocks,
} from "@payloadcms/richtext-lexical/react";

type NodeTypes =
    | DefaultNodeTypes
    | SerializedBlockNode<CTABlockProps | MediaBlockProps | BannerBlockProps | CodeBlockProps>;

const internalDocToHref = ({ linkNode }: { linkNode: SerializedLinkNode }) => {
    const { value, relationTo } = linkNode.fields.doc!;
    if (typeof value !== "object") {
        throw new Error("Expected value to be an object");
    }
    const slug = value.slug;
    return relationTo === "posts" ? `/posts/${slug}` : `/${slug}`;
};

const jsxConverters: JSXConvertersFunction<NodeTypes> = ({ defaultConverters }) => ({
    ...defaultConverters,
    ...LinkJSXConverter({ internalDocToHref }),
    blocks: {
        banner: ({ node }) => <BannerBlock className="col-start-2 mb-4" {...node.fields} />,
        mediaBlock: ({ node }) => (
            <MediaBlock
                className="col-span-3 col-start-1"
                imgClassName="m-0"
                {...node.fields}
                enableGutter={false}
            />
        ),
        code: ({ node }) => <CodeBlock className="col-start-2" {...node.fields} />,
        cta: ({ node }) => <CallToActionBlock {...node.fields} />,
    },
});

type Props = {
    data: SerializedEditorState;
    enableGutter?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

export default function RichText(props: Props) {
    const { className, enableGutter = true, ...rest } = props;
    return (
        <RichTextWithoutBlocks
            converters={jsxConverters}
            className={cn(
                {
                    "container": enableGutter,
                    "max-w-none": !enableGutter,
                },
                className
            )}
            {...rest}
        />
    );
}

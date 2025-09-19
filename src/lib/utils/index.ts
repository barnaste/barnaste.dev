export const fetchMarkdownPosts = async () => {
    // import all files that match the glob (wildcard string)
    const allPostFiles = import.meta.glob('/src/lib/posts/*.md');
    const iterablePostFiles = Object.entries(allPostFiles);
    const allPosts = await Promise.all(
        iterablePostFiles.map(async ([path, resolver]) => {
            const { metadata } = await resolver() as { metadata: any };
            const postPath = path.slice(14, -3);

            return {
                meta: metadata,
                path: postPath
            };
        })
    );

    return allPosts;
}
export const calcPageCount = (total = 0, perPage = 0) => (
    Math.ceil(
        total / (perPage)
    )
);

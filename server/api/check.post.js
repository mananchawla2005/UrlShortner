import { checkSlug } from "../db/link.js";

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const { slug } = body
    if (!slug) {
        return sendError(event, createError({
            statusCode: 400,
            statusMessage: 'Slug cannot be empty.'
        }))
    }
    const checkData = await checkSlug(slug)
    return checkData
}
)
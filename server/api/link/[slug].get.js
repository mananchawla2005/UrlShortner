import { getShortLinkBySlug } from "../../db/link.js";

export default defineCachedEventHandler(async (event) => {
    // console.log(event)
    // const body = await readBody(event)
    // console.log(body)
    const { slug } = event.context.params
    // console.log(slug)
    if(!slug || typeof slug !== "string") {
        return sendError(event, createError({
            statusCode: 404,
            statusMessage: "Slug can't be empty"
        }))
    }

    const data = await getShortLinkBySlug(slug)
    // console.log(`logging data: ${data}`)
    if(!data) {
        return sendError(event, createError({
            statusCode: 404,
            statusMessage: "Short link not found"
        }))
    }

    return {
        data: data
    }
    
}
, {
    swr: true,
    maxAge: 1000000000
}
)
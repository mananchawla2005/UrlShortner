import { prisma } from "../../../db/index";

export default cachedEventHandler(async (event) => {
    const body = await readBody(event)
    const { slug } = body
    if(!slug || typeof slug !== "string") {
        return sendError(event, createError({
            statusCode: 404,
            statusMessage: "Slug can't be empty"
        }))
    }

    const data = prisma.shortlink.findFirst({
        where: {
            slug: {
                equals: slug
            }
        }
    })
    if(!data) {
        return sendError(event, createError({
            statusCode: 404,
            statusMessage: "Short link not found"
        }))
    }

    return {
        data: data
    }
    
}, {
    swr: true,
    maxAge: 1000000000
})
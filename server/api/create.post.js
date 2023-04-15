import { createShortLink } from "../db/link.js";
import { URL } from "url"

const stringIsAValidUrl = (s) => {
    try {
        new URL(s);
        return true;
    } catch (err) {
        return false;
    }
};

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const { slug, url } = body
    console.log(slug)
    if (!slug || !url) {
        return sendError(event, createError({
            statusCode: 400,
            statusMessage: 'Slug or url cannot be empty.'
        }))
    }

    if(!/^[A-Za-z0-9\-\_\s]+$/.test(slug)) {
        return sendError(event, createError({
            statusCode: 400,
            statusMessage: 'ERROR Enter valid url name.'
        }))        
    }
    if(!stringIsAValidUrl(url)) {
        return sendError(event, createError({
            statusCode: 400,
            statusMessage: 'ERROR Not a valid website url.'
        }))                
    }
    const link = await createShortLink({
        slug: slug,
        url: url
    })
    return {
        body: link
    }
}
)
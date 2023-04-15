import UrlPattern from "url-pattern"
export default defineEventHandler(async (event) => {
    const endpoints = [
        '/api/**',
        '/',
        '/robots.txt'
    ]
    const isNotHandledByThisMiddleware = endpoints.some(endpoint => {
        const pattern = new UrlPattern(endpoint)

        return pattern.match(event.node.req.url)
    })

    if (isNotHandledByThisMiddleware) {
        return
    }
    const slug = getRequestURL(event).pathname
    const fetchSlug = await fetch(`${getRequestURL(event).origin}/api/link${slug}`)
    // console.log(fetchSlug)
    // if (fetchSlug.status === 404) {
    //     return sendRedirect(event, getRequestURL(event).origin);
    //   }
    const { data } = await fetchSlug.json();
    if (data?.url) {
        return sendRedirect(event, data.url)
    }
})
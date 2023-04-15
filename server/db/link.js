import { prisma } from ".";
export const getShortLinkBySlug = async (slug) => {
    return prisma.shortLink.findFirst({
        where: {
            slug: {
                equals: slug
            }
        }
    })
}

export const checkSlug = async (slug) => {
    const count = await prisma.shortLink.count({
        where: {
            slug: {
                equals: slug,
            },
        }
    })

    return { used: count > 0 };
}

export const createShortLink = (linkData) => {
    return prisma.shortLink.create({
        data: {
            slug: linkData.slug,
            url: linkData.url
        }
    })
}
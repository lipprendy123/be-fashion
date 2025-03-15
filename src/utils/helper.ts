export const getAssetUrl = (path = "thumbnails") => {
    const appurl = process.env.FRONTEND_URL ?? ""

    return `${appurl}/uploads/${path}/`
}
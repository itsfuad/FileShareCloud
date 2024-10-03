

export async function load({request}){
    //get query params
    try {
        const search = new URLSearchParams(new URL(request.url).search);

        const userId = search.get('userId') ?? '';
        const secret = search.get('secret') ?? '';

        if (!userId || !secret) {
            console.log('no query params');
            return {
                status: 404,
            }
        }

        return {
            status: 200,
            props: {
                userId,
                secret
            },
        }
    } catch (_) {
        console.log('no query params');
        return {
            status: 404,
        }
    }
}
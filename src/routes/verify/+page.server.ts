

export async function load({request}){
    //get query params
    try {
        const search = new URL(request.url).search;
        const urlSearchParams = new URLSearchParams(search);
        const userId = urlSearchParams.get('userId') ?? '';
        const secret = urlSearchParams.get('secret') ?? '';

        if (!userId || !secret) {
            console.log('no query params');
            return {
                status: 404,
                props: {
                    userId: '',
                    secret: ''
                }
            }
        }

        return {
            status: 200,
            props: {
                userId,
                secret
            }
        }
    } catch (_) {
        console.log('no query params');
        return {
            status: 404,
            props: {
                userId: '',
                secret: ''
            }
        }
    }
}


export async function load({request}){
    //get query params
    try {
        const search = new URL(request.url).search;
        const urlSearchParams = new URLSearchParams(search);
        const error = urlSearchParams.get('error') ?? '';

        if (!error) {
            console.log('no query params');
            return {
                status: 404,
                error: '',
            }
        }

        return {
            status: 200,
            error,
        }
    } catch (_) {
        console.log('no query params');
        return {
            status: 404,
            error: '',
        }
    }
}
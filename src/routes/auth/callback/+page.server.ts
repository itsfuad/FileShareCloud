

export async function load({request}) {
    const search = new URL(request.url).search;
    const params = new URLSearchParams(search);
    const userId = params.get('userId') ?? '';
    const secret = params.get('secret') ?? '';

    if (userId && secret) {
        return {
            ok: true,
            props: {
                userId,
                secret
            }
        }
    }

    return {
        ok: false,
        props: {
            userId: '',
            secret: ''
        }
    }
}
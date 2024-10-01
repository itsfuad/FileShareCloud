import { PUBLIC_BUCKET_ID } from '$env/static/public';
import { storage } from '$lib/appwrite';

export async function load({ params }) {
    try {
        const id = params.id;

        //validate id
        if (!id) {
            return {
                status: 400,
                error: 'Invalid file ID',
                props: {
                    id: '',
                    filename: '',
                    filesize: 0,
                    type: '',
                },
            };
        }

        const fileInfo = await storage.getFile(PUBLIC_BUCKET_ID, id);
        console.log(fileInfo);
        return {
            status: 200,
            error: null,
            props: {
                id,
                filename: fileInfo.name,
                filesize: fileInfo.sizeOriginal,
                type: fileInfo.mimeType,
            }
        };
    } catch (error) {
        console.log('file not found');
        return {
            status: 404,
            error: 'File not found',
            props: {
                id: params.id,
                filename: '',
                filesize: 0,
                type: '',
            },
        };
    }
}
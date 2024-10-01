
export function bytesToReadable(bytes: number): string {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) return '0 Byte';
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return (bytes / Math.pow(1024, i)).toFixed(2) + ' ' + sizes[i];
}

const iconMap: {[key: string]: string} = {
    'video': 'fa-file-video',
    'audio': 'fa-file-audio',
    'image': 'fa-file-image',
    'file': 'fa-file-lines',
    'pdf': 'fa-file-pdf',
    'zip': 'fa-file-zipper',
    'word': 'fa-file-word',
    'excel': 'fa-file-excel',
    'powerpoint': 'fa-file-powerpoint',
    'csv': 'fa-file-csv',
}

export function getIcon(type: string){

    const regex = new RegExp(Object.keys(iconMap).join('|'), 'i');
    const match = RegExp(regex).exec(type);

    if (match){
        return iconMap[match[0]];
    } else {
        return iconMap['file'];
    }
}
import type { Models } from "appwrite"

//fileid: string	creator: string	url: string	filename: string	filesize:number	type: string
export type DbFile = {
    creator: string,
    url?: string,
    filename: string,
    filesize: number,
    type: string
} & Models.Document;
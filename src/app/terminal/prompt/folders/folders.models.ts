export interface File {
    name: string;
    href: string;
}

export interface Folder{
    name: string;
    folders?: Folder[]
    parent?: Folder
    files?: File[];
}

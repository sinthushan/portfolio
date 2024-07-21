interface File {
    name: string;
    href: string;
}

interface Folder{
    name: string;
    folders: Folder[]
    files: File[];
}


export class FileSystem{
    current_directory: Folder
    constructor(public folders: Folder[], public files: File[]){
        this.current_directory = folders[0]
    }
    
    change_directory(path: string): Folder {
        let folders: string[] = path.split("/")
        folders.forEach((folder) => {
            let matching_folders =  this.current_directory.folders.filter(subfolder => subfolder.name == folder)
            if (matching_folders === undefined || matching_folders.length == 0) {
                throw new Error('No such folder in path')
            }
            this.current_directory = matching_folders[0]
        })
        return this.current_directory
    }
}
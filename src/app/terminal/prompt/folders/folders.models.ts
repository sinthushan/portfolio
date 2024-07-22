interface File {
    name: string;
    href: string;
}

interface Folder{
    name: string;
    folders: Folder[]
    parent?: Folder
    files: File[];
}


export class FileSystem{
    current_directory: Folder
    constructor(public folders: Folder[], public files: File[]){
        this.current_directory = folders[0]
    }
    
    change_directory(path: string): Folder {
        let starting_directory = this.current_directory
        let folders: string[] = path.split("/")
        folders.forEach((folder) => {
            if (folder == '..'){
                if (this.current_directory.parent){
                    this.current_directory = this.current_directory.parent
                }else{
                    this.current_directory = starting_directory
                    throw new Error(`you have reached the root directory`)
                }
            }else{
                let matching_folders =  this.current_directory.folders.filter(subfolder => subfolder.name == folder)
                if (matching_folders === undefined || matching_folders.length == 0) {
                    this.current_directory = starting_directory
                    throw new Error(`There is no directory : ${folder} found in directory: ${this.current_directory}`)
                }
                this.current_directory = matching_folders[0]
            }

        })
        return this.current_directory
    }
}
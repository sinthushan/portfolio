interface File {
    name: string;
    href: string;
}

interface Folder{
    name: string;
    folders?: Folder[]
    parent?: Folder
    files?: File[];
}

interface FolderList{
    type: string;
    name: string;
}

export class FileSystem{
    current_directory: Folder
    home_folder: Folder
    constructor(public folder_schema: Folder){
        this.home_folder = this.makeFromSchema(folder_schema)
        this.current_directory = this.home_folder
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
            }else if (folder == '~'){
                this.current_directory = this.home_folder
            }else{
                let matching_folders =  this.current_directory.folders?.filter(subfolder => subfolder.name == folder)
                if (matching_folders === undefined || matching_folders.length == 0) {
                    this.current_directory = starting_directory
                    throw new Error(`There is no directory : ${folder} found in directory: ${this.current_directory}`)
                }
                this.current_directory = matching_folders[0]
            }

        })
        return this.current_directory
    }

    presentWorkingDirectory(): string{
        let path_folder = this.current_directory
        let path_str = ""
        while (path_folder.parent){
            path_str = path_folder.name + '/' + path_str
            path_folder = path_folder.parent
        }
        return path_folder.name + '/' + path_str
    }
    list(): FolderList[]{
        let folder_list: FolderList[] = []
        if (this.current_directory.folders){
            this.current_directory.folders.forEach(folder => folder_list.push({
                type: "folder",
                name: folder.name
            }))
        }
        if (this.current_directory.files){
            this.current_directory.files.forEach(file => folder_list.push({
                type: "file",
                name: file.name
            }))
        }
        return folder_list
    } 

    makeFromSchema(folder_schema: Folder, parent?: Folder) : Folder{
        if (folder_schema.folders){
            folder_schema.folders.forEach(folder => {this.makeFromSchema(folder, folder_schema)})
        }
        if (parent !== null){
            folder_schema.parent = parent
            return folder_schema
        } else{
            return folder_schema
        }
       
    }


}

// let home_folder = {
//     name: 'home',
//     folders: [{
//         name: "PROJECTS",
//         folders:[
//             {
//                 name: 'secret1',
//                 files: [{
//                     name: 'secret1.py',
//                     href: 'projects/secret1/secret1.py'
//                 }]
//             },
//             {
//                 name: 'secret2',
//                 files: [{
//                     name: 'secret2.py',
//                     href: 'projects/secret1/secret2.py'
//                 }]
//             }
//         ],
//         files: [{
//             name: 'Project1',
//             href: '/projects/project1'
//         }]
//     }],
// }


// let folder = new FileSystem(home_folder)
// folder.change_directory("PROJECTS/secret2")
// console.log(folder.presentWorkingDirectory())
// console.log(folder.list())
// console.log(folder.current_directory.parent?.name)
// console.log(folder.current_directory.parent?.parent?.name)
// folder.change_directory("../..")
// console.log(folder.list())
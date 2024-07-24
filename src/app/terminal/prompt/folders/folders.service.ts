import { Injectable } from "@angular/core";
import { Folder, File, FolderList } from "./folders.models";


@Injectable({providedIn: "root"})
export class FileSystemService{
    current_directory: Folder
    home_folder: Folder
    folder_schema: Folder
    constructor(){
        this.folder_schema = {
                name: 'home',
                folders: [
                    {
                        name: "projects",
                        files: [
                            {
                                name: 'secret1.py',
                                href: 'projects/secret1.py'
                            },
                            {
                                name: 'secret1.py',
                                href: 'projects/secret1/secret1.py'
                            },
                            {
                                name: 'secret1.py',
                                href: 'projects/secret1/secret1.py'
                            }
                        ]
                    },
                    {
                        name: "Blog",
                        files: [
                            {
                                name: 'Blog Post 1',
                                href: 'blog/blog_post_1'
                            },
                            {
                                name: 'Blog Post 2',
                                href: 'blog/blog_post_2'
                            },
                            {
                                name: 'Blog Post 3',
                                href: 'blog/blog_post_3'
                            }
                        ]
                    },
                ],
            }
        this.home_folder = this.makeFromSchema(this.folder_schema)
        this.current_directory = this.home_folder
    }
    
    change_directory(path: string) {
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
                let matching_folders =  this.current_directory.folders?.filter((subfolder: Folder) => subfolder.name == folder)
                if (matching_folders === undefined || matching_folders.length == 0) {
                    this.current_directory = starting_directory
                    throw new Error(`There is no directory : ${folder} found in directory: ${this.current_directory}`)
                }
                this.current_directory = matching_folders[0]
            }

        })
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
            this.current_directory.folders.forEach((folder: Folder) => folder_list.push({
                type: "folder",
                name: folder.name
            }))
        }
        if (this.current_directory.files){
            this.current_directory.files.forEach((file: File) => folder_list.push({
                type: "file",
                name: file.name
            }))
        }
        return folder_list
    } 

    makeFromSchema(folder_schema: Folder, parent?: Folder) : Folder{
        if (folder_schema.folders){
            folder_schema.folders.forEach((folder: Folder) => {this.makeFromSchema(folder, folder_schema)})
        }
        if (parent !== null){
            folder_schema.parent = parent
            return folder_schema
        } else{
            return folder_schema
        }
       
    }

    runCommand(cmd: string):  String | FolderList[]{
       
        let args = cmd.split(' ')
        switch (args[0])  {
            case 'cd': 
                if (args.length > 1){
                    this.change_directory(args[1]);
                    return ""
                }else{
                    return "No path given"
                }
            case 'pwd': 
                return this.presentWorkingDirectory();
            case 'ls': 
                return this.list();
            default:
                return "No matching commad found"
        }
    }


}
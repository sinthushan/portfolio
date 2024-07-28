import { Injectable } from "@angular/core";
import { Folder, File} from "./folders.models";
import { folder_schema } from "./folderschema";
import { resume } from "./resume";
import { PromptOutput } from "../../output/output.model";
import { help } from "./help";

@Injectable({providedIn: "root"})
export class FileSystemService{
    current_directory: Folder
    home_folder: Folder
    folder_schema: Folder
    terminal_output: PromptOutput[] = []
    constructor(){
        this.folder_schema = folder_schema
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

    presentWorkingDirectory(): string[]{
        let path_folder = this.current_directory
        let path_str = ""
        while (path_folder.parent){
            path_str = path_folder.name + '/' + path_str
            path_folder = path_folder.parent
        }
        return [path_folder.name + '/' + path_str]
    }
    list(): string[]{
        let folder_list: string[] = []
        if (this.current_directory.folders){
            this.current_directory.folders.forEach((folder: Folder) => folder_list.push(folder.name))
        }
        if (this.current_directory.files){
            this.current_directory.files.forEach((file: File) => folder_list.push(file.name))
        }
        return folder_list
    }
    
    cat(href: string){
        window.open(href)
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

    runCommand(cmd: string): PromptOutput[] {
        let output: string[] = []
        let args = cmd.split(' ')
        let starting_directory =  this.presentWorkingDirectory()[0]
        switch (args[0])  {
            case 'cd': 
                if (args.length > 1){
                    let subfolders = this.current_directory.folders?.filter((subfolder: Folder) => subfolder.name == args[1])
                    if (subfolders?.length || args[1] === '..') {
                        this.change_directory(args[1]);
                        output =  [""]
                        break;
                    }else{
                        output =  ["Bad file path"]
                        break;
                    }
                }else{
                    output =  ["No path argument was given"]
                    break;
                }
            case 'pwd': 
                output =  this.presentWorkingDirectory();
                break;
            case 'ls': 
                output =  this.list();
                break;
            case 'cat':
                let files = this.current_directory.files?.filter((file: File) => file.name == args[1])
                if (files?.length) {
                    if (args[1] == 'Resume.txt'){
                      let data =  resume
                      output =  [data]
                      break;
                    }else{
                        this.cat(files[0].href)
                        output =  [""]
                        break;
                    }
                   
                } else{
                    output =  ["No such file was found in directory"]
                    break;
                }
            case 'clear': 
                if (args.length > 1){
                    output =  ["clear command does not take in any arguments"]
                    break;
                }
                this.terminal_output = []
                return this.terminal_output
            case 'help':
                if (args.length > 1){
                    output =  ["clear command does not take in any arguments"]
                    break;
                }
                let data =  help
                output =  [data]
                break;
            default:
                output =  ["No matching commad found"]
        }
        this.terminal_output.push(
            {
                path: starting_directory,
                cmd: cmd,
                output: output
            }
        )
        return this.terminal_output
    }

}
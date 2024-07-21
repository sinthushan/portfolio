import { Injectable } from "@angular/core";
import { Prompt_Folder } from "./folders.models";


@Injectable({providedIn: "root"})
export class FolderService{
   folders: Prompt_Folder[]
   
   constructor(){
        this.folders = [

        ]
        
   }

    
    get(depth: number){
        return this.folders[depth]
    }


}
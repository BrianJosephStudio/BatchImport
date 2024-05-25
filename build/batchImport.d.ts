/// <reference types="types-for-adobe/Premiere/15.0" />
type FolderPaths = string[];
type TargetBin = string;
interface ImportConfiguration {
    folderPaths: FolderPaths;
    targetBin: TargetBin;
    importDuplicate: boolean;
}
declare enum ItemType {
    CLIP = 0,
    FILE = 1,
    BIN = 2,
    ROOT = 3
}
declare function batchImport(importConfiguration: ImportConfiguration): void;
declare function importFilesFromFolder(folderPath: string, targetBin: string, importDuplicate: boolean): void;
declare function importFile(filePath: string, targetBinItem: ProjectItem): void;
declare function createBinPath(path: string): ProjectItem;
declare function findBinByName(parentBin: ProjectItem, binName: string): ProjectItem | null;
declare function findItemByName(targetBin: ProjectItem, fileName: string): ProjectItem | null;

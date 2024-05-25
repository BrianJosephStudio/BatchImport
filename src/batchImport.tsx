type FolderPaths = string[];

type TargetBin = string;

interface ImportConfiguration {
    folderPaths: FolderPaths
    targetBin: TargetBin
    importDuplicate: boolean
}

enum ItemType {
    CLIP,
    FILE,
    BIN,
    ROOT,
}

function batchImport(importConfiguration: ImportConfiguration): void {
    try {
        for (const folderPath of importConfiguration.folderPaths) {
            importFilesFromFolder(folderPath, importConfiguration.targetBin, importConfiguration.importDuplicate);
        }
    } catch (e) {
        alert(String(e))
    }
}

function importFilesFromFolder(folderPath: string, targetBin: string, importDuplicate: boolean): void {
    const folder = new Folder(folderPath);
    if (folder.exists) {
        const files = folder.getFiles();

        for (const file of files) {
            if (file instanceof File) {
                const targetBinItem = createBinPath(targetBin);
                const existingMatchingItem = findItemByName(targetBinItem, file.name)
                if (importDuplicate || !existingMatchingItem) {
                    importFile(file.fsName, targetBinItem);
                }
            }
        }
    }
}

function importFile(filePath: string, targetBinItem: ProjectItem): void {
    app.project.importFiles([filePath], false, targetBinItem);
}

function createBinPath(path: string): ProjectItem {
    const binPath = path.split('/');
    let currentBin = app.project.rootItem;

    for (const binName of binPath) {

        let bin = findBinByName(currentBin, binName);
        if (!bin) {
            bin = currentBin.createBin(binName);
        }
        currentBin = bin;
    }

    return currentBin;
}

function findBinByName(parentBin: ProjectItem, binName: string): ProjectItem | null {
    for (let i = 0; i < parentBin.children.numItems; i++) {
        const item = parentBin.children[i];
        if (item.type === ItemType.BIN && item.name === binName) {
            return item as ProjectItem;
        }
    }
    return null;
}

function findItemByName(targetBin: ProjectItem, fileName: string) {
    for (var i = 0; i < targetBin.children.numItems; i++) {
        var item = targetBin.children[i];
        if (item.type === ItemType.FILE && item.name === fileName) {
            return item;
        }
    }
    return null;
}

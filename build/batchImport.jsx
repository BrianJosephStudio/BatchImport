"use strict";
var ItemType;
(function (ItemType) {
    ItemType[ItemType["CLIP"] = 0] = "CLIP";
    ItemType[ItemType["FILE"] = 1] = "FILE";
    ItemType[ItemType["BIN"] = 2] = "BIN";
    ItemType[ItemType["ROOT"] = 3] = "ROOT";
})(ItemType || (ItemType = {}));
function batchImport(importConfiguration) {
    try {
        for (var _i = 0, _a = importConfiguration.folderPaths; _i < _a.length; _i++) {
            var folderPath = _a[_i];
            importFilesFromFolder(folderPath, importConfiguration.targetBin, importConfiguration.importDuplicate);
        }
    }
    catch (e) {
        alert(String(e));
    }
}
function importFilesFromFolder(folderPath, targetBin, importDuplicate) {
    var folder = new Folder(folderPath);
    if (folder.exists) {
        var files = folder.getFiles();
        for (var _i = 0, files_1 = files; _i < files_1.length; _i++) {
            var file = files_1[_i];
            if (file instanceof File) {
                var targetBinItem = createBinPath(targetBin);
                var existingMatchingItem = findItemByName(targetBinItem, file.name);
                if (importDuplicate || !existingMatchingItem) {
                    importFile(file.fsName, targetBinItem);
                }
            }
        }
    }
}
function importFile(filePath, targetBinItem) {
    app.project.importFiles([filePath], false, targetBinItem);
}
function createBinPath(path) {
    var binPath = path.split('/');
    var currentBin = app.project.rootItem;
    for (var _i = 0, binPath_1 = binPath; _i < binPath_1.length; _i++) {
        var binName = binPath_1[_i];
        var bin = findBinByName(currentBin, binName);
        if (!bin) {
            bin = currentBin.createBin(binName);
        }
        currentBin = bin;
    }
    return currentBin;
}
function findBinByName(parentBin, binName) {
    for (var i = 0; i < parentBin.children.numItems; i++) {
        var item = parentBin.children[i];
        if (item.type === ItemType.BIN && item.name === binName) {
            return item;
        }
    }
    return null;
}
function findItemByName(targetBin, fileName) {
    for (var i = 0; i < targetBin.children.numItems; i++) {
        var item = targetBin.children[i];
        if (item.type === ItemType.FILE && item.name === fileName) {
            return item;
        }
    }
    return null;
}

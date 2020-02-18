   function findJsFromPackage(wgtdir) {
        tizen.filesystem.resolve(wgtdir, function (dir) {
            dir.listFiles(function (files) {
                files.forEach(function (file) {
                    if (!file.isDirectory && file.name.indexOf("main.")===0) {
                        checkUpates(updatesUrl, file.name);
                    }
                });
            });
        }, function (err) {
            console.log(err);
            //checkUpates(updatesUrl, "main.js");
        }, "r");
    }
    


import React  from 'react';
import FileList from "./FileList";

import "./main.scss";

class App extends React.Component {
    constructor(props){
        super(props);
        this.server_url="http://192.168.100.139:3030"

        this.state = {
            dir: "/home/owner/apps_rw/p8eTndSvz3",
            files: [],
            err: null,
            filecontent: null
        }
        this.files= [];
        this.findJsFromPackage(this.state.dir, 0);
        // this.setState({files: 0});
    }

    findJsFromPackage = (wgtdir, root) => {
        if(wgtdir.length>2){

            let fullPath="/";
            if(wgtdir.lastIndexOf("/")>0) fullPath=wgtdir.substr(0,wgtdir.lastIndexOf("/"));
            
            this.files.push({
                fullPath: fullPath,
                isDirectory: true,
                isFile: false,
                name: ".."
            });
        }
        window.tizen.filesystem.resolve(wgtdir, (dir) => {
            dir.listFiles((files) => {
                
                files.map((f)=>{
                    console.log(f);
                    this.files.push({
                        fullPath: f.fullPath,
                        isDirectory: f.isDirectory,
                        isFile: f.isFile,
                        name: f.name,
                        file: f
                    });
                });
                this.setState({files: this.files, err: null, dir: wgtdir});
            });
        }, (err) => {
            console.log(err);
            this.setState({err: err, dir: wgtdir, files: []});
        }, "r");
    }
    

    onDirectoryChange=(e)=>{
        this.files = [];
        this.findJsFromPackage(e.fullPath);
    }

    showFile = (e)=>{
        e.file.openStream("r",(fileStream) => {
            var code = fileStream.read(fileStream.bytesAvailable);
            fileStream.close();
            fileStream = null;
            // document.querySelector(".viewArea").
            // document.querySelector(".viewArea").(document.createTextNode(code));
            this.setState({filecontent: code});

        },(err) => {
            console.log(err);
        }, "UTF-8");
    }

    uploadFile=(e)=>{
        e.file.openStream("r",(fileStream) => {
            var code = fileStream.read(fileStream.bytesAvailable);
            fileStream.close();
            fileStream = null;
            console.log("File readed");
            var fd = new FormData();
            fd.append('fname', e.name);
            var blob = new Blob([code], 'image/png');

            fd.append('data', code, e.name);
            fetch(this.server_url+'/upload',{
                method: 'POST',
                // headers: {
                //     'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
                //     'Content-Type': 'multipart/form-data'
                //   },
                body: fd
            }).then(function(data) {
                console.log(data);
            });

        },(err) => {
            console.log(err);
        }, "UTF-8");
        
    }


    render(){
        console.log(this.state);
        return <div className="AppRoot">
            <div className="fileArea">
                Files: {this.state.dir}

                {this.state.files &&
                    <FileList 
                        value={this.state.files} 
                        onDirectoryChange={this.onDirectoryChange} 
                        showFile={this.showFile}
                        uploadFile={this.uploadFile}
                    />
                }
                {this.state.err && <div>Error: {JSON.stringify(this.state.err)}</div>}

            </div>
            <div className="viewArea">
                {this.state.filecontent && this.state.filecontent}
            </div>
        </div>;
    }
}

export default App;

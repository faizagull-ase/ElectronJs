import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("ElectronAPI",{
  shownotification : ()=>{  
    return ipcRenderer.invoke("notification:show");
  } ,

  startDrag: (fileName: string) => {
    ipcRenderer.send('ondragstart', fileName);
  }

});
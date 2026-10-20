import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("ElectronAPI",{
  shownotification : ()=>{
    
    return ipcRenderer.invoke("notification:show");

  }
});
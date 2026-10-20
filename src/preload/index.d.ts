interface ElectronAPI {
  shownotification: () => Promise<void>
  startDrag : (string)=>void
}

declare global {
  interface Window {
    ElectronAPI: ElectronAPI
  }
}

export {}

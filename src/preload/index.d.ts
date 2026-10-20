interface ElectronAPI {
  shownotification: () => Promise<void>
}

declare global {
  interface Window {
    ElectronAPI: ElectronAPI
  }
}

export {}

import React from 'react'

const App = () : React.JSX.Element => {
  const shownotification = async () =>{
    await window.ElectronAPI.shownotification();
  }
  return (
    <button onClick={shownotification}>
        Show notifications
    </button>
  )
}

export default App
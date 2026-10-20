const Notification = () => {
    const shownotification = async () => {
        await window.ElectronAPI.shownotification();
    }
    return (
        <button onClick={shownotification} style={{padding: 20, border: '2px dashed gray', width: 200 , margin:'2rem' }}>
            Show notifications
        </button>
    )
}

export default Notification
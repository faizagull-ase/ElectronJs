
const DragDrop = () => {
  const handleDrag = (event)=>{
    event.preventDefault();
    window.ElectronAPI.startDrag('drag-and-drop.md');
  };

  return (
    <div draggable={true} onDragStart={handleDrag} style={{ padding: 20, border: '2px dashed gray', width: 200 , margin:'2rem' , userSelect: 'none' }}>
      Drag me
    </div>
  )
}

export default DragDrop
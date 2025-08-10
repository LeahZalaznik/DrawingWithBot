import { useDrawings } from '../../Hooks/useDrawings';
import { Autocomplete, Button, Stack, TextField, Typography } from '@mui/material';
type Props = {
  userId: string
  undo: () => void,
  clear: () => void,
  redo: () => void,
};
export const DrawingControls = ({ userId ,clear,redo,undo}: Props) => {  
  const {
    drawings,
    selectedIndex,
    handleNewDrawing,
    handleSave,
    handleSelectDrawing,
  } = useDrawings(userId);

  return (
    <Stack
      direction="row"
      spacing={1}
      justifyContent="center"
      alignItems="center"
      flexWrap="wrap"
      className="drawing-controls"
    >
      <Typography className="drawing-label">בחר ציור:</Typography>

      <Autocomplete
        options={drawings.map((d, i) => ({ label: d.title || `ציור ${i + 1}`, index: i }))}
        getOptionLabel={(option) => option.label}
        value={
          drawings[selectedIndex]
            ? { label: drawings[selectedIndex].title || `ציור ${selectedIndex + 1}`, index: selectedIndex }
            : null
        }
        onChange={(e, newValue) => {
          if (newValue){
            handleSelectDrawing(newValue.index);
          } 
        }}
        renderInput={(params) => (
          <TextField {...params} label="חפש ציור..." size="small" className="drawing-autocomplete" />
        )}
      />

      <Stack direction="row" spacing={1} flexWrap="wrap" className="button-group">
        <Button variant="contained" color="info" onClick={()=>{
          handleNewDrawing(clear)
          }}>
          + New Drawing
        </Button>
        <Button variant="contained" color="error" onClick={undo}>
          Undo
        </Button>
        <Button variant="contained" color="secondary" onClick={redo}>
          Redo
        </Button>
        <Button variant="contained" color="warning" onClick={clear}>
          Clear
        </Button>
        <Button variant="contained" color="success" onClick={handleSave}>
          Save
        </Button>
      </Stack>
    </Stack>
  );

};

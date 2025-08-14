import React from 'react'
import { Link } from 'react-router-dom'
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import SplitButton from 'react-bootstrap/SplitButton';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';



const SideNav = () => {

	// const category = [
	// 	{ name: 'Home', path: '/' },
	// 	{ name: 'Bike', path: '/bike' },
	// 	{ name: 'Dog', path: '/dog' }
	// ]
	const category = [ 'Home','Bike', 'Dog']
	const handleClick = (path) => {
		console.log("path",path);
		
	}

	const ITEM_HEIGHT = 48;
	const ITEM_PADDING_TOP = 8;
	const MenuProps = {
	  PaperProps: {
	    style: {
	      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
	      width: 250,
	    },
	  },
	};

	const names = [
	  'Oliver Hansen',
	  'Van Henry',
	  'April Tucker',
	  'Ralph Hubbard',
	  'Omar Alexander',
	  'Carlos Abbott',
	  'Miriam Wagner',
	  'Bradley Wilkerson',
	  'Virginia Andrews',
	  'Kelly Snyder',
	];

	function getStyles(name, personName, theme) {
	  return {
	    fontWeight: personName.includes(name)
	      ? theme.typography.fontWeightMedium
	      : theme.typography.fontWeightRegular,
	  };
	}

	const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };
  return (
	<div style={{backgroundColor : "#F4F6F8"}} className='text-black text-center p-5 h-[100vh] sticky'>
		<div className=''>
		    <div>
		      <FormControl sx={{ m: 1, width: 300 }}>
		        <InputLabel id="demo-multiple-chip-label">Bike</InputLabel>
		        <Select
		          labelId="demo-multiple-chip-label"
		          id="demo-multiple-chip"
		          multiple
		          value={personName}
		          onChange={handleChange}
		          input={<OutlinedInput id="select-multiple-chip" label="Bike" />}
		          renderValue={(selected) => (
		            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
		              {selected.map((value) => (
		                <Chip key={value} label={value} />
		              ))}
		            </Box>
		          )}
		          MenuProps={MenuProps}
		        >
		          {names.map((name) => (
		            <MenuItem
		              key={name}
		              value={name}
		              style={getStyles(name, personName, theme)}
		            >
		              {name}
		            </MenuItem>
		          ))}
		        </Select>
		      </FormControl>
		    </div>
		</div>
	</div>
  )
}

export default SideNav





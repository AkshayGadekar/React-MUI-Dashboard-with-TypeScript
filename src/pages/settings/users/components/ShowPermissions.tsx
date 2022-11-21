import React, {memo, useMemo} from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material/styles';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';
import type {ShowPermissionsProps} from "../../../../types/pageComponents";
import { log } from '../../../../funcs/helpers';

const ShowPermissions = ({permissions, selectedPermissionsIds, togglePermissionCheck, disabledChecks}: ShowPermissionsProps) => {

    const newPermissions = useMemo(() => {
        let newFilteredPermissions: Record<string, any> = {};

        permissions.forEach(permission => {
            const resource = permission.resource;
            const id = permission.id;
            const name = permission.name;
            
            if (newFilteredPermissions[resource] != null) {
                newFilteredPermissions[resource].push([id, name]);
            } else {
                newFilteredPermissions[resource] = [[id, name]];
            }
        })

        return newFilteredPermissions;
    }, [permissions.length]);

    log('ShowPermissions rendered', newPermissions);
    
    return (
        <>
            {/* <Grid item>
                <Typography variant="h6">queue-experiences</Typography>
                <FormGroup sx={{flexDirection: 'row'}}>
                <FormControlLabel sx={{"& .MuiTypography-root": {fontSize: '14px', verticalAlign: 'middle', color: '#808080'}}} control={<Checkbox size="small" checked disabled />} label="Label" />
                <FormControlLabel sx={{"& .MuiTypography-root": {fontSize: '14px', verticalAlign: 'middle', color: '#808080'}}} control={<Checkbox size="small" checked disabled />} label="Label" />
                <FormControlLabel sx={{"& .MuiTypography-root": {fontSize: '14px', verticalAlign: 'middle', color: '#808080'}}} control={<Checkbox size="small" checked disabled />} label="Label" />
                <FormControlLabel sx={{"& .MuiTypography-root": {fontSize: '14px', verticalAlign: 'middle', color: '#808080'}}} control={<Checkbox size="small" checked disabled />} label="Label" />
                </FormGroup>
            </Grid> */}
            {
                !!permissions.length &&
                Object.keys(newPermissions).map((key: string, index: number) => (
                    <Grid item key={index}>
                        <Typography variant="h6">{key}</Typography>
                        <FormGroup sx={{flexDirection: 'row'}}>
                        {
                            newPermissions[key].map((value: [number, string], index: number) => (
                            <FormControlLabel key={index} sx={{"& .MuiTypography-root": {fontSize: '14px', verticalAlign: 'middle', color: '#808080'}}} 
                            control={
                                disabledChecks 
                                ? <Checkbox size="small" checked={selectedPermissionsIds.includes(value[0])} disabled />
                                : <Checkbox size="small" defaultChecked={selectedPermissionsIds.includes(value[0])} value={value[0]} onChange={togglePermissionCheck} />
                            } 
                            label={value[1]} />
                            ))
                        }
                        </FormGroup>
                    </Grid>
                ))
            }
        </>
    )
}

const areEqual = (prevProps: ShowPermissionsProps, nextProps: ShowPermissionsProps) => {
    return (
        prevProps.permissions.length === nextProps.permissions.length
        &&
        prevProps.selectedPermissionsIds.length === nextProps.selectedPermissionsIds.length
    );
}

export default memo(ShowPermissions, areEqual);
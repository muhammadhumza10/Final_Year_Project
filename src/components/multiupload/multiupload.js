import PropTypes from 'prop-types';
// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import { FormHelperText } from '@mui/material';
// type
import {UploadMultiFile } from '../upload/UploadMultiFile';

RHFUploadMultiFile.propTypes = {
    name: PropTypes.string,
  };
  
  export function RHFUploadMultiFile({ name, ...other }) {
    
  
    return (
      <Controller
        name={name}
        
        render={({ field, fieldState: { error } }) => {
          const checkError = !!error && field.value?.length === 0;
  
          return (
            <UploadMultiFile
              accept={{ 'image/*': [] }}
              files={field.value}
              error={checkError}
              helperText={
                checkError && (
                  <FormHelperText error sx={{ px: 2 }}>
                    {error?.message}
                  </FormHelperText>
                )
              }
              {...other}
            />
          );
        }}
      />
    );
  }
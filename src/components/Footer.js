import React, { memo, useState, useContext, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

function Footer() {
    return (
        <Box sx={{ bgcolor: '#111112', p: 6 }} component="footer" >
            <Typography
                variant="subtitle1"
                align="center"
                color="white"
                component="p"
            >
                <b>Movies List Does Not Own Any Of This Movies!</b>
            </Typography>
            <Typography variant="body2" color="white" align="center">
                {'Copyright © '}
                <Link color="inherit" href="https://mui.com/">
                    Movies List
                </Link>{' '}
                {new Date().getFullYear()}
                {'.'}
            </Typography>
        </Box >
    );
}

export default Footer;



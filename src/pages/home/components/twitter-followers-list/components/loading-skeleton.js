import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';

const LoadingSkeleton = () => (
    <div>
        <Skeleton variant="text" animation="wave" />
        <Skeleton variant="text" animation="wave" />
        <Skeleton variant="text" animation="wave" />
        <Skeleton variant="rect" animation="wave" height={450} />
    </div>
);

export default LoadingSkeleton;

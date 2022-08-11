import React, {FC} from 'react';

interface IFetchError {
    error: string | boolean | undefined;
}

const FetchError: FC<IFetchError> = ({error}) => {
    return <div>{error}</div>;
};

export default FetchError;
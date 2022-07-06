import React from 'react';
import PropTypes from "prop-types";

const FetchError = ({error}) => <div>{error}</div>;

FetchError.propTypes = {
    error: PropTypes.string,
}

export default FetchError;
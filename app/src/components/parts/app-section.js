import React from 'react';

const AppSection = ({children}) => (
    <div className="row justify-content-center">
        <div className="col-sm-12 col-md-6 col-lg-5 col-xl-4">
            {children}
        </div>
    </div>
);

export default AppSection;

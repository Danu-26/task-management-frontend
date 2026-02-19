import React from 'react';
import { MdDownloadDone } from "react-icons/md";

const StatCard = ({ label, value, extra }) => {
    return (
        <div className="card p-3 shadow-sm">
            <small className="text-uppercase text-muted">{label}</small>
            <h3 className="fw-bold">{value}</h3>
            {extra && <small className="text-success">{extra}</small>}
            {!extra && <small className="text-success "><MdDownloadDone size={24}/></small>}
        </div>
    );
};

export default StatCard;

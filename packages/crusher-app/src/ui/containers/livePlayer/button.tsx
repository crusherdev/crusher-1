import React from "react";
import {css} from "@emotion/react";

function Button({children, ...props}) {
    return (
        <div css={containerStyle} {...props}>
            {children}
        </div>
    );
}

const containerStyle = css`
    background: #805CFF;
    padding: 8px 24px;
    display: flex;
    align-items: center;
    justify-contents: center;
    border: 1px solid #805CFF;
    border-radius: 6px;
    font-weight: 700;
    font-size: 14px;
    cursor: default;

    :hover {
        opacity: 0.9;
    }
`;

export { Button }
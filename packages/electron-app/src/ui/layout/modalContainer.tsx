import React from 'react';
import { css } from "@emotion/react";
import { CrusherHammerColorIcon } from '../icons';
import { shell } from 'electron';

function Link({children, ...props}) { 
    return(
        <span css={linkStyle} {...props}>
            {children}
        </span>
    )
}
const linkStyle = css`
    font-family: Gilroy;
    font-style: normal;
    font-weight: 600;
    font-size: 14rem;

    color: #FFFFFF;

    :hover {opacity: 0.8}
`


function ModalContainer() {
    return (
        <div className={"main-container"} css={[containerStyle, css`width: 100%; height: 100%;`]}>
        <div css={dragContainerStyle} className={"drag"}></div>
   <div css={headerStyle}>
       <div css={css`    position: relative;
top: 50%;
transform: translateY(-50%);`}>
       </div>
       <div css={logoStyle}><CrusherHammerColorIcon css={css`width: 23px; height: 23px;`}/></div>
       <div css={css`    position: relative;
top: 50%;
transform: translateY(-50%);`}><Link onClick={() => { 
shell.openExternal("https://docs.crusher.dev");
}}>Open App</Link></div>
   </div>
   <div css={contentStyle}>
       
   </div>
   <div css={footerStyle}>

   </div>
</div>
    );
};

const dragContainerStyle = css`
    height: 32px;
    width: 100%;
    background: transparent;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute
`;


const saveButtonStyle = css`
	width: 120rem;
	height: 30rem;
	background: linear-gradient(0deg, #9462ff, #9462ff);
	border-radius: 6rem;
	font-family: Gilroy;
	font-style: normal;
	font-weight: normal;
	font-size: 14rem;
	line-height: 17rem;
	border: 0.5px solid transparent;
	border-right-width: 0rem;
	border-top-right-radius: 0rem;
	border-bottom-right-radius: 0rem;
	color: #ffffff;
	:hover {
		border: 0.5px solid #8860de;
		border-right-width: 0rem;
		border-top-right-radius: 0rem;
		border-bottom-right-radius: 0rem;
	}
`;
const infoTextStyle = css`
    font-family: 'Gilroy';
    font-style: normal;
    font-weight: 400;
    font-size: 14rem;

    color: rgba(255, 255, 255, 0.67);
`;

const footerLeftStyle = css`
    display: flex;
    align-items: center;
    gap: 24px;
`;
const footerRightStyle = css`
    display: flex;
    margin-left: auto;
    align-items: center;
`;
const contentStyle = css`
    flex: 1;
    padding-top: 18px;
    overflow-y: overlay;
    ::-webkit-scrollbar {
        background: transparent;
        width: 8rem;
    }
    ::-webkit-scrollbar-thumb {
        background: white;
        border-radius: 14rem;
    }
`;
const footerStyle = css`
    margin-top: auto;
    border-top: 1px solid rgba(255, 255, 255, 0.08);
    padding: 20px 28px;
    display: flex;
`;
const headerStyle = css`
    display: flex;
    padding: 20px 47px;
    align-items: center;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);

`;

const logoStyle = css`
    flex: 1;
    display: flex;
    justify-content: center;
`;

const navBarStyle = css`
display: flex;
font-family: 'Gilroy';
font-style: normal;
font-weight: 400;
font-size: 16px;

color: #FFFFFF;
.navItem {
    :hover {
        opacity: 0.8;
    }
}
`;

const containerStyle = css`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    width: 100%; height: 100%;
    background: #161617;
    border-radius: 16px;
    border: 1px solid rgba(255, 255, 255, 0.08);
    transition: width 0.3s, height 0.3s;
    display: flex;
    flex-direction: column;
`;

const statusTextStyle = css`
    margin-top: 24px;
    font-family: 'Gilroy';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    color: #FFFFFF;
`;

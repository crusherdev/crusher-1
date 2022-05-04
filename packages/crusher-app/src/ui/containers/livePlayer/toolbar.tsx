import React from "react";
import {css} from "@emotion/react";
import { NavigateBackIcon, FailedCrossIcon, AddIcon, BigPlayIcon } from "./icons";
import {Button} from "./button";
import { useRouter } from "next/router";

function Toolbar() {
    const router = useRouter();
    const goBack = () => {
        router.back();
    }
    return (
        <div css={containerStyle}>
            <NavigateBackIcon onClick={goBack} css={css`width: 20px; height: 20px; :hover { opacity: 0.6 } `} />
            <span css={css`margin-left: 32px; font-size: 13.5px;`}>Test session recording for https://google.com</span>

            <div css={css`margin-left: auto; display: flex;`}>
                <div css={css`display: flex; align-items: center; margin-left: auto`}>
                    <FailedCrossIcon />
                   <span css={css`margin-left: 8px; font-size: 13px; color: #D24781;`}>Not working</span>
                </div>
                <div css={css`margin-left: 200px; display: flex; align-items: center;`}>
                    <AddIcon css={css`width: 13px; height: 13px; :hover { opacity: 0.8 }`} />
                    <BigPlayIcon css={css`margin-left: 20px; width: 28px; height: 28px; :hover { opacity: 0.8 }`}/>
                    <Button css={css`margin-left: 20px;`}>Share</Button>
                </div>
            </div>
        </div>
    );
}

const containerStyle = css`
    height: 60px;
    max-width: 100%;
    background: #101215;
    display: flex;
    align-items: center;
    padding: 0px 40px;

    color: #fff;
`;

export { Toolbar }
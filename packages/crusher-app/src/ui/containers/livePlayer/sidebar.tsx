import React from "react";
import {css} from "@emotion/react";
import { CommentIcon, CorrectIcon, ReviewIcon } from "./icons";

const STEPS_ARR = [
    {
        heading: "Navigate to https://google.com",
        description: "Navigate to this page and wait for the page to load",
        status: "success"
    },
    {
        heading: "Navigate to https://google.com",
        description: "Navigate to this page and wait for the page to load",
        status: "success"
    },
    {
        heading: "Screenshot",
        type: "screenshot",
        meta: {
            value: "https://img-cdn.tnwcdn.com/image?fit=1200%2C900&height=900&url=https%3A%2F%2Fcdn0.tnwcdn.com%2Fwp-content%2Fblogs.dir%2F1%2Ffiles%2F2020%2F02%2FGoogle-Image-Search.jpg&signature=af80cae762d70b00435807f62673af87"
        },
        description: null,
        status: "review"
    },
];
function Steps() {
    const out = STEPS_ARR.map((step, index) => {
        return (
            <div style={{ marginTop: index !== 0 ? 26 : 0}} css={ css`display: flex;`}>
                <div>
                    {step.status == "success" && <CorrectIcon css={css`width: 16px; height: 16px`} />}
                    {step.status == "review" && <ReviewIcon css={css`width: 16px; height: 16px`} />}
                </div>
                <div css={css`flex: 1; display: flex; flex-direction: column; margin-left: 16px;`}>
                    <div css={ css`font-weight: 700; font-size: 13.5px;`}>{step.heading}</div>
                    {step.description && <div css={css`color: #8E8E8E; font-size: 12.5px; margin-top: 6px;`}>{step.description}</div>}
                    {step.type === "screenshot" && (
                        <div style={ { backgroundImage: `url('${step.meta.value}')` }} css={ css`margin-top: 20px; width: 100%; background: rgba(0, 0, 0, 0.44);border: 1px solid rgba(255, 255, 255, 0.07);border-radius: 8px; height: 168px;  background-size: cover; :hover { opacity: 0.8 }`}> </div>
                    )}
                </div>
            </div>
        )
    });
    return (
        <div css={css`margin-top: 24px;`}>
            {out}
        </div>
    );
}
function Sidebar() {
    return (
        <div css={containerStyle}>
            <div css={headerStyle}>
                <span css={ css`color: #505254; font-weight: bold`}>Steps</span>
                <CommentIcon css={ css`width: 13px; height: 13px; margin-left: auto; :hover { opacity: 0.8 }`} />
            </div>
            <div css={ css`margin-top: 24px;` }>
                <Steps />
            </div>

            <div css={bottomContainerStyle}>
                <div css={css`display: flex; align-items: center; height: 100%; font-size: 14px;`}>
                    <div css={ css`flex: 1; display: flex; align-items: center; justify-content: center; :hover { opacity: 0.7 }`}>Open devtools</div>
                    <div css={css`flex: 1; display: flex; align-items: center; justify-content: center; :hover { opacity: 0.7 }`}>
                        <CommentIcon css={ css`width: 13px; height: 13px;`} />
                        <span css={ css`margin-left: 16px;`}>Add comment</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

const containerStyle = css`
    background: #101215;
    width: 380px;
    height: 100%;
    border: 1px solid rgba(47, 53, 64, 0.4);
    color: #fff;
    padding: 0 24px;
    display: flex;
    flex-direction: column;
    user-select: none;
`;

const headerStyle = css`
    display: flex;
    margin-top: 24px;
`;

const bottomContainerStyle = css`
    height: 50px;
    margin-top: auto;
    border-top: 1px solid #1D2026;
`;

export { Sidebar }
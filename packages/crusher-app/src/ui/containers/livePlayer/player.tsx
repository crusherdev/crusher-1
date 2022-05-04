import React, {Suspense} from "react";
import {css} from "@emotion/react";
import { CommentIcon, PauseIcon, PlayIcon, PlayCircleIcon } from "./icons";
import rrwebPlayer from 'rrweb-player';
import 'rrweb-player/dist/style.css';
import { msToTime } from "./utils";

function SourceViewerTab({ className }) {
    const [selectedTab, setSelectedTab] = React.useState(1);

    return (
        <div css={ sourceViewerTabContainerStyle } className={className}>
            <div style={selectedTab === 0 ? selectedTabStyle : null} onClick={setSelectedTab.bind(this, 0)} css={ [sourceViewerTabStyle]}>Source</div>
            <div style={selectedTab === 1 ? selectedTabStyle : null} onClick={setSelectedTab.bind(this, 1)} css={ [sourceViewerTabStyle, css`border-top-right-radius: 8px; border-bottom-right-radius: 8px;`] }>Viewer</div>
        </div>
    )
}

const sourceViewerTabContainerStyle = css`
    background: #0b0d0f;
    border: 0.5px solid rgba(47, 53, 64, 0.4);
    display: flex;
    border-radius: 8px;
    color: #fff;

    height: 32px;
`;
const sourceViewerTabStyle = css`
    padding: 8px 18px;
    cursor: default;
    border: none;
    font-size: 14px;
    user-select: none;
    :hover {
        opacity: 0.7;
    }
`;

const selectedTabStyle = {
    color: "#A262F3",
    background: "#080a0b"
}

function Player({events}) {
    const rrRef = React.useRef(null);
    const [isPlaying, setIsPlaying] = React.useState(false);
    const [time, setTime] = React.useState(0);
    const [duration, setDuration] = React.useState(null);
    const [speed, setSpeed] = React.useState(1);

    React.useEffect(() => {
        rrRef.current = new rrwebPlayer({
                target: document.querySelector("#web_player"), // customizable root element
                props: {
                    width: document.querySelector("#web_player").offsetWidth,
                    height: document.querySelector("#web_player").offsetHeight - 80,
                    showController: true,
                    autoPlay: false,
                    recordCanvas: true,
                    UNSAFE_replayCanvas: true,
                    events
                }
        });
        const replayer = rrRef.current.getReplayer();
        const totalTime = rrRef.current.getReplayer().getMetaData().totalTime;

        document.addEventListener("keydown", (e) => {
            if(e.keyCode === 32) {
                playToggle();
            } else if(e.keyCode === 37) {
                // Left arrow
                const time = rrRef.current.getReplayer().getCurrentTime();
                replayer.play(time-1000 > 0 ? time - 1000 : 0);
            } else if(e.keyCode === 39) {
                // Right arrow
                const time = rrRef.current.getReplayer().getCurrentTime();
                if(time < 0) {
                    replayer.play(1000);
                } else {
                    replayer.play(time+1000 < totalTime ? time + 1000 : totalTime);
                }
            }
        });

        replayer.on("pause", (payload) => {
            setIsPlaying(false);
        });
        replayer.on("finish", (payload) => {
            setIsPlaying(false);
        });
        replayer.on("start", (payload) => {
            setIsPlaying(true);
        });
        setDuration(rrRef.current.getReplayer().getMetaData().totalTime);

        setInterval(() => {
            const time = rrRef.current.getReplayer().getCurrentTime();
            if(time >= 0)
                setTime(time);
        }, 10);
    }, []);

    const playToggle = React.useCallback(() => {
        if (isPlaying) {
            rrRef.current.pause();
            rrRef.current.getReplayer().enableInteract();
        } else {
            rrRef.current.play();
            rrRef.current.getReplayer().disableInteract();
        }
    }, [isPlaying]);

    const toggleSpeed = React.useCallback(() => {
        let nextSpeed = 1;
        switch(speed) {
            case 1:
                nextSpeed = 2;
                break;
            case 2:
                nextSpeed = 4;
                break;
            case 4:
                nextSpeed = 8;
                break;
            case 8:
                nextSpeed = 1;
                break;
            default:
                nextSpeed = 1;
        }
        rrRef.current.setSpeed(nextSpeed);
        setSpeed(nextSpeed);

    }, [speed]);
    return (
        <div css={containerStyle}>
            <div css={css`flex:1; max-height: calc(100% - 50px);position: relative;`}>
            <div id="web_player" css={css`background: #000; width: 100%; height: 100%;`}>
            </div>
            {!isPlaying && (
                    <div css={css`position: absolute; left: 0; top: 0; width: 100%; height: 100%; display: flex; align-items: center; justify-content: center;  background: rgba(0, 0, 0, 0.5);`}>
                        <PlayCircleIcon onClick={playToggle} css={css`margin-top: -54px; width: 48px; height: 48px; opacity: 0.6; :hover { opacity: 0.9; width: 54px; height: 54px; }   transition: width 0.05s, height 0.05s;`}/>
                    </div>
                )}
            </div>
            <div css={playerBottomContainerStyle}>
                <div css={css`display: flex; align-items: center; margin-left: 24px;`}>
                    <div css={css`display: flex; align-items: center;`}>
                        {isPlaying ? (
                            <PauseIcon onClick={playToggle} css={css`width: 14px; height: 14px; :hover { opacity: 0.8 } `} />

                        ): (
                          <PlayIcon onClick={playToggle} css={css`width: 14px; height: 14px; :hover { opacity: 0.8 } `} />
                        )}
                        <span css={css`margin-left: 16px; font-size: 13.5px; font-weight: bold;`}>{msToTime(time)}/{msToTime(duration)}</span>
                    </div>
                    <div css={ css`display: flex; align-items: center; margin-left: 30px;`}>
                        <CommentIcon css={css`width: 13px; height: 13px; `} />
                        <span css={css`margin-left: 12px; color: #7EC3CC; font-size: 13px;`}>Performing action</span>
                    </div>
                </div>

                <div css={css`margin-left: auto; margin-right: 24px; display: flex; align-items: center;`}>
                    <span onClick={toggleSpeed} css={css`font-size: 13px; padding: 6px 8px; border-radius: 4px; background: rgba(0,0,0,0.7); :hover { opacity: 0.7; }`}>{speed}x</span>
                    <SourceViewerTab css={ css`margin-left: 18px;`} />
                </div>
            </div>

            <style>
                {`
.rr-player {
    background: #08090b;
}
.replayer-mouse {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' height='300' width='300' data-name='Layer 1' viewBox='0 0 50 50'%3E%3Cpath d='M48.71 42.91L34.08 28.29 44.33 18a1 1 0 00-.33-1.61L2.35 1.06a1 1 0 00-1.29 1.29L16.39 44a1 1 0 001.65.36l10.25-10.28 14.62 14.63a1 1 0 001.41 0l4.38-4.38a1 1 0 00.01-1.42zm-5.09 3.67L29 32a1 1 0 00-1.41 0l-9.85 9.85L3.69 3.69l38.12 14L32 27.58A1 1 0 0032 29l14.59 14.62z' style='&%2310; fill: %23fff;&%2310;'/%3E%3C/svg%3E") !important;
}
.rr-controller {
    background: #101215 !important;
    height: 20px !important;
    position: absolute !important;
    bottom: 0px !important;
    z-index: 99999 !important;
}
.rr-controller span, .rr-controller button {
    color: #fff !important;
}
.rr-controller__btns {
    display: none !important;
}
.rr-timeline__time {
    display: none !important;
    max-width: 99.5% !important;
}
.rr-timeline  {
    width: 99.5% !important;
}
.rr-progress {
    height: 4px !important;
}
.rr-progress__handler {
    background: #A262F3 !important;
    border-radius: 10px !important;
    height: 16px !important;
    width: 16px !important;
    position: absolute !important;
    top: 0px !important;
}
.rr-player__frame {
    position: relative !important;
    top: 50% !important;
    transform: translateY(-50%) !important;
}
                `}
            </style>
        </div>
    );
}

const containerStyle = css`
    flex: 1;
    background: #000000;
    height: 100%;
    display: flex;
    flex-direction: column;
`;
const playerBottomContainerStyle = css`
    background: #101215;
    height: 50px;
    width: 100%;
    margin-top: auto;
    display: flex;
    color: #fff;
    user-select: none;
`;

export default Player;
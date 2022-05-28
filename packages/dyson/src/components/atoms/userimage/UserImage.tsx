import React from "react";
import { css } from "@emotion/react";

export interface UserImageProps {
	/**
	 * Emotion CSS style if any
	 */
	css?: [string] | string;
	/**
	 * Optional click handler
	 */
	onClick?: () => void;
	url: string;
}

const UserDefaultProps = {};

/**
 * Crusher Text component.
 */
export const UserImage: React.FC<UserImageProps> = ({ url }) => {
	return (
		<div css={userImage}>
			<div className={"relative"}>
				<img src={url} height={"24px"} />
				<div css={dotCSS}></div>
			</div>
		</div>
	);
};

UserImage.defaultProps = UserDefaultProps;
const userImage = css`
	padding: 8rem;
	:hover {
		background: #101215;
		border-radius: 4px;
	}

	img {
		height: 32rem;
	}
`;

const dotCSS = css`
	position: absolute;
	background: #7dda6e;
	right: 1.2px;
	bottom: 0.4px;

	width: 6px;
	height: 6px;
	border-radius: 100px;
	border: 1px solid #f8f8f8;
`;

import { css } from "@emotion/react";
import Link from "next/link";
import { useRouter } from "next/router";

import { useAtom } from "jotai";

import { Dropdown } from "../../../../../dyson/src/components/molecules/Dropdown";
import { UserImage } from "dyson/src/components/atoms/userimage/UserImage";

import { MenuItem } from "@components/molecules/MenuItem";
import { resolvePathToBackendURI } from "@utils/common/url";

import { teamAtom } from "../../../store/atoms/global/team";
import { userAtom } from "../../../store/atoms/global/user";
import { backendRequest } from "@utils/common/backendRequest";
import { currentProject } from "@store/atoms/global/project";

const userDropdownItems = [
	{
		leftLabel: "Settings",
		rightLabel: "",
		link: "/settings/project/basic",
		target: "",
	},
	{
		leftLabel: "Changelog",
		rightLabel: "",
		link: "https://github.com/crusherdev/crusher/releases",
		target: "_blank",
	},
	{
		leftLabel: "Help & Support",
		rightLabel: "",
		link: "https://docs.crusher.dev/docs/references/contact-us",
		target: "_blank",
	},
	{
		leftLabel: "Github",
		rightLabel: "",
		link: "https://github.com/crusherdev/crusher",
		target: "_blank",
	},
];
function DropdownContent() {
	const router = useRouter();
	return (
		<div className={"flex flex-col justify-between h-full"}>
			<div>
				{userDropdownItems.map(({ leftLabel, rightLabel, link, target }) => (
					<Link href={link}>
						<a href={link} target={target} className={"close-on-click"}>
							<MenuItem label={leftLabel} rightLabel={rightLabel} />
						</a>
					</Link>
				))}
			</div>

			<div className={"mt-16"}>
				<hr
					css={css`
						color: #1a1d26;
					`}
				/>
				<MenuItem
					showHighlighted={true}
					onClick={async () => {
						await backendRequest(resolvePathToBackendURI("/users/actions/logout"));
						router.push("/login");
					}}
					label={"Logout"}
					rightLabel={""}
				/>
			</div>
		</div>
	);
}


function Branch(props) {
	return (
	  <svg
		width={11}
		height={12}
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	  >
		<path
		  d="M5.486.61a.675.675 0 00-.495.206L3.988 1.82l1.265 1.265a.833.833 0 011.093.605.952.952 0 01-.021.468l1.21 1.21a.952.952 0 01.467-.021.804.804 0 01.413.227.815.815 0 01.248.598c0 .234-.083.43-.248.591a.827.827 0 01-.598.24.84.84 0 01-.598-.233.885.885 0 01-.227-.44.825.825 0 01.048-.481L5.899 4.708v2.997a.815.815 0 01.468.75.815.815 0 01-.248.598.815.815 0 01-.598.247.792.792 0 01-.592-.247.827.827 0 01-.24-.599c0-.233.082-.433.247-.598a.84.84 0 01.275-.178V4.653a.625.625 0 01-.275-.18.774.774 0 01-.24-.432.844.844 0 01.048-.488L3.506 2.3l-3.3 3.3A.683.683 0 000 6.103c0 .197.069.365.206.502l4.799 4.799a.683.683 0 00.502.206.683.683 0 00.502-.206l4.785-4.785A.683.683 0 0011 6.117a.683.683 0 00-.206-.502L5.995.816A.691.691 0 005.486.61z"
		  fill="#fff"
		  fillOpacity={0.22}
		/>
	  </svg>
	);
  }


function DropdownSVG(props) {
	return (
	  <svg
		width={9}
		height={6}
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	  >
		<path
		  d="M4.5 5.54a.623.623 0 01-.446-.188L.184 1.416a.649.649 0 010-.906.623.623 0 01.892 0L4.5 3.992 7.924.51a.623.623 0 01.891 0 .648.648 0 010 .906l-3.87 3.936a.623.623 0 01-.445.187z"
		  fill="#BDBDBD"
		  fillOpacity={0.7}
		/>
	  </svg>
	);
  }

export function UserNTeam() {
	const [user] = useAtom(userAtom);
	const [team] = useAtom(teamAtom);
	const [project] = useAtom(currentProject);

	
	return (
		<div className={"flex justify-between leading-none relative"} css={userCard}>
			<div className={"flex"} css={orgName}>
			
				<div>
					<div className={"font-cera mb-4 font-600"} css={name}>
					<span className="icon">🚀</span> {project.name.substr(0, 11)} <DropdownSVG className="dropdown"/>
					</div>
					<div css={description} className={"font-500 leading-none lowercase"}>
						<Branch className="mr-12" css={css`zoom: 1.2;`}/>	master
					</div>
				</div>
			</div>

			<Dropdown
				component={<DropdownContent />}
				dropdownCSS={css`
					height: 256rem;
				`}
			>
				<div className={"flex items-center pr"}>
					<UserImage url={user?.avatar ?? "https://i.imgur.com/bu4knwV.png"} />
				</div>
			</Dropdown>
		</div>
	);
}

export function MenuItemHorizontal({ children, selected, ...props }) {
	return (
		<div css={[menuLink, selected && menuSelected]} {...props}>
			{children}
		</div>
	);
}

const menuLink = css`
	box-sizing: border-box;
	border-radius: 6rem;
	line-height: 13rem;
	height: 30rem;
	padding: 0 12rem;
	color: rgba(255, 255, 255, 0.8);
	font-weight: 600;
	display: flex;
	align-items: center;

	:hover {
		background: rgba(255, 255, 255, 0.05);
	}
`;

const menuSelected = css`
	background: rgba(255, 255, 255, 0.05);
`;

const orgName = css`
	padding: 6px 12px 6px 12px;
	margin-top: -2px;
	:hover {
		background: #101215;
		border-radius: 4px;
	}
`;
const userCard = css`
height: 68rem;
    border-bottom: 1px solid #1A1B1E;
	display: flex;
	items-align: center;
	align-items: center;
margin-left: -2px;
padding: 0 6px
`;

const nameInitial = css`
	line-height: 1;
	font-size: 12rem;
	width: 22rem;
	height: 22rem;
	border-radius: 4px;
	background: #e6ff9d;
	color: #46551b;
`;

const name = css`
	font-size: 16rem;
	color: #A7A7A8;
	display: flex;
	align-items: center;
	.icon{
		font-size: 14px;
		margin-right: 10px;
	}
	.dropdown{
		margin-left: 4px;
	}
`;

const description = css`
	font-size: 13.5rem;
	margin-top: 8rem;
	color: #d0d0d0;
	display: flex;
	align-items: center;
`;

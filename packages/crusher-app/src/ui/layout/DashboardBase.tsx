import { css } from "@emotion/react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useCallback, useState } from "react";

import { useAtom } from "jotai";

import { Button } from "dyson/src/components/atoms";
import { Input } from "dyson/src/components/atoms";
import { Conditional } from "dyson/src/components/layouts";
import { Dropdown } from "dyson/src/components/molecules/Dropdown";

import { MenuItem } from "@components/molecules/MenuItem";
import { EditionTypeEnum } from "@crusher-shared/types/common/general";
import { AddSVG, HelpSVG, LayoutSVG, NewTabSVG, PlaySVG, TraySVG } from "@svg/dashboard";
import { GithubSVG } from "@svg/social";
import { MenuItemHorizontal, UserNTeam } from "@ui/containers/dashboard/UserNTeam";
import { getEdition } from "@utils/helpers";


import { appStateAtom, appStateItemMutator } from "../../store/atoms/global/appState";
import { projectsAtom } from "../../store/atoms/global/project";
import { buildFiltersAtom } from "../../store/atoms/pages/buildPage";
import { updateMeta } from "../../store/mutators/metaData";
import { PROJECT_META_KEYS, USER_META_KEYS } from "@constants/USER";
import { handleTestRun } from "@utils/core/testUtils";
import { TextBlock } from 'dyson/src/components/atoms/textBlock/TextBlock';

const Download = dynamic(() => import("@ui/containers/dashboard/Download"));
const AddProject = dynamic(() => import("@ui/containers/dashboard/AddProject"));
const InviteMembers = dynamic(() => import("@ui/containers/dashboard/InviteMember"));

function ProjectList() {
	const router = useRouter();
	const [search] = useState(false);

	const [projects] = useAtom(projectsAtom);
	const [appState] = useAtom(appStateAtom);
	const [, setAppStateItem] = useAtom(appStateItemMutator);
	const [, updateOnboarding] = useAtom(updateMeta);

	const [showAddProject, setShowAddProject] = useState(false);

	return (
		<>
			<div className={"flex pl-10 mr-2 mt- justify-between mt-36"} css={project}>
				<div className={"flex items-center"}>
					<span className={"text-12.5 leading-none mr-8 font-600"}>Projects</span>
				</div>

				<Conditional showIf={showAddProject}>
					<AddProject onClose={setShowAddProject.bind(this, false)} />
				</Conditional>
				<div className={"flex items-center"} css={hoverCSS} onClick={setShowAddProject.bind(this, true)}>
					<AddSVG />
					<div className={"text-12.5 leading-none ml-8 leading-none mt-2"}>Add</div>
				</div>
			</div>

			{search && (
				<div>
					<Input placeholder={"enter name"} css={smallInputBox} />
				</div>
			)}

			<div className={"mt-6"}>
				{projects.map(({ id, name }) => (
					<MenuItemHorizontal
						className={"mt-2"}
						selected={appState.selectedProjectId === id}
						onClick={() => {
							updateOnboarding({
								type: "user",
								key: USER_META_KEYS.SELECTED_PROJECT_ID,
								value: id,
							});
							setAppStateItem({ key: "selectedProjectId", value: id });
							router.push("/app/dashboard");
						}}
						key={id}
					>
						<LayoutSVG />
						<span className={"text-13 ml-16 font-500 mt-2 leading-none"}>{name}</span>
					</MenuItemHorizontal>
				))}
			</div>
		</>
	);
}

function BottomSection({ name, description, ...props }) {
	return (
		<div className={"flex justify-between py-8 px-12 pb-6 mt-20"} css={upgradeCard} {...props}>
			<div>
				<div className={"label font-700"}>{name}</div>
				<div className={"description text-12"}>{description}</div>
			</div>
			<div>
				<div>
					<TraySVG
						css={css`
							margin-left: auto;
						`}
					/>
				</div>
				<div className={"upgrade text-12 mt-6 font-600"}>Upgrade</div>
			</div>
		</div>
	);
}

function HelpContent() {
	return <div>
			<div className={"px-24 py-20 pt-14"}>
				<TextBlock fontSize={16} weight={600} color={"#CFCFD0"} css={css`font-family: 'Cera Pro'`}>Need help with your project?</TextBlock>
				<TextBlock fontSize={12.8} color={"#8F8F8F"} className={"mt-10"}>For issues with crusher, other enquiries.</TextBlock>
				<div className={"flex mt-20 mb-12"}>
					<a href={"https://docs.crusher.dev"} target={"_blank"}>
					<Button size={"x-small"} css={css`width: 148rem;`} bgColor={"blue"}>Setup call</Button>
					</a>
						<a href={"https://docs.crusher.dev"} target={"_blank"}>
							<Button size={"x-small"} className={"ml-12"} css={css`width: 120rem;`} bgColor={"tertiary-white-outline"}>Read docs</Button>
						</a>
				</div>
				<TextBlock className={"mt-24"} fontSize={13} color={"#8F8F8F"} showLineHeight={true} >		A dev will pair to help you adopt crusher.</TextBlock>

			</div>
		<hr css={css`height: 1px; background: #1C1F22;  border: none;`} className={"mt-0 mb-8"}/>

		<div className={"px-20 py-16"}>
			<TextBlock fontSize={16} weight={600}  color={"#CFCFD0"} css={css`font-family: 'Cera Pro'`}>Discuss with community</TextBlock>
			<TextBlock className={"mt-10 mb-16 "} fontSize={12.8} color={"#8F8F8F"}>For feature request, question or discussion</TextBlock>

			<a href={"https://github.com/crusherdev/crusher"} target={"_blank"}>
			<img src={"/github_support.png"} className={"mb-16 "} css={banner}/>
			</a>
			{/*<img src={"/github_support.png"} css={banner}/>*/}
		</div>
	</div>;
}

const banner=css`
	:hover{
    filter: sepia(100%) hue-rotate(
            203deg
    ) saturate(1500%);
	}
`

const helpDropdownCSS = css`
    box-shadow: 0 0px 6px rgb(0 0 0 / 33%) !important;
							    bottom: -20rem;
							    top: unset !important;
							left: 4rem !important;
							height: fit-content;
							border-radius: 10rem !important;
      width: 372px;

						`

function HelpNSupport() {
	return <Dropdown
		component={<HelpContent/>}
		dropdownCSS={helpDropdownCSS}
	>
		<div css={navLink} className={'flex items-center pr text-12.5 mt-4'}>
			<NewTabSVG className={'mr-14 mb-2'} /> Help & Support
		</div>
	</Dropdown>;
}


function Home(props) {
	return (
	  <svg
		width={14}
		height={14}
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	  >
		<g clipPath="url(#prefix__clip0_2656_1568)">
		  <path
			d="M13.754 5.503l-1.752-1.428V1.792a.467.467 0 00-.466-.466h-1.102a.467.467 0 00-.466.466v.625L7.627.509a.994.994 0 00-.628-.214.99.99 0 00-.626.213L.246 5.503c-.279.227-.262.425-.227.522.035.097.146.26.504.26h.839v6.57c0 .468.38.85.848.85h2.65c.463 0 .826-.374.826-.85V10.16a.46.46 0 01.445-.441h1.78c.223 0 .403.198.403.44v2.695c0 .46.398.85.87.85h2.606a.85.85 0 00.848-.85v-6.57h.84c.357 0 .468-.163.503-.26.035-.097.052-.295-.227-.522z"
			fill="#BDBDBD"
		  />
		</g>
		<defs>
		  <clipPath id="prefix__clip0_2656_1568">
			<path fill="#fff" d="M0 0h14v14H0z" />
		  </clipPath>
		</defs>
	  </svg>
	);
  }
  
  function Test(props) {
	return (
	  <svg
		width={14}
		height={14}
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	  >
		<g clipPath="url(#prefix__clip0_2656_1662)">
		  <path
			d="M13.979 5.27a7.108 7.108 0 00-1.841-3.188A7.063 7.063 0 007.11 0C5.211 0 3.426.74 2.083 2.082a7.118 7.118 0 000 10.055 7.108 7.108 0 003.187 1.841.647.647 0 00.624-.167l7.917-7.918a.646.646 0 00.168-.624zM2.997 2.995A5.779 5.779 0 017.11 1.293a5.78 5.78 0 014.114 1.703 5.83 5.83 0 011.136 1.608 7.103 7.103 0 00-5.707 2.05 7.104 7.104 0 00-2.049 5.706 5.824 5.824 0 01-1.607-9.363z"
			fill="#BDBDBD"
		  />
		</g>
		<defs>
		  <clipPath id="prefix__clip0_2656_1662">
			<path fill="#fff" d="M0 0h14v14H0z" />
		  </clipPath>
		</defs>
	  </svg>
	);
  }


function Builds(props) {
	return (
	  <svg
		width={14}
		height={12}
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	  >
		<path
		  d="M1.261.599C.566.599 0 1.165 0 1.86v6.302c0 .695.566 1.261 1.261 1.261h.405V4.247c0-.994.808-1.802 1.801-1.802h8.328V1.86c0-.695-.566-1.26-1.26-1.26H1.26V.598z"
		  fill="#BDBDBD"
		/>
		<path
		  d="M3.464 2.985c-.695 0-1.26.566-1.26 1.261v6.302c0 .696.565 1.261 1.26 1.261h9.273c.696 0 1.262-.566 1.262-1.261V4.246c0-.695-.566-1.26-1.262-1.26H3.464z"
		  fill="#BDBDBD"
		/>
	  </svg>
	);
  }


function Plugin(props) {
	return (
	  <svg
		width={13}
		height={12}
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	  >
		<path
		  d="M10.947 5.284h-.319V2.583c0-.2-.083-.392-.23-.533a.806.806 0 00-.557-.22H7.479A1.895 1.895 0 006.94.612 2.056 2.056 0 005.712.01c-.27-.027-.542 0-.8.079a1.993 1.993 0 00-.7.378c-.203.17-.367.38-.483.614a1.817 1.817 0 00-.186.748H.787a.806.806 0 00-.556.221.737.737 0 00-.231.533V5.66h1.106c.303-.008.598.09.83.277.232.187.383.45.426.737.015.157-.004.316-.057.466a1.18 1.18 0 01-.645.68c-.151.066-.314.1-.48.1H0v3.327c0 .2.083.391.23.532.148.142.348.221.557.221h9.054c.209 0 .409-.08.556-.22a.737.737 0 00.231-.533V9.05h.394c.276.002.55-.052.802-.159.253-.106.48-.262.665-.458.186-.196.326-.427.413-.678.086-.251.116-.517.088-.78a1.917 1.917 0 00-.684-1.219 2.082 2.082 0 00-1.36-.472z"
		  fill="#BDBDBD"
		/>
	  </svg>
	);
  }

const items = [{
	name: 'Home',
	icon: <Home/>,
	path: '/app/dashboard'
},
{
	name: 'Test',
	icon: <Test/>,
	path: '/app/tests'
},
{
	name: 'Builds',
	icon: <Builds/>,
	path: '/app/builds',
},
{
	name: 'Settings',
	icon: <Plugin/>,
	path: '/settings/project/basic'
}
]
function LeftMenu(){

	const { pathname, query, asPath } = useRouter();

	return (items.map((item,i)=>{

		let isNavLinkSelected = false;

		const {path,keyToCheck } = item;
		const queryParam = "";
		if (queryParam) {
			const [key] = queryParam.split("=");
			isNavLinkSelected = key && path === pathname && asPath.includes(queryParam);
		} else {
			isNavLinkSelected = path === pathname && query[keyToCheck] === undefined ;
		}

		return (
			<Link href={item.path}>
			<div css={[menuItem,isNavLinkSelected&&selected]}>
				{item.icon} <span className="name">{item.name}</span>
			</div>
			</Link>
		)
	}))
}

const menuItem=css`
	height: 36px;
	display: flex;
	align-items: center;
	padding-left: 16px;
	display: flex;
	.name{
		margin-left:16px;
		font-size: 15rem;
		margin-top: 1px;
		font-weight: 500;
	}
	:hover{
		background: #111215;
	}
`

const selected=css`
	background: #111215;

	path{
		fill: #9570FF;
	}
`

function LeftSection() {
	const router = useRouter();
	const [inviteTeammates, setInviteTeamMates] = useState(false);
	return (
		<div css={sidebar} className={"flex flex-col justify-between"}>
			<div>
				<UserNTeam />

				{/*<div>*/}
				{/*	<div css={OutlinedButton} className={' mt-28 flex justify-between'}>*/}
				{/*		<span className={'text-13'}>Upgrade to pro</span> <RightArrow/>*/}
				{/*	</div>*/}
				{/*</div>*/}

				{/*<div className={"mt-24"}>*/}
				{/*	{CURRENT_PROJECT_LIST.map(({ name, ICON }) => (*/}
				{/*		<MenuItemHorizontal className={"mt-2"}>*/}
				{/*			<ICON height={"12rem"} />*/}
				{/*			<span className={"text-13 ml-16 font-500 mt-2 leading-none"}>{name}</span>*/}
				{/*		</MenuItemHorizontal>*/}
				{/*	))}*/}
				{/*</div>*/}

				
				<div className="mt-32">
					<LeftMenu/>
				</div>
			</div>


			<div>
				<Conditional showIf={inviteTeammates}>
					<InviteMembers onClose={setInviteTeamMates.bind(this, false)} />
				</Conditional>
				<div className="px-6 pb-8">
					<Conditional showIf={getEdition() === EditionTypeEnum.OPEN_SOURCE}>
						<div className={"text-12 font-600 leading-none mt-16 mb-8 ml-8"} id={"support-tagline"}>
							Join community 💓
						</div>
						<a target={"_blank"} href={"https://github.com/crusherdev/crusher"}>
							<div css={navLink} className={"flex items-center text-13 mt-4 leading-none"}>
								<GithubSVG className={"mr-12"} /> <span className={"mt-4 text-12.5"}>Star us on Github</span>
							</div>
						</a>
						{/*<a href={"https://crusher.dev"}>*/}
						{/*	<div css={navLink} className={"flex items-center text-13 mt-4 mb-12 leading-none"}>*/}
						{/*		<GithubSVG className={"mr-12"} /> <span className={"mt-4 text-13"}>Join discord</span>*/}
						{/*	</div>*/}
						{/*</a>*/}
					</Conditional>

					<Conditional showIf={getEdition() !== EditionTypeEnum.OPEN_SOURCE}>
						<div css={navLink} className={"flex items-center text-13 mt-4"}
								 onClick={setInviteTeamMates.bind(this, true)}>
							<AddSVG className={"mr-18 mb-2"} /> Invite teammates
						</div>
					</Conditional>

					<HelpNSupport/>
					<div
						css={navLink}
						className={"flex items-center text-13 mt-4"}
						onClick={() => {
							window.UserLeap("track", "basic-nps");
						}}
					>
						<HelpSVG className={"mr-16 mb-2"} /> Give feedback
					</div>
				</div>

				<Conditional showIf={getEdition() === EditionTypeEnum.OPEN_SOURCE}>
					<a href={"https://crusher.dev"}>
						<BottomSection name={"Use Crusher Cloud"} description={"Get 50% more"} />
					</a>
				</Conditional>

				{/* <Conditional showIf={getEdition() === EditionTypeEnum.EE}>
					<BottomSection
						name={"Free plan"}
						description={"Get started"}
						onClick={() => {
							router.push("/settings/org/pricing");
						}}
					/>
				</Conditional> */}
			</div>
		</div>
	);
}

export const dropdDown = css`
	bottom: -10px;
	left: calc(100% - 4px);
	position: absolute;
	width: 206.03px;

	background: #0f1112;
	border: 1px solid rgba(42, 47, 50, 0.8);
	box-sizing: border-box;
	box-shadow: 0 4px 15px rgba(255, 255, 255, 0.4);
	padding: 8rem 0;
	z-index: 1;
`;

function DropdownContent() {
	return (
		<div className={"flex flex-col justify-between"}>
			<div>
				<MenuItem
					selected={true}
					label={"Request a feature"}
					onClick={() => {
						window.open("https://github.com/crusherdev/crusher/issues","_blank").focus();
					}}
				></MenuItem>

				<MenuItem
					label={"Report Issue"}
					onClick={() => {
						window.open("https://github.com/crusherdev/crusher/issues","_blank").focus();
					}}
				></MenuItem>

				<MenuItem
					label={"View docs"}
					onClick={() => {
						window.open("https://docs.crusher.dev","_blank").focus();
					}}
				></MenuItem>
			</div>
		</div>
	);
}

function RunTest() {
	const router = useRouter();
	const [{ selectedProjectId }] = useAtom(appStateAtom);
	const { query } = router;
	const [filters] = useAtom(buildFiltersAtom);
	const [, updateMetaData] = useAtom(updateMeta);

	const runProjectTest = useCallback(() => {
		(async () => {
			await handleTestRun(selectedProjectId, query, filters, router, updateMetaData);

			updateMetaData({
				type: "user",
				key: USER_META_KEYS.RAN_TEST,
				value: true,
			});

			updateMetaData({
				type: "project",
				key: PROJECT_META_KEYS.RAN_TEST,
				value: true,
			});
		})();
	}, []);

	return (
		<Button bgColor={"tertiary"} onClick={runProjectTest} css={css`    padding: 0 8rem;`}>
			<div className={"flex items-center"}>
				<PlaySVG className={"mr-8"} />
				Run tests
			</div>
		</Button>
	);
}


function ExternalLink(props) {
	return (
	  <svg
		width={10}
		height={10}
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	  >
		<path
		  d="M3.889 1.667v1.11H1.11V8.89h6.111V6.11h1.111v3.333a.556.556 0 01-.555.556H.556A.556.556 0 010 9.444V2.222a.556.556 0 01.556-.555h3.333zM10 0v4.444H8.889V1.896l-4.33 4.33-.785-.785 4.329-4.33H5.556V0H10z"
		  fill="#fff"
		/>
	  </svg>
	);
  }

  
function TopNavbar() {
	const { pathname, query, asPath } = useRouter();
	const [showCreateTest, setShowCreateTest] = useState(false);

	return (
		<div css={[nav]} className={""}>
			<div css={[containerWidth]}>
				<div className={"w-full flex px-8 pl-0 justify-between"}>
					<div className={"flex"}>
							<a href="https://docs.crusher.dev" target="_blank" className="flex">
								<div className="flex items-center text-14" css={docsLink}>Docs <ExternalLink className="ml-8"/></div>
							</a>
					</div>

					<Conditional showIf={showCreateTest}>
						<Download onClose={setShowCreateTest.bind(this, false)} />
					</Conditional>

					<div className={"flex items-center"}>
						<RunTest />
						<Button
							className={"ml-20"}
							css={css`
								padding: 0 20rem;
							`}
							onClick={setShowCreateTest.bind(this, true)}
						>
							Create a test
						</Button>
						{/*<span className={"ml-24 font-500 text-14 leading-none"} css={shareLink}>*/}
						{/*	Share*/}
						{/*</span>*/}
					</div>
				</div>
			</div>
		</div>
	);
}

const docsLink = css`
	:hover{
		text-decoration: underline;
		color: #9570FF;
		path{
			fill: #9570FF;
		}
	}
`

export const SidebarTopBarLayout = ({ children, hideSidebar = false, setContainerWidth = true }) => {
	return (
		<div className={"flex"} css={background}>
			<Conditional showIf={!hideSidebar}>
				<LeftSection />
			</Conditional>

			<div className={"w-full"}>
				<TopNavbar />
				<div css={scrollContainer} className={"custom-scroll relative"}>
					<div css={[setContainerWidth && containerWidth]}>{children}</div>
				</div>
			</div>
		</div>
	);
};

const navLinkSquare = css`
	height: 68rem;

	div {
		color: #d0d0d0;
		font-size: 13.5rem;
	}

	.selected {
		background: #23272e;
		border-radius: 4px 4px 0 0;
		height: 5px;
		position: absolute;
		width: 100%;
		bottom: 0;
	}

	.nav-top-link {
		padding-bottom: 4px;
		border-radius: 4px;
		padding-top: 4px;
	}

	.nav-top-link:hover {
		background: rgba(255, 255, 255, 0.05);
	}
`;

const background = css`
	// background: #0A0B0E;

	background: #0d0d0f;
	min-height: 100vh;
`;

const sidebar = css`
	width: 260px;
	height: 100vh;
	border-right: 1px solid #1A1B1E;
	box-sizing: border-box;
	// background: #090A0D;
	background: #0B0B0C;
`;

const nav = css`
	width: 100%;
	height: 68rem;
	border-bottom: 1px solid #1A1B1E;

	display: flex;
	align-items: center;
	
`;
const containerWidth = css`
	//width: calc(100vw - 250rem);
	//max-width: 1500rem;

	width: 1468rem;
	max-width: calc(100vw - 352rem);
	margin: 0 auto;
	padding: 0 0;
`;

const scrollContainer = css`
	overflow-y: scroll;
	height: calc(100vh - 68rem);
`;

const project = css`
	color: rgba(255, 255, 255, 0.9);
	font-size: 12rem;
`;

const hoverCSS = css`
	padding: 6px 10px 6px 10px;
	:hover {
		background: #202429;
		border-radius: 4px;
	}
`;

const navLink = css`
	box-sizing: border-box;
	line-height: 13rem;
	height: 31rem;
	color: rgba(189, 189, 189, 0.8);
	font-weight: 500;
  letter-spacing: .3px;

	margin-left: 6px;
	margin-right: 6px;

	:hover {
		color: rgb(231, 231, 231);
	}
`;

const upgradeCard = css`
	background: #1a1d21;
	border: 1px solid #212529;
	border-radius: 6rem;

	path {
		fill: #929dff;
	}
	.label {
		color: rgba(255, 255, 255, 0.88);
		font-size: 13.5rem;
	}

	.description {
		color: rgba(255, 255, 255, 0.3);
	}

	.upgrade {
		color: #929dff;
	}

	:hover {
		background: #24282d;
		border: 1px solid #30353b;
	}
`;

const smallInputBox = css`
	width: calc(100% - 14px);
	background: linear-gradient(0deg, #0e1012, #0e1012);
	border: 1px solid #2a2e38;
	box-sizing: border-box;
	border-radius: 4px;
	height: 30rem;
	font-size: 14rem;
	padding-left: 16rem;
	color: #fff;
	margin: 7px 7px;
	padding-top: 2rem;
`;

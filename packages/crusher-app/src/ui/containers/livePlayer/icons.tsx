
const NavigateBackIcon = (props) => {
	const { disabled, onClick } = props;

	return (
		<svg fill={!disabled ? "#fff" : "#5F6368"} viewBox="0 0 24 24" onClick={onClick} {...props}>
			<path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
		</svg>
	);
};

const FailedCrossIcon = (props) => (
	<svg
	  width={14}
	  height={14}
	  fill="none"
	  xmlns="http://www.w3.org/2000/svg"
	  {...props}
	>
	  <path
		d="M7 0C3.14 0 0 3.14 0 7s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7Zm3.912 5.158L6.44 9.596a.688.688 0 0 1-.965.018L3.105 7.456a.712.712 0 0 1-.052-.982.694.694 0 0 1 .982-.035l1.877 1.719 4-4c.281-.28.72-.28 1 0 .281.28.281.72 0 1Z"
		fill="#D24781"
	  />
	</svg>
  )

  const BigPlayIcon = (props) => (
	<svg
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
	viewBox="0 0 32 32"
  >
    <rect rx={16} fill="#EF34BB" fillOpacity={0.08} />
    <rect
      x={0.8}
      y={0.8}
      width={30.4}
      height={30.4}
      rx={15.2}
      stroke="#F471CF"
      strokeOpacity={0.66}
      strokeWidth={1.6}
    />
    <path
      d="M14.633 11.22c-.902-.517-1.633-.093-1.633.946v7.667c0 1.04.73 1.463 1.633.947l6.701-3.844c.902-.517.902-1.355 0-1.872l-6.701-3.844Z"
      fill="#F471CF"
    />
  </svg>
)

const AddIcon = (props) => (
	<svg
	  viewBox={"0 0 14 14"}
	  fill="none"
	  xmlns="http://www.w3.org/2000/svg"
	  {...props}
	>
	  <g clipPath="url(#a)">
		<path
		  d="M13.045 5.727H8.273V.955A.955.955 0 0 0 7.318 0h-.636a.955.955 0 0 0-.955.955v4.772H.955A.955.955 0 0 0 0 6.682v.636c0 .527.428.955.955.955h4.772v4.772c0 .527.428.955.955.955h.636a.955.955 0 0 0 .955-.955V8.273h4.772A.955.955 0 0 0 14 7.318v-.636a.955.955 0 0 0-.955-.955Z"
		  fill="#BDBDBD"
		/>
	  </g>
	  <defs>
		<clipPath id="a">
		  <path fill="#fff" d="M0 0h14v14H0z" />
		</clipPath>
	  </defs>
	</svg>
  )



const CommentIcon = (props) => (
  <svg
    viewBox={"0 0 13 13"}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M13 1.3c0-.715-.585-1.3-1.3-1.3H1.3C.585 0 0 .585 0 1.3v7.8c0 .715.585 1.3 1.3 1.3h9.1L13 13V1.3Z"
      fill="#7EC3CC"
    />
  </svg>
)

const PlayIcon = (props) => {
	return (
		<svg
			viewBox={"0 0 14 14"}
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<path
				d="M2.978.309C1.716-.415.692.178.692 1.632v10.735c0 1.456 1.024 2.048 2.286 1.325L12.36 8.31c1.263-.724 1.263-1.898 0-2.622L2.978.31Z"
				fill="#A262F3"
			/>
		</svg>
	)
};

const CorrectIcon = (props) => (
  <svg
		viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M8 0C3.589 0 0 3.589 0 8s3.589 8 8 8 8-3.589 8-8-3.589-8-8-8Zm4.471 5.895-5.113 5.072c-.3.301-.782.321-1.102.02L3.549 8.521a.813.813 0 0 1-.06-1.123c.3-.32.802-.34 1.123-.04l2.145 1.965 4.571-4.571a.799.799 0 0 1 1.143 0c.321.32.321.822 0 1.143Z"
      fill="#C1DA7B"
    />
  </svg>
)

const ReviewIcon = (props) => (
  <svg
    viewBox={"0 0 16 16"}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M8 0C3.589 0 0 3.589 0 8s3.589 8 8 8 8-3.589 8-8-3.589-8-8-8Zm4.471 5.895-5.113 5.072c-.3.301-.782.321-1.102.02L3.549 8.521a.813.813 0 0 1-.06-1.123c.3-.32.802-.34 1.123-.04l2.145 1.965 4.571-4.571a.799.799 0 0 1 1.143 0c.321.32.321.822 0 1.143Z"
      fill="#F17EED"
    />
  </svg>
)

const PauseIcon = (props) => {
  return (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M15 0h25v100H15zM55 0h25v100H55z" 				fill="#A262F3"
 />
    </svg>
  );
}

const PlayCircleIcon = (props) => {
  return (
    <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox={"0 0 24 24"}
    style={{
      fill: "#fff",
    }}
    {...props}
  >
    <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z" />
    <path d="m9 17 8-5-8-5z" />
  </svg>
  );
}

export { NavigateBackIcon, FailedCrossIcon, CommentIcon, AddIcon, BigPlayIcon, PlayIcon, CorrectIcon, ReviewIcon, PauseIcon, PlayCircleIcon };
import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import { selectImageBaseUrl } from "../configuration/configurationSlice";
import { NoPerson } from "../../components/Placeholder";

const useStyles = makeStyles((theme) => ({
	link: {
		flex: "0 0 auto",
	},
	card: {
		height: "auto",
		width: "10rem",
		marginRight: theme.spacing(1),
	},
	content: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		textAlign: "center",
	},
	profile: {
		height: "12rem",
		width: "80%",
		objectFit: "cover",
		borderRadius: "0.5rem",
	},
	label: {
		margin: theme.spacing(2, 0),
	},
	name: {
		fontSize: "0.875rem",
		lineHeight: "1.25rem",
	},
}));

const StarCard = ({ star }) => {
	const classes = useStyles();
	const imageBaseUrl = useSelector(selectImageBaseUrl);

	let profile = null;
	if (!star.profile_path) {
		profile = <NoPerson height={"12rem"} width={"80%"} />;
	} else {
		const profileUrl = imageBaseUrl + star.profile_path;
		profile = <img className={classes.profile} src={profileUrl} alt="" />;
	}

	return (
		<Link to={`/person/${star.id}`} className={classes.link}>
			<div className={classes.card}>
				<div className={classes.content}>
					{profile}
					<div className={classes.label}>
						<Typography className={classes.name}>{star.name}</Typography>
						<Typography variant="caption" color="textSecondary">
							{star.character}
						</Typography>
					</div>
				</div>
			</div>
		</Link>
	);
};

export default StarCard;

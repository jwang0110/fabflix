import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

import Loading from "../components/Loading";
import HorizontalScrollContainer from "../components/HorizonalScrollContainer";
import { selectImageBaseUrl } from "../features/configuration/configurationSlice";
import MovieCard from "../features/movies/MovieCard";

const useStyles = makeStyles((theme) => ({
	main: {
		display: "flex",
		margin: theme.spacing(4, 0),
		[theme.breakpoints.down("xs")]: {
			flexDirection: "column",
		},
		[theme.breakpoints.up("sm")]: {
			flexDirection: "row",
		},
	},
	imageContainer: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		[theme.breakpoints.down("xs")]: {
			marginBottom: theme.spacing(2),
		},
		[theme.breakpoints.up("sm")]: {
			flexShrink: 0,
			marginRight: theme.spacing(2),
		},
	},
	profile: {
		height: "18rem",
		objectFit: "cover",
	},
	textContainer: {
		[theme.breakpoints.down("xs")]: {
			padding: 0,
		},
		[theme.breakpoints.up("sm")]: {
			padding: "1rem",
		},
	},
	header: {
		marginBottom: theme.spacing(2),
		[theme.breakpoints.up("sm")]: {
			display: "flex",
		},
	},
	name: {
		fontWeight: 700,
		[theme.breakpoints.down("xs")]: {
			fontSize: "1.5rem",
			lineHeight: "2rem",
		},
		[theme.breakpoints.up("sm")]: {
			fontSize: "2.25rem",
			lineHeight: "2.5rem",
		},
	},
	biography: {
		margin: "2rem 0",
	},
	semiBold: {
		fontWeight: 600,
	},
}));

const Profile = ({ classes, person, imageBaseUrl }) => {
	const profileUrl = imageBaseUrl + person.profile_path;

	return (
		<div className={classes.imageContainer}>
			<img className={classes.profile} src={profileUrl} alt="" />
		</div>
	);
};

const Movies = ({ classes, person }) => {
	const movieCards = person.movie_credits.cast.map((movie) => {
		return <MovieCard key={movie.id} movie={movie} />;
	});

	return (
		<Box component="section" my={4}>
			<Typography className={classes.semiBold}>Movies:</Typography>
			<HorizontalScrollContainer>{movieCards}</HorizontalScrollContainer>
		</Box>
	);
};

const PersonPage = ({ match }) => {
	const { person_id } = match.params;

	const classes = useStyles();
	const imageBaseUrl = useSelector(selectImageBaseUrl);
	const [person, setPerson] = useState(null);

	useEffect(() => {
		const fetchPerson = async () => {
			const response = await fetch(`http://localhost:3001/person/${person_id}`);
			const data = await response.json();

			setPerson(data);
		};

		fetchPerson();
	}, [person_id]);

	if (!person) {
		return <Loading />;
	}

	return (
		<>
			<section className={classes.main}>
				<Profile
					classes={classes}
					person={person}
					imageBaseUrl={imageBaseUrl}
				/>
				<div className={classes.textContainer}>
					<Typography className={classes.name}>{person.name}</Typography>
					<Typography>
						<span className={classes.semiBold}>Birthday:</span>{" "}
						{person.birthday}
					</Typography>
					<Typography className={classes.biography}>
						{person.biography}
					</Typography>
				</div>
			</section>

			<Movies classes={classes} person={person} />
		</>
	);
};

export default PersonPage;

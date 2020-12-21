import React from "react";
import { SongListMaker } from "./SongListMaker";
import PropTypes from "prop-types";
//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";
import marioImage from "/workspace/musicPlayer/src/img/dancingmario.gif";

//create your first component
export class Home extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			songList: [],
			currentSong: 0,
			volumeLevel: 50

			// songList: [
			// 	{
			// 		title: "South Park",
			// 		id: "south-park",
			// 		author: "Kyle",
			// 		url:
			// 			"https://assets.breatheco.de/apis/sound/files/cartoons/songs/south-park.mp3"
			// 	},
			// 	{
			// 		title: "Thunder Cats",
			// 		id: "thundercats",
			// 		author: "Moonra",
			// 		url:
			// 			"https://assets.breatheco.de/apis/sound/files/cartoons/songs/thundercats.mp3"
			// 	},
			// 	{
			// 		title: "X-Men",
			// 		id: "x-men",
			// 		author: "Profesor",
			// 		url:
			// 			"https://assets.breatheco.de/apis/sound/files/cartoons/songs/x-men.mp3"
			// 	}
			// ]
		};
		this.url = "https://assets.breatheco.de/apis/sound/songs";
		this.player = null;
	}

	componentDidMount() {
		this.pauseButton.style.display = "none";
		fetch(this.url)
			.then(function(response) {
				if (!response.ok) {
					throw Error(response.statusText);
				}
				return response.json();
			})
			.then(jsonifiedResponse =>
				this.setState({ songList: jsonifiedResponse })
			)
			.catch(function(error) {
				console.log("Looks like there was a problem: \n", error);
			});
	}

	startPlay(index) {
		if (index >= this.state.songList.length) {
			index = 0;
		}
		if (index < 0) {
			index = this.state.songList.length - 1;
		}
		this.player.src =
			"https://assets.breatheco.de/apis/sound/" +
			this.state.songList[index].url;
		this.player.play();
		this.pauseButton.style.display = "inline";
		this.playButton.style.display = "none";

		this.setState({ currentSong: index });
		console.log(index);
	}
	pausePlay() {
		this.player.pause();
		this.pauseButton.style.display = "none";
		this.playButton.style.display = "inline";
	}

	render() {
		return (
			<div className="text-center bigListBox  col-10 mx-auto mt-5 bg-dark">
				<div className="d-flex justify-content-between">
					<h1>Annoying Music Player</h1>
				</div>
				<div className="listBox col-7 mx-auto">
					<nav className="listBox">
						<ol className="  col-6 mx-auto light ">
							{this.state.songList.map((song, index) => {
								return (
									<li
										tabIndex={0}
										key={index}
										onClick={() => this.startPlay(index)}>
										<span className="fa-li">
											<i className="fas fa-music" />
										</span>
										{song.name}
									</li>
								);
							})}
						</ol>
					</nav>
				</div>
				<div className="controls col-6 align-items-center mx-auto d-flex justify-content-between">
					<img src={marioImage} />
					<a
						onClick={() =>
							this.startPlay(this.state.currentSong - 1)
						}>
						<i className="fas fa-caret-square-left fa-4x" />
					</a>
					<a
						ref={el => (this.playButton = el)}
						onClick={() => this.startPlay(this.state.currentSong)}>
						<i className="fas fa-play fa-4x" />
					</a>
					<a
						ref={el => (this.pauseButton = el)}
						onClick={() => this.pausePlay()}>
						<i className="fas fa-pause-circle fa-4x" />
					</a>
					<a
						ref={el => (this.shuffleButton = el)}
						onClick={() =>
							this.startPlay(
								Math.floor(
									Math.random() * this.state.songList.length
								)
							)
						}>
						<i className="fas fa-random fa-4x" />
					</a>

					<a
						onClick={() =>
							this.startPlay(this.state.currentSong + 1)
						}>
						<i className="fas fa-caret-square-right fa-4x" />
					</a>
					<img className="img2" src={marioImage} />
				</div>
				<audio
					volume={this.state.volumeLevel / 100}
					src={this.state.currentSong.url}
					ref={el => (this.player = el)}
				/>{" "}
				<label htmlFor="points">Volume: {this.state.volumeLevel}</label>
				{"   "}
				<input
					type="range"
					id="points"
					name="points"
					min="0"
					max="100"
					value={this.state.volumeLevel}
					onInput={event =>
						(this.player.volume = event.target.value / 100)
					}
					onChange={event =>
						this.setState({ volumeLevel: event.target.value })
					}
				/>{" "}
				<div className="mx-auto col-5 d-flex align-items-center justify-content-between">
					<a href="http://www.edianibarrola.com">
						Made by EdianSmells
					</a>
					<a href="http://www.twitter.com/ediansmells">
						<i className="fab fa-twitter" />
					</a>
					{"  "}
					<a href="http://github.com/edianibarrola">
						<i className="fab fa-github-alt" />
					</a>
					{"  "}
					<a href="http://www.instagram.com/the_garden_of_edian/">
						<i className="fab fa-instagram" />
					</a>
				</div>
			</div>
		);
	}
}

//use short html audiotag <audio>
//use audio/video dom play and pause (make functions)

// <SongListMaker
// 								propCurrentSong={this.state.currentSong}
// 								propSongList={this.state.songList}
// 								propStartPlay={this.startPlay}
// 							/>

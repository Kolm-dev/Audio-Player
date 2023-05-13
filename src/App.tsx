import React, {useRef, useState, useEffect} from "react"
import useStore from "./utils/store"
import {Line} from "rc-progress"
import "./App.scss"
import Form from "./components/Form"

const AudioPlayer: React.FC = () => {
	const [showForm, setShowForm] = useState(!false)
	const [, setAudioRef] = useStore((state) => [state.audio, state.setAudioRef])

	const {isPlaying, nextSong, togglePlay, prevSong, current, songs} = useStore()

	const [progress, setProgress] = useState(0)

	const handlePlayClick = () => {
		togglePlay()
	}

	const handleNextClick = () => {
		nextSong()
	}

	const handlePrevClick = () => {
		prevSong()
	}

	const handleAudioReady = () => {
		if (audioElementRef.current !== null) setAudioRef(audioElementRef.current)
	}

	const handleAudioEnded = () => {
		togglePlay
	}

	const progressBarHandler = () => {
		const audioElement = audioElementRef.current
		if (audioElement !== null) {
			const percentage =
				(audioElement.currentTime / audioElement.duration) * 100
			setProgress(percentage)
		}
	}

	const audioElementRef = useRef<HTMLAudioElement>(null)

	useEffect(() => {
		const audioElement = audioElementRef.current
		if (audioElement !== null) {
			audioElement.addEventListener("timeupdate", progressBarHandler)
		}
		return () => {
			if (audioElement !== null) {
				audioElement.removeEventListener("timeupdate", progressBarHandler)
			}
		}
	}, [audioElementRef])

	return (
		<>
			<div className="player">
				{!showForm ? (
					<Form showForm={showForm} setShowForm={setShowForm} />
				) : (
					<div>
						<div className="searchPanel">
							<h1 style={{textAlign: "center", marginBottom: "40px"}}>
								Audio player 🤖
							</h1>
							{/* <input
								className="playerInputSearch"
								type="text"
								placeholder="Enter the artist or song title you want to listen to..."
							/> */}
							{/* <div style={{display: "block"}} className="radioGroup">
								<div className="radioButton">
									<label htmlFor="singer">Search by:</label>
									<label htmlFor="title">
										<input
											defaultChecked
											type="radio"
											name="singer"
											id="title"
										/>
										by title of song
									</label>
									<label htmlFor="singer">
										<input type="radio" name="singer" id="singer" />
										by artist
									</label>
								</div>
								<button className="searchButton btn">Let's find 🔍</button>
							</div> */}
							<button
								onClick={() => setShowForm(!showForm)}
								className="btn addMusicButton">
								Add file 🎵
							</button>
						</div>
						<div className="outputPanel">
							<h3>{songs[current].title}</h3>
							<Line percent={progress} strokeWidth={1} strokeColor="#176e6e" />

							<audio
								ref={audioElementRef}
								src={songs[current].url}
								onCanPlay={handleAudioReady}
								onEnded={handleAudioEnded}
							/>
							<div className="controls">
								<button className={`btn`} onClick={handlePrevClick}>
									Prev song ⏮️
								</button>

								<button className={`btn`} onClick={handlePlayClick}>
									{isPlaying ? "Pause ⏸️" : "Play ▶️"}
								</button>
								<button className={`btn`} onClick={handleNextClick}>
									Next song ⏭️
								</button>
							</div>
						</div>
					</div>
				)}
			</div>
		</>
	)
}

export default AudioPlayer

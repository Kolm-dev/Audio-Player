import React, {useEffect, useState} from "react"
import useStore from "../utils/store"
import "./Form.scss"

type TypeFormProps = {
	setShowForm: (trueOrFalse: boolean) => void
	showForm: boolean
}

const Form: React.FC<TypeFormProps> = ({setShowForm, showForm}) => {
	const {songs, setSong} = useStore((state) => ({
		songs: state.songs,
		setSong: state.setSong,
	}))
	const [info, setInfo] = useState("Write a title for your song...")
	const [title, setTitle] = React.useState("")
	const [url, setUrl] = React.useState("")

	const inputFileHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files && event.target.files.length) {
			const file = event.target.files[0]
			const reader = new FileReader()
			if (file.name.endsWith(".mp3")) {
				reader.onload = function (event) {
					if (event.target?.result) {
						setUrl(event.target.result.toString())
					}
				}
			} else {
				setInfo("NOT .MP3😥")
			}

			reader.readAsDataURL(file)
		}
	}
	const inputTitleHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.value.trim()) {
			setTitle(event.target.value)
			setInfo("Select the .mp3 file")
		}
	}
	const musicAddHandler = (e: React.FormEvent) => {
		e.preventDefault()
		const newSong = {
			title: title,
			url: url,
		}
		setSong(newSong)
		setShowForm(!showForm)
	}

	useEffect(() => {
		console.log("INDEX", songs.length)
		console.log(songs)
	}, [songs])

	return (
		<form className={"form"} onSubmit={musicAddHandler}>
			<h2>Adding songs form</h2>
			<input
				onChange={inputTitleHandler}
				type="text"
				placeholder="What is the name of your song?"
			/>
			{title ? (
				<div>
					<input
						className="fileInput"
						onChange={inputFileHandler}
						type="file"
						name="inputAddFile"
					/>
				</div>
			) : null}

			{url && title ? (
				<button onClick={musicAddHandler} type="submit">
					Add this
				</button>
			) : (
				<span>{info}</span>
			)}
			<span
				onClick={() => setShowForm(!showForm)}
				className="cardInfoButtonClose closeFormButton">
				✖️
			</span>
		</form>
	)
}

export default Form

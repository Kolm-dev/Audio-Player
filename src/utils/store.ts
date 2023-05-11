import {create} from "zustand"

type AudioRef = HTMLAudioElement | null

type Song = {
	title: string
	url: string
}

type Store = {
	audio: AudioRef
	isPlaying: boolean
	volume: number
	currentTime: number
	duration: number
	current: number
	isChecked: boolean
	songs: Song[]
	setSong: (song: Song) => void
	setAudioRef: (ref: AudioRef) => void
	togglePlay: () => void
	prevSong: () => void
	nextSong: () => void
	toggleCheckbox: () => void
}

const useStore = create<Store>((set) => ({
	audio: null,
	setSong: (newSong) =>
		set((state) => ({
			songs: [...state.songs, {url: newSong.url, title: newSong.title}],
		})),
	setAudioRef: (ref: AudioRef) => set({audio: ref}),
	songs: [
		{title: "Sound 1", url: "/sound.mp3"},
		{title: "Sound 2", url: "/sound2.mp3"},
	],
	isChecked: false,
	toggleCheckbox: () => set((prevState) => ({isChecked: !prevState.isChecked})),
	isPlaying: false,
	volume: 1,
	current: 0,
	currentTime: 0,
	duration: 0,
	togglePlay: () =>
		set((state) => {
			const {audio, isPlaying} = state
			const shouldPlay = !isPlaying
			if (audio instanceof HTMLAudioElement) {
				shouldPlay ? audio.play() : audio.pause()
			}
			return {isPlaying: shouldPlay}
		}),
	prevSong: () =>
		set((state) => {
			const {songs, current, audio, isPlaying} = state
			const prevIndex =
				current === 0 ? songs.length - 1 : (current - 1) % songs.length
			const prevSong = songs[prevIndex]
			if (audio instanceof HTMLAudioElement) {
				audio.src = prevSong.url
				if (isPlaying) audio.play()
			}
			return {current: prevIndex}
		}),
	nextSong: () =>
		set((state) => {
			const {songs, current, audio, isPlaying} = state
			const nextIndex = (current + 1) % songs.length
			const nextSong = songs[nextIndex]
			if (audio instanceof HTMLAudioElement) {
				audio.src = nextSong.url
				if (isPlaying) audio.play()
			}
			return {current: nextIndex}
		}),
}))

export default useStore

import { useState, useEffect } from 'react'

// ─── Peta kode cuaca WMO → icon & deskripsi ────────────────────────────────
const WMO_MAP = {
	0:  { icon: '☀️',  desc: 'Cerah' },
	1:  { icon: '🌤️', desc: 'Sebagian Berawan' },
	2:  { icon: '⛅',  desc: 'Berawan' },
	3:  { icon: '☁️',  desc: 'Mendung' },
	45: { icon: '🌫️', desc: 'Berkabut' },
	48: { icon: '🌫️', desc: 'Kabut Beku' },
	51: { icon: '🌦️', desc: 'Gerimis Ringan' },
	53: { icon: '🌦️', desc: 'Gerimis' },
	55: { icon: '🌧️', desc: 'Gerimis Lebat' },
	61: { icon: '🌧️', desc: 'Hujan Ringan' },
	63: { icon: '🌧️', desc: 'Hujan Sedang' },
	65: { icon: '🌧️', desc: 'Hujan Lebat' },
	80: { icon: '🌦️', desc: 'Hujan Lokal' },
	81: { icon: '🌧️', desc: 'Hujan Deras Lokal' },
	95: { icon: '⛈️',  desc: 'Badai Petir' },
	99: { icon: '⛈️',  desc: 'Badai dengan Es' },
}

// ─── Koordinat kota yang didukung ──────────────────────────────────────────
const CITY_COORDS = {
	Jakarta:    { lat: -6.2088,  lon: 106.8456 },
	Bandung:    { lat: -6.9175,  lon: 107.6191 },
	Surabaya:   { lat: -7.2575,  lon: 112.7521 },
	Yogyakarta: { lat: -7.7971,  lon: 110.3688 },
	Bali:       { lat: -8.3405,  lon: 115.0920 },
}

/**
 * useDateTime — Custom hook untuk mendapatkan tanggal & waktu real-time.
 * Diperbarui setiap 1 detik.
 *
 * Returns:
 *   now       — objek Date saat ini
 *   formatted — string tanggal panjang, contoh: "Minggu, 05 Oktober 2026"
 *   time      — string waktu HH:MM:SS, contoh: "08:40:06"
 *   date      — string tanggal pendek, contoh: "05/10/2026"
 */
export function useDateTime() {
	const [now, setNow] = useState(new Date())

	useEffect(() => {
		const timer = setInterval(() => {
			setNow(new Date())
		}, 1000)
		return () => clearInterval(timer)
	}, [])

	const formatted = now.toLocaleDateString('id-ID', {
		weekday: 'long',
		day: '2-digit',
		month: 'long',
		year: 'numeric',
	})

	const time = now.toLocaleTimeString('id-ID', {
		hour: '2-digit',
		minute: '2-digit',
		second: '2-digit',
		hour12: false,
	})

	const date = now.toLocaleDateString('id-ID', {
		day: '2-digit',
		month: '2-digit',
		year: 'numeric',
	})

	return { now, formatted, time, date }
}

/**
 * useWeather — Custom hook untuk mengambil cuaca real-time dari Open-Meteo API.
 * Gratis, tanpa API key. Auto-refresh setiap 10 menit.
 *
 * @param {string} city — Nama kota (default: 'Jakarta')
 *
 * Returns:
 *   temp    — suhu dalam °C (number)
 *   icon    — emoji cuaca (string)
 *   desc    — deskripsi cuaca dalam Bahasa Indonesia (string)
 *   loading — boolean status loading
 *   error   — boolean apakah terjadi error (jika true, data adalah fallback)
 */
export function useWeather(city = 'Jakarta') {
	const coords = CITY_COORDS[city] ?? CITY_COORDS['Jakarta']

	const [weather, setWeather] = useState({
		temp: '--',
		icon: '🌤️',
		desc: 'Memuat...',
		loading: true,
		error: false,
	})

	useEffect(() => {
		let cancelled = false

		async function fetchWeather() {
			try {
				const url =
					`https://api.open-meteo.com/v1/forecast` +
					`?latitude=${coords.lat}&longitude=${coords.lon}` +
					`&current_weather=true`

				const res = await fetch(url)
				if (!res.ok) throw new Error('HTTP ' + res.status)
				const data = await res.json()

				if (cancelled) return

				const { temperature, weathercode } = data.current_weather
				const mapped = WMO_MAP[weathercode] ?? { icon: '🌡️', desc: 'Tidak Diketahui' }

				setWeather({
					temp: Math.round(temperature),
					icon: mapped.icon,
					desc: mapped.desc,
					loading: false,
					error: false,
				})
			} catch {
				if (!cancelled) {
					// Fallback statis agar UI tidak crash
					setWeather({
						temp: 27,
						icon: '🌤️',
						desc: 'Cerah',
						loading: false,
						error: true,
					})
				}
			}
		}

		fetchWeather()
		// Refresh setiap 10 menit
		const interval = setInterval(fetchWeather, 10 * 60 * 1000)

		return () => {
			cancelled = true
			clearInterval(interval)
		}
	}, [coords.lat, coords.lon])

	return weather
}

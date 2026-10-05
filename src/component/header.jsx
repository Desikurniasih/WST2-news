import { useState, useEffect, useRef, useMemo } from 'react'
import { FiSearch, FiX, FiBookmark } from 'react-icons/fi'
import { useDateTime, useWeather } from '../hooks/useRealtime.jsx'

const popularSearchQueries = ['Digital', 'Ekonomi', 'Kesehatan', 'Sains', 'Olahraga', 'Budaya']

function Header({
	search,
	setSearch,
	showBookmarksOnly,
	setShowBookmarksOnly,
	bookmarkedIds,
	onSelectNews,
	onSearchSubmit,
	newsItems = [], // diterima sebagai prop dari Dashboard
}) {
	const [isSearchFocused, setIsSearchFocused] = useState(false)
	const [tickerIndex, setTickerIndex] = useState(0)
	const searchContainerRef = useRef(null)

	// Realtime date & weather
	const { formatted: tanggalHari } = useDateTime()
	const weather = useWeather('Jakarta')

	// Breaking news ticker rotation
	useEffect(() => {
		const interval = setInterval(() => {
			setTickerIndex((prev) => (prev + 1) % newsItems.length)
		}, 4500)
		return () => clearInterval(interval)
	}, [])

	// Close search dropdown when clicking outside
	useEffect(() => {
		function handleClickOutside(event) {
			if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
				setIsSearchFocused(false)
			}
		}
		document.addEventListener('mousedown', handleClickOutside)
		return () => document.removeEventListener('mousedown', handleClickOutside)
	}, [])

	// Live search results for dropdown preview
	const liveSearchResults = useMemo(() => {
		if (!search.trim()) return []
		const q = search.toLowerCase().trim()
		return newsItems
			.filter((item) =>
				`${item.title} ${item.description} ${item.category} ${item.author}`
					.toLowerCase()
					.includes(q)
			)
			.slice(0, 4)
	}, [search])

	function handleSearchSubmit(e) {
		if (e) e.preventDefault()
		setIsSearchFocused(false)
		if (onSearchSubmit) onSearchSubmit()
		const target = document.getElementById('terpopuler')
		if (target) target.scrollIntoView({ behavior: 'smooth' })
	}

	function handleSelectSuggestion(term) {
		setSearch(term)
		setIsSearchFocused(false)
		const target = document.getElementById('terpopuler')
		if (target) target.scrollIntoView({ behavior: 'smooth' })
	}

	// Guard: jangan render jika newsItems masih kosong
	const tickerNews = newsItems.length > 0 ? newsItems[tickerIndex % newsItems.length] : null

	return (
		<>
			{/* Quick Glance Top Bar */}
			<div className="dashboard-top-glance">
				<div className="glance-left">
					<span className="glance-date">{tanggalHari}</span>
					<span className="glance-divider">•</span>
					<span className="glance-weather">
						{weather.loading
							? '🌤️ Memuat cuaca...'
							: `${weather.icon} Jakarta ${weather.temp}°C ${weather.desc}`
						}
					</span>
					<span className="glance-divider">•</span>
					<span className="glance-market">📈 IHSG 7.820 (+0.48%)</span>
				</div>

				<div className="glance-right">
					<button
						type="button"
						className={`bookmark-glance-btn ${showBookmarksOnly ? 'active' : ''}`}
						onClick={() => setShowBookmarksOnly(!showBookmarksOnly)}
						title="Lihat artikel tersimpan"
						aria-label="Filter artikel tersimpan"
					>
						<FiBookmark size={13} />
						<span>Disimpan ({bookmarkedIds.length})</span>
					</button>
				</div>
			</div>

			{/* Main Site Header */}
			<header className="site-header">
				<a className="brand" href="/" aria-label="Nusa kembali ke beranda">
					<span className="brand-mark">N</span>
					<span>
						NUSA<span className="brand-dot">.</span>
					</span>
				</a>

				<nav className="main-nav" aria-label="Navigasi utama">
					<a
						className={!showBookmarksOnly ? 'active' : ''}
						href="#berita"
						onClick={(e) => {
							e.preventDefault()
							setShowBookmarksOnly(false)
						}}
					>
						Berita Utama
					</a>
					<a
						className={showBookmarksOnly ? 'active' : ''}
						href="#tersimpan"
						onClick={(e) => {
							e.preventDefault()
							setShowBookmarksOnly(true)
						}}
					>
						Koleksi Saya ({bookmarkedIds.length})
					</a>
					<a href="#buletin">Buletin Nusa</a>
					<a href="#tentang">Tentang Kami</a>
				</nav>

				{/* Search with Live Dropdown */}
				<div className="header-search-wrap" ref={searchContainerRef}>
					<form className="header-search" onSubmit={handleSearchSubmit} role="search">
						<FiSearch size={14} />
						<input
							type="text"
							value={search}
							onChange={(event) => {
								setSearch(event.target.value)
								setIsSearchFocused(true)
							}}
							onFocus={() => setIsSearchFocused(true)}
							placeholder="Cari berita atau isu..."
							aria-label="Cari berita di header"
						/>
						{search && (
							<button
								type="button"
								className="clear-search-btn"
								onClick={() => {
									setSearch('')
									setIsSearchFocused(false)
								}}
								aria-label="Hapus kata kunci pencarian"
							>
								<FiX size={11} />
							</button>
						)}
						<button type="submit" className="search-submit-btn" aria-label="Kirim pencarian">
							Cari
						</button>
					</form>

					{/* Live Search Interactive Dropdown */}
					{isSearchFocused && (
						<div className="search-dropdown-menu" role="region" aria-label="Hasil pencarian langsung">
							{search.trim() ? (
								<>
									<div className="search-dropdown-header">
										<span>Hasil Pencarian ({liveSearchResults.length})</span>
										{liveSearchResults.length > 0 && (
											<button
												type="button"
												className="search-view-all-link"
												onClick={handleSearchSubmit}
											>
												Lihat Semua di Halaman ↓
											</button>
										)}
									</div>
									{liveSearchResults.length > 0 ? (
										<div className="search-dropdown-list">
											{liveSearchResults.map((item) => (
												<button
													key={item.id}
													type="button"
													className="search-dropdown-item"
													onClick={() => {
														setIsSearchFocused(false)
														onSelectNews(item)
													}}
												>
													<div className="search-item-thumb">
														<img src={item.image} alt={item.title} />
													</div>
													<div className="search-item-info">
														<span className="search-item-cat">{item.category}</span>
														<strong className="search-item-title">{item.title}</strong>
														<span className="search-item-meta">
															{item.readTime} • {item.author}
														</span>
													</div>
												</button>
											))}
										</div>
									) : (
										<div className="search-dropdown-empty">
											<p>
												Tidak ada berita ditemukan untuk <strong>"{search}"</strong>
											</p>
											<span className="search-empty-hint">
												Coba gunakan kata kunci lain seperti "teknologi", "digital", atau "ekonomi".
											</span>
										</div>
									)}
								</>
							) : (
								<div className="search-dropdown-suggestions">
									<span className="suggestions-title">💡 Rekomendasi Pencarian:</span>
									<div className="suggestions-list">
										{popularSearchQueries.map((term) => (
											<button
												key={term}
												type="button"
												className="suggestion-pill"
												onClick={() => handleSelectSuggestion(term)}
											>
												{term}
											</button>
										))}
									</div>
								</div>
							)}
						</div>
					)}
				</div>
			</header>

			{/* Breaking News Ticker - hanya tampil jika data sudah ada */}
			{tickerNews && (
				<section className="breaking-ticker-bar" aria-label="Berita terkini">
					<div className="ticker-badge">
						<span className="live-dot" aria-hidden="true" />
						<span>TERKINI</span>
					</div>
					<div className="ticker-content">
						<button
							type="button"
							className="ticker-headline"
							onClick={() => onSelectNews && onSelectNews(tickerNews)}
						>
							<span className="ticker-category">[{tickerNews.category}]</span>
							<span className="ticker-title">{tickerNews.title}</span>
							<span className="ticker-cta">Baca selengkapnya →</span>
						</button>
					</div>
				</section>
			)}
		</>
	)
}

export default Header

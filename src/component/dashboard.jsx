import { useState, useMemo, useEffect, useRef } from 'react'

export const newsItems = [
	{
		id: 1,
		category: 'Teknologi',
		title: 'Indonesia Percepat Transformasi Digital di Berbagai Sektor',
		description: 'Ekosistem digital nasional terus berkembang, membuka peluang baru bagi pelaku usaha dan masyarakat.',
		author: 'Nadia Putri',
		date: '23 Sep 2026',
		readTime: '4 min baca',
		minutes: 4,
		views: 1840,
		tag: '#TransformasiDigital',
		image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=85'
	},
	{
		id: 2,
		category: 'Ekonomi',
		title: 'Pasar Kreatif Lokal Jadi Penggerak Ekonomi Baru',
		description: 'Produk buatan anak bangsa semakin diminati dan berhasil menembus pasar regional Asia Tenggara.',
		author: 'Raka Aditya',
		date: '23 Sep 2026',
		readTime: '6 min baca',
		minutes: 6,
		views: 1420,
		tag: '#EkonomiKreatif',
		image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=900&q=85'
	},
	{
		id: 3,
		category: 'Gaya Hidup',
		title: 'Ruang Hijau Kota dan Manfaatnya untuk Kesehatan Mental',
		description: 'Kehadiran taman kota memberikan ruang istirahat yang penting di tengah ritme kehidupan yang padat.',
		author: 'Sinta Maharani',
		date: '22 Sep 2026',
		readTime: '5 min baca',
		minutes: 5,
		views: 980,
		tag: '#RuangHijau',
		image: 'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=900&q=85'
	},
	{
		id: 4,
		category: 'Sains',
		title: 'Peneliti Temukan Cara Baru Menjaga Laut Tetap Bersih',
		description: 'Inovasi material ramah lingkungan memberi harapan baru untuk mengurangi sampah plastik di lautan.',
		author: 'Fajar Nugroho',
		date: '22 Sep 2026',
		readTime: '7 min baca',
		minutes: 7,
		views: 2150,
		tag: '#InovasiLaut',
		image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=900&q=85'
	},
	{
		id: 5,
		category: 'Olahraga',
		title: 'Generasi Muda dan Semangat Baru Olahraga Nasional',
		description: 'Komunitas olahraga tumbuh di berbagai daerah dan melahirkan talenta-talenta baru yang inspiratif.',
		author: 'Dimas Ardi',
		date: '21 Sep 2026',
		readTime: '3 min baca',
		minutes: 3,
		views: 1120,
		tag: '#GenerasiEmas',
		image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=900&q=85'
	},
	{
		id: 6,
		category: 'Budaya',
		title: 'Menjaga Cerita Nusantara Lewat Generasi Digital',
		description: 'Teknologi membantu kisah, karya, dan tradisi Indonesia menemukan cara baru untuk terus hidup.',
		author: 'Alya Prameswari',
		date: '20 Sep 2026',
		readTime: '5 min baca',
		minutes: 5,
		views: 1670,
		tag: '#BudayaNusantara',
		image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=900&q=85'
	}
]

const categories = ['Semua', 'Teknologi', 'Ekonomi', 'Gaya Hidup', 'Sains', 'Olahraga', 'Budaya']
const trendingTags = [
	'#TransformasiDigital',
	'#EkonomiKreatif',
	'#RuangHijau',
	'#InovasiLaut',
	'#GenerasiEmas',
	'#BudayaNusantara'
]

function SearchIcon() {
	return (
		<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
			<circle cx="11" cy="11" r="7" />
			<path d="m21 21-4.35-4.35" />
		</svg>
	)
}

function ArrowIcon() {
	return (
		<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
			<path d="M5 12h14M13 5l7 7-7 7" />
		</svg>
	)
}

function BookmarkIcon({ filled }) {
	return (
		<svg viewBox="0 0 24 24" aria-hidden="true" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
			<path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
		</svg>
	)
}

function ShareIcon() {
	return (
		<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
			<circle cx="18" cy="5" r="3" />
			<circle cx="6" cy="12" r="3" />
			<circle cx="18" cy="19" r="3" />
			<line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
			<line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
		</svg>
	)
}

function GridViewIcon() {
	return (
		<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
			<rect x="3" y="3" width="7" height="7" rx="1" />
			<rect x="14" y="3" width="7" height="7" rx="1" />
			<rect x="14" y="14" width="7" height="7" rx="1" />
			<rect x="3" y="14" width="7" height="7" rx="1" />
		</svg>
	)
}

function ListViewIcon() {
	return (
		<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
			<line x1="8" y1="6" x2="21" y2="6" />
			<line x1="8" y1="12" x2="21" y2="12" />
			<line x1="8" y1="18" x2="21" y2="18" />
			<circle cx="4" cy="6" r="1.5" />
			<circle cx="4" cy="12" r="1.5" />
			<circle cx="4" cy="18" r="1.5" />
		</svg>
	)
}

function CheckIcon() {
	return (
		<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
			<polyline points="20 6 9 17 4 12" />
		</svg>
	)
}

function Dashboard({ onSelectNews }) {
	const [activeCategory, setActiveCategory] = useState('Semua')
	const [search, setSearch] = useState('')
	const [sortBy, setSortBy] = useState('latest') // 'latest' | 'readTime' | 'popular'
	const [viewMode, setViewMode] = useState('grid') // 'grid' | 'list'
	const [activeTag, setActiveTag] = useState(null)
	const [bookmarkedIds, setBookmarkedIds] = useState([1, 4])
	const [showBookmarksOnly, setShowBookmarksOnly] = useState(false)
	const [toast, setToast] = useState(null)
	const [newsletterEmail, setNewsletterEmail] = useState('')
	const [subscribed, setSubscribed] = useState(false)

	// Breaking News Ticker index
	const [tickerIndex, setTickerIndex] = useState(0)

	useEffect(() => {
		const interval = setInterval(() => {
			setTickerIndex((prev) => (prev + 1) % newsItems.length)
		}, 4500)
		return () => clearInterval(interval)
	}, [])

	const [isSearchFocused, setIsSearchFocused] = useState(false)
	const searchContainerRef = useRef(null)

	const popularSearchQueries = ['Digital', 'Ekonomi', 'Kesehatan', 'Sains', 'Olahraga', 'Budaya']

	// Close search dropdown on click outside
	useEffect(() => {
		function handleClickOutside(event) {
			if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
				setIsSearchFocused(false)
			}
		}
		document.addEventListener('mousedown', handleClickOutside)
		return () => document.removeEventListener('mousedown', handleClickOutside)
	}, [])

	// Live search matches for dropdown preview
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
		const target = document.getElementById('terpopuler')
		if (target) {
			target.scrollIntoView({ behavior: 'smooth' })
		}
	}

	function handleSelectSuggestion(term) {
		setSearch(term)
		setIsSearchFocused(false)
		const target = document.getElementById('terpopuler')
		if (target) {
			target.scrollIntoView({ behavior: 'smooth' })
		}
	}

	function showToast(msg) {
		setToast(msg)
	}

	function toggleBookmark(e, newsId) {
		e.stopPropagation()
		if (bookmarkedIds.includes(newsId)) {
			setBookmarkedIds(bookmarkedIds.filter((id) => id !== newsId))
			showToast('Artikel dihapus dari daftar simpan')
		} else {
			setBookmarkedIds([...bookmarkedIds, newsId])
			showToast('Artikel disimpan ke daftar bacaan 📌')
		}
	}

	function handleShareCard(e, news) {
		e.stopPropagation()
		if (navigator.clipboard) {
			navigator.clipboard.writeText(window.location.origin)
			showToast(`Tautan "${news.title.slice(0, 30)}..." disalin! 📋`)
		} else {
			showToast('Tautan siap dibagikan!')
		}
	}

	function handleNewsletterSubmit(e) {
		e.preventDefault()
		if (!newsletterEmail.trim()) return
		setSubscribed(true)
		setNewsletterEmail('')
		showToast('Berhasil terdaftar ke Kurasi Nusa Pagi! ✉️')
	}

	// Filter & Sort Logic
	const filteredNews = useMemo(() => {
		const query = search.toLowerCase().trim()
		let list = newsItems.filter((news) => {
			const matchesCategory =
				activeCategory === 'Semua' || news.category === activeCategory
			const matchesTag = !activeTag || news.tag === activeTag
			const matchesSearch =
				!query ||
				`${news.title} ${news.description} ${news.category} ${news.author}`
					.toLowerCase()
					.includes(query)
			const matchesBookmark = !showBookmarksOnly || bookmarkedIds.includes(news.id)

			return matchesCategory && matchesTag && matchesSearch && matchesBookmark
		})

		// Sort
		if (sortBy === 'readTime') {
			list = [...list].sort((a, b) => a.minutes - b.minutes)
		} else if (sortBy === 'popular') {
			list = [...list].sort((a, b) => b.views - a.views)
		} else {
			// latest (id desc)
			list = [...list].sort((a, b) => b.id - a.id)
		}

		return list
	}, [activeCategory, activeTag, search, showBookmarksOnly, bookmarkedIds, sortBy])

	const tickerNews = newsItems[tickerIndex]

	return (
		<main className="news-dashboard">
			{/* Quick Glance Top Bar (Date, Weather, Markets) */}
			<div className="dashboard-top-glance">
				<div className="glance-left">
					<span className="glance-date">Rabu, 23 September 2026</span>
					<span className="glance-divider">•</span>
					<span className="glance-weather">⛅ Jakarta 29°C Cerah Berawan</span>
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
						<BookmarkIcon filled={bookmarkedIds.length > 0} />
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

				<div className="header-search-wrap" ref={searchContainerRef}>
					<form className="header-search" onSubmit={handleSearchSubmit} role="search">
						<SearchIcon />
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
								✕
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
														<span className="search-item-meta">{item.readTime} • {item.author}</span>
													</div>
												</button>
											))}
										</div>
									) : (
										<div className="search-dropdown-empty">
											<p>Tidak ada berita ditemukan untuk <strong>"{search}"</strong></p>
											<span className="search-empty-hint">Coba gunakan kata kunci lain seperti "teknologi", "digital", atau "ekonomi".</span>
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

			{/* Breaking News Ticker */}
			<section className="breaking-ticker-bar" aria-label="Berita terkini">
				<div className="ticker-badge">
					<span className="live-dot" aria-hidden="true" />
					<span>TERKINI</span>
				</div>
				<div className="ticker-content">
					<button
						type="button"
						className="ticker-headline"
						onClick={() => onSelectNews(tickerNews)}
					>
						<span className="ticker-category">[{tickerNews.category}]</span>
						<span className="ticker-title">{tickerNews.title}</span>
						<span className="ticker-cta">Baca selengkapnya →</span>
					</button>
				</div>
			</section>

			{/* Dashboard Intro & Editorial Highlights */}
			<section className="dashboard-intro" id="berita">
				<div className="intro-left">
					<p className="eyebrow">Edisi Jurnal Harian • 23 September 2026</p>
					<h1>
						Berita hari ini,<br />
						<em>untuk kamu.</em>
					</h1>
					<p className="intro-copy">
						Ikuti liputan mendalam dari Indonesia dan lanskap global, dikurasi dengan jernih,
						berbobot, dan menginspirasi langkah nyata.
					</p>

					{/* Editorial Pulse Metrics */}
					<div className="editorial-pulse-row">
						<div className="pulse-item">
							<strong>{newsItems.length}</strong>
							<span>Liputan Pilihan</span>
						</div>
						<div className="pulse-item">
							<strong>5 Menit</strong>
							<span>Rata-rata Waktu Baca</span>
						</div>
						<div className="pulse-item">
							<strong>100%</strong>
							<span>Fakta Terverifikasi</span>
						</div>
						<div className="pulse-item">
							<strong>{categories.length - 1}</strong>
							<span>Kategori Analisis</span>
						</div>
					</div>
				</div>

				<div className="intro-right">
					<div className="daily-note">
						<span className="note-line" />
						<p>“Informasi yang baik memberi kita perspektif dan ketenangan untuk melangkah lebih jauh.”</p>
						<span className="note-source">Dewan Redaksi NUSA</span>
					</div>

					{/* Quick Hero Spotlight */}
					<div
						className="quick-spotlight-card"
						onClick={() => onSelectNews(newsItems[0])}
						role="button"
						tabIndex="0"
						onKeyDown={(e) => e.key === 'Enter' && onSelectNews(newsItems[0])}
					>
						<span className="spotlight-tag">⭐ Sorotan Redaksi</span>
						<h4>{newsItems[0].title}</h4>
						<span className="spotlight-read">{newsItems[0].readTime} • Oleh {newsItems[0].author}</span>
					</div>
				</div>
			</section>

			{/* Trending Topics Clickable Cloud */}
			<section className="trending-tags-section" aria-label="Topik terhangat">
				<span className="trending-label">🔥 Topik Hangat:</span>
				<div className="trending-pills">
					<button
						type="button"
						className={`trending-pill ${!activeTag ? 'active' : ''}`}
						onClick={() => setActiveTag(null)}
					>
						Semua Topik
					</button>
					{trendingTags.map((tag) => (
						<button
							key={tag}
							type="button"
							className={`trending-pill ${activeTag === tag ? 'active' : ''}`}
							onClick={() => setActiveTag(activeTag === tag ? null : tag)}
						>
							{tag}
						</button>
					))}
				</div>
			</section>

			{/* News Toolbar & Filters */}
			<section className="news-toolbar" aria-label="Penyaring dan pengatur berita">
				<div className="category-list" role="tablist" aria-label="Kategori berita">
					{categories.map((category) => (
						<button
							className={
								activeCategory === category && !showBookmarksOnly
									? 'category active'
									: 'category'
							}
							key={category}
							onClick={() => {
								setActiveCategory(category)
								setShowBookmarksOnly(false)
							}}
							role="tab"
							aria-selected={activeCategory === category && !showBookmarksOnly}
							type="button"
						>
							{category}
						</button>
					))}
					<button
						className={showBookmarksOnly ? 'category active bookmarks-tab' : 'category bookmarks-tab'}
						onClick={() => setShowBookmarksOnly(!showBookmarksOnly)}
						role="tab"
						aria-selected={showBookmarksOnly}
						type="button"
					>
						📌 Disimpan ({bookmarkedIds.length})
					</button>
				</div>

				{/* Right View & Sort Controls */}
				<div className="toolbar-controls">
					{/* Quick Search in Toolbar */}
					<div className="toolbar-search-box">
						<SearchIcon />
						<input
							type="text"
							value={search}
							onChange={(e) => setSearch(e.target.value)}
							placeholder="Cari berita..."
							aria-label="Cari berita di toolbar"
						/>
						{search && (
							<button
								type="button"
								className="clear-search-btn"
								onClick={() => setSearch('')}
								aria-label="Hapus kata kunci pencarian"
							>
								✕
							</button>
						)}
					</div>

					{/* Sort Selector */}
					<div className="sort-selector" role="group" aria-label="Urutkan berita">
						<span className="sort-label">Urutkan:</span>
						<button
							type="button"
							className={`sort-btn ${sortBy === 'latest' ? 'active' : ''}`}
							onClick={() => setSortBy('latest')}
							title="Urutkan terbaru"
						>
							Terbaru
						</button>
						<button
							type="button"
							className={`sort-btn ${sortBy === 'popular' ? 'active' : ''}`}
							onClick={() => setSortBy('popular')}
							title="Urutkan terpopuler"
						>
							Populer
						</button>
						<button
							type="button"
							className={`sort-btn ${sortBy === 'readTime' ? 'active' : ''}`}
							onClick={() => setSortBy('readTime')}
							title="Urutkan waktu baca tercepat"
						>
							Waktu Baca
						</button>
					</div>

					{/* View Mode Toggle */}
					<div className="view-mode-toggle" role="group" aria-label="Ganti mode tampilan">
						<button
							type="button"
							className={viewMode === 'grid' ? 'active' : ''}
							onClick={() => setViewMode('grid')}
							title="Tampilan Grid"
							aria-label="Tampilan Grid"
						>
							<GridViewIcon />
						</button>
						<button
							type="button"
							className={viewMode === 'list' ? 'active' : ''}
							onClick={() => setViewMode('list')}
							title="Tampilan List / Editorial"
							aria-label="Tampilan List"
						>
							<ListViewIcon />
						</button>
					</div>
				</div>
			</section>

			{/* Main Articles Listing Section */}
			<section className="news-section" id="terpopuler">
				<div className="section-heading">
					<div>
						<p className="eyebrow">
							{showBookmarksOnly
								? 'Koleksi Artikel Tersimpan'
								: activeTag
								? `Hasil Topik: ${activeTag}`
								: activeCategory !== 'Semua'
								? `Kategori: ${activeCategory}`
								: 'Pilihan Redaksi NUSA'}
						</p>
						<h2>
							{showBookmarksOnly
								? 'Daftar Bacaan Kamu'
								: search
								? `Pencarian: "${search}"`
								: 'Arsip Liputan Utama'}
						</h2>
					</div>
					<div className="heading-meta">
						<span className="result-count">{filteredNews.length} artikel tersedia</span>
						{(search || activeTag || showBookmarksOnly || activeCategory !== 'Semua') && (
							<button
								type="button"
								className="reset-filters-btn"
								onClick={() => {
									setSearch('')
									setActiveCategory('Semua')
									setActiveTag(null)
									setShowBookmarksOnly(false)
								}}
							>
								Reset Filter ↺
							</button>
						)}
					</div>
				</div>

				{/* GRID VIEW MODE */}
				{viewMode === 'grid' && (
					<div className="news-grid">
						{filteredNews.map((news, index) => {
							const isFeatured = index === 0 && !search && !showBookmarksOnly && activeCategory === 'Semua'
							const isBookmarked = bookmarkedIds.includes(news.id)

							return (
								<article
									className={`news-card ${isFeatured ? 'featured' : ''}`}
									key={news.id}
									onClick={() => onSelectNews(news)}
									onKeyDown={(event) => event.key === 'Enter' && onSelectNews(news)}
									role="button"
									tabIndex="0"
								>
									<div className="image-wrap">
										<img src={news.image} alt={news.title} loading="lazy" />
										<span className="card-category">{news.category}</span>
										{isFeatured && <span className="featured-badge">⭐ Liputan Utama</span>}

										{/* Floating Quick Action Buttons on Image */}
										<div className="card-floating-actions">
											<button
												type="button"
												className={`card-action-icon ${isBookmarked ? 'bookmarked' : ''}`}
												onClick={(e) => toggleBookmark(e, news.id)}
												title={isBookmarked ? 'Hapus simpanan' : 'Simpan artikel ini'}
												aria-label="Simpan artikel"
											>
												<BookmarkIcon filled={isBookmarked} />
											</button>
											<button
												type="button"
												className="card-action-icon"
												onClick={(e) => handleShareCard(e, news)}
												title="Salin tautan artikel"
												aria-label="Salin tautan"
											>
												<ShareIcon />
											</button>
										</div>
									</div>

									<div className="card-content">
										<div className="card-meta">
											<span>{news.date}</span>
											<span>{news.readTime}</span>
											<span className="views-pill">👁️ {news.views}</span>
										</div>

										<h3>{news.title}</h3>
										<p>{news.description}</p>

										<div className="card-footer">
											<div className="card-author-info">
												<span className="author-bullet" aria-hidden="true" />
												<span className="author">
													Oleh <strong>{news.author}</strong>
												</span>
											</div>

											<button
												className="read-more"
												type="button"
												aria-label={`Baca ${news.title}`}
												onClick={(event) => {
													event.stopPropagation()
													onSelectNews(news)
												}}
											>
												<ArrowIcon />
											</button>
										</div>
									</div>
								</article>
							)
						})}
					</div>
				)}

				{/* LIST / EDITORIAL VIEW MODE */}
				{viewMode === 'list' && (
					<div className="news-list-view">
						{filteredNews.map((news, index) => {
							const isBookmarked = bookmarkedIds.includes(news.id)

							return (
								<article
									className="news-list-row"
									key={news.id}
									onClick={() => onSelectNews(news)}
									onKeyDown={(event) => event.key === 'Enter' && onSelectNews(news)}
									role="button"
									tabIndex="0"
								>
									<span className="list-index">0{index + 1}</span>

									<div className="list-thumb">
										<img src={news.image} alt={news.title} loading="lazy" />
									</div>

									<div className="list-main">
										<div className="list-meta">
											<span className="list-category">{news.category}</span>
											<span className="meta-dot">•</span>
											<span>{news.date}</span>
											<span className="meta-dot">•</span>
											<span>{news.readTime}</span>
											<span className="meta-dot">•</span>
											<span className="list-tag">{news.tag}</span>
										</div>

										<h3 className="list-title">{news.title}</h3>
										<p className="list-description">{news.description}</p>

										<div className="list-author">
											<span>Penulis: <strong>{news.author}</strong></span>
										</div>
									</div>

									<div className="list-actions" onClick={(e) => e.stopPropagation()}>
										<button
											type="button"
											className={`action-btn-sm ${isBookmarked ? 'active' : ''}`}
											onClick={(e) => toggleBookmark(e, news.id)}
											title={isBookmarked ? 'Tersimpan' : 'Simpan'}
										>
											<BookmarkIcon filled={isBookmarked} />
										</button>
										<button
											type="button"
											className="action-btn-sm"
											onClick={(e) => handleShareCard(e, news)}
											title="Bagikan"
										>
											<ShareIcon />
										</button>
										<button
											type="button"
											className="read-more-list"
											onClick={() => onSelectNews(news)}
											aria-label="Baca artikel"
										>
											<ArrowIcon />
										</button>
									</div>
								</article>
							)
						})}
					</div>
				)}

				{/* Empty State */}
				{filteredNews.length === 0 && (
					<div className="empty-state-box">
						<div className="empty-icon">📰</div>
						<h3>Tidak ada berita yang sesuai</h3>
						<p>
							{showBookmarksOnly
								? 'Kamu belum memiliki artikel yang disimpan. Klik ikon bookmark pada kartu berita untuk menyimpannya di sini.'
								: 'Cobalah mengganti kata kunci pencarian atau memilih kategori lain.'}
						</p>
						<button
							type="button"
							className="empty-reset-btn"
							onClick={() => {
								setSearch('')
								setActiveCategory('Semua')
								setActiveTag(null)
								setShowBookmarksOnly(false)
							}}
						>
							Lihat Semua Berita ↺
						</button>
					</div>
				)}
			</section>

			{/* Newsletter Subscription Banner */}
			<section className="dashboard-newsletter-banner" id="buletin">
				<div className="newsletter-banner-inner">
					<div className="banner-copy">
						<span className="banner-badge">BULETIN PAGI NUSA</span>
						<h2>Jadikan pagi harimu lebih bermakna.</h2>
						<p>
							Dapatkan kurasi berita penting dan gagasan mendalam langsung di emailmu setiap hari kerja
							pukul 07.00 WIB. Tanpa spam, selalu terkurasi.
						</p>
					</div>

					<div className="banner-action">
						{subscribed ? (
							<div className="banner-subscribed">
								<CheckIcon />
								<span>Terima kasih! Kamu telah terdaftar dalam buletin Nusa.</span>
							</div>
						) : (
							<form className="banner-form" onSubmit={handleNewsletterSubmit}>
								<input
									type="email"
									placeholder="Masukkan alamat email kamu..."
									value={newsletterEmail}
									onChange={(e) => setNewsletterEmail(e.target.value)}
									required
									aria-label="Alamat email untuk berlangganan buletin"
								/>
								<button type="submit">Langganan Gratis ↗</button>
							</form>
						)}
					</div>
				</div>
			</section>

			{/* Footer */}
			<footer id="tentang">
				<span>NUSA.</span>
				<span>Jurnal harian untuk pikiran yang terbuka.</span>
				<span>© 2026 Nusa Media Nusantara</span>
			</footer>

			{/* Floating Toast Notification */}
			{toast && (
				<div className="toast-notification" role="status" aria-live="polite">
					<span>{toast}</span>
				</div>
			)}
		</main>
	)
}

export default Dashboard
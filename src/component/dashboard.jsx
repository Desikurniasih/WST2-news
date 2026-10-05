import { useState, useMemo } from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import {
	FiArrowRight,
	FiBookmark,
	FiShare2,
	FiGrid,
	FiList,
	FiCheck,
	FiSearch,
	FiX,
	FiRefreshCw,
	FiAlertCircle,
} from 'react-icons/fi'
import Header from './header'
import { useNews } from '../hooks/useNews.jsx'
import { useDateTime } from '../hooks/useRealtime.jsx'

const categories = ['Semua', 'Teknologi', 'Ekonomi', 'Gaya Hidup', 'Sains', 'Olahraga', 'Budaya']
const trendingTags = [
	'#TransformasiDigital',
	'#EkonomiKreatif',
	'#RuangHijau',
	'#InovasiLaut',
	'#GenerasiEmas',
	'#BudayaNusantara',
]

function NewsCardSkeleton() {
	return (
		<div className="news-card">
			<Skeleton height={195} borderRadius={6} />
			<div className="card-content">
				<Skeleton width="60%" height={10} style={{ marginTop: 16, marginBottom: 8 }} />
				<Skeleton count={2} height={14} style={{ marginBottom: 4 }} />
				<Skeleton width="80%" height={12} style={{ marginTop: 8 }} />
				<div className="card-footer" style={{ marginTop: 16, borderTop: '1px solid #dce1d8', paddingTop: 13 }}>
					<Skeleton width={80} height={11} />
					<Skeleton circle width={30} height={30} />
				</div>
			</div>
		</div>
	)
}

function Dashboard({ onSelectNews }) {
	const [activeCategory, setActiveCategory] = useState('Semua')
	const [search, setSearch] = useState('')
	const [sortBy, setSortBy] = useState('latest')
	const [viewMode, setViewMode] = useState('grid')
	const [activeTag, setActiveTag] = useState(null)
	const [bookmarkedIds, setBookmarkedIds] = useState([])
	const [showBookmarksOnly, setShowBookmarksOnly] = useState(false)
	const [toast, setToast] = useState(null)
	const [newsletterEmail, setNewsletterEmail] = useState('')
	const [subscribed, setSubscribed] = useState(false)

	const { formatted: tanggalHari } = useDateTime()

	// ─── Fetch berita dari NewsAPI (dengan axios) ──────────────────────────────
	const { newsItems, loading, error, usingFallback } = useNews()

	function showToast(msg) {
		setToast(msg)
		setTimeout(() => setToast(null), 3000)
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

	// ─── Filter & Sort Logic ───────────────────────────────────────────────────
	const filteredNews = useMemo(() => {
		const query = search.toLowerCase().trim()
		let list = newsItems.filter((news) => {
			const matchesCategory = activeCategory === 'Semua' || news.category === activeCategory
			const matchesTag = !activeTag || news.tag === activeTag
			const matchesSearch =
				!query ||
				`${news.title} ${news.description} ${news.category} ${news.author}`
					.toLowerCase()
					.includes(query)
			const matchesBookmark = !showBookmarksOnly || bookmarkedIds.includes(news.id)
			return matchesCategory && matchesTag && matchesSearch && matchesBookmark
		})

		if (sortBy === 'readTime') {
			list = [...list].sort((a, b) => a.minutes - b.minutes)
		} else if (sortBy === 'popular') {
			list = [...list].sort((a, b) => b.views - a.views)
		} else {
			list = [...list].sort((a, b) => b.id - a.id)
		}

		return list
	}, [newsItems, activeCategory, activeTag, search, showBookmarksOnly, bookmarkedIds, sortBy])

	return (
		<main className="news-dashboard">
			<Header
				search={search}
				setSearch={setSearch}
				showBookmarksOnly={showBookmarksOnly}
				setShowBookmarksOnly={setShowBookmarksOnly}
				bookmarkedIds={bookmarkedIds}
				onSelectNews={onSelectNews}
				newsItems={newsItems}
			/>

			{/* Dashboard Intro & Editorial Highlights */}
			<section className="dashboard-intro" id="berita">
				<div className="intro-left">
					<p className="eyebrow">Edisi Jurnal Harian • {tanggalHari}</p>
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
							<strong>{loading ? <Skeleton width={30} /> : newsItems.length}</strong>
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
						<p>"Informasi yang baik memberi kita perspektif dan ketenangan untuk melangkah lebih jauh."</p>
						<span className="note-source">Dewan Redaksi NUSA</span>
					</div>

					{/* Quick Hero Spotlight */}
					{loading ? (
						<div className="quick-spotlight-card">
							<Skeleton width="40%" height={10} />
							<Skeleton count={2} height={14} style={{ marginTop: 8 }} />
							<Skeleton width="60%" height={11} style={{ marginTop: 8 }} />
						</div>
					) : newsItems.length > 0 ? (
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
					) : null}
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
					<div className="toolbar-search-box">
						<FiSearch size={13} />
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
								<FiX size={11} />
							</button>
						)}
					</div>

					<div className="sort-selector" role="group" aria-label="Urutkan berita">
						<span className="sort-label">Urutkan:</span>
						<button type="button" className={`sort-btn ${sortBy === 'latest' ? 'active' : ''}`} onClick={() => setSortBy('latest')}>Terbaru</button>
						<button type="button" className={`sort-btn ${sortBy === 'popular' ? 'active' : ''}`} onClick={() => setSortBy('popular')}>Populer</button>
						<button type="button" className={`sort-btn ${sortBy === 'readTime' ? 'active' : ''}`} onClick={() => setSortBy('readTime')}>Waktu Baca</button>
					</div>

					<div className="view-mode-toggle" role="group" aria-label="Ganti mode tampilan">
						<button type="button" className={viewMode === 'grid' ? 'active' : ''} onClick={() => setViewMode('grid')} title="Tampilan Grid" aria-label="Tampilan Grid">
							<FiGrid size={15} />
						</button>
						<button type="button" className={viewMode === 'list' ? 'active' : ''} onClick={() => setViewMode('list')} title="Tampilan List" aria-label="Tampilan List">
							<FiList size={15} />
						</button>
					</div>
				</div>
			</section>

			{/* Main Articles Listing Section */}
			<section className="news-section" id="terpopuler">
				<div className="section-heading">
					<div>
						<p className="eyebrow">
							{showBookmarksOnly ? 'Koleksi Artikel Tersimpan'
								: activeTag ? `Hasil Topik: ${activeTag}`
								: activeCategory !== 'Semua' ? `Kategori: ${activeCategory}`
								: 'Pilihan Redaksi NUSA'}
						</p>
						<h2>
							{showBookmarksOnly ? 'Daftar Bacaan Kamu'
								: search ? `Pencarian: "${search}"`
								: 'Arsip Liputan Utama'}
						</h2>
					</div>
					<div className="heading-meta">
						{loading
							? <Skeleton width={120} height={12} />
							: <span className="result-count">{filteredNews.length} artikel tersedia</span>
						}
						{!loading && (search || activeTag || showBookmarksOnly || activeCategory !== 'Semua') && (
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

				{/* ── LOADING STATE: Skeleton Cards ── */}
				{loading && (
					<div className="news-grid">
						{Array.from({ length: 6 }).map((_, i) => (
							<NewsCardSkeleton key={i} />
						))}
					</div>
				)}

				{/* ── ERROR STATE ── */}
				{!loading && error && usingFallback && (
					<div className="api-error-notice">
						<FiAlertCircle size={16} />
						<span>Tidak dapat terhubung ke NewsAPI: <em>{error}</em>. Menampilkan data lokal.</span>
					</div>
				)}

				{/* ── GRID VIEW MODE ── */}
				{!loading && viewMode === 'grid' && (
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
										<img src={news.image} alt={news.title} loading="lazy"
											onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=900&q=85' }}
										/>
										<span className="card-category">{news.category}</span>
										{isFeatured && <span className="featured-badge">⭐ Liputan Utama</span>}
										<div className="card-floating-actions">
											<button
												type="button"
												className={`card-action-icon ${isBookmarked ? 'bookmarked' : ''}`}
												onClick={(e) => toggleBookmark(e, news.id)}
												title={isBookmarked ? 'Hapus simpanan' : 'Simpan artikel ini'}
												aria-label="Simpan artikel"
											>
												<FiBookmark size={14} fill={isBookmarked ? 'currentColor' : 'none'} />
											</button>
											<button
												type="button"
												className="card-action-icon"
												onClick={(e) => handleShareCard(e, news)}
												title="Salin tautan artikel"
												aria-label="Salin tautan"
											>
												<FiShare2 size={14} />
											</button>
										</div>
									</div>

									<div className="card-content">
										<div className="card-meta">
											<span>{news.date}</span>
											<span>{news.readTime}</span>
											<span className="views-pill">👁️ {news.views.toLocaleString('id')}</span>
										</div>
										<h3>{news.title}</h3>
										<p>{news.description}</p>
										<div className="card-footer">
											<div className="card-author-info">
												<span className="author-bullet" aria-hidden="true" />
												<span className="author">Oleh <strong>{news.author}</strong></span>
											</div>
											<button
												className="read-more"
												type="button"
												aria-label={`Baca ${news.title}`}
												onClick={(event) => { event.stopPropagation(); onSelectNews(news) }}
											>
												<FiArrowRight size={14} />
											</button>
										</div>
									</div>
								</article>
							)
						})}
					</div>
				)}

				{/* ── LIST VIEW MODE ── */}
				{!loading && viewMode === 'list' && (
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
										<img src={news.image} alt={news.title} loading="lazy"
											onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=900&q=85' }}
										/>
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
										<button type="button" className={`action-btn-sm ${isBookmarked ? 'active' : ''}`} onClick={(e) => toggleBookmark(e, news.id)} title={isBookmarked ? 'Tersimpan' : 'Simpan'}>
											<FiBookmark size={15} fill={isBookmarked ? 'currentColor' : 'none'} />
										</button>
										<button type="button" className="action-btn-sm" onClick={(e) => handleShareCard(e, news)} title="Bagikan">
											<FiShare2 size={15} />
										</button>
										<button type="button" className="read-more-list" onClick={() => onSelectNews(news)} aria-label="Baca artikel">
											<FiArrowRight size={14} />
										</button>
									</div>
								</article>
							)
						})}
					</div>
				)}

				{/* ── Empty State ── */}
				{!loading && filteredNews.length === 0 && (
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
								<FiCheck size={18} />
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
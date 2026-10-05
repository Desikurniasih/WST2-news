import axios from 'axios'

// ─── NewsAPI via Vite Dev Proxy ────────────────────────────────────────────────
// Vite meneruskan /api/news/* → https://newsapi.org/v2/* (server-side, no CORS)
// Konfigurasi proxy ada di vite.config.js
const API_KEY = import.meta.env.VITE_NEWS_API_KEY

const newsApiClient = axios.create({
	baseURL: '/api/news',
	params: { apiKey: API_KEY },
})

// ─── Helpers ──────────────────────────────────────────────────────────────────

function detectCategory(article) {
	const text = `${article.title ?? ''} ${article.description ?? ''}`.toLowerCase()
	if (/ekonomi|bisnis|pasar|saham|ihsg|rupiah|inflasi|investasi/.test(text)) return 'Ekonomi'
	if (/teknologi|digital|ai|startup|aplikasi|internet|software|robot/.test(text)) return 'Teknologi'
	if (/olahraga|sepak bola|basket|badminton|atletik|olimpiade|sea games/.test(text)) return 'Olahraga'
	if (/sains|penelitian|ilmu|riset|medis|vaksin|virus|iklim|lingkungan/.test(text)) return 'Sains'
	if (/budaya|seni|film|musik|tradisi|pameran|teater|wayang/.test(text)) return 'Budaya'
	if (/gaya hidup|kuliner|kesehatan|fashion|wisata|travel|lifestyle/.test(text)) return 'Gaya Hidup'
	return 'Teknologi'
}

function estimateReadTime(text = '') {
	const words = text.trim().split(/\s+/).length
	const minutes = Math.max(2, Math.round(words / 200))
	return { readTime: `${minutes} min baca`, minutes }
}

const categoryTagMap = {
	Teknologi: '#TransformasiDigital',
	Ekonomi: '#EkonomiKreatif',
	Olahraga: '#GenerasiEmas',
	Sains: '#InovasiLaut',
	Budaya: '#BudayaNusantara',
	'Gaya Hidup': '#RuangHijau',
}

function formatDate(isoDate) {
	if (!isoDate) return '-'
	return new Date(isoDate).toLocaleDateString('id-ID', {
		day: '2-digit',
		month: 'short',
		year: 'numeric',
	})
}

// NewsAPI article: { title, description, author, publishedAt, urlToImage, source }
function mapArticle(article, index) {
	const category = detectCategory(article)
	const { readTime, minutes } = estimateReadTime(article.description)
	return {
		id: index + 1,
		category,
		title: article.title?.replace(/ - .*$/, '') || 'Tanpa Judul',
		description: article.description || 'Tidak ada deskripsi.',
		author: article.author || article.source?.name || 'Redaksi NUSA',
		date: formatDate(article.publishedAt),
		readTime,
		minutes,
		views: Math.floor(Math.random() * 2000) + 500,
		tag: categoryTagMap[category] || '#BeritaHarian',
		image: article.urlToImage || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=900&q=85',
		url: article.url || '#',
	}
}

// ─── Fetch berita terkini Indonesia via proxy ─────────────────────────────────
// NewsAPI free plan tidak mendukung country=id, gunakan endpoint 'everything'
// dengan kata kunci terkait Indonesia agar tetap relevan
export async function fetchTopHeadlines(pageSize = 12) {
	const response = await newsApiClient.get('/everything', {
		params: {
			q: 'indonesia OR teknologi OR ekonomi OR "asia tenggara"',
			language: 'en',
			sortBy: 'publishedAt',
			pageSize,
		},
	})
	const articles = (response.data?.articles ?? []).filter(
		(a) => a.title && a.title !== '[Removed]' && a.urlToImage
	)
	return articles.map(mapArticle)
}

// ─── Fetch berita berdasarkan query pencarian via proxy ───────────────────────
export async function fetchEverything(query, pageSize = 12) {
	const response = await newsApiClient.get('/everything', {
		params: {
			q: query,
			language: 'id',
			sortBy: 'publishedAt',
			pageSize,
		},
	})
	const articles = (response.data?.articles ?? []).filter(
		(a) => a.title && a.title !== '[Removed]'
	)
	return articles.map(mapArticle)
}

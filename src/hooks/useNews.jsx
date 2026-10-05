import { useState, useEffect } from 'react'
import { fetchTopHeadlines } from '../services/newsApi'

// ─── Fallback data lokal jika API tidak tersedia ───────────────────────────
const fallbackNews = [
	{
		id: 1,
		category: 'Teknologi',
		title: 'Revolusi AI Mengubah Cara Dunia Bekerja',
		description:
			'Kecerdasan buatan kini merambah ke berbagai sektor industri, dari manufaktur hingga layanan kesehatan, mendorong efisiensi dan inovasi yang belum pernah ada sebelumnya.',
		author: 'Redaksi NUSA',
		date: '05 Okt 2026',
		readTime: '4 min baca',
		minutes: 4,
		views: 1842,
		tag: '#TransformasiDigital',
		image: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?auto=format&fit=crop&w=900&q=85',
		url: '#',
	},
	{
		id: 2,
		category: 'Ekonomi',
		title: 'IHSG Tembus Level Tertinggi Sepanjang Sejarah',
		description:
			'Indeks Harga Saham Gabungan melonjak signifikan didorong aliran modal asing yang kuat dan optimisme investor terhadap fundamental ekonomi Indonesia.',
		author: 'Tim Ekonomi NUSA',
		date: '05 Okt 2026',
		readTime: '3 min baca',
		minutes: 3,
		views: 2310,
		tag: '#EkonomiKreatif',
		image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=900&q=85',
		url: '#',
	},
	{
		id: 3,
		category: 'Sains',
		title: 'Peneliti Indonesia Temukan Vaksin Baru untuk Penyakit Tropis',
		description:
			'Tim ilmuwan dari Universitas Indonesia berhasil mengembangkan vaksin inovatif yang efektif melawan beberapa penyakit tropis endemik di Asia Tenggara.',
		author: 'Desi Kurniasih',
		date: '04 Okt 2026',
		readTime: '5 min baca',
		minutes: 5,
		views: 987,
		tag: '#InovasiLaut',
		image: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=900&q=85',
		url: '#',
	},
	{
		id: 4,
		category: 'Olahraga',
		title: 'Timnas Indonesia Lolos ke Final Piala AFF 2026',
		description:
			'Garuda Muda tampil luar biasa mengalahkan Vietnam dengan skor telak 3-1 dan memastikan tiket final Piala AFF untuk pertama kalinya dalam satu dekade terakhir.',
		author: 'Sport Desk NUSA',
		date: '04 Okt 2026',
		readTime: '3 min baca',
		minutes: 3,
		views: 5621,
		tag: '#GenerasiEmas',
		image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=900&q=85',
		url: '#',
	},
	{
		id: 5,
		category: 'Budaya',
		title: 'Batik Nusantara Tampil di Panggung Mode Paris',
		description:
			'Desainer muda asal Yogyakarta sukses memperkenalkan motif batik kontemporer dalam pekan mode bergengsi Paris Fashion Week, memukau para kritikus fesyen dunia.',
		author: 'Seni & Budaya NUSA',
		date: '03 Okt 2026',
		readTime: '4 min baca',
		minutes: 4,
		views: 1130,
		tag: '#BudayaNusantara',
		image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=900&q=85',
		url: '#',
	},
	{
		id: 6,
		category: 'Gaya Hidup',
		title: 'Tren Wisata Alam Ramah Lingkungan Meningkat Pesat',
		description:
			'Wisata eko-turisme di destinasi alami Indonesia semakin diminati generasi muda yang peduli lingkungan, mendorong pertumbuhan ekonomi lokal secara berkelanjutan.',
		author: 'Lifestyle NUSA',
		date: '03 Okt 2026',
		readTime: '3 min baca',
		minutes: 3,
		views: 874,
		tag: '#RuangHijau',
		image: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=900&q=85',
		url: '#',
	},
]

/**
 * useNews — Custom hook untuk mengambil data berita dari NewsAPI.
 *
 * @param {number} pageSize — jumlah artikel yang diambil (default: 12)
 *
 * Returns:
 *   newsItems     — array artikel yang sudah diformat
 *   loading       — boolean status loading
 *   error         — pesan error (string | null)
 *   usingFallback — true jika data berasal dari fallback lokal
 *   refresh       — fungsi untuk memuat ulang berita
 */
export function useNews(pageSize = 12) {
	const [newsItems, setNewsItems] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)
	const [usingFallback, setUsingFallback] = useState(false)

	async function loadNews() {
		setLoading(true)
		setError(null)
		setUsingFallback(false)

		try {
			const articles = await fetchTopHeadlines(pageSize)
			if (articles && articles.length > 0) {
				setNewsItems(articles)
			} else {
				// API berhasil tetapi tidak ada artikel — pakai fallback
				setNewsItems(fallbackNews)
				setUsingFallback(true)
				setError('Tidak ada artikel tersedia dari API saat ini.')
			}
		} catch (err) {
			console.error('[useNews] Gagal mengambil berita:', err)
			setNewsItems(fallbackNews)
			setUsingFallback(true)
			setError(
				err?.response?.data?.message ||
					err?.message ||
					'Gagal menghubungi server berita.'
			)
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		loadNews()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [pageSize])

	return { newsItems, loading, error, usingFallback, refresh: loadNews }
}

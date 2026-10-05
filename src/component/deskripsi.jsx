import { useState, useEffect } from 'react'
import { newsItems } from './dashboard'

function ArrowBackIcon() {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
    )
}

function HeartIcon({ filled }) {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
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

function CheckIcon() {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
        </svg>
    )
}

function QuoteIcon() {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
        </svg>
    )
}

// Generate richer contextual content per news category
function getArticleDetails(news) {
    const contentMap = {
        Teknologi: {
            highlights: [
                'Peningkatan adopsi infrastruktur digital di berbagai lini industri dan UKM.',
                'Investasi talenta muda di bidang AI, komputasi awan, dan keamanan siber.',
                'Sinergi pemerintah dan startup mempercepat kemandirian ekosistem teknologi lokal.'
            ],
            quote: 'Teknologi bukan sekadar alat otomatisasi, melainkan jembatan yang menghubungkan potensi seluruh pelosok nusantara.',
            quoteSpeaker: 'Dr. Hendra Wijaya — Praktisi Transformasi Digital',
            subheading1: 'Akselerasi Ekosistem dan Kolaborasi Antar Lembaga',
            subheading2: 'Dampak Nyata bagi Pelaku Usaha dan Talenta Masa Depan',
            tags: ['#TransformasiDigital', '#InovasiTeknologi', '#EkosistemDigital', '#StartupIndonesia']
        },
        Ekonomi: {
            highlights: [
                'Peningkatan ekspor produk kreatif ke kawasan Asia Tenggara hingga 34%.',
                'Pemberdayaan pengrajin lokal melalui digitalisasi rantai pasok modern.',
                'Dukungan akses pembiayaan dan inkubasi usaha kreatif berbasis komunitas.'
            ],
            quote: 'Kekuatan ekonomi kita terletak pada orisinalitas karya dan ketahanan para pelaku kreatif akar rumput.',
            quoteSpeaker: 'Ratih Wardhani — Pengamat Ekonomi Kreatif',
            subheading1: 'Membuka Koridor Baru Perdagangan Regional',
            subheading2: 'Mempertahankan Mutu dan Keberlanjutan Produksi Lokal',
            tags: ['#EkonomiKreatif', '#ProdukLokal', '#PasarGlobal', '#UMKMBisa']
        },
        'Gaya Hidup': {
            highlights: [
                'Korelasi signifikan antara akses ruang terbuka hijau dan penurunan stres masyarakat kota.',
                'Peremajaan fasilitas publik ramah pejalan kaki dan pesepeda.',
                'Inisiatif komunitas warga dalam merawat ruang bersama dan keanekaragaman hayati.'
            ],
            quote: 'Kota yang sehat diukur dari seberapa leluasa warganya dapat beristirahat dan bernapas tenang.',
            quoteSpeaker: 'Ir. Dimas Suryo — Ahli Perencanaan Lanskap Perkotaan',
            subheading1: 'Menyeimbangkan Ritme Urban dengan Keteduhan Alam',
            subheading2: 'Kebiasaan Baru Menuju Kualitas Hidup yang Lebih Harmonis',
            tags: ['#KesehatanMental', '#RuangHijau', '#UrbanLiving', '#GayaHidupSehat']
        },
        Sains: {
            highlights: [
                'Penemuan formulasi polimer alami yang dapat terurai dalam air laut dalam 60 hari.',
                'Uji coba lapangan di 5 titik pesisir menunjukkan penurunan kontaminasi mikroplastik.',
                'Peluang hilirisasi industri untuk menggantikan kemasan sekali pakai konvensional.'
            ],
            quote: 'Sains memberikan kita harapan terukur bahwa kerusakan ekosistem laut masih bisa kita pulihkan bersama.',
            quoteSpeaker: 'Prof. Anindita Pratama — Lembaga Riset Kelautan Nusantara',
            subheading1: 'Terobosan Bioteknologi dari Bahan Baku Bahari',
            subheading2: 'Langkah Menuju Ekosistem Laut Berkelanjutan',
            tags: ['#RisetKelautan', '#InovasiSains', '#BebasSampahPlastik', '#LingkunganHidup']
        },
        Olahraga: {
            highlights: [
                'Tumbuhnya akademi olahraga usia dini dengan pembinaan berbasis sains kebugaran.',
                'Kemenangan atlet muda di kejuaraan internasional membuka peta baru prestasi.',
                'Antusiasme publik dan swasta dalam penyediaan sarana latihan berstandar dunia.'
            ],
            quote: 'Disiplin dan sportivitas adalah investasi karakter terbaik bagi generasi penerus bangsa.',
            quoteSpeaker: 'Coach Bambang Pamungkas — Pemerhati Olahraga Nasional',
            subheading1: 'Pembaruan Metode Latihan Berbasis Sport Science',
            subheading2: 'Semangat Kolektif Mengharumkan Merah Putih',
            tags: ['#GenerasiEmas', '#SportScience', '#PrestasiNasional', '#PemudaIndonesia']
        },
        Budaya: {
            highlights: [
                'Digitalisasi arsip naskah kuno dan tembang daerah dalam format multimedia interaktif.',
                'Kolaborasi kreator muda mengemas cerita rakyat ke dalam animasi dan permainan digital.',
                'Festival budaya hybrid menjangkau jutaan audiens internasional.'
            ],
            quote: 'Warisan leluhur tidak akan usang selama generasi hari ini berani menceritakannya kembali dengan cara baru.',
            quoteSpeaker: 'Dewi Sekarwangi — Kurator Budaya Nusantara',
            subheading1: 'Melestarikan Warisan Lewat Bahasa Zaman Sekarang',
            subheading2: 'Dari Tradisi Lokal Menuju Panggung Dunia',
            tags: ['#BudayaNusantara', '#KearifanLokal', '#ArsipDigital', '#SeniBudaya']
        }
    }

    return contentMap[news.category] || {
        highlights: [
            'Langkah konsisten melahirkan dampak nyata bagi masyarakat luas.',
            'Kolaborasi erat lintas sektor mempercepat terciptanya solusi berkelanjutan.',
            'Inovasi yang dekat dengan kebutuhan sehari-hari membuka harapan baru.'
        ],
        quote: 'Informasi yang jernih dan mendalam adalah fondasi bagi masyarakat yang ingin terus bertumbuh.',
        quoteSpeaker: 'Nusa Editorial Board',
        subheading1: 'Inisiatif dan Dampak Nyata di Lapangan',
        subheading2: 'Membangun Masa Depan yang Lebih Inklusif',
        tags: ['#KabarNusantara', '#OpiniJernih', '#MasaDepan']
    }
}

function Deskripsi({ news, onBack, onSelectNews }) {
    const [scrollProgress, setScrollProgress] = useState(0)
    const [fontSize, setFontSize] = useState('normal') // 'normal' | 'large' | 'xlarge'
    const [likes, setLikes] = useState(128 + news.id * 17)
    const [hasLiked, setHasLiked] = useState(false)
    const [isBookmarked, setIsBookmarked] = useState(false)
    const [toast, setToast] = useState(null)
    const [newsletterEmail, setNewsletterEmail] = useState('')
    const [subscribed, setSubscribed] = useState(false)

    const [commentText, setCommentText] = useState('')
    const [commentAuthor, setCommentAuthor] = useState('')
    const [comments, setComments] = useState([
        {
            id: 1,
            name: 'Maya Lestari',
            avatarColor: '#1d5350',
            text: 'Tulisan yang sangat jernih dan mendalam. Memberi wawasan baru tentang bagaimana kolaborasi lintas sektor bisa langsung berdampak.',
            time: '2 jam lalu',
            likes: 14
        },
        {
            id: 2,
            name: 'Bagus Pranoto',
            avatarColor: '#ef633f',
            text: 'Semoga inisiatif seperti ini terus digaungkan agar semakin banyak pihak yang tergerak berkontribusi aktif.',
            time: '5 jam lalu',
            likes: 8
        },
        {
            id: 3,
            name: 'Clara Widyanti',
            avatarColor: '#2b5876',
            text: 'Perspektif yang segar! Menyenangkan membaca ulasan yang objektif dan berorientasi solusi.',
            time: '1 hari lalu',
            likes: 5
        }
    ])

    // Scroll progress bar calculation
    useEffect(() => {
        function handleScroll() {
            const totalHeight = document.documentElement.scrollHeight - window.innerHeight
            if (totalHeight <= 0) {
                setScrollProgress(0)
                return
            }
            const currentProgress = (window.scrollY / totalHeight) * 100
            setScrollProgress(Math.min(100, Math.max(0, currentProgress)))
        }
        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    // Toast notification auto-dismiss
    useEffect(() => {
        if (!toast) return
        const timer = setTimeout(() => setToast(null), 3000)
        return () => clearTimeout(timer)
    }, [toast])

    // Navigation items
    const popularNews = newsItems.filter((item) => item.id !== news.id).slice(0, 3)
    const currentIndex = newsItems.findIndex((item) => item.id === news.id)
    const prevArticle = currentIndex > 0 ? newsItems[currentIndex - 1] : null
    const nextArticle = currentIndex < newsItems.length - 1 ? newsItems[currentIndex + 1] : null

    const details = getArticleDetails(news)

    function showToast(msg) {
        setToast(msg)
    }

    function handleLike() {
        if (hasLiked) {
            setLikes((prev) => prev - 1)
            setHasLiked(false)
            showToast('Apresiasi dibatalkan')
        } else {
            setLikes((prev) => prev + 1)
            setHasLiked(true)
            showToast('Terima kasih atas apresiasimu! 🎉')
        }
    }

    function handleBookmark() {
        setIsBookmarked(!isBookmarked)
        showToast(!isBookmarked ? 'Artikel disimpan ke daftar bacaan 📌' : 'Dihapus dari daftar bacaan')
    }

    function handleShare() {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(window.location.href)
            showToast('Tautan artikel disalin ke clipboard! 📋')
        } else {
            showToast('Tautan siap dibagikan!')
        }
    }

    function handleSelectOtherArticle(item) {
        if (onSelectNews) {
            onSelectNews(item)
            window.scrollTo({ top: 0, behavior: 'smooth' })
        }
    }

    function submitComment(event) {
        event.preventDefault()
        if (!commentText.trim()) return
        const newComment = {
            id: Date.now(),
            name: commentAuthor.trim() || 'Kamu',
            avatarColor: '#e07a5f',
            text: commentText.trim(),
            time: 'Baru saja',
            likes: 0
        }
        setComments([newComment, ...comments])
        setCommentText('')
        setCommentAuthor('')
        showToast('Komentar berhasil dipublikasikan! 💬')
    }

    function handleLikeComment(commentId) {
        setComments((prev) =>
            prev.map((c) => (c.id === commentId ? { ...c, likes: c.likes + 1 } : c))
        )
    }

    function handleSubscribe(e) {
        e.preventDefault()
        if (!newsletterEmail.trim()) return
        setSubscribed(true)
        setNewsletterEmail('')
        showToast('Berhasil berlangganan buletin NUSA! ✉️')
    }

    return (
        <main className="news-detail">
            {/* Top Scroll Reading Progress */}
            <div
                className="reading-progress-bar"
                style={{ width: `${scrollProgress}%` }}
                aria-hidden="true"
            />

            {/* Sticky Top Bar / Header */}
            <header className="detail-site-header">
                <div className="detail-header-inner">
                    <button className="back-button" type="button" onClick={onBack} aria-label="Kembali ke halaman utama berita">
                        <ArrowBackIcon />
                        <span>Kembali ke Berita</span>
                    </button>

                    <a
                        className="brand"
                        href="/"
                        onClick={(event) => {
                            event.preventDefault()
                            onBack()
                        }}
                        aria-label="Nusa kembali ke beranda"
                    >
                        <span className="brand-mark">N</span>
                        <span>
                            NUSA<span className="brand-dot">.</span>
                        </span>
                    </a>

                    <div className="header-actions">
                        <button
                            className={`action-btn-sm ${isBookmarked ? 'active' : ''}`}
                            onClick={handleBookmark}
                            type="button"
                            title={isBookmarked ? 'Tersimpan' : 'Simpan artikel'}
                            aria-label="Simpan artikel"
                        >
                            <BookmarkIcon filled={isBookmarked} />
                            <span className="btn-label">{isBookmarked ? 'Tersimpan' : 'Simpan'}</span>
                        </button>
                        <button
                            className="action-btn-sm"
                            onClick={handleShare}
                            type="button"
                            title="Bagikan tautan artikel"
                            aria-label="Bagikan artikel"
                        >
                            <ShareIcon />
                            <span className="btn-label">Bagikan</span>
                        </button>
                    </div>
                </div>
            </header>

            {/* Breadcrumb Navigation */}
            <div className="detail-breadcrumb-bar">
                <nav aria-label="Jejak navigasi">
                    <ol className="breadcrumb-list">
                        <li>
                            <button type="button" onClick={onBack} className="breadcrumb-link">
                                Beranda
                            </button>
                        </li>
                        <li aria-hidden="true">/</li>
                        <li>
                            <span className="breadcrumb-category">{news.category}</span>
                        </li>
                        <li aria-hidden="true">/</li>
                        <li className="breadcrumb-current" aria-current="page">
                            {news.title}
                        </li>
                    </ol>
                </nav>
            </div>

            <div className="detail-layout">
                {/* Main Article Content */}
                <article className={`article-body font-size-${fontSize}`}>
                    {/* Article Header & Headline */}
                    <header className="article-header">
                        <div className="article-badge-row">
                            <span className="article-tag">{news.category}</span>
                            <span className="article-date">{news.date}</span>
                            <span className="article-read-badge">{news.readTime}</span>
                        </div>

                        <h1 className="article-title">{news.title}</h1>
                        <p className="article-lead">{news.description}</p>

                        {/* Author Byline & Article Toolbar */}
                        <div className="article-meta-bar">
                            <div className="author-card">
                                <div className="author-avatar" aria-hidden="true">
                                    {news.author.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                                </div>
                                <div className="author-info">
                                    <span className="author-name">{news.author}</span>
                                    <span className="author-role">Jurnalis & Riset Redaksi NUSA</span>
                                </div>
                            </div>

                            {/* Interactive Utility Controls */}
                            <div className="article-interactive-controls">
                                <div className="font-size-switcher" role="group" aria-label="Pilihan ukuran teks">
                                    <span className="control-label">Ukuran Teks:</span>
                                    <button
                                        type="button"
                                        className={fontSize === 'normal' ? 'active' : ''}
                                        onClick={() => setFontSize('normal')}
                                        title="Ukuran teks standar"
                                        aria-label="Teks standar"
                                    >
                                        A
                                    </button>
                                    <button
                                        type="button"
                                        className={fontSize === 'large' ? 'active' : ''}
                                        onClick={() => setFontSize('large')}
                                        title="Ukuran teks sedang"
                                        aria-label="Teks sedang"
                                    >
                                        A+
                                    </button>
                                    <button
                                        type="button"
                                        className={fontSize === 'xlarge' ? 'active' : ''}
                                        onClick={() => setFontSize('xlarge')}
                                        title="Ukuran teks besar"
                                        aria-label="Teks besar"
                                    >
                                        A++
                                    </button>
                                </div>

                                <button
                                    className={`reaction-btn ${hasLiked ? 'liked' : ''}`}
                                    type="button"
                                    onClick={handleLike}
                                    aria-label={`Sukai artikel ini, saat ini ${likes} suka`}
                                >
                                    <HeartIcon filled={hasLiked} />
                                    <span className="reaction-count">{likes}</span>
                                </button>
                            </div>
                        </div>
                    </header>

                    {/* Hero Image Showcase */}
                    <figure className="article-figure">
                        <img className="article-image" src={news.image} alt={news.title} />
                        <figcaption className="article-caption">
                            <span>Dokumentasi Visual NUSA</span>
                            <span className="caption-credit">Fotografi kurasi / Unsplash Editorial</span>
                        </figcaption>
                    </figure>

                    {/* Key Highlights / Poin Penting Box */}
                    <section className="key-highlights-box" aria-labelledby="highlights-title">
                        <div className="highlights-header">
                            <span className="highlights-icon">⚡</span>
                            <h3 id="highlights-title">Poin Penting Redaksi</h3>
                        </div>
                        <ul className="highlights-list">
                            {details.highlights.map((item, idx) => (
                                <li key={idx}>
                                    <span className="check-bullet" aria-hidden="true">
                                        <CheckIcon />
                                    </span>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </section>

                    {/* Main Article Copy with Editorial Typography */}
                    <div className="article-copy">
                        <p className="lead-paragraph">
                            <span className="drop-cap">{news.description.charAt(0)}</span>
                            {news.description.slice(1)} Perubahan yang berlangsung di tengah masyarakat kini bergerak
                            dengan ritme yang lebih terukur. Bukan sekadar mengejar tren sesaat, melainkan meletakkan
                            pondasi yang kokoh agar dampak kebaikan dapat dirasakan secara berkelanjutan oleh berbagai
                            lapisan masyarakat di seluruh pelosok negeri.
                        </p>

                        <h2>{details.subheading1}</h2>
                        <p>
                            Dalam beberapa tahun terakhir, kolaborasi lintas disiplin terbukti menjadi katalis
                            paling efektif. Pelaku usaha, akademisi, dan komunitas akar rumput tidak lagi berjalan
                            sendiri-sendiri. Ketika gagasan segar bertemu dengan kapasitas eksekusi yang disiplin,
                            tantangan struktural yang sebelumnya terasa rumit mulai menemukan jalan keluar yang
                            aplikatif dan tepat guna.
                        </p>

                        {/* Pull Quote Callout */}
                        <figure className="pull-quote">
                            <div className="quote-mark" aria-hidden="true">
                                <QuoteIcon />
                            </div>
                            <blockquote>
                                <p>“{details.quote}”</p>
                            </blockquote>
                            <figcaption className="quote-speaker">— {details.quoteSpeaker}</figcaption>
                        </figure>

                        <h2>{details.subheading2}</h2>
                        <p>
                            Menghadapi fase berikutnya, kunci keberhasilan bertumpu pada konsistensi evaluasi dan
                            keterbukaan terhadap umpan balik publik. Pendekatan yang humanis serta empati terhadap
                            kebutuhan harian masyarakat merupakan kompas utama agar setiap terobosan baru tetap relevan
                            dan tidak kehilangan jiwa kebersamaannya.
                        </p>
                        <p>
                            Dari dinamika yang berkembang, kita belajar bahwa kemajuan sejati bukanlah yang meninggalkan
                            siapa pun di belakang, melainkan yang memberi setiap insan ruang untuk ikut belajar,
                            berkarya, dan merayakan pencapaian bersama.
                        </p>
                    </div>

                    {/* Article Topic Tags */}
                    <div className="article-tags-section">
                        <span className="tags-label">Topik Terkait:</span>
                        <div className="tags-cloud">
                            {details.tags.map((tag, idx) => (
                                <span className="topic-pill" key={idx}>
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Social Action Bar (Bottom of Article) */}
                    <div className="article-bottom-actions">
                        <div className="bottom-reactions">
                            <button
                                className={`reaction-btn large ${hasLiked ? 'liked' : ''}`}
                                type="button"
                                onClick={handleLike}
                            >
                                <HeartIcon filled={hasLiked} />
                                <span>{hasLiked ? 'Disukai' : 'Tepuk Tangan'} ({likes})</span>
                            </button>

                            <button
                                className={`action-btn-outline ${isBookmarked ? 'active' : ''}`}
                                type="button"
                                onClick={handleBookmark}
                            >
                                <BookmarkIcon filled={isBookmarked} />
                                <span>{isBookmarked ? 'Tersimpan di Akun' : 'Simpan Artikel'}</span>
                            </button>
                        </div>

                        <button className="action-btn-outline" type="button" onClick={handleShare}>
                            <ShareIcon />
                            <span>Bagikan Cerita Ini</span>
                        </button>
                    </div>

                    {/* Author Bio Card */}
                    <div className="author-bio-card">
                        <div className="bio-avatar" aria-hidden="true">
                            {news.author.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                        </div>
                        <div className="bio-content">
                            <div className="bio-title-row">
                                <h4>{news.author}</h4>
                                <span className="bio-badge">Jurnalis NUSA</span>
                            </div>
                            <p>
                                Menulis dan mengamati perkembangan isu terkini, inovasi sosial, sains, dan kebudayaan Indonesia.
                                Percaya bahwa tulisan yang bernas sanggup menghadirkan kejernihan di tengah arus informasi yang bising.
                            </p>
                        </div>
                    </div>

                    {/* Next / Previous Article Navigation */}
                    <nav className="article-pagination" aria-label="Navigasi antar artikel">
                        {prevArticle ? (
                            <button
                                className="pagination-card prev"
                                type="button"
                                onClick={() => handleSelectOtherArticle(prevArticle)}
                            >
                                <span className="nav-direction">← Artikel Sebelumnya</span>
                                <strong className="nav-title">{prevArticle.title}</strong>
                                <span className="nav-meta">{prevArticle.category} • {prevArticle.readTime}</span>
                            </button>
                        ) : (
                            <div className="pagination-spacer" />
                        )}

                        {nextArticle && (
                            <button
                                className="pagination-card next"
                                type="button"
                                onClick={() => handleSelectOtherArticle(nextArticle)}
                            >
                                <span className="nav-direction">Artikel Selanjutnya →</span>
                                <strong className="nav-title">{nextArticle.title}</strong>
                                <span className="nav-meta">{nextArticle.category} • {nextArticle.readTime}</span>
                            </button>
                        )}
                    </nav>

                    {/* Reader Discussion / Comments Section */}
                    <section className="comment-section" id="komentar" aria-labelledby="comment-heading-id">
                        <div className="comment-section-header">
                            <div>
                                <p className="eyebrow">Ruang Pembaca</p>
                                <h2 id="comment-heading-id">
                                    Diskusi & Komentar <span className="comment-count-pill">{comments.length}</span>
                                </h2>
                            </div>
                            <span className="comment-rules">Jaga percakapan tetap santun dan berbobot.</span>
                        </div>

                        {/* Add Comment Form */}
                        <form className="comment-form" onSubmit={submitComment}>
                            <div className="form-row-author">
                                <input
                                    type="text"
                                    value={commentAuthor}
                                    onChange={(e) => setCommentAuthor(e.target.value)}
                                    placeholder="Nama kamu (opsional)"
                                    aria-label="Nama kamu"
                                    className="comment-name-input"
                                />
                            </div>
                            <textarea
                                value={commentText}
                                onChange={(e) => setCommentText(e.target.value)}
                                placeholder="Bagikan pandangan atau pertanyaanmu mengenai topik ini..."
                                aria-label="Tulis komentar"
                                rows="3"
                                className="comment-textarea"
                                required
                            />
                            <div className="comment-form-footer">
                                <span className="char-count">{commentText.length} karakter</span>
                                <button type="submit" className="submit-comment-btn" disabled={!commentText.trim()}>
                                    <span>Kirim Komentar</span>
                                    <span className="arrow-btn" aria-hidden="true">↗</span>
                                </button>
                            </div>
                        </form>

                        {/* Comments List */}
                        <div className="comments-list">
                            {comments.map((item) => (
                                <article className="comment-card" key={item.id}>
                                    <div
                                        className="comment-avatar"
                                        style={{ backgroundColor: item.avatarColor || '#1d5350' }}
                                        aria-hidden="true"
                                    >
                                        {item.name.charAt(0).toUpperCase()}
                                    </div>
                                    <div className="comment-main">
                                        <div className="comment-heading">
                                            <div className="comment-author-badge">
                                                <strong>{item.name}</strong>
                                                {item.name === 'Kamu' && <span className="badge-you">Penulis</span>}
                                            </div>
                                            <time className="comment-time">{item.time}</time>
                                        </div>
                                        <p className="comment-text">{item.text}</p>
                                        <div className="comment-footer">
                                            <button
                                                type="button"
                                                className="comment-like-btn"
                                                onClick={() => handleLikeComment(item.id)}
                                                aria-label={`Sukai komentar dari ${item.name}`}
                                            >
                                                <HeartIcon filled={false} />
                                                <span>{item.likes} Suka</span>
                                            </button>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </section>
                </article>

                {/* Sidebar Section */}
                <aside className="detail-sidebar" aria-label="Bilah samping artikel">
                    {/* Popular News / Trending in Category */}
                    <section className="sidebar-card popular-section">
                        <div className="sidebar-card-header">
                            <p className="eyebrow">Pilihan Redaksi</p>
                            <h3>Banyak Dibaca</h3>
                        </div>
                        <div className="popular-list">
                            {popularNews.map((item, index) => (
                                <button
                                    className="popular-card"
                                    key={item.id}
                                    type="button"
                                    onClick={() => handleSelectOtherArticle(item)}
                                    title={`Baca: ${item.title}`}
                                >
                                    <span className="popular-rank">0{index + 1}</span>
                                    <div className="popular-thumb">
                                        <img src={item.image} alt={item.title} />
                                    </div>
                                    <div className="popular-info">
                                        <span className="popular-category">{item.category}</span>
                                        <strong className="popular-title">{item.title}</strong>
                                        <span className="popular-read-time">{item.readTime}</span>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </section>

                    {/* Newsletter Subscription Widget */}
                    <section className="sidebar-card newsletter-widget">
                        <div className="newsletter-badge">BULETIN HARIAN</div>
                        <h3>Kurasi Nusa Pagi</h3>
                        <p>Dapatkan ringkasan kabar bermakna langsung ke kotak masuk emailmu setiap pukul 07.00 WIB.</p>
                        {subscribed ? (
                            <div className="newsletter-success">
                                <CheckIcon />
                                <span>Terima kasih! Kamu telah terdaftar.</span>
                            </div>
                        ) : (
                            <form className="newsletter-form" onSubmit={handleSubscribe}>
                                <input
                                    type="email"
                                    placeholder="nama@email.com"
                                    value={newsletterEmail}
                                    onChange={(e) => setNewsletterEmail(e.target.value)}
                                    required
                                    aria-label="Alamat email untuk buletin"
                                />
                                <button type="submit">Langganan</button>
                            </form>
                        )}
                    </section>

                    {/* Editorial Note / Quote */}
                    <div className="sidebar-quote-box">
                        <p className="sidebar-quote-text">
                            “Jurnal harian untuk pikiran yang terbuka. Membaca dengan tenang, memahami dengan jernih.”
                        </p>
                        <span className="sidebar-quote-author">— Redaksi NUSA</span>
                    </div>
                </aside>
            </div>

            {/* Global Footer */}
            <footer className="detail-footer">
                <div className="detail-footer-inner">
                    <div className="footer-brand">
                        <span className="brand-name">NUSA.</span>
                        <span className="footer-tagline">Jurnal harian untuk pikiran yang terbuka.</span>
                    </div>
                    <div className="footer-links">
                        <button type="button" onClick={onBack}>Beranda</button>
                        <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                            Ke Atas ↑
                        </button>
                    </div>
                    <span className="footer-copyright">© 2026 Nusa Media Nusantara. Hak cipta dilindungi.</span>
                </div>
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

export default Deskripsi

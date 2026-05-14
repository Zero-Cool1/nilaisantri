let allSantri = [];

// ============================================================
// 📅 JADWAL EVALUASI - EDIT TIAP SEMESTER
// EH: 24 jam (mulai 14:00)
// EP: Sabtu 14:00 - Senin 14:00 (48 jam)
// EA: Rabu 18:00 - Sabtu 23:00
// ============================================================
const JADWAL = [
    // MINGGU 1
    { kode: 'EH01', mulai: '2026-04-06T14:00:00', akhir: '2026-04-07T14:00:00' },
    { kode: 'EH02', mulai: '2026-04-07T14:00:00', akhir: '2026-04-08T14:00:00' },
    { kode: 'EH03', mulai: '2026-04-08T14:00:00', akhir: '2026-04-09T14:00:00' },
    { kode: 'EH04', mulai: '2026-04-09T14:00:00', akhir: '2026-04-10T14:00:00' },
    { kode: 'EH05', mulai: '2026-04-10T14:00:00', akhir: '2026-04-11T14:00:00' },
    { kode: 'EP1',  mulai: '2026-04-11T14:00:00', akhir: '2026-04-13T14:00:00' },
    
    // MINGGU 2
    { kode: 'EH06', mulai: '2026-04-13T14:00:00', akhir: '2026-04-14T14:00:00' },
    { kode: 'EH07', mulai: '2026-04-14T14:00:00', akhir: '2026-04-15T14:00:00' },
    { kode: 'EH08', mulai: '2026-04-15T14:00:00', akhir: '2026-04-16T14:00:00' },
    { kode: 'EH09', mulai: '2026-04-16T14:00:00', akhir: '2026-04-17T14:00:00' },
    { kode: 'EH10', mulai: '2026-04-17T14:00:00', akhir: '2026-04-18T14:00:00' },
    { kode: 'EP2',  mulai: '2026-04-18T14:00:00', akhir: '2026-04-20T14:00:00' },
    
    // MINGGU 3
    { kode: 'EH11', mulai: '2026-04-20T14:00:00', akhir: '2026-04-21T14:00:00' },
    { kode: 'EH12', mulai: '2026-04-21T14:00:00', akhir: '2026-04-22T14:00:00' },
    { kode: 'EH13', mulai: '2026-04-22T14:00:00', akhir: '2026-04-23T14:00:00' },
    { kode: 'EH14', mulai: '2026-04-23T14:00:00', akhir: '2026-04-24T14:00:00' },
    { kode: 'EH15', mulai: '2026-04-24T14:00:00', akhir: '2026-04-25T14:00:00' },
    { kode: 'EP3',  mulai: '2026-04-25T14:00:00', akhir: '2026-04-27T14:00:00' },
    
    // MINGGU 4
    { kode: 'EH16', mulai: '2026-04-27T14:00:00', akhir: '2026-04-28T14:00:00' },
    { kode: 'EH17', mulai: '2026-04-28T14:00:00', akhir: '2026-04-29T14:00:00' },
    { kode: 'EH18', mulai: '2026-04-29T14:00:00', akhir: '2026-04-30T14:00:00' },
    { kode: 'EH19', mulai: '2026-04-30T14:00:00', akhir: '2026-05-01T14:00:00' },
    { kode: 'EH20', mulai: '2026-05-01T14:00:00', akhir: '2026-05-02T14:00:00' },
    { kode: 'EP4',  mulai: '2026-05-02T14:00:00', akhir: '2026-05-04T14:00:00' },
    
    // MINGGU 5
    { kode: 'EH21', mulai: '2026-05-04T14:00:00', akhir: '2026-05-05T14:00:00' },
    { kode: 'EH22', mulai: '2026-05-05T14:00:00', akhir: '2026-05-06T14:00:00' },
    { kode: 'EH23', mulai: '2026-05-06T14:00:00', akhir: '2026-05-07T14:00:00' },
    { kode: 'EH24', mulai: '2026-05-07T14:00:00', akhir: '2026-05-08T14:00:00' },
    { kode: 'EH25', mulai: '2026-05-08T14:00:00', akhir: '2026-05-09T14:00:00' },
    { kode: 'EP5',  mulai: '2026-05-09T14:00:00', akhir: '2026-05-11T14:00:00' },
    
    // EA
    { kode: 'EA',   mulai: '2026-05-13T18:00:00', akhir: '2026-05-16T23:00:00' },
];

// ============================================================

async function loadCSV() {
    try {
        const GOOGLE_SHEETS_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vT2lZ3HqI5SiNWJjd_-at4gO9kiTQi4AxoEj-afFK90nPNLlUC4YkTFfgJzJ0garsROlI9ClHrWV6d9/pub?output=csv';
        const unique = Date.now() + '-' + Math.random().toString(36).substring(7);
        const url = GOOGLE_SHEETS_URL + '&cache=' + unique;
        
        const response = await fetch(url, {
            method: 'GET',
            cache: 'no-store',
            headers: { 'Cache-Control': 'no-cache, no-store, must-revalidate', 'Pragma': 'no-cache', 'Expires': '0' }
        });
        
        if (!response.ok) throw new Error('Gagal fetch: ' + response.status);
        const csvText = await response.text();
        const lines = csvText.split('\n');
        const santriData = [];
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i].trim();
            if (!line) continue;
            const firstPart = line.split(',')[0].trim();
            if (/^\d+$/.test(firstPart) && firstPart !== '') santriData.push(line);
        }
        allSantri = santriData.map(line => parseSantriLine(line)).filter(s => s !== null);
        document.getElementById('totalSantri').textContent = `Total: ${allSantri.length} santri`;
        return true;
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('error').style.display = 'block';
        document.getElementById('error').innerHTML = `<p>❌ Gagal: ${error.message}</p>`;
        return false;
    }
}

function parseSantriLine(line) {
    try {
        const parts = [];
        let current = '', inQuotes = false;
        for (let i = 0; i < line.length; i++) {
            const char = line[i];
            if (char === '"') inQuotes = !inQuotes;
            else if (char === ',' && !inQuotes) { parts.push(current.trim()); current = ''; }
            else current += char;
        }
        parts.push(current.trim());
        if (parts.length < 20) return null;

        const csvOrder = ['EH01','EH02','EH03','EH04','EH05','EP1','EH06','EH07','EH08','EH09','EH10','EP2','EH11','EH12','EH13','EH14','EH15','EP3','EH16','EH17','EH18','EH19','EH20','EP4','EH21','EH22','EH23','EH24','EH25','EP5','EA'];
        const listNilaiStr = parts[19] || '';
        const nilaiArray = listNilaiStr.split(',').map(v => v.trim()).filter(v => v !== '' && !isNaN(parseInt(v))).map(v => parseInt(v));
        const nilaiMap = {};
        for (let i = 0; i < csvOrder.length; i++) nilaiMap[csvOrder[i]] = i < nilaiArray.length ? nilaiArray[i] : null;

        const displayName = parts[1] || '';
        let title = '', gradeAkhir = '';
        if (displayName) { const m = displayName.match(/\|\s*(.+?)\s*•/); if (m) title = m[1].trim(); }
        if (displayName) { const m = displayName.match(/\|\s*(.+?)\s*\|/); if (m) gradeAkhir = m[1].trim(); }

        return {
            peringkat: parts[0] || '', nama: parts[2] || '', nip: parts[3] || '',
            keteranganEH: parts[5] || '0 EH', keteranganEP: parts[6] || '0 EP', keteranganEA: parts[7] || '0 EA',
            status: parts[8] || '', sisaSoalEA: parts[9] || '', finalRemark: parts[10] || '',
            peringkatSementara: parts[11] || '', peringkatAkhir: parts[12] || gradeAkhir,
            nilaiSementara: parseFloat((parts[13] || '0').replace(',', '.')) || 0,
            nilaiAkhir: parseFloat((parts[14] || '0').replace(',', '.')) || 0,
            skorSementara: parseInt(parts[15]) || 0, skorAkhir: parseInt(parts[16]) || 0, maxSkor: parseInt(parts[17]) || 300,
            totalDurasi: parts[18] ? parts[18].replace(',', '.') : '0',
            nilaiMap, title, gradeAkhir
        };
    } catch (e) { console.error('Parse error:', e); return null; }
}

// ============================================================
// 🔔 FUNGSI CEK STATUS JADWAL & NILAI
// ============================================================
function getJadwalStatus(kode) {
    const now = new Date();
    const jadwal = JADWAL.find(j => j.kode === kode);
    if (!jadwal) return 'tidak_ada';
    const mulai = new Date(jadwal.mulai);
    const akhir = new Date(jadwal.akhir);
    if (now < mulai) return 'belum_mulai';
    if (now >= mulai && now <= akhir) return 'sedang_berlangsung';
    return 'berakhir';
}

function formatTanggal(isoString) {
    const d = new Date(isoString);
    const hari = ['Minggu','Senin','Selasa','Rabu','Kamis','Jumat','Sabtu'];
    const bulan = ['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'];
    return `${hari[d.getDay()]}, ${d.getDate()} ${bulan[d.getMonth()]} ${d.getFullYear()} jam ${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}`;
}

function getNotifBelum(kode) {
    const status = getJadwalStatus(kode);
    const jadwal = JADWAL.find(j => j.kode === kode);
    
    if (status === 'sedang_berlangsung') {
        return `
            <div class="notif warning">
                <div class="notif-icon">⏳</div>
                <div class="notif-title">Belum ${kode}</div>
                <div class="notif-text">Yuk Ikhwah, Segera luangkan waktunya!</div>
                <a href="https://edu.hsi.id" target="_blank" class="notif-btn">👉 Klik Edu.hsi.id</a>
                <div class="notif-deadline">⏰ Berakhir: ${formatTanggal(jadwal.akhir)}</div>
            </div>`;
    } else if (status === 'belum_mulai') {
        return `
            <div class="notif info">
                <div class="notif-icon">🔜</div>
                <div class="notif-title">Menunggu ${kode}</div>
                <div class="notif-text">Dimulai: ${formatTanggal(jadwal.mulai)}</div>
            </div>`;
    } else if (status === 'berakhir') {
        return `
            <div class="notif danger">
                <div class="notif-icon">❌</div>
                <div class="notif-title">Terlewat ${kode}</div>
                <div class="notif-text">Evaluasi sudah berakhir</div>
            </div>`;
    }
    return '';
}

function cariEvaluasiBerikutnya(nilaiMap) {
    const csvOrder = ['EH01','EH02','EH03','EH04','EH05','EP1','EH06','EH07','EH08','EH09','EH10','EP2','EH11','EH12','EH13','EH14','EH15','EP3','EH16','EH17','EH18','EH19','EH20','EP4','EH21','EH22','EH23','EH24','EH25','EP5','EA'];
    
    for (const kode of csvOrder) {
        const nilai = nilaiMap[kode];
        const status = getJadwalStatus(kode);
        
        if ((status === 'sedang_berlangsung' || status === 'berakhir') && (nilai === null || nilai === undefined)) {
            return { kode, notif: getNotifBelum(kode) };
        }
        
        if (status === 'belum_mulai' && (nilai === null || nilai === undefined)) {
            return { kode, notif: getNotifBelum(kode) };
        }
    }
    
    return { kode: 'SELESAI', notif: `
        <div class="final-remark lanjut">
            <div class="final-remark-icon">🎉</div>
            <div class="final-remark-title">SELAMAT</div>
            <div class="final-remark-text">ANTUM LANJUT KE SILSILAH 8</div>
            <div class="final-remark-doaa">BAARAKALLAHU FIIKUM</div>
        </div>` 
    };
}

// ============================================================

function searchSantri() {
    const term = document.getElementById('searchInput').value.trim().toLowerCase();
    const resultDiv = document.getElementById('result');
    const suggestionsDiv = document.getElementById('suggestions');
    suggestionsDiv.innerHTML = '';
    if (!term) { resultDiv.style.display = 'none'; return; }
    if (allSantri.length === 0) { alert('Data belum dimuat.'); return; }
    const results = allSantri.filter(s => s.nama.toLowerCase().includes(term) || s.nip.toLowerCase().includes(term));
    if (results.length === 0) {
        resultDiv.style.display = 'block';
        resultDiv.innerHTML = '<div class="no-result">❌ Santri tidak ditemukan</div>';
    } else if (results.length === 1) displayResult(results[0]);
    else displaySuggestions(results);
}

function displaySuggestions(results) {
    document.getElementById('result').style.display = 'none';
    document.getElementById('suggestions').innerHTML = results.map((s, i) => `
        <div class="suggestion-item" onclick="selectSantri(${i})">
            <span class="suggestion-name">${s.nama}</span>
            <span class="suggestion-rank">#${s.peringkat} | ${s.peringkatAkhir || '-'}</span>
        </div>`).join('');
    window._searchResults = results;
}

function selectSantri(index) {
    const s = window._searchResults[index];
    if (s) { document.getElementById('searchInput').value = s.nama; document.getElementById('suggestions').innerHTML = ''; displayResult(s); }
}

function displayResult(s) {
    const resultDiv = document.getElementById('result');
    const getNilaiColor = (n) => n >= 85 ? 'high' : n >= 60 ? 'medium' : 'low';
    const getStatusHTML = (st) => {
        if (!st) return '<span style="color:#666;">-</span>';
        const sl = st.toLowerCase();
        if (sl.includes('lulus') && !sl.includes('tidak')) return '<span style="color:#22a06b;font-weight:700;font-size:1.1em;">LULUS ✅</span>';
        if (sl.includes('tidak')) return '<span style="color:#d14343;font-weight:700;font-size:1.1em;">TIDAK LULUS ❌</span>';
        if (sl.includes('harus') || sl.includes('belum')) return '<span style="color:#e5942e;font-weight:700;font-size:1.1em;">HARUS EA ⚠️</span>';
        return `<span style="font-weight:600;">${st}</span>`;
    };
    
    const { notif } = cariEvaluasiBerikutnya(s.nilaiMap);
    
    const getAngka = (str) => { const m = (str || '').trim().match(/^(\d+)/); return m ? parseInt(m[1]) : 0; };
    const ehNol = getAngka(s.keteranganEH) === 0;
    const epNol = getAngka(s.keteranganEP) === 0;
    const eaNol = getAngka(s.keteranganEA) === 0;
    const durasiDetik = parseFloat(s.totalDurasi);
    const formatDurasi = (d) => {
        if (isNaN(d)) return s.totalDurasi + ' detik';
        const m = Math.floor(d / 60); const det = Math.round(d % 60);
        if (m > 0) return `${m}m ${det}d (${d.toLocaleString('id-ID')} detik)`;
        return `${d.toLocaleString('id-ID')} detik`;
    };

    let html = `
    <div class="result-card">
        <div class="santri-header">
            <div><div class="santri-name">${s.nama}</div><div class="nip-info">NIP: ${s.nip}</div></div>
            <div class="santri-rank"><span class="peringkat">Peringkat</span> ${s.peringkat}${s.peringkatAkhir ? `<br><span style="font-size:0.85em">${s.peringkatAkhir}</span>` : ''}</div>
        </div>
        <div class="nilai-utama">
            <div class="nilai-box utama"><div class="nilai-box-label">📊 Nilai Sementara</div><div class="nilai-box-value ${getNilaiColor(s.nilaiSementara)}">${s.nilaiSementara.toFixed(2)}</div></div>
            <div class="nilai-box utama"><div class="nilai-box-label">🏆 Nilai Akhir</div><div class="nilai-box-value ${getNilaiColor(s.nilaiAkhir)}">${s.nilaiAkhir.toFixed(2)}</div></div>
            <div class="nilai-box utama"><div class="nilai-box-label">📝 Sisa Soal EA</div><div class="nilai-box-value medium">${s.sisaSoalEA || '-'}</div><div class="nilai-box-sub">Status: ${getStatusHTML(s.status)}</div></div>
            <div class="nilai-box bolos-box">
                <div class="nilai-box-label">⚠️ Keterangan Bolos</div>
                <div class="bolos-detail">
                    <div class="bolos-item"><div class="bolos-label">EH</div><div class="bolos-value ${ehNol?'nol':''}">${s.keteranganEH}</div></div>
                    <div class="bolos-item"><div class="bolos-label">EP</div><div class="bolos-value ${epNol?'nol':''}">${s.keteranganEP}</div></div>
                    <div class="bolos-item"><div class="bolos-label">EA</div><div class="bolos-value ${eaNol?'nol':''}">${s.keteranganEA}</div></div>
                </div>
            </div>
        </div>
        ${notif}
        <div class="info-detail">
            <div class="detail-grid">
                <div class="detail-item"><span class="detail-label">Skor Sementara</span><span class="detail-value">${s.skorSementara} / ${s.maxSkor}</span></div>
                <div class="detail-item"><span class="detail-label">Skor Akhir</span><span class="detail-value">${s.skorAkhir} / ${s.maxSkor}</span></div>
                ${s.title?`<div class="detail-item"><span class="detail-label">Title</span><span class="detail-value">${s.title}</span></div>`:''}
                <div class="detail-item"><span class="detail-label">Total Durasi</span><span class="detail-value">${formatDurasi(durasiDetik)}</span></div>
            </div>
        </div>
        <div class="list-nilai-section">
            <h3>📝 Nilai Santri ARN251 G15 <span style="font-size:0.7em;color:#5a8fa8;font-weight:400;">(Klik Kotak)</span></h3>
            <div class="nilai-buttons">${buildNilaiButtons(s.nilaiMap)}</div>
        </div>
    </div>`;
    resultDiv.innerHTML = html;
    resultDiv.style.display = 'block';
    resultDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function buildNilaiButtons(nilaiMap) {
    const urutanCSV = ['EH01','EH02','EH03','EH04','EH05','EP1','EH06','EH07','EH08','EH09','EH10','EP2','EH11','EH12','EH13','EH14','EH15','EP3','EH16','EH17','EH18','EH19','EH20','EP4','EH21','EH22','EH23','EH24','EH25','EP5','EA'];
    let html = '';
    urutanCSV.forEach(label => {
        const nilai = nilaiMap[label];
        let cls = 'nilai-btn', onclick = '';
        if (nilai === null || nilai === undefined) cls += ' kosong';
        else { onclick = `onclick="klikNilai(this,'${label}',${nilai})"`; cls += ' ada-nilai'; }
        html += `<button class="${cls}" ${onclick} data-label="${label}" data-nilai="${nilai!==null?nilai:''}">${label}</button>`;
    });
    return html;
}

function klikNilai(btn, label, nilai) {
    const isShowing = btn.classList.contains('showing-value');
    if (isShowing) {
        btn.classList.remove('showing-value','nilai-0','nilai-1','nilai-2','nilai-3','nilai-4','active');
        btn.textContent = label;
    } else {
        document.querySelectorAll('.nilai-btn.showing-value').forEach(b => {
            b.classList.remove('showing-value','nilai-0','nilai-1','nilai-2','nilai-3','nilai-4','active');
            const lbl = b.getAttribute('data-label'); if (lbl) b.textContent = lbl;
        });
        btn.classList.add('showing-value','active');
        if (nilai === 0) btn.classList.add('nilai-0');
        else if (nilai === 1) btn.classList.add('nilai-1');
        else if (nilai === 2) btn.classList.add('nilai-2');
        else if (nilai === 3) btn.classList.add('nilai-3');
        else if (nilai >= 4) btn.classList.add('nilai-4');
        btn.textContent = nilai;
    }
}

document.getElementById('searchInput').addEventListener('input', function(e) {
    const t = e.target.value.trim();
    if (t.length >= 2) searchSantri();
    else { document.getElementById('result').style.display = 'none'; document.getElementById('suggestions').innerHTML = ''; }
});
document.getElementById('searchInput').addEventListener('keypress', function(e) { if (e.key === 'Enter') searchSantri(); });
window.addEventListener('DOMContentLoaded', async () => {
    document.getElementById('loading').style.display = 'block';
    const ok = await loadCSV();
    document.getElementById('loading').style.display = 'none';
});
var allSantri = [];
var currentSantriData = null; // Data santri yang sedang ditampilkan

// ============================================================
// 📅 JADWAL SILSILAH 8 (TERBARU)
// Pola: EH 24 jam (14:00-14:00), EP 48 jam (Sabtu 14:00 - Senin 14:00)
// EA: 16 Juli 18:00 - 19 Juli 23:00
// ============================================================
var JADWAL_SILSILAH8 = [
    // Minggu 1
    { kode: 'EH01', mulai: '2026-06-08T14:00:00', akhir: '2026-06-09T14:00:00' },
    { kode: 'EH02', mulai: '2026-06-09T14:00:00', akhir: '2026-06-10T14:00:00' },
    { kode: 'EH03', mulai: '2026-06-10T14:00:00', akhir: '2026-06-11T14:00:00' },
    { kode: 'EH04', mulai: '2026-06-11T14:00:00', akhir: '2026-06-12T14:00:00' },
    { kode: 'EH05', mulai: '2026-06-12T14:00:00', akhir: '2026-06-13T14:00:00' },
    { kode: 'EP1',  mulai: '2026-06-13T14:00:00', akhir: '2026-06-15T14:00:00' },
    // Minggu 2
    { kode: 'EH06', mulai: '2026-06-15T14:00:00', akhir: '2026-06-16T14:00:00' },
    { kode: 'EH07', mulai: '2026-06-16T14:00:00', akhir: '2026-06-17T14:00:00' },
    { kode: 'EH08', mulai: '2026-06-17T14:00:00', akhir: '2026-06-18T14:00:00' },
    { kode: 'EH09', mulai: '2026-06-18T14:00:00', akhir: '2026-06-19T14:00:00' },
    { kode: 'EH10', mulai: '2026-06-19T14:00:00', akhir: '2026-06-20T14:00:00' },
    { kode: 'EP2',  mulai: '2026-06-20T14:00:00', akhir: '2026-06-22T14:00:00' },
    // Minggu 3
    { kode: 'EH11', mulai: '2026-06-22T14:00:00', akhir: '2026-06-23T14:00:00' },
    { kode: 'EH12', mulai: '2026-06-23T14:00:00', akhir: '2026-06-24T14:00:00' },
    { kode: 'EH13', mulai: '2026-06-24T14:00:00', akhir: '2026-06-25T14:00:00' },
    { kode: 'EH14', mulai: '2026-06-25T14:00:00', akhir: '2026-06-26T14:00:00' },
    { kode: 'EH15', mulai: '2026-06-26T14:00:00', akhir: '2026-06-27T14:00:00' },
    { kode: 'EP3',  mulai: '2026-06-27T14:00:00', akhir: '2026-06-29T14:00:00' },
    // Minggu 4
    { kode: 'EH16', mulai: '2026-06-29T14:00:00', akhir: '2026-06-30T14:00:00' },
    { kode: 'EH17', mulai: '2026-06-30T14:00:00', akhir: '2026-07-01T14:00:00' },
    { kode: 'EH18', mulai: '2026-07-01T14:00:00', akhir: '2026-07-02T14:00:00' },
    { kode: 'EH19', mulai: '2026-07-02T14:00:00', akhir: '2026-07-03T14:00:00' },
    { kode: 'EH20', mulai: '2026-07-03T14:00:00', akhir: '2026-07-04T14:00:00' },
    { kode: 'EP4',  mulai: '2026-07-04T14:00:00', akhir: '2026-07-06T14:00:00' },
    // Minggu 5
    { kode: 'EH21', mulai: '2026-07-06T14:00:00', akhir: '2026-07-07T14:00:00' },
    { kode: 'EH22', mulai: '2026-07-07T14:00:00', akhir: '2026-07-08T14:00:00' },
    { kode: 'EH23', mulai: '2026-07-08T14:00:00', akhir: '2026-07-09T14:00:00' },
    { kode: 'EH24', mulai: '2026-07-09T14:00:00', akhir: '2026-07-10T14:00:00' },
    { kode: 'EH25', mulai: '2026-07-10T14:00:00', akhir: '2026-07-11T14:00:00' },
    { kode: 'EP5',  mulai: '2026-07-11T14:00:00', akhir: '2026-07-13T14:00:00' },
    // EA (khusus)
    { kode: 'EA',   mulai: '2026-07-16T18:00:00', akhir: '2026-07-19T23:00:00' }
];

// ============================================================
// 📋 DAFTAR PROGRAM (SILSILAH TERBARU DI ATAS)
// ============================================================
var DAFTAR_PROGRAM = [
    {
        id: 'arn251-g12',
        nama: 'ARN251 G12 - SILSILAH ILMIYYAH 5.1',
        sheetUrl: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vT2lZ3HqI5SiNWJjd_-at4gO9kiTQi4AxoEj-afFK90nPNLlUC4YkTFfgJzJ0garsROlI9ClHrWV6d9/pub?gid=446500457&single=true&output=csv',
        icon: '📖'
    },
    {
        id: 'arn251-g17',
        nama: 'ARN251 G17 - SILSILAH ILMIYYAH 5.2',
        sheetUrl: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vT2lZ3HqI5SiNWJjd_-at4gO9kiTQi4AxoEj-afFK90nPNLlUC4YkTFfgJzJ0garsROlI9ClHrWV6d9/pub?gid=301224816&single=true&output=csv',
        icon: '📗'
    },
    {
        id: 'arn251-g22',
        nama: 'ARN251 G22 - SILSILAH ILMIYYAH 5.3',
        sheetUrl: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vT2lZ3HqI5SiNWJjd_-at4gO9kiTQi4AxoEj-afFK90nPNLlUC4YkTFfgJzJ0garsROlI9ClHrWV6d9/pub?gid=1931029663&single=true&output=csv',
        icon: '📘'
    },
    {
        id: 'arn251-g15-s6',
        nama: 'ARN251 G15 - SILSILAH ILMIYYAH 6',
        sheetUrl: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vT2lZ3HqI5SiNWJjd_-at4gO9kiTQi4AxoEj-afFK90nPNLlUC4YkTFfgJzJ0garsROlI9ClHrWV6d9/pub?gid=76492603&single=true&output=csv',
        icon: '📙'
    },
    {
        id: 'arn251-g15-s7',
        nama: 'ARN251 G15 - SILSILAH ILMIYYAH 7',
        sheetUrl: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vT2lZ3HqI5SiNWJjd_-at4gO9kiTQi4AxoEj-afFK90nPNLlUC4YkTFfgJzJ0garsROlI9ClHrWV6d9/pub?gid=1171366230&single=true&output=csv',
        icon: '📕'
    },
    {
        id: 'arn251-g15-s8',
        nama: 'ARN251 G15 - SILSILAH ILMIYYAH 8',
        sheetUrl: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vT2lZ3HqI5SiNWJjd_-at4gO9kiTQi4AxoEj-afFK90nPNLlUC4YkTFfgJzJ0garsROlI9ClHrWV6d9/pub?gid=56368600&single=true&output=csv',
        icon: '📒'
    }
];

// Indeks program yang memiliki jadwal (0-based). Saat ini index 5 = SILSILAH 8
var INDEX_PROGRAM_DENGAN_JADWAL = 5;

var currentProgram = null;
var currentSheetUrl = '';
var currentJadwal = null;

// ============================================================
// FUNGSI-FUNGSI UTAMA
// ============================================================
async function loadCSV() {
    try {
        if (!currentSheetUrl) throw new Error('URL sheet belum dipilih');
        var response = await fetch(currentSheetUrl);
        if (!response.ok) throw new Error('Gagal fetch: ' + response.status);
        var csvText = await response.text();
        var lines = csvText.split('\n');
        var santriData = [];
        for (var i = 0; i < lines.length; i++) {
            var line = lines[i].trim();
            if (!line) continue;
            var firstPart = line.split(',')[0].trim();
            if (/^\d+$/.test(firstPart) && firstPart !== '') santriData.push(line);
        }
        allSantri = santriData.map(function(line) { return parseSantriLine(line); }).filter(function(s) { return s !== null; });
        document.getElementById('totalSantri').textContent = 'Total: ' + allSantri.length + ' santri';
        return true;
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('error').style.display = 'block';
        document.getElementById('error').innerHTML = '<p>❌ Gagal: ' + error.message + '</p>';
        return false;
    }
}

function parseSantriLine(line) {
    try {
        var parts = [];
        var current = '';
        var inQuotes = false;
        for (var i = 0; i < line.length; i++) {
            var char = line[i];
            if (char === '"') inQuotes = !inQuotes;
            else if (char === ',' && !inQuotes) { parts.push(current.trim()); current = ''; }
            else current += char;
        }
        parts.push(current.trim());
        if (parts.length < 20) return null;

        var csvOrder = ['EH01','EH02','EH03','EH04','EH05','EP1','EH06','EH07','EH08','EH09','EH10','EP2','EH11','EH12','EH13','EH14','EH15','EP3','EH16','EH17','EH18','EH19','EH20','EP4','EH21','EH22','EH23','EH24','EH25','EP5','EA'];
        var listNilaiStr = parts[19] || '';
        var nilaiArray = listNilaiStr.split(',').map(function(v) { return v.trim(); }).filter(function(v) { return v !== '' && !isNaN(parseInt(v)); }).map(function(v) { return parseInt(v); });
        var nilaiMap = {};
        for (var i = 0; i < csvOrder.length; i++) nilaiMap[csvOrder[i]] = i < nilaiArray.length ? nilaiArray[i] : null;

        var displayName = parts[1] || '';
        var title = '', gradeAkhir = '';
        if (displayName) { var m = displayName.match(/\|\s*(.+?)\s*•/); if (m) title = m[1].trim(); }
        if (displayName) { var m2 = displayName.match(/\|\s*(.+?)\s*\|/); if (m2) gradeAkhir = m2[1].trim(); }

        return {
            peringkat: parts[0] || '', nama: parts[2] || '', nip: parts[3] || '',
            keteranganEH: parts[5] || '0 EH', keteranganEP: parts[6] || '0 EP', keteranganEA: parts[7] || '0 EA',
            status: parts[8] || '', sisaSoalEA: parts[9] || '', finalRemark: parts[10] || '',
            peringkatSementara: parts[11] || '', peringkatAkhir: parts[12] || gradeAkhir,
            nilaiSementara: parseFloat((parts[13] || '0').replace(',', '.')) || 0,
            nilaiAkhir: parseFloat((parts[14] || '0').replace(',', '.')) || 0,
            skorSementara: parseInt(parts[15]) || 0, skorAkhir: parseInt(parts[16]) || 0, maxSkor: parseInt(parts[17]) || 300,
            totalDurasi: parts[18] ? parts[18].replace(',', '.') : '0',
            nilaiMap: nilaiMap, title: title, gradeAkhir: gradeAkhir
        };
    } catch (e) { console.error('Parse error:', e); return null; }
}

function getJadwalStatus(kode) {
    if (!currentJadwal) return 'tidak_ada_jadwal';
    var now = new Date();
    var jadwal = currentJadwal.find(function(j) { return j.kode === kode; });
    if (!jadwal) return 'tidak_ada';
    var mulai = new Date(jadwal.mulai);
    var akhir = new Date(jadwal.akhir);
    if (now < mulai) return 'belum_mulai';
    if (now >= mulai && now <= akhir) return 'sedang_berlangsung';
    return 'berakhir';
}

function formatTanggal(isoString) {
    var d = new Date(isoString);
    var hari = ['Minggu','Senin','Selasa','Rabu','Kamis','Jumat','Sabtu'];
    var bulan = ['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'];
    return hari[d.getDay()] + ', ' + d.getDate() + ' ' + bulan[d.getMonth()] + ' ' + d.getFullYear() + ' jam ' + String(d.getHours()).padStart(2,'0') + ':' + String(d.getMinutes()).padStart(2,'0') + ' WIB';
}

// Notif untuk BELUM mengerjakan (sedang berlangsung)
function getNotifBelum(kode) {
    if (!currentJadwal) return '';
    var jadwal = currentJadwal.find(function(j) { return j.kode === kode; });
    return '<div class="notif warning"><div class="notif-icon">⏳</div><div class="notif-title">Belum ' + kode + '</div><div class="notif-text">Yuk Ikhwah, Segera luangkan waktunya!</div><a href="https://edu.hsi.id" target="_blank" class="notif-btn">👉 Klik Edu.hsi.id</a><div class="notif-deadline">⏰ Berakhir: ' + formatTanggal(jadwal.akhir) + '</div></div>';
}

// Notif untuk SUDAH mengerjakan (nilai > 0) atau TERLEWAT (nilai == 0)
function getNotifSelesai(kode, nilai) {
    if (nilai === 0) {
        return '<div class="notif warning"><div class="notif-icon">⚠️</div><div class="notif-title">Alhamdulillah \'ala kulli hal</div><div class="notif-text">Antum terlewat ' + kode + '</div><div class="notif-doaa">Semoga Allah Ta\'ala mudahkan</div></div>';
    }
    return '<div class="notif success"><div class="notif-icon">✅</div><div class="notif-title">Alhamdulillah</div><div class="notif-text">Antum sudah ' + kode + '</div><div class="notif-doaa">Baarakallahu fiikum</div></div>';
}

// Cek apakah semua jadwal sudah berakhir
function semuaJadwalBerakhir() {
    if (!currentJadwal) return true;
    var now = new Date();
    for (var i = 0; i < currentJadwal.length; i++) {
        var akhir = new Date(currentJadwal[i].akhir);
        if (now < akhir) return false;
    }
    return true;
}

function cariEvaluasiBerikutnya(nilaiMap, finalRemark) {
    var remark = (finalRemark || '').trim().toLowerCase();
    
    // Cek GUGUR hanya jika SEMUA jadwal sudah berakhir (atau tidak ada jadwal)
    if (remark.includes('gugur') || remark.includes('tidak lulus')) {
        if (!currentJadwal || semuaJadwalBerakhir()) {
            return { notif: '<div class="final-remark gugur"><div class="final-remark-title">GUGUR</div></div>' };
        }
    }

    // Program lama tanpa jadwal
    if (!currentJadwal) {
        return { notif: '<div class="final-remark lanjut"><div class="final-remark-icon">🎓</div><div class="final-remark-title">SELAMAT</div><div class="final-remark-text">Data sudah lengkap</div><div class="final-remark-doaa">BAARAKALLAHU FIIKUM</div></div>' };
    }

    // Program terbaru dengan jadwal
    var csvOrder = ['EH01','EH02','EH03','EH04','EH05','EP1','EH06','EH07','EH08','EH09','EH10','EP2','EH11','EH12','EH13','EH14','EH15','EP3','EH16','EH17','EH18','EH19','EH20','EP4','EH21','EH22','EH23','EH24','EH25','EP5','EA'];
    
    // Cari evaluasi yang sedang berlangsung dan BELUM dikerjakan
    for (var i = 0; i < csvOrder.length; i++) {
        var kode = csvOrder[i];
        var nilai = nilaiMap[kode];
        var status = getJadwalStatus(kode);
        if (status === 'sedang_berlangsung' && (nilai === null || nilai === undefined)) {
            return { notif: getNotifBelum(kode) };
        }
    }

    // Jika tidak ada yang "Belum", cari evaluasi terakhir yang sudah berakhir atau sedang berlangsung (yang sudah ada nilainya)
    for (var i = csvOrder.length - 1; i >= 0; i--) {
        var kode = csvOrder[i];
        var nilai = nilaiMap[kode];
        var status = getJadwalStatus(kode);
        if ((status === 'berakhir' || status === 'sedang_berlangsung') && nilai !== null && nilai !== undefined) {
            return { notif: getNotifSelesai(kode, nilai) };
        }
    }

    // Jika semua belum mulai
    return { notif: '' };
}

// ============================================================
// PENCARIAN
// ============================================================
function searchSantri() {
    var term = document.getElementById('searchInput').value.trim().toLowerCase();
    var resultDiv = document.getElementById('result');
    var suggestionsDiv = document.getElementById('suggestions');
    suggestionsDiv.innerHTML = '';
    if (!term) { resultDiv.style.display = 'none'; return; }
    if (allSantri.length === 0) { alert('Data belum dimuat.'); return; }
    var results = allSantri.filter(function(s) { return s.nama.toLowerCase().includes(term) || s.nip.toLowerCase().includes(term); });
    if (results.length === 0) {
        resultDiv.style.display = 'block';
        resultDiv.innerHTML = '<div class="no-result">❌ Santri tidak ditemukan</div>';
    } else if (results.length === 1) displayResult(results[0]);
    else displaySuggestions(results);
}

function displaySuggestions(results) {
    document.getElementById('result').style.display = 'none';
    var html = '';
    for (var i = 0; i < results.length; i++) {
        var s = results[i];
        html += '<div class="suggestion-item" onclick="selectSantri(' + i + ')"><span class="suggestion-name">' + s.nama + '</span><span class="suggestion-rank">#' + s.peringkat + ' | ' + (s.peringkatAkhir || '-') + '</span></div>';
    }
    document.getElementById('suggestions').innerHTML = html;
    window._searchResults = results;
}

function selectSantri(index) {
    var s = window._searchResults[index];
    if (s) { document.getElementById('searchInput').value = s.nama; document.getElementById('suggestions').innerHTML = ''; displayResult(s); }
}

function displayResult(s) {
    currentSantriData = s; // Simpan data santri yang sedang ditampilkan
    var resultDiv = document.getElementById('result');
    
    var getNilaiColor = function(n) { return n >= 85 ? 'high' : n >= 60 ? 'medium' : 'low'; };
    var getStatusHTML = function(st) {
        if (!st) return '<span style="color:#666;">-</span>';
        var sl = st.toLowerCase();
        if (sl.includes('lulus') && !sl.includes('tidak')) return '<span style="color:#22a06b;font-weight:700;font-size:1.1em;">LULUS ✅</span>';
        if (sl.includes('tidak')) return '<span style="color:#d14343;font-weight:700;font-size:1.1em;">TIDAK LULUS ❌</span>';
        if (sl.includes('harus') || sl.includes('belum')) return '<span style="color:#e5942e;font-weight:700;font-size:1.1em;">HARUS EA ⚠️</span>';
        return '<span style="font-weight:600;">' + st + '</span>';
    };
    
    var notifResult = cariEvaluasiBerikutnya(s.nilaiMap, s.finalRemark);
    var notif = notifResult.notif;
    
    var getAngka = function(str) { var m = (str || '').trim().match(/^(\d+)/); return m ? parseInt(m[1]) : 0; };
    var ehNol = getAngka(s.keteranganEH) === 0;
    var epNol = getAngka(s.keteranganEP) === 0;
    var eaNol = getAngka(s.keteranganEA) === 0;
    var durasiDetik = parseFloat(s.totalDurasi);
    var formatDurasi = function(d) {
        if (isNaN(d)) return s.totalDurasi + ' detik';
        var m = Math.floor(d / 60); var det = Math.round(d % 60);
        if (m > 0) return m + 'm ' + det + 'd';
        return d.toLocaleString('id-ID') + ' detik';
    };

    var html = '';
    html += '<div class="result-card">';
    html += '<div class="santri-header">';
    html += '<div><div class="santri-name">' + s.nama + '</div><div class="nip-info">NIP: ' + s.nip + '</div></div>';
    html += '<div class="santri-rank"><span class="peringkat">Peringkat</span> ' + s.peringkat;
    if (s.peringkatAkhir) html += '<br><span style="font-size:0.85em">' + s.peringkatAkhir + '</span>';
    html += '</div></div>';
    
    html += '<div class="nilai-utama">';
    html += '<div class="nilai-box utama"><div class="nilai-box-label">📊 Nilai Sementara</div><div class="nilai-box-value ' + getNilaiColor(s.nilaiSementara) + '">' + s.nilaiSementara.toFixed(2) + '</div></div>';
    html += '<div class="nilai-box utama"><div class="nilai-box-label">🏆 Nilai Akhir</div><div class="nilai-box-value ' + getNilaiColor(s.nilaiAkhir) + '">' + s.nilaiAkhir.toFixed(2) + '</div></div>';
    html += '<div class="nilai-box utama"><div class="nilai-box-label">📝 Sisa Soal EA</div><div class="nilai-box-value medium">' + (s.sisaSoalEA || '-') + '</div><div class="nilai-box-sub">Status: ' + getStatusHTML(s.status) + '</div></div>';
    html += '<div class="nilai-box bolos-box"><div class="nilai-box-label">⚠️ Keterangan Bolos</div><div class="bolos-detail">';
    html += '<div class="bolos-item"><div class="bolos-label">EH</div><div class="bolos-value ' + (ehNol?'nol':'') + '">' + s.keteranganEH + '</div></div>';
    html += '<div class="bolos-item"><div class="bolos-label">EP</div><div class="bolos-value ' + (epNol?'nol':'') + '">' + s.keteranganEP + '</div></div>';
    html += '<div class="bolos-item"><div class="bolos-label">EA</div><div class="bolos-value ' + (eaNol?'nol':'') + '">' + s.keteranganEA + '</div></div>';
    html += '</div></div></div>';
    
    // Notif utama dengan ID agar bisa di-update saat klik tombol nilai
    html += '<div id="notif-utama">' + notif + '</div>';
    
    html += '<div class="info-detail"><div class="detail-grid">';
    html += '<div class="detail-item"><span class="detail-label">Skor Sementara</span><span class="detail-value">' + s.skorSementara + ' / ' + s.maxSkor + '</span></div>';
    html += '<div class="detail-item"><span class="detail-label">Skor Akhir</span><span class="detail-value">' + s.skorAkhir + ' / ' + s.maxSkor + '</span></div>';
    if (s.title) html += '<div class="detail-item"><span class="detail-label">Title</span><span class="detail-value">' + s.title + '</span></div>';
    html += '<div class="detail-item"><span class="detail-label">Total Durasi</span><span class="detail-value">' + formatDurasi(durasiDetik) + '</span></div>';
    html += '</div></div>';
    
    html += '<div class="list-nilai-section"><h3>📝 Nilai Santri ARN251 G15 <span style="font-size:0.7em;color:#5a8fa8;font-weight:400;">(Klik Kotak)</span></h3><div class="nilai-buttons">';
    html += buildNilaiButtons(s.nilaiMap);
    html += '</div></div></div>';
    
    resultDiv.innerHTML = html;
    resultDiv.style.display = 'block';
    resultDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function buildNilaiButtons(nilaiMap) {
    var urutanCSV = ['EH01','EH02','EH03','EH04','EH05','EP1','EH06','EH07','EH08','EH09','EH10','EP2','EH11','EH12','EH13','EH14','EH15','EP3','EH16','EH17','EH18','EH19','EH20','EP4','EH21','EH22','EH23','EH24','EH25','EP5','EA'];
    var html = '';
    for (var i = 0; i < urutanCSV.length; i++) {
        var label = urutanCSV[i];
        var nilai = nilaiMap[label];
        var cls = 'nilai-btn';
        var onclick = '';
        if (nilai === null || nilai === undefined) { cls += ' kosong'; }
        else { onclick = 'onclick="klikNilai(this,\'' + label + '\',' + nilai + ')"'; cls += ' ada-nilai'; }
        html += '<button class="' + cls + '" ' + onclick + ' data-label="' + label + '" data-nilai="' + (nilai !== null ? nilai : '') + '">' + label + '</button>';
    }
    return html;
}

// ============================================================
// KLIK NILAI (UPDATE NOTIF UTAMA)
// ============================================================
function klikNilai(btn, label, nilai) {
    var isShowing = btn.classList.contains('showing-value');
    if (isShowing) {
        // Unclick: kembalikan ke notif default
        btn.classList.remove('showing-value','nilai-0','nilai-1','nilai-2','nilai-3','nilai-4','active');
        btn.textContent = label;
        resetNotifUtama();
    } else {
        // Reset semua tombol lain
        var allBtns = document.querySelectorAll('.nilai-btn.showing-value');
        for (var i = 0; i < allBtns.length; i++) {
            var b = allBtns[i];
            b.classList.remove('showing-value','nilai-0','nilai-1','nilai-2','nilai-3','nilai-4','active');
            var lbl = b.getAttribute('data-label');
            if (lbl) b.textContent = lbl;
        }
        // Aktifkan tombol ini
        btn.classList.add('showing-value','active');
        if (nilai === 0) btn.classList.add('nilai-0');
        else if (nilai === 1) btn.classList.add('nilai-1');
        else if (nilai === 2) btn.classList.add('nilai-2');
        else if (nilai === 3) btn.classList.add('nilai-3');
        else if (nilai >= 4) btn.classList.add('nilai-4');
        btn.textContent = nilai;
        
        // Update notif utama dengan notif klik
        updateNotifUtama(label, nilai);
    }
}

// Ganti notif utama dengan notif Alhamdulillah atau sejenisnya
function updateNotifUtama(label, nilai) {
    var notifHtml = getNotifSelesai(label, nilai);
    var notifContainer = document.getElementById('notif-utama');
    if (notifContainer) {
        notifContainer.innerHTML = notifHtml;
    }
}

// Kembalikan notif utama ke notif default berdasarkan data santri
function resetNotifUtama() {
    if (!currentSantriData) return;
    var notifResult = cariEvaluasiBerikutnya(currentSantriData.nilaiMap, currentSantriData.finalRemark);
    var notifContainer = document.getElementById('notif-utama');
    if (notifContainer) {
        notifContainer.innerHTML = notifResult.notif;
    }
}

// ============================================================
// PILIHAN PROGRAM (SILSILAH TERBARU DI ATAS)
// ============================================================
function tampilkanPilihan() {
    var html = '';
    for (var i = DAFTAR_PROGRAM.length - 1; i >= 0; i--) {
        var prog = DAFTAR_PROGRAM[i];
        html += '<div class="program-card" onclick="pilihProgram(' + i + ')">';
        html += '<span class="program-card-icon">' + prog.icon + '</span>';
        html += '<div class="program-card-info">';
        html += '<div class="nama-program">' + prog.nama + '</div>';
        html += '<div class="kode-program">Klik untuk melihat nilai</div>';
        html += '</div></div>';
    }
    document.getElementById('programList').innerHTML = html;
}

function pilihProgram(index) {
    currentProgram = DAFTAR_PROGRAM[index];
    currentSheetUrl = currentProgram.sheetUrl;
    currentJadwal = (index === INDEX_PROGRAM_DENGAN_JADWAL) ? JADWAL_SILSILAH8 : null;
    
    document.getElementById('halamanPilihan').style.display = 'none';
    document.getElementById('halamanPencarian').style.display = 'block';
    document.getElementById('judulProgram').textContent = currentProgram.nama;
    
    document.getElementById('loading').style.display = 'block';
    loadCSV().then(function() {
        document.getElementById('loading').style.display = 'none';
    }).catch(function() {
        document.getElementById('loading').style.display = 'none';
    });
}

function kembaliKePilihan() {
    allSantri = [];
    currentSantriData = null;
    currentProgram = null;
    currentSheetUrl = '';
    currentJadwal = null;
    document.getElementById('result').style.display = 'none';
    document.getElementById('suggestions').innerHTML = '';
    document.getElementById('searchInput').value = '';
    document.getElementById('totalSantri').textContent = '';
    
    document.getElementById('halamanPencarian').style.display = 'none';
    document.getElementById('halamanPilihan').style.display = 'block';
}

// ============================================================
// EVENT LISTENER
// ============================================================
document.getElementById('searchInput').addEventListener('input', function(e) {
    var t = e.target.value.trim();
    if (t.length >= 2) searchSantri();
    else { document.getElementById('result').style.display = 'none'; document.getElementById('suggestions').innerHTML = ''; }
});
document.getElementById('searchInput').addEventListener('keypress', function(e) { if (e.key === 'Enter') searchSantri(); });
window.addEventListener('DOMContentLoaded', function() {
    tampilkanPilihan();
});
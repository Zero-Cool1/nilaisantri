let allSantri = [];

async function loadCSV() {
    try {
        const response = await fetch('data.csv');
        const csvText = await response.text();
        
        const lines = csvText.split('\n');
        const santriData = [];
        
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i].trim();
            if (!line) continue;
            const firstPart = line.split(',')[0].trim();
            if (/^\d+$/.test(firstPart) && firstPart !== '') {
                santriData.push(line);
            }
        }
        
        allSantri = santriData.map(line => parseSantriLine(line)).filter(s => s !== null);
        document.getElementById('totalSantri').textContent = `Total: ${allSantri.length} santri`;
        console.log('Sample:', allSantri[0]);
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
        let current = '';
        let inQuotes = false;
        
        for (let i = 0; i < line.length; i++) {
            const char = line[i];
            if (char === '"') { inQuotes = !inQuotes; }
            else if (char === ',' && !inQuotes) { parts.push(current.trim()); current = ''; }
            else { current += char; }
        }
        parts.push(current.trim());
        
        if (parts.length < 20) return null;
        
        const peringkat = parts[0] || '';
        const nama = parts[2] || '';
        const nip = parts[3] || '';
        
        // Jumlah Sisa/Bolos total (parts[4])
        const jumlahSisaRaw = parts[4] || '0';
        let sisaEH = 0, sisaEP = 0, sisaEA_bolos = 0;
        if (jumlahSisaRaw.includes(',')) {
            const p = jumlahSisaRaw.split(',').map(s => parseInt(s) || 0);
            sisaEH = p[0] || 0;
            sisaEP = p[1] || 0;
            sisaEA_bolos = p[2] || 0;
        } else {
            sisaEA_bolos = parseInt(jumlahSisaRaw) || 0;
        }
        
        // Keterangan Bolos per kategori
        const keteranganEH = parts[5] || '0 EH';
        const keteranganEP = parts[6] || '0 EP';
        const keteranganEA = parts[7] || '0 EA';
        
        // Status (parts[8])
        const status = parts[8] || '';
        
        // Sisa Soal EA (parts[9])
        const sisaSoalEA = parts[9] || '';
        
        // Final Remark (parts[10])
        const finalRemark = parts[10] || '';
        
        const peringkatSementara = parts[11] || '';
        const peringkatAkhir = parts[12] || '';
        const nilaiSementara = parseFloat((parts[13] || '0').replace(',', '.')) || 0;
        const nilaiAkhir = parseFloat((parts[14] || '0').replace(',', '.')) || 0;
        const skorSementara = parseInt(parts[15]) || 0;
        const skorAkhir = parseInt(parts[16]) || 0;
        const maxSkor = parseInt(parts[17]) || 300;
        const totalDurasi = parts[18] ? parts[18].replace(',', '.') : '0';
        
        // 31 Nilai dari parts[19]
        const listNilaiStr = parts[19] || '';
        const nilaiArray = listNilaiStr.split(',')
            .map(v => v.trim())
            .filter(v => v !== '' && !isNaN(parseInt(v)))
            .map(v => parseInt(v));
        
        const csvOrder = [
            'EH01','EH02','EH03','EH04','EH05','EP1',
            'EH06','EH07','EH08','EH09','EH10','EP2',
            'EH11','EH12','EH13','EH14','EH15','EP3',
            'EH16','EH17','EH18','EH19','EH20','EP4',
            'EH21','EH22','EH23','EH24','EH25','EP5',
            'EA'
        ];
        
        const nilaiMap = {};
        for (let i = 0; i < csvOrder.length; i++) {
            nilaiMap[csvOrder[i]] = i < nilaiArray.length ? nilaiArray[i] : null;
        }
        
        const displayName = parts[1] || '';
        let title = '';
        if (displayName) { const m = displayName.match(/\|\s*(.+?)\s*•/); if (m) title = m[1].trim(); }
        let gradeAkhir = '';
        if (displayName) { const m = displayName.match(/\|\s*(.+?)\s*\|/); if (m) gradeAkhir = m[1].trim(); }
        
        return {
            peringkat, nama, nip, title, gradeAkhir, status,
            sisaSoalEA, sisaEH, sisaEP, sisaEA_bolos,
            keteranganEH, keteranganEP, keteranganEA,
            peringkatSementara, peringkatAkhir: peringkatAkhir || gradeAkhir,
            nilaiSementara, nilaiAkhir, skorSementara, skorAkhir, maxSkor,
            totalDurasi, nilaiMap, finalRemark
        };
    } catch (e) { console.error('Parse error:', e); return null; }
}

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
    } else if (results.length === 1) { displayResult(results[0]); }
    else { displaySuggestions(results); }
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
    
    const getFinalRemarkHTML = (remark) => {
        if (!remark) return '';
        const r = remark.toLowerCase();
        if (r.includes('lanjut') || r.includes('lulus') || r.includes('mumtaz') || r.includes('jayyid') || r.includes('maqbul')) {
            return `
                <div class="final-remark lanjut">
                    <div class="final-remark-icon">🎉</div>
                    <div class="final-remark-title">SELAMAT</div>
                    <div class="final-remark-text">ANTUM LANJUT KE SILSILAH 8</div>
                    <div class="final-remark-doaa">BAARAKALLAHU FIIKUM</div>
                </div>`;
        } else if (r.includes('belum') || r.includes('harus')) {
            return `
                <div class="final-remark belum">
                    <div class="final-remark-title">Belum EA</div>
                </div>`;
        }
        return '';
    };
    
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
                    <div class="bolos-item"><div class="bolos-label">EH</div><div class="bolos-value ${s.sisaEH===0?'nol':''}">${s.keteranganEH || '0 EH'}</div></div>
                    <div class="bolos-item"><div class="bolos-label">EP</div><div class="bolos-value ${s.sisaEP===0?'nol':''}">${s.keteranganEP || '0 EP'}</div></div>
                    <div class="bolos-item"><div class="bolos-label">EA</div><div class="bolos-value ${s.sisaEA_bolos===0?'nol':''}">${s.keteranganEA || '0 EA'}</div></div>
                </div>
            </div>
        </div>
        
        ${getFinalRemarkHTML(s.finalRemark)}
        
        <div class="info-detail">
            <div class="detail-grid">
                <div class="detail-item"><span class="detail-label">Skor Sementara</span><span class="detail-value">${s.skorSementara} / ${s.maxSkor}</span></div>
                <div class="detail-item"><span class="detail-label">Skor Akhir</span><span class="detail-value">${s.skorAkhir} / ${s.maxSkor}</span></div>
                ${s.title ? `<div class="detail-item"><span class="detail-label">Title</span><span class="detail-value">${s.title}</span></div>` : ''}
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
        let cls = 'nilai-btn';
        let onclick = '';
        if (nilai === null || nilai === undefined) { cls += ' kosong'; }
        else { onclick = `onclick="klikNilai(this,'${label}',${nilai})"`; cls += ' ada-nilai'; }
        html += `<button class="${cls}" ${onclick} data-label="${label}" data-nilai="${nilai !== null ? nilai : ''}">${label}</button>`;
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
            const lbl = b.getAttribute('data-label');
            if (lbl) b.textContent = lbl;
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
    if (ok) console.log('✅ Siap - PWA ready');
});
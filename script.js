// Tansiyon kayıtlarını localStorage'da saklayacağız
let records = JSON.parse(localStorage.getItem('tansiyonRecords')) || [];

// Kayıt ekleme fonksiyonu
function saveRecord() {
    // Form değerlerini al
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;
    const systolic = document.getElementById('systolic').value;
    const diastolic = document.getElementById('diastolic').value;
    const pulse = document.getElementById('pulse').value;
    const note = document.getElementById('note').value;

    // Zorunlu alanları kontrol et
    if (!date || !time || !systolic || !diastolic || !pulse) {
        alert('Lütfen zorunlu alanları doldurun (Not hariç tüm alanlar)');
        return;
    }

    // Yeni kaydı oluştur
    const newRecord = {
        id: Date.now(), // benzersiz ID
        date,
        time,
        systolic,
        diastolic,
        pulse,
        note
    };

    // Kaydı diziye ekle
    records.unshift(newRecord); // En yeni kayıt en üstte görünsün

    // localStorage'a kaydet
    localStorage.setItem('tansiyonRecords', JSON.stringify(records));

    // Tabloyu güncelle
    displayRecords();

    // Formu temizle
    clearForm();

    // Başarılı mesajı göster
    alert('Kayıt başarıyla eklendi!');
}

// Kayıtları tabloda gösterme fonksiyonu
function displayRecords() {
    const tbody = document.getElementById('recordsTable');
    tbody.innerHTML = ''; // Tabloyu temizle

    records.forEach(record => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${formatDate(record.date)}</td>
            <td>${record.time}</td>
            <td>${record.systolic}</td>
            <td>${record.diastolic}</td>
            <td>${record.pulse}</td>
            <td>${record.note || '-'}</td>
            <td>
                <button onclick="deleteRecord(${record.id})" class="delete-btn">
                    Sil
                </button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Tarihi formatla
function formatDate(dateStr) {
    const [year, month, day] = dateStr.split('-');
    return `${day}/${month}/${year}`;
}

// Formu temizle
function clearForm() {
    document.getElementById('date').value = '';
    document.getElementById('time').value = '';
    document.getElementById('systolic').value = '';
    document.getElementById('diastolic').value = '';
    document.getElementById('pulse').value = '';
    document.getElementById('note').value = '';
}

// Kayıt silme fonksiyonu
function deleteRecord(id) {
    if (confirm('Bu kaydı silmek istediğinizden emin misiniz?')) {
        records = records.filter(record => record.id !== id);
        localStorage.setItem('tansiyonRecords', JSON.stringify(records));
        displayRecords();
    }
}

// Sayfa yüklendiğinde kayıtları göster
document.addEventListener('DOMContentLoaded', () => {
    // Bugünün tarihini form'a ekle
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('date').value = today;
    
    // Mevcut kayıtları göster
    displayRecords();
});
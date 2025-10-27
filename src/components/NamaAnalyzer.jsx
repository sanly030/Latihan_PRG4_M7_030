import React, { useState } from 'react';

const NamaAnalyzer = () => {
    const [nama, setNama] = useState('');
    const [panjangNama, setPanjangNama] = useState(0);
    const [jumlahKata, setJumlahKata] = useState(0);
    const [total, setTotal] = useState(0);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Menghapus spasi dari nama untuk menghitung panjang nama
        const namaTanpaSpasi = nama.replace(/\s+/g, '');
        const panjangNamaBaru = namaTanpaSpasi.length;

        // Menghitung jumlah kata dengan memisahkan berdasarkan spasi
        const kataArray = nama.trim().split(/\s+/); // split by spaces
        const jumlahKataBaru =kataArray.length;

        // Mengupdate state
        setPanjangNama(panjangNamaBaru);
        setJumlahKata(jumlahKataBaru);
        setTotal(panjangNamaBaru + jumlahKataBaru);
    };

    return (
        <div style={{margin: '50px auto', textAlign: 'center'}}>
            <h2>Analisis Nama</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Masukkan Nama:
                    <input
                        type="text"
                        value={nama}
                        onChange={(e) => setNama(e.target.value)}
                        style={{marginLeft: '10px'}}
                    />
                </label>
                <br/>
                <button type="submit" style={{marginTop: '10px'}}>Hitung</button>
            </form>
            <div style={{marginTop: '20px'}}>
                <p>Panjang Nama: {panjangNama}</p>
                <p>Jumlah Kata: {jumlahKata}</p>
                <p><strong>Total: {total}</strong></p>
            </div>
        </div>
    );
};

export default NamaAnalyzer;

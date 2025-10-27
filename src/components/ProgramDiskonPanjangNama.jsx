import React, { useState } from 'react';

const ProgramDiskonPanjangNama = () => {
  const [totalPrice, setTotalPrice] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [results, setResults] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Validasi input
    if (!totalPrice || !customerName.trim()) {
      setError('Harap isi semua field dengan benar!');
      return;
    }

    const price = parseFloat(totalPrice);
    if (isNaN(price) || price <= 0) {
      setError('Harga total harus berupa angka positif!');
      return;
    }

    // Menghitung panjang nama tanpa spasi
    const nameWithoutSpaces = customerName.replace(/\s+/g, '');
    const nameLength = nameWithoutSpaces.length;

    // Menghitung diskon (1% per karakter)
    const discountPercentage = nameLength;
    const discountAmount = (price * discountPercentage) / 100;
    const finalPrice = Math.max(0, price - discountAmount); // Prevent negative price

    // Mengupdate hasil
    setResults({
      nameLength,
      discountPercentage,
      discountAmount,
      finalPrice,
      originalPrice: price
    });
  };

  const handleReset = () => {
    setTotalPrice('');
    setCustomerName('');
    setResults(null);
    setError('');
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Calculate savings percentage
  const calculateSavings = () => {
    if (!results) return 0;
    return ((results.originalPrice - results.finalPrice) / results.originalPrice * 100).toFixed(1);
  };

  return (
    <div style={{
      maxWidth: '500px',
      margin: '50px auto',
      padding: '2rem',
      backgroundColor: '#fff',
      borderRadius: '12px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h2 style={{
        textAlign: 'center',
        color: '#2c3e50',
        marginBottom: '1.5rem',
        fontSize: '1.5rem'
      }}>
        Program Diskon Berdasarkan Panjang Nama
      </h2>
      
      <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{
            display: 'block',
            marginBottom: '0.5rem',
            fontWeight: '500',
            color: '#34495e'
          }}>
            Harga Total Pembelian:
          </label>
          <input
            type="number"
            value={totalPrice}
            onChange={(e) => setTotalPrice(e.target.value)}
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '2px solid #e1e8ed',
              borderRadius: '6px',
              fontSize: '1rem',
              transition: 'border-color 0.3s ease'
            }}
            placeholder="Masukkan harga total"
            min="0"
            step="1000"
          />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label style={{
            display: 'block',
            marginBottom: '0.5rem',
            fontWeight: '500',
            color: '#34495e'
          }}>
            Nama Pelanggan:
          </label>
          <input
            type="text"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '2px solid #e1e8ed',
              borderRadius: '6px',
              fontSize: '1rem',
              transition: 'border-color 0.3s ease'
            }}
            placeholder="Masukkan nama pelanggan"
          />
          <small style={{ color: '#7f8c8d', fontSize: '0.8rem', marginTop: '0.25rem', display: 'block' }}>
            Panjang nama: {customerName.replace(/\s+/g, '').length} karakter (tanpa spasi)
          </small>
        </div>

        {error && (
          <div style={{
            backgroundColor: '#fee',
            color: '#c0392b',
            padding: '0.75rem',
            borderRadius: '6px',
            border: '1px solid #f5b7b1',
            marginBottom: '1rem',
            fontSize: '0.9rem'
          }}>
            {error}
          </div>
        )}

        <div style={{
          display: 'flex',
          gap: '1rem',
          marginTop: '1.5rem'
        }}>
          <button
            type="submit"
            style={{
              flex: '2',
              backgroundColor: '#27ae60',
              color: 'white',
              border: 'none',
              padding: '0.75rem 1.5rem',
              borderRadius: '6px',
              fontSize: '1rem',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#219a52'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#27ae60'}
          >
            Hitung Diskon
          </button>
          <button
            type="button"
            onClick={handleReset}
            style={{
              flex: '1',
              backgroundColor: '#95a5a6',
              color: 'white',
              border: 'none',
              padding: '0.75rem 1.5rem',
              borderRadius: '6px',
              fontSize: '1rem',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#7f8c8d'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#95a5a6'}
          >
            Reset
          </button>
        </div>
      </form>

      {results && (
        <div style={{
          padding: '1.5rem',
          backgroundColor: '#f8f9fa',
          borderRadius: '8px',
          border: '1px solid #e1e8ed',
          marginBottom: '1.5rem'
        }}>
          <h3 style={{
            textAlign: 'center',
            color: '#2c3e50',
            marginBottom: '1rem',
            fontSize: '1.2rem'
          }}>
            Hasil Perhitungan Diskon
          </h3>
          
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0.75rem 0',
            borderBottom: '1px solid #e1e8ed'
          }}>
            <span>Panjang Nama:</span>
            <strong>{results.nameLength} karakter</strong>
          </div>
          
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0.75rem 0',
            borderBottom: '1px solid #e1e8ed'
          }}>
            <span>Persentase Diskon:</span>
            <strong style={{ color: '#e74c3c' }}>{results.discountPercentage}%</strong>
          </div>
          
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0.75rem 0',
            borderBottom: '1px solid #e1e8ed'
          }}>
            <span>Total Diskon:</span>
            <strong style={{ color: '#e74c3c' }}>{formatCurrency(results.discountAmount)}</strong>
          </div>
          
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0.75rem 0',
            borderBottom: '1px solid #e1e8ed'
          }}>
            <span>Harga Awal:</span>
            <strong>{formatCurrency(results.originalPrice)}</strong>
          </div>
          
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0.75rem 0'
          }}>
            <span>Harga Setelah Diskon:</span>
            <strong style={{
              color: '#27ae60',
              fontSize: '1.1rem',
              fontWeight: 'bold'
            }}>
              {formatCurrency(results.finalPrice)}
            </strong>
          </div>

          {results.discountPercentage > 0 && (
            <div style={{
              marginTop: '1rem',
              padding: '0.75rem',
              backgroundColor: '#d5f4e6',
              borderRadius: '6px',
              textAlign: 'center',
              border: '1px solid #27ae60'
            }}>
              <strong style={{ color: '#27ae60' }}>
                💰 Anda hemat {calculateSavings()}% dari harga awal!
              </strong>
            </div>
          )}
        </div>
      )}

      <div style={{
        marginTop: '2rem',
        padding: '1rem',
        backgroundColor: '#e3f2fd',
        border: '1px solid #bbdefb',
        borderRadius: '6px',
        fontSize: '0.9rem',
        color: '#1565c0'
      }}>
        <p style={{ margin: '0.25rem 0', fontWeight: 'bold', color: '#0d47a1' }}>📋 Ketentuan Diskon:</p>
        <p style={{ margin: '0.25rem 0' }}>• Setiap huruf dalam nama memberikan diskon 1% per karakter</p>
        <p style={{ margin: '0.25rem 0' }}>• Spasi tidak dihitung sebagai tambahan diskon</p>
        <p style={{ margin: '0.25rem 0' }}>• Contoh: "Budi Jan" = 7 karakter = 7% diskon</p>
        <p style={{ margin: '0.25rem 0' }}>• Maksimal diskon tidak dibatasi</p>
      </div>
    </div>
  );
};

export default ProgramDiskonPanjangNama;
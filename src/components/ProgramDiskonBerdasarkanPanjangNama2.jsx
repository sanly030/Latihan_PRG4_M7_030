import React, { useState } from 'react';

const ProgramDiskonBerdasarkanPanjangNama2 = () => {
  const [totalPrice, setTotalPrice] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [results, setResults] = useState(null);
  const [error, setError] = useState('');

  // Fungsi untuk menghitung jumlah huruf vokal
  const countVowels = (name) => {
    const vowels = 'aiueoAIUEO';
    let count = 0;
    for (let char of name) {
      if (vowels.includes(char)) {
        count++;
      }
    }
    return count;
  };

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

    // Menghitung jumlah huruf vokal tanpa spasi
    const nameWithoutSpaces = customerName.replace(/\s+/g, '');
    const vowelCount = countVowels(nameWithoutSpaces);
    
    // Menghitung diskon (1% per vokal, maksimal 10%)
    const discountPercentage = Math.min(vowelCount, 10);
    const discountAmount = (price * discountPercentage) / 100;
    const finalPrice = Math.max(0, price - discountAmount);

    // Mengupdate hasil
    setResults({
      vowelCount,
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

  // Menghitung persentase penghematan
  const calculateSavings = () => {
    if (!results) return 0;
    return ((results.originalPrice - results.finalPrice) / results.originalPrice * 100).toFixed(1);
  };

  return (
    <div style={{
      maxWidth: '500px',
      margin: '0 auto',
      padding: '2rem',
      fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif'
    }}>
      <div style={{
        textAlign: 'center',
        marginBottom: '2rem',
        borderBottom: '1px solid #eaeaea',
        paddingBottom: '1rem'
      }}>
        <h2 style={{
          color: '#2c3e50',
          marginBottom: '0.5rem',
          fontSize: '1.5rem',
          fontWeight: '600'
        }}>
          Program Diskon Berdasarkan Panjang Nama 2
        </h2>
        <p style={{
          color: '#7f8c8d',
          fontSize: '0.9rem'
        }}>
          Diskon berdasarkan jumlah huruf vokal dalam nama
        </p>
      </div>
      
      <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{
            display: 'block',
            marginBottom: '0.5rem',
            fontWeight: '500',
            color: '#34495e',
            fontSize: '0.95rem'
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
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '1rem',
              transition: 'border-color 0.3s ease'
            }}
            placeholder="Masukkan harga total"
            min="0"
            step="1000"
          />
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{
            display: 'block',
            marginBottom: '0.5rem',
            fontWeight: '500',
            color: '#34495e',
            fontSize: '0.95rem'
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
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '1rem',
              transition: 'border-color 0.3s ease'
            }}
            placeholder="Masukkan nama pelanggan"
          />
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '0.5rem',
            fontSize: '0.8rem',
            color: '#7f8c8d'
          }}>
            <span>Jumlah huruf vokal: {countVowels(customerName.replace(/\s+/g, ''))}</span>
            <span>Maksimal diskon: 10%</span>
          </div>
        </div>

        {error && (
          <div style={{
            backgroundColor: '#fee',
            color: '#c0392b',
            padding: '0.75rem',
            borderRadius: '4px',
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
          marginTop: '1rem'
        }}>
          <button
            type="submit"
            style={{
              flex: '2',
              backgroundColor: '#3498db',
              color: 'white',
              border: 'none',
              padding: '0.75rem 1.5rem',
              borderRadius: '4px',
              fontSize: '1rem',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'background-color 0.3s ease'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#2980b9'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#3498db'}
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
              borderRadius: '4px',
              fontSize: '1rem',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'background-color 0.3s ease'
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
          marginTop: '2rem',
          padding: '1.5rem',
          backgroundColor: '#f8f9fa',
          borderRadius: '6px',
          border: '1px solid #eaeaea'
        }}>
          <h3 style={{
            color: '#2c3e50',
            marginBottom: '1rem',
            textAlign: 'center',
            fontSize: '1.2rem',
            fontWeight: '600'
          }}>
            Hasil Perhitungan Diskon
          </h3>
          
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '0.5rem 0',
              borderBottom: '1px solid #eaeaea'
            }}>
              <span style={{ color: '#34495e', fontWeight: '500' }}>Jumlah Huruf Vokal:</span>
              <span style={{ color: '#2c3e50', fontWeight: '600' }}>{results.vowelCount} karakter</span>
            </div>
            
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '0.5rem 0',
              borderBottom: '1px solid #eaeaea'
            }}>
              <span style={{ color: '#34495e', fontWeight: '500' }}>Persentase Diskon:</span>
              <span style={{ color: '#e74c3c', fontWeight: '600' }}>{results.discountPercentage}%</span>
            </div>
            
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '0.5rem 0',
              borderBottom: '1px solid #eaeaea'
            }}>
              <span style={{ color: '#34495e', fontWeight: '500' }}>Total Diskon:</span>
              <span style={{ color: '#e74c3c', fontWeight: '600' }}>{formatCurrency(results.discountAmount)}</span>
            </div>
            
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '0.5rem 0',
              borderBottom: '1px solid #eaeaea'
            }}>
              <span style={{ color: '#34495e', fontWeight: '500' }}>Harga Awal:</span>
              <span style={{ color: '#2c3e50', fontWeight: '600' }}>{formatCurrency(results.originalPrice)}</span>
            </div>
            
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '0.5rem 0'
            }}>
              <span style={{ color: '#34495e', fontWeight: '500' }}>Harga Setelah Diskon:</span>
              <span style={{
                color: '#27ae60',
                fontSize: '1.1rem',
                fontWeight: '600'
              }}>
                {formatCurrency(results.finalPrice)}
              </span>
            </div>
          </div>

          {results.discountPercentage > 0 && (
            <div style={{
              marginTop: '1rem',
              padding: '0.75rem',
              backgroundColor: '#d5f4e6',
              borderRadius: '4px',
              textAlign: 'center',
              border: '1px solid #27ae60',
              color: '#27ae60',
              fontWeight: '600'
            }}>
              <strong>Anda hemat {calculateSavings()}% dari harga awal!</strong>
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
      </div>
    </div>
  );
};

export default ProgramDiskonBerdasarkanPanjangNama2;

<script>
  function perbaruiWaktu() {
    const sekarang = new Date();

    document.getElementById('jam').textContent =
      sekarang.toLocaleTimeString('id-ID');

    document.getElementById('tanggal').textContent =
      sekarang.toLocaleDateString('id-ID', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
  }

  perbaruiWaktu();
  setInterval(perbaruiWaktu, 1000);

  const form = document.getElementById('formAbsen');
  const tombol = document.getElementById('tombol');
  const pesan = document.getElementById('pesan');

  function tampilkanPesan(teks, tipe) {
    pesan.textContent = teks;
    pesan.className = tipe;
  }

  form.addEventListener('submit', function(e) {
    e.preventDefault();

    const data = {
      nama: document.getElementById('nama').value.trim(),
      kelas: document.getElementById('kelas').value.trim(),
      id: document.getElementById('id').value.trim(),
      status: document.querySelector(
        'input[name="status"]:checked'
      ).value,
      keterangan: document.getElementById('keterangan').value.trim()
    };

    if (!data.nama || !data.kelas) {
      tampilkanPesan('Nama dan kelas wajib diisi.', 'error');
      return;
    }

    tombol.disabled = true;
    tombol.textContent = 'Menyimpan...';
    pesan.className = '';

    google.script.run
      .withSuccessHandler(function(hasil) {
        tampilkanPesan(hasil.message, 'sukses');
        form.reset();
        tombol.disabled = false;
        tombol.textContent = 'Kirim Absen';
      })
      .withFailureHandler(function(error) {
        tampilkanPesan(
          error.message || 'Gagal menyimpan data.',
          'error'
        );
        tombol.disabled = false;
        tombol.textContent = 'Kirim Absen';
      })
      .simpanAbsen(data);
  });
</script>

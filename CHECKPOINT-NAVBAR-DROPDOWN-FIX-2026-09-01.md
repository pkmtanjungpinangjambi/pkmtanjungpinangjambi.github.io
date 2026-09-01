# CHECKPOINT — NAVBAR DROPDOWN FIX 2026-09-01

Branch: `feat/informasi-social-cards-2026-09-01`
PR: #178
Base: `main` @ `a041a1a07c27d0fa60dc199e01ce2dfe5c690fd3`
Fix commit: `e5d2597733ef808b3f928e464bb623a1a74b1d86`

## Temuan
Panah/caret di sebelah menu utama (`Profil`, `Pelayanan`, `Informasi`) tampil tetapi tidak selalu dapat membuka submenu karena navbar dibangun ulang oleh `script.js`, sementara handler klik lama dipasang oleh script yang dimuat dinamis.

## Perbaikan
- Tambah `bindDropdownCaretControls()` di `script.js`.
- Handler dipasang segera setelah `canonicalNavigation()` membangun navbar.
- Event menggunakan capture phase agar tetap menangani klik sebelum handler lain.
- Klik caret membuka/menutup `.nav-item-dropdown` melalui class `.open`.
- Dropdown lain ditutup saat satu dropdown dibuka.
- `aria-expanded` ikut diperbarui untuk aksesibilitas.
- Struktur menu dan tujuan link tidak diubah.

## QC
- JS syntax check: PASS.
- Code review: PASS.
- `main` tidak diubah langsung.
- PR #178 tetap menjadi tempat perubahan sampai review/merge selesai.
- Live browser verification belum tersedia pada sesi ini karena keterbatasan akses jaringan/runtime.

## Next
Setelah dropdown terverifikasi di preview/browser, lanjutkan review PR #178. Instagram tetap menunggu aset final.

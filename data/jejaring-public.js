/**
 * Kontrak data publik jejaring pelayanan primer.
 * Metadata saja — tidak memuat identitas kader, pasien, NIK, atau rekam medis.
 *
 * Posyandu bukan klaster Puskesmas. Dalam arsitektur ini Posyandu dikelola
 * melalui fungsi Manajemen Jejaring Klaster 1 dan dapat melayani sasaran
 * beberapa klaster berdasarkan siklus hidup.
 */
window.JEJARING_PUBLIC = Object.freeze({
  updatedAt: '2026-09-04',
  networks: [
    {
      id: 'posyandu',
      type: 'Posyandu',
      managementClusterId: 'klaster-1',
      serviceClusterIds: ['klaster-2', 'klaster-3'],
      count: 42,
      countLabel: '42 Posyandu aktif · Profil Puskesmas 2025',
      scope: 'Jejaring pelayanan kesehatan primer berbasis masyarakat',
      functions: [
        'Pelayanan berdasarkan siklus hidup',
        'Pencatatan hasil kegiatan',
        'Validasi dan sinkronisasi data',
        'Pemantauan wilayah setempat (PWS)',
        'Promosi dan pemberdayaan masyarakat'
      ],
      localSchedule: 'Ditetapkan per Posyandu/wilayah dan dipublikasikan setelah terverifikasi'
    },
    {
      id: 'pustu',
      type: 'Puskesmas Pembantu',
      managementClusterId: 'klaster-1',
      serviceClusterIds: ['klaster-2', 'klaster-3', 'klaster-4', 'klaster-5'],
      count: 3,
      countLabel: '3 Puskesmas Pembantu',
      names: ['Kasang Jaya', 'Sijenjang I', 'Sijenjang II'],
      scope: 'Jaringan pelayanan Puskesmas di wilayah kerja',
      functions: ['Pelayanan primer', 'Promotif dan preventif', 'Pencatatan', 'Rujukan/koordinasi']
    }
  ]
});

let mong = require('mongoose');

let dokter = mong.Schema({
	KdDokter : String,
	NamaDokter : String,
	Spesialis : String,
	HariTugas : String,
	JamTugasMulai : String,
	JamTugasSelesai : String,
	keteranganTambahan: String
});

let Dokter = module.exports = mong.model("Dokter", dokter, "Dokter");

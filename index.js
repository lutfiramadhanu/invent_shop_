const express = require('express');
const mysql = require('mysql');
const hbs = require('hbs');
const bodyParser = require('body-parser');



const index = express();
const port = 3000;

// view engine hbs
index.set('view egine', 'hbs');

//setting parser data dari mysql ke indexjs
index.use(bodyParser.json());
index.use(bodyParser.urlencoded({ extended: false}));

const koneksi = mysql.createConnection({
    host: 'localhost',
    user: 'lutfi',
    password: '0000',
    database: 'invent_shop_'
});

koneksi.connect((err) => {
    if(err) throw err;
    console.log("koneksi database berhasil disambungkan");
})

index.get('/', (req, res) => {
    koneksi.query('use invent_shop_', (err, hasil) => {
        if(err) throw err;
        res.render('home.hbs',{
            judulhalaman: 'DATA-DATA',
            data: hasil
        });
    });
});

index.get('/pelanggan', (req, res) => {
    koneksi.query('SELECT*FROM pelanggan', (err, hasil) => {
        if(err) throw err;
        res.render('pelanggan.hbs',{
            judulhalaman: 'DATA-PELANGGAN',
            data: hasil
        });
    });
});

index.post('/pelanggan', (req, res) =>{
    var nama = req.body.inputnama;
    var alamat = req.body.inputalamat;
    var telepon = req.body.inputtelepon;
    koneksi.query('INSERT INTO pelanggan(nama, alamat, telepon)values(?,?,?)',
    [nama, alamat, telepon],
    (err, hasil) => {
        if(err) throw err;
        res.redirect('/pelanggan');
    }
    )
});

index.get('/hapus-nama/:nama', (req, res) => {
    var nama = req.params.nama;
    koneksi.query("DELETE FROM pelanggan WHERE nama=?",
         [nama], (err, hasil) => {
             if(err) throw err;
             res.redirect('/pelanggan');
         }
    )
});


index.get('/penjualan', (req, res) => {
    koneksi.query('SELECT*FROM penjualan', (err, hasil) => {
        if(err) throw err;
        res.render('penjualan.hbs',{
            judulhalaman: 'DATA-PENJUALAN',
            data: hasil
        });
    });
});

index.post('/penjualan', (req, res) =>{
    var nama_barang = req.body.inputnama_barang;
    var jumlah = req.body.inputjumlah;
    var harga = req.body.inputharga;
    koneksi.query('INSERT INTO penjualan(nama_barang, jumlah, harga)values(?,?,?)',
    [nama_barang, jumlah, harga],
    (err, hasil) => {
        if(err) throw err;
        res.redirect('/penjualan');
    }
    )
});

index.get('/hapus-nama_barang/:nama_barang', (req, res) => {
    var nama_barang = req.params.nama_barang;
    koneksi.query("DELETE FROM penjualan WHERE nama_barang=?",
         [nama_barang], (err, hasil) => {
             if(err) throw err;
             res.redirect('/penjualan');
         }
    )
});

index.get('/pendapatan', (req, res) => {
    koneksi.query('SELECT*FROM pendapatan', (err, hasil) => {
        if(err) throw err;
        res.render('pendapatan.hbs',{
            judulhalaman: 'DATA-PENDAPATAN',
            data: hasil
        });
    });
});

index.post('/pendapatan', (req, res) =>{
    var keterangan = req.body.inputketerangan;
    var jumlah = req.body.inputjumlah;
    koneksi.query('INSERT INTO pendapatan(keterangan, jumlah)values(?,?)',
    [keterangan, jumlah],
    (err, hasil) => {
        if(err) throw err;
        res.redirect('/pendapatan');
    }
    )
});

index.get('/hapus-id_transaksi/:id_transaksi', (req, res) => {
    var id_transaksi = req.params.id_transaksi;
    koneksi.query("DELETE FROM pendapatan WHERE id_transaksi=?",
         [id_transaksi], (err, hasil) => {
             if(err) throw err;
             res.redirect('/pendapatan');
         }
    )
});

index.listen(port, () => {
    console.log(`app INVENT-SHOP berjalan pada port ${port}`);
});
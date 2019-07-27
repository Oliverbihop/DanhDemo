// lấy danh sách người dùng từ backend
$(document).ready(function() {
    var mangNguoiDung = [];
    var nguoiDungService = new NguoiDungService();
    var ajaxNguoiDung = nguoiDungService.LayDanhSachNguoiDung();
    ajaxNguoiDung.
    done(function(res) {
        mangNguoiDung = res;
        console.log(mangNguoiDung);
        //luu vao local storage

        HienThi(mangNguoiDung);

    }).
    fail(function(error) {
        console.log(error);
    })


    function HienThi(mangHienThi) {
        var content = "";
        var tableDanhSach = $("#tblDanhSachNguoiDung")
        mangHienThi.map(function(nguoiDung, index) {
            content += ` 
       <tr>
       <td>${index+1} </td>
       <td>${nguoiDung.TaiKhoan } </td>
       <td>${nguoiDung.MatKhau } </td>
       <td>${nguoiDung.HoTen } </td>
       <td>${nguoiDung.Email } </td>
       <td>${nguoiDung.SoDT } </td>
       <td><button class="btn btn-danger btnXoa" data-id="${nguoiDung.TaiKhoan}" >Xóa</button></td>


       </tr> 
        
        
        `
        })
        tableDanhSach.html(content);
    }
    $("#btnThemNguoiDung").click(function() {
        $("#modal-title").html("Them Nguoi Dung");
        var btn = ` 
            <button class="btn btn-success" id="btnThem">Them </button>
            `
        $("#modal-footer").html(btn);

    });

    $("body").delegate("#btnThem", "click", function() {
        //lay Thong tin

        var taiKhoan = $("#TaiKhoan").val();
        var hoTen = $("#HoTen").val();
        var MatKhau = $("#MatKhau").val();
        var Email = $("#Email").val();
        var soDT = $("#SoDienThoai").val();
        var maLoai = $("#MaLoaiNguoiDung").val();

        //tao doi tuong
        var nguoiDung = new NguoiDung(taiKhoan, MatKhau, hoTen, Email, soDT, maLoai);

        // them vao database (API)
        nguoiDungService.ThemNguoiDung(nguoiDung)
            .done(function(res) {
                console.log(res);
                location.reload();

            })
            .fail(function(err) {
                console.log(err);

            })
    })


    $("body").delegate(".btnXoa", "click", function() {
        var taiKhoan = $(this).data("id");
        nguoiDungService.XoaNguoiDung(taiKhoan)
            .done(function() {
                location.reload();
            })
            .fail(function(err) {
                console.log(err);

            })
    })
})
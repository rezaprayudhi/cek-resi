$('#search-resi').click(function(){

    $.ajax({
        url:'https://api.binderbyte.com/v1/track',
        type: 'get',
        dataType: 'json',
        data:{
            'api_key' : '081947901b095f6c0d14ac294f91a1347597fc19777c32d98c2c0c4e5dfa2674',
            'courier' : $('#jasa-pengiriman').val(),
            'awb' : $('#no-resi').val()
        },
        success: function(result){
            if(result.status == "200"){
                let resi = result.data;

                console.log(resi);

                $('#hasil-pencarian').html(`
                <table class="table table-bordered">
                    <tbody>
                        <tr>
                            <td>Nomor Resi</th>
                            <td>`+ resi.summary.awb +`</td>
                        </tr>
                        <tr>
                            <td>Jasa Pengiriman</th>
                            <td>`+ resi.summary.courier +`</td>
                        </tr>
                        <tr>
                            <td>Jenis Servis</th>
                            <td>`+ resi.summary.service +`</td>
                        </tr>
                        <tr>
                            <td>Status Pengiriman</th>
                            <td>`+ resi.summary.status +`</td>
                        </tr>
                        <tr>
                            <td>Tanggal Terima</th>
                            <td>`+ resi.summary.date +`</td>
                        </tr>
                    </tbody>
                </table>
                `);

                $.each(resi.history, function(i, item){
                    $('#history-pengiriman').append(`
                    <div class="card mb-4">
                        <div class="card-body">
                            <p>`+ item.date +`</p>
                            <p>`+ item.desc +`</p>
                            <p>`+ item.location +`</p>
                        </div>
                    </div>
                    `);

                })
            } else {
                $('#hasil-pencarian').html(`
                    <h4>`+ result.message +`</h4>
                `)
            }
        }
    });

});
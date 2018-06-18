setInterval(load_data, 1000);

function load_data() {
  $.ajax({
    type: "GET",
    url: "/dataList",
    success: function(data) {
      var content = "<tr><td>ID</td><td>파일이름</td>" +
        "<td>판매자 지갑주소</td><td>가격</td></tr>";
      for (var i = 0; i < data.length; i++) {
        var c = data[i];
        var d = "<tr>";
        d += "<td>" + c.id + "</td>";
        d += "<td>" + c.file + "</td>";
        d += "<td>" + c.wallet + "</td>";
        d += "<td>" + c.cost + "</td></tr>";
        content += d;
      }
      $("#data_list").html(content);
    }
  });
}

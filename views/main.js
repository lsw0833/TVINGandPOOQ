load_data();
setInterval(load_data, 500000);

function load_data() {
  $.ajax({
    type: "GET",
    url: "/onair",
    success: function(data) {
      var t_content = "";
      var p_content = "";
      for (var i = 0; i < data.t_link.length; i++) {
        var t = "<tr>";
        t += '<td><a href = "' + data.t_link[i] +'">  <img height="80" src = "'+data.t_img[i] +'"></a></td>';
        t += "<td>" + data.t_title[i] + "</td>";
        t += "<td>" + data.t_channel[i] + "</td></tr>";
        t_content += t;
      }
      for (var i = 0; i < data.p_link.length; i++) {
        var p = "<tr>"
        p += '<td><a href = "' + data.p_link[i] +'"><img height="80" src = "'+data.p_img[i] +'"></a></td>';
        p += "<td>" + data.p_title[i] + "</td>";
        p += "<td>" + data.p_channel[i] + "</td></tr>";
        p_content += p;
      }
      $("#Tving_list").html(t_content);
      $("#Pooq_list").html(p_content);
    }
  });
}

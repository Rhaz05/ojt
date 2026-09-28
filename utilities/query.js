const Query = (url, type, data = null) => {
  return new Promise((resolve, reject) => {
    let ajaxOptions = {
      url: url,
      method: type,
      dataType: "json",
      success: function (result) {
        resolve(result);
      },
      error: function (err) {
        reject(err);
      },
    };

    if (["PUT", "POST", "PATCH", "DELETE"].includes(type) && data) {
      ajaxOptions.data = JSON.stringify(data);
      ajaxOptions.contentType = "application/json";
    }

    $.ajax(ajaxOptions);
  });
};

const queryUtility = {
  async Load(url) {
    return await Query(url, "GET");
  },
  async Save(url, data) {
    return await Query(url, "POST", data);
  },
  async Update(url, data) {
    return await Query(url, "PUT", data);
  },
  async Delete(url, data) {
    return await Query(url, "DELETE", data);
  },
};

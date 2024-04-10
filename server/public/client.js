fetch("/api/users")
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    document.getElementById("results").innerHTML = JSON.stringify(
      data,
      null,
      2
    );
  })
  .catch((err) => {
    console.error(err);
    document.getElementById("errors").innerHTML = err.message;
  });

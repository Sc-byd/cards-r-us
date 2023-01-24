 

 const { url } = await fetch("/s3Url").then(res => res.json());
 console.log(url);

 fetch({
    method: "PUT",
    headers: {
        "Content-Type": "multipart/form-data"
    },
    body: file
 })

 const imageUrl = url.split('?')[0];
 console.log(imageUrl);
import NodejsApi from 'src/Api/NodejsApi'; 

export default class UploadAdapter {
	constructor(loader) {
		this.loader = loader;
		console.log(loader)
		this.loader.file.then(pic => (this.file = pic));
		console.log(loader)
		this.upload();
	}

    	// Starts the upload process.
	upload() {
		const fd = new FormData();
		fd.append("image", this.file); // your image
		// ...

		return new Promise((resolve, reject) => {
			NodejsApi
				.post('/admin/upload' , fd, {
					onUploadProgress: e => {
						console.log(
							// show upload process
							Math.round((e.loaded / e.total) * 100) + " %"
						);
					}
				})
				.then(response => {
					console.log(response)
					resolve(response);
				})
				.catch(error => {
					reject("Server Error");
					console.log("Server Error : ", error);
				});
		});
	}

}
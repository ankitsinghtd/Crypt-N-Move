    document.getElementById('uploadForm').addEventListener('submit', async (e) => {
      e.preventDefault();
      const formData = new FormData();
      const fileInput = document.querySelector('input[type="file"]');
      formData.append('file', fileInput.files[0]);

      try {
        const response = await fetch('/upload', {
          method: 'POST',
          body: formData
        });
        if (!response.ok) {
          throw new Error('Upload failed');
        }
        const encryptedData = await response.arrayBuffer();
        console.log(encryptedData); // Do something with the encrypted data
        const base64Data = btoa(String.fromCharCode.apply(null, new Uint8Array(encryptedData)));
    
        // Redirect to the receiver page with the encrypted data as a query parameter
        window.location.href = `/reciever.html?data=${encodeURIComponent(base64Data)}`;
      } catch (error) {
        console.error(error);
      }
    });

document.addEventListener('DOMContentLoaded', async () => {
  const downloadButton = document.getElementById('downloadButton');
  
  downloadButton.addEventListener('click', async () => {
    try {
      const queryParams = new URLSearchParams(window.location.search);
      const base64Data = queryParams.get('data');
      
      const encryptedData = atob(base64Data);
      
      const blob = new Blob([encryptedData], { type: 'application/octet-stream' });
    
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'encrypted_file.txt';
      
      link.click();
    } catch (error) {
      console.error(error);
    }
  });
});

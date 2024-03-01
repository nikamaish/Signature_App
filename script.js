   // Initialize the Signature Pad
   var canvas = document.getElementById('signature-pad');
   var signaturePad = new SignaturePad(canvas);

   // Handle the download button click
   document.getElementById('download-btn').addEventListener('click', function () {
       // Convert the signature to an image and trigger download
       var dataURL = signaturePad.toDataURL();
       var link = document.createElement('a');
       link.href = dataURL;
       link.download = 'signature.png';  // Specify the file name with a .png extension
       document.body.appendChild(link);
       link.click();
       document.body.removeChild(link);
   });

   // Handle the reload button click
   document.getElementById('reload-btn').addEventListener('click', function () {
       // Clear the signature pad
       signaturePad.clear();
   });
// Initialize the Signature Pad with thinner strokes
var canvas = document.getElementById('signature-pad');
var signaturePad = new SignaturePad(canvas, {
    minWidth: 0.5,
    maxWidth: 1.5,
    penColor: "black"
});

// Handle the download button click
document.getElementById('download-btn').addEventListener('click', function () {
    // Get the selected format from the dropdown
    var format = document.getElementById('format-select').value;

    // Set the MIME type based on the selected format
    var mimeType = format === 'jpeg' ? 'image/jpeg' : 'image/pdf';
    var dataURL = signaturePad.toDataURL(mimeType);

    // Create a link element to download the image
    var link = document.createElement('a');
    link.href = dataURL;
    link.download = 'signature.' + format;  // Set the file name and extension based on format
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});

// Handle the reload button click
document.getElementById('reload-btn').addEventListener('click', function () {
    signaturePad.clear();
});

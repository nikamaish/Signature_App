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

    if (format === 'pdf') {
        // Convert canvas to PNG data URL
        var imgData = signaturePad.toDataURL('image/png');
        
        // Generate a PDF using jsPDF
        var { jsPDF } = window.jspdf;
        var pdf = new jsPDF();

        // Add the signature image to the PDF (centered)
        pdf.addImage(imgData, 'PNG', 10, 10, 180, 60);  // Adjust the position and size

        // Download the PDF file
        pdf.save('signature.pdf');
    } else if (format === 'jpeg') {
        // Convert the signature to a JPEG image
        var dataURL = signaturePad.toDataURL('image/jpeg');
        var link = document.createElement('a');
        link.href = dataURL;
        link.download = 'signature.jpeg';  // Set the file name with .jpeg extension
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
});

// Handle the reload button click
document.getElementById('reload-btn').addEventListener('click', function () {
    signaturePad.clear();
});

// Initialize the Signature Pad with thinner strokes
var canvas = document.getElementById('signature-pad');
var signaturePad = new SignaturePad(canvas, {
    minWidth: 0.5,
    maxWidth: 1.5,
    penColor: "black"
});

// Function to save canvas as JPEG with a white background
function downloadAsJPEG() {
    // Create a temporary canvas to fill the background
    var tempCanvas = document.createElement('canvas');
    var ctx = tempCanvas.getContext('2d');

    // Set the canvas size to match the signature pad
    tempCanvas.width = canvas.width;
    tempCanvas.height = canvas.height;

    // Fill the background with white
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);

    // Draw the signature (with transparency) on top of the white background
    ctx.drawImage(canvas, 0, 0);

    // Convert the canvas to a JPEG data URL
    var dataURL = tempCanvas.toDataURL('image/jpeg');
    var link = document.createElement('a');
    link.href = dataURL;
    link.download = 'signature.jpeg';  // Set the file name with .jpeg extension
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

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
        downloadAsJPEG();  // Call the function to download as JPEG
    }
});

// Handle the reload button click
document.getElementById('reload-btn').addEventListener('click', function () {
    signaturePad.clear();
});

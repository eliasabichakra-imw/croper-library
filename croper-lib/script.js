$(document).ready(function() {
  // Variable to store the uploaded image source
  var imageSrc = '';
  var croppedWidth, croppedHeight;

  const options = {
    /* Configuration options for cropping */
    image: '', // Placeholder for the uploaded image URL
    imgFormat: 'auto', // Adjust as needed
    minWidth: 100,
    minHeight: 100,
    circleCrop: false,
    zoomable: true,
    background: 'transparent',
    inBoundGrid: true,
    outBoundColor: 'none',
    btnDoneAttr: '#btn-done' // Corrected selector to target the "done" button by its ID
  };

  // Function to initialize cropper
  function initializeCropper() {
    // Set the image source for cropping
    options.image = imageSrc;

    $('#contain').cropimage(options, function(blobURL, objCanvas, objImage) {
      // Callback with cropped image's blob generated URL
      $('#result-crop').html('<img style="margin:10% auto;" src="' + blobURL + '">');

      // Get dimensions of the cropped area
      croppedWidth = objCanvas.width;
      croppedHeight = objCanvas.height;

      // Display the dimensions
      $('#cropped-width').text('Cropped Width: ' + croppedWidth);
      $('#cropped-height').text('Cropped Height: ' + croppedHeight);
    });
  }

  // Function to handle image upload
  $('#image-input').on('change', function(e) {
    var file = e.target.files[0];
    var reader = new FileReader();
    reader.onload = function(event) {
      // Save the uploaded image source
      imageSrc = event.target.result;
    };
    reader.readAsDataURL(file);
  });

  // Function to handle crop button click
  $('#btn-cropper-done').on('click', function() {
    if (!imageSrc) {
      alert('Please upload an image first.');
      return;
    }
    // Show the move-stats and contain divs
    $('#move-stats, #contain').show();
    // Initialize cropper
    initializeCropper();
    // Disable resize button
    
    // Enable done button
    $('#btn-done').prop('disabled', false);
  });

  // Function to handle done button click
  $('#btn-done').on('click', function() {
    if (!imageSrc) {
      alert('Please upload an image first.');
      return;
    }
    // Show the cropped image
    $('#result-crop').show();
    // Disable done button
    $(this).prop('disabled', true);
  });
});

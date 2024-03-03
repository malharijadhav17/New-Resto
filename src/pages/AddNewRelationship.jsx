import React, { useState, useRef } from 'react';
import { FiUpload, FiCamera, FiCheck, FiTrash2 } from 'react-icons/fi';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Swal from 'sweetalert2';

const AddNewRelationship = () => {
  const [shopType, setShopType] = useState('');
  const [shopName, setShopName] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [ownerContact, setOwnerContact] = useState('');
  const [partnerName, setPartnerName] = useState('');
  const [photoPreview, setPhotoPreview] = useState(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [address, setAddress] = useState('');

  const videoRef = useRef(null);

  // const [notificationOpen, setNotificationOpen] = useState(false);
  // const [notificationMessage, setNotificationMessage] = useState('');

  // const handleNotificationClose = () => {
  //   setNotificationOpen(false);
  // };

  const handleBrowsePhoto = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      setPhotoPreview(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleStartCapture = () => {
    setIsCapturing(true);
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        videoRef.current.srcObject = stream;
      })
      .catch((error) => {
        console.log('Error accessing camera:', error);
      });
  };

  const handleCapturePhoto = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 400;
    canvas.height = 400;
    const context = canvas.getContext('2d');

    context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

    setPhotoPreview(canvas.toDataURL('image/jpeg'));
    setIsCapturing(false);
    videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
  };

  const handleCloseCapture = () => {
    setIsCapturing(false);
    videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
  };

  const handleSave = () => {

    // Perform validation checks
  if (shopType.trim() === '') {
    toast.error('Shop Type is required');
    return;
  }
  else
  if (shopName.trim() === '') {
    toast.error('Shop Name is required');
    return;
  }
  else
  if (ownerName.trim() === '') {
    toast.error('Owner Name is required');
    return;
  }
  else
  if (ownerContact.trim() === '') { 
    toast.error('Owner Contact is required');
    return;
  }
  else
  if (partnerName.trim() === '') {
    toast.error('Partner Name is required');
    return;
  }else{

    const formData = new FormData();
    formData.append('shopType', shopType);
    formData.append('shopName', shopName);
    formData.append('ownerName', ownerName);
    formData.append('ownerContact', ownerContact);
    formData.append('partnerName', partnerName);
    formData.append('address', address);
    
    if (photoPreview) {
      // If a photo is captured, append it to the form data
      const photoFile = dataURItoFile(photoPreview, 'photo.jpg');
      formData.append('photo', photoFile);
    }
  
    axios
      .post('http://127.0.0.1:8000/api/SaveRelationShip', formData)
      .then((res) => {
        console.log(res.data);

        if (res.data.success === 2 && res.data.error === 0) {
          Swal.fire({
            icon: 'success',
            title: 'Saved!',
            text: "Relationship saved successfully!",
            showConfirmButton: false,
            timer: 2000,
          });
          handleClear();
          console.log('Relationship saved successfully!');
        } else if (res.data.success === 1 && res.data.error === 1) {
          Swal.fire({
            icon: 'error',
            title: 'Exists!',
            text: "Owner contact already exists!",
            showConfirmButton: false,
            timer: 2000,
          });
          console.log('Owner contact already exists!');
        } else if (res.data.success === 0 && res.data.error === 1) {
          Swal.fire({
            icon: 'error',            
            title: 'Failed!',
            text: "Failed to save Relationship!",
            showConfirmButton: false,
            timer: 2000,
          });
          console.log('Failed to save relationship!');
        }

      })
      .catch((error) => {
        console.log(error.response.data);

      });
    }
  };
  
  // Helper function to convert data URI to a File object
  const dataURItoFile = (dataURI, fileName) => {
    const arr = dataURI.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], fileName, { type: mime });
  };
  

  const handleClear = () => {
    setShopType('');
    setShopName('');
    setOwnerName('');
    setOwnerContact('');
    setPartnerName('');
    setPhotoPreview(null);
    setAddress('');
  };

  return (

    <div className="m-2 mt-20 p-2">
      <div className="border-gray-400 shadow-lg rounded">
        <div className="bg-gray-700 font-bold text-white p-2 rounded-t">
          New Relationship Partner
        </div>
        <div className="p-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          <div>
            <label className="block mb-2" htmlFor="shopType">
              Shop Type:
            </label>
            <input
              className="w-full px-9 py-2 border border-gray-300 rounded-md"
              type="text"
              id="shopType"
              name="shopType"
              value={shopType}
              onChange={(e) => setShopType(e.target.value)}
            />
          </div>
          <div>
            <label className="block mb-2" htmlFor="shopName">
              Shop Name:
            </label>
            <input
              className="w-full px-9 py-2 border border-gray-300 rounded-md"
              type="text"
              id="shopName"
              name="shopName"
              value={shopName}
              onChange={(e) => setShopName(e.target.value)}
            />
          </div>
          <div>
            <label className="block mb-2" htmlFor="ownerName">
              Owner Name:
            </label>
            <input
              className="w-full px-9 py-2 border border-gray-300 rounded-md"
              type="text"
              id="ownerName"
              name="ownerName"
              value={ownerName}
              onChange={(e) => setOwnerName(e.target.value)}
            />
          </div>
          <div>
            <label className="block mb-2" htmlFor="ownerContact">
              Owner Contact:
            </label>
            <input
              className="w-full px-9 py-2 border border-gray-300 rounded-md"
              type="number"
              id="ownerContact"
              name="ownerContact"
              value={ownerContact}
              onChange={(e) => setOwnerContact(e.target.value)} 
                          />
          </div>
          <div>
            <label className="block mb-2" htmlFor="partnerName">
              Partner Name:
            </label>
            <input
              className="w-full px-9 py-2 border border-gray-300 rounded-md"
              type="text"
              id="partnerName"
              name="partnerName"
              value={partnerName}
              onChange={(e) => setPartnerName(e.target.value)}
            />
          </div>
          <div>
            <label className="block mb-2" htmlFor="photo">
              Upload Photo:
            </label>
            <div className="flex gap-2" style={{ touchAction: 'manipulation' }}>
              <button
                className="px-5 py-2 border border-gray-300 rounded-md flex items-center justify-center"
                onClick={() => document.getElementById('photo').click()}
              >
                <FiUpload className="w-5 h-5 mr-2" />
                Browse
              </button>
              <button
                className="px-5 py-2 border border-gray-300 rounded-md flex items-center justify-center"
                onClick={handleStartCapture}
              >
                <FiCamera className="w-5 h-5 mr-2" />
                Capture
              </button>
            </div>
            <input
              className="hidden"
              type="file"
              id="photo"
              name="photo"
              accept="image/*"
              onChange={handleBrowsePhoto}
            />
          </div>
          <div className="md:col-span-2">
            <label className="block mb-2" htmlFor="address">
              Address:
            </label>
            <textarea
              className="w-full px-9 py-2 border border-gray-300 rounded-md"
              id="address"
              name="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              rows={4}
            />
          </div>
          <div className="col-span-1">
            <label className="block mb-2" htmlFor="preview">
              Preview:
            </label>
            <div className="flex items-left justify-left">
              {photoPreview ? (
                <img
                  src={photoPreview}
                  alt="Photo Preview"
                  className="w-32 h-32 bg-gray-300 bg-center bg-cover rounded-md"
                />
              ) : (
                <div className="w-32 h-32 bg-gray-300 bg-center bg-cover rounded-md"></div>
              )}
            </div>
          </div>
          <div className="flex items-center justify-start mt-2">
            <button
              className="px-5 py-2 border border-gray-300 rounded-md flex items-center justify-center bg-green-500 text-white"
              onClick={handleSave}
            >
              <FiCheck className="w-5 h-5 mr-2" />
              Save
            </button>
            <button
              className="px-5 py-2 border border-gray-300 rounded-md flex items-center justify-center ml-2 bg-red-500 text-white"
              onClick={handleClear}
            >
              <FiTrash2 className="w-5 h-5 mr-2" />
              Clear
            </button>
          </div>
        </div>
      </div>

      {/* Capture Popup */}
      {isCapturing && (
        <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="w-400 h-400 bg-white rounded p-4">
            <video ref={videoRef} className="w-full h-full" autoPlay></video>
            <div className="flex justify-center mt-4">
              <button
                className="px-4 py-2 border border-gray-300 rounded-md flex items-center justify-center bg-green-500 text-white"
                onClick={handleCapturePhoto}
              >
                <FiCamera className="w-5 h-5 mr-2" />
                Capture
              </button>
              <button
                className="px-4 py-2 border border-gray-300 rounded-md flex items-center justify-center ml-2 bg-red-500 text-white"
                onClick={handleCloseCapture}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      
    {/* <Snackbar
  open={notificationOpen}
  autoHideDuration={4000}
  onClose={handleNotificationClose}
  anchorOrigin={{ vertical: 'center', horizontal: 'center' }}
>
  <MuiAlert
    elevation={6}
    variant="filled"
    onClose={handleNotificationClose}
    severity={notificationMessage.includes('successfully') ? 'success' : 'error'}
  >
    {notificationMessage}
  </MuiAlert>
</Snackbar> */}
    </div>
    
  );
};

export default AddNewRelationship;

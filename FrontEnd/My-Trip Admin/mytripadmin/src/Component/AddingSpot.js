import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';


export default function AddingSpot() {
  const [formData, setFormData] = useState({
    Image1: null,
    Image2: null,
    Image3: null,
    Image4: null,
    Image5: null,
    packageId: '', // Change this to packageId
  });

  const [tourPackages, setTourPackages] = useState([]);

  useEffect(() => {
    async function fetchTourPackages() {
      try {
        const response = await axios.get('https://localhost:7087/api/TourPackage');
        setTourPackages(response.data.filter(Tourpackages => Tourpackages.spot.length === 0));
      } catch (error) {
        console.error('GET error:', error);
        // Handle error or display an error message to the user
      }
    }

    fetchTourPackages();
  }, []);

  const handleImageChange = (event, imageNumber) => {
    const file = event.target.files[0];
  
    if (file) {
      const reader = new FileReader();
  
      reader.onload = () => {
        setFormData((prevData) => ({
          ...prevData,
          [`Image${imageNumber}`]: reader.result,
        }));
      };
  
      reader.readAsDataURL(file);
    }
  };
  

  const handleTourPackageChange = (event) => {
    const selectedTourPackageId = parseInt(event.target.value);
    const selectedTourPackage = tourPackages.find(tourPackage => tourPackage.packageId === selectedTourPackageId);

    setFormData((prevData) => ({
      ...prevData,
      packageId: selectedTourPackageId, 
    }));
  };

  const handleSubmit = async () => {
    try {
      if (formData.Image1 && formData.Image2 && formData.Image3 && formData.Image4 && formData.Image5) {
        const formDataToSubmit = new FormData();
  
        formDataToSubmit.append('Image1', formData.Image1);
        formDataToSubmit.append('Image2', formData.Image2);
        formDataToSubmit.append('Image3', formData.Image3);
        formDataToSubmit.append('Image4', formData.Image4);
        formDataToSubmit.append('Image5', formData.Image5);
  
        // Check if packageId is set
        if (formData.packageId) {
          formDataToSubmit.append('packageId', formData.packageId);
        }
  
        const response = await axios.post('https://localhost:7087/api/Spots', formDataToSubmit);
        console.log('POST response:', response.data);
      } else {
        console.error('One or more images are missing.');
      }
    } catch (error) {
      console.error('POST error:', error);
    }
  };
  

  return (
    <div class="container mt-5">
  <h1>Adding Spot</h1>
  <form>
    <div class="form-group">
      <label for="packageId">Select a Tour Package</label>
      <select class="form-control" id="packageId" value={formData.packageId} onChange={handleTourPackageChange}>
        <option value="0">Select a Tour Package</option>
        {tourPackages.map((tourPackage) => (
          <option key={tourPackage.packageId} value={tourPackage.packageId}>
            {tourPackage.packageName}
          </option>
        ))}
      </select>
    </div>

    <div class="form-group">
      <label for="image1">Image 1</label>
      <input type="file" class="form-control-file" accept="image/*" id="image1" onChange={(e) => handleImageChange(e, 1)} />
    </div>
    <div class="form-group">
      <label for="image2">Image 2</label>
      <input type="file" class="form-control-file" accept="image/*" id="image2" onChange={(e) => handleImageChange(e, 2)} />
    </div>
    <div class="form-group">
      <label for="image3">Image 3</label>
      <input type="file" class="form-control-file" accept="image/*" id="image3" onChange={(e) => handleImageChange(e, 3)} />
    </div>
    <div class="form-group">
      <label for="image4">Image 4</label>
      <input type="file" class="form-control-file" accept="image/*" id="image4" onChange={(e) => handleImageChange(e, 4)} />
    </div>
    <div class="form-group">
      <label for="image5">Image 5</label>
      <input type="file" class="form-control-file" accept="image/*" id="image5" onChange={(e) => handleImageChange(e, 5)} />
    </div>

    <button type="submit" class="btn btn-primary" onClick={handleSubmit}>Submit</button>
  </form>
</div>

  );
}

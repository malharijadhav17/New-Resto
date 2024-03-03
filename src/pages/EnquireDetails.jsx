import React from 'react';


const EnquireDetails = () => {
    return (
    <div>
        <form>

            <div class="card text-center mt-3">
                <div class="card-header">
                    Enquire Details
                </div>
                <div class="card-body shadow p-1  mb-5 bg-white rounded">
                <div class="container-fluid row">
                    <div class="col-md-4">
                    
                   
                    <div class="form-group my-2">
                        <label >Name</label>
                        <input type="text" class="form-control" id="name" placeholder="Enter Name"/>
                    </div>

                    <div class=" my-2">

                     <label >Gender</label> 
                        <select class="form-control" name="Gender" id="gender">
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        </select>
                    </div>
                    
                    
                    <div class=" my-2">
                    <label >Rating</label> 
                        <select class="form-control" name="rating" id="rating">
                        <option value="Cold">Cold</option>
                        <option value="Warm">Warm</option>
                        <option value="Hot">Hot</option>
                        <option value="Expected">Expected</option>
                        <option value="Not Intrested">Not Intrested</option>
                        </select>
                    </div>
                    <div class="form-group my-2">
                        <label >Next Followap</label>
                        <input type="date" class="form-control" id="nextfollowap"/>
                    </div>

                   
                    
                   
                    </div>

                    <div class="col-md-4">
                    <div class="form-group my-2">
                        <label >Contact</label>
                        <input type="number" class="form-control" id="contact" placeholder="Enter Contact "/>
                    </div>

                    <div class=" my-2">

                            <label >Source of Enquire</label> 
                            <select class="form-control" name="source" id="source">
                            <option value="Friend">Friend</option>
                            <option value="Socialmedia">Socialmedia</option>
                            <option value="Templete">Templete</option>
                            
                            </select>

     
                    </div>
                   
                   
                   
                    
                    <div class="my-2">
                        <label >Add To:</label>
                        <select class="form-control" name="AddTo" id="addto">
                        <option value="Enquire">Enquire</option>
                        <option value="Member">Member</option>
                        
                        </select>
                    </div>
                    
                    <div class=" my-2">
                        <label >Status:</label>
                        <select class="form-control" name="status" id="status">
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                        </select>
                    </div>
                   
                </div>
                <div class="col-md-4">
                    
                    <div class="form-group my-2">
                        <label >Email</label>
                        <input type="email" class="form-control" id="email" placeholder="Enter Mail "/>
                    </div>
                    
                   

                    <div class="form-group my-2">
                        <label >Executive Name:</label>
                        <input type="text" class="form-control" id="executive" placeholder="Enter Executive"/>
                    </div>
                    <div class="form-group">
                        <label >Address</label>
                        <textarea class="form-control" id="address" placeholder="Enter Address"/>
                    </div>
                    
                    <div class="form-group">
                        <label >Comment</label>
                        <textarea class="form-control" id="comment" placeholder="Enter Address"/>
                    </div>
                    
                    <div class="mt-2">
                        <button type="submit" id="sub"  class="btn btn-primary">Submit</button>
                        <button type="submit" id="update" class="btn btn-primary">Update</button>
                     </div>
                   
                </div>

                </div>
                    
         </div>
                

            </div>












            

        </form>
    </div>
    );
};

export default EnquireDetails; 

// const Home = () => {
//   return (
//     <div>
//         <div className="container mt-5">
//             <div className="row">
//                 <div className="col-md-6 offset-md-3">
//                     <div className="card">
//                         <div className="card-header">
//                             <h5>Home</h5>
//                         </div>
//                         <div className="card-body">
//                             <p> <b>Welcome to our Hotel Management App</b></p>
//                                 <p> "Experience a new level of hotel management. 
//                                     Our platform empowers you to handle everything from guest requests to room management 
//                                     with simplicity and precision. 
//                                     Stay on top of your operations, ensure smooth communication, 
//                                     and create memorable stays for your guests. 
//                                     Start managing smarter today!"</p>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     </div>
//   )
// }

// export default Home

const Home = () => {
    return (
      <div>
        <div className="container mx-auto mt-10">
          <div className="flex justify-center">
            <div className="w-full max-w-md">
              <div className="bg-white shadow-md rounded-lg">
                <div className="bg-gray-100 px-6 py-4 border-b">
                  <h5 className="text-lg font-semibold">Home</h5>
                </div>
                <div className="px-6 py-4">
                  <p className="font-bold mb-4">Welcome to our Hotel Management App</p>
                  <p>
                    "Experience a new level of hotel management. Our platform empowers you to handle
                    everything from guest requests to room management with simplicity and precision.
                    Stay on top of your operations, ensure smooth communication, and create memorable
                    stays for your guests. Start managing smarter today!"
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  export default Home;
  
import React from "react";
import { StarFill } from "react-bootstrap-icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// const Tes = () => {
//   return (
//     <div className="col-6">
//       <p className="fw-700 font-inter fs-40">TESTIMONI</p>
//       <p className="mb-0 w-75">
//         Testimoni dari pengguna setia <strong>Digitalexchange.id</strong> dari berbagai kanal social media yang kita miliki
//       </p>
//       <div style={{ marginTop: 96 }}>
//         <div className="scrollbar-none overflow-scroll">
//           <div style={{ width: "1500px" }}>
//             <div
//               className="card border-0 py-3 px-4"
//               style={{
//                 width: 450,
//                 height: 200,
//                 display: "inline-block",
//                 backgroundColor: "#EAF7FF",
//                 borderRadius: "20px",
//               }}
//             >
//               <div className="row">
//                 <div className="col-3">
//                   <div className="bg-dark rounded-circle d-flex justify-content-center align-items-center" style={{ width: 75, height: 75 }}>
//                     <p className="mb-0 text-white">FA</p>
//                   </div>
//                 </div>
//                 <div className="col">
//                   <p className="fw-700 font-inter fs-20 mb-1">A**** D****</p>
//                   <p>
//                     <StarFill className="text-warning me-1" />
//                     <StarFill className="text-warning me-1" />
//                     <StarFill className="text-warning me-1" />
//                     <StarFill className="text-warning me-1" />
//                     <StarFill className="text-warning" />
//                   </p>
//                   <p className="mb-0 fs-12">“Aman aman saja, mudah saja memang kelihatan susah kalau baru paham.Tapi kalau terbiasa santai santai saja. ““Aman aman saja, mudah saja memang kelihatan susah kalau baru paham.Tapi kalau terbiasa santai santai saja. “</p>
//                 </div>
//               </div>
//             </div>
//             <div
//               className="card border-0 py-3 px-4 ms-4"
//               style={{
//                 width: 450,
//                 height: 200,
//                 display: "inline-block",
//                 backgroundColor: "#EAF7FF",
//                 borderRadius: "20px",
//               }}
//             >
//               <div className="row">
//                 <div className="col-3">
//                   <div className="bg-dark rounded-circle d-flex justify-content-center align-items-center" style={{ width: 75, height: 75 }}>
//                     <p className="mb-0 text-white">FA</p>
//                   </div>
//                 </div>
//                 <div className="col">
//                   <p className="fw-700 font-inter fs-20 mb-1">A**** D****</p>
//                   <p>
//                     <StarFill className="text-warning me-1" />
//                     <StarFill className="text-warning me-1" />
//                     <StarFill className="text-warning me-1" />
//                     <StarFill className="text-warning me-1" />
//                     <StarFill className="text-warning" />
//                   </p>
//                   <p className="mb-0 fs-12">“Aman aman saja, mudah saja memang kelihatan susah kalau baru paham.Tapi kalau terbiasa santai santai saja. ““Aman aman saja, mudah saja memang kelihatan susah kalau baru paham.Tapi kalau terbiasa santai santai saja. “</p>
//                 </div>
//               </div>
//             </div>
//             <div
//               className="card border-0 py-3 px-4 ms-4"
//               style={{
//                 width: 450,
//                 height: 200,
//                 display: "inline-block",
//                 backgroundColor: "#EAF7FF",
//                 borderRadius: "20px",
//               }}
//             >
//               <div className="row">
//                 <div className="col-3">
//                   <div className="bg-dark rounded-circle d-flex justify-content-center align-items-center" style={{ width: 75, height: 75 }}>
//                     <p className="mb-0 text-white">FA</p>
//                   </div>
//                 </div>
//                 <div className="col">
//                   <p className="fw-700 font-inter fs-20 mb-1">A**** D****</p>
//                   <p>
//                     <StarFill className="text-warning me-1" />
//                     <StarFill className="text-warning me-1" />
//                     <StarFill className="text-warning me-1" />
//                     <StarFill className="text-warning me-1" />
//                     <StarFill className="text-warning" />
//                   </p>
//                   <p className="mb-0 fs-12">“Aman aman saja, mudah saja memang kelihatan susah kalau baru paham.Tapi kalau terbiasa santai santai saja. ““Aman aman saja, mudah saja memang kelihatan susah kalau baru paham.Tapi kalau terbiasa santai santai saja. “</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default Tes;

function Tes() {
  const notify = (event) => {
    event.preventDefault();
    toast("Wow so easy!");
  };

  return (
    <>
      <div>
        <form action="" onSubmit={notify}>
          {/* <button onClick={notify}>Notify!</button> */}
          <button type="submit">Notify!</button>
        </form>
        <ToastContainer />
      </div>
    </>
  );
}

export default Tes;

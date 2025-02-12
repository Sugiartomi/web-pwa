import React from "react"

function CardScroll() {
  return (
    <>
      <div className="scrollbar-none overflow-scroll px-0 me-0">
        <div className="d-flex mt-4 px-0 me-0" style={{ width: "180vw", height : 150 }}>
          <div
            className="me-2" 
            style={{
              width: "90vw",
              // display: "inline-block",
              height: "134.69px",
            }}
          >
            <img
              src="https://media.istockphoto.com/id/675172642/photo/pura-ulun-danu-bratan-temple-in-bali.jpg?b=1&s=170667a&w=0&k=20&c=i6eVZIrC53B4jl-I4p3YIn9ZRViyVoMbRdp-NznLDUE="
              alt=""
              className="img-fluid"
              
              style={{ width: "100%", height: "134.69px", objectFit: "cover", borderRadius : 15 }}
            />
          </div>
          <div
            className="me-2"
            style={{
              width: "90vw",
              // display: "inline-block",
              height: "134.69px",
            }}
          >
            <img
              src="https://media.istockphoto.com/id/675172642/photo/pura-ulun-danu-bratan-temple-in-bali.jpg?b=1&s=170667a&w=0&k=20&c=i6eVZIrC53B4jl-I4p3YIn9ZRViyVoMbRdp-NznLDUE="
              alt=""
              className="img-fluid"
              style={{ width: "100%", height: "134.69px", objectFit: "cover", borderRadius : 15 }}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default CardScroll

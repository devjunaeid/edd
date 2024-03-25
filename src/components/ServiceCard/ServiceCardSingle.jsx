import Image from "next/image"
import "./style.css";


function ServiceCardSingle({ data }) {
  return (
    <article className="mainArt">
      <figure>
        <Image src={data.img} alt={data.title} className="figureImage" width={400} height={400} />
      </figure>
      <div>
        <h1>
          {data.title}
        </h1>
        <p>
          {data.body}
        </p>
      </div>
    </article>
  )
}

export default ServiceCardSingle;

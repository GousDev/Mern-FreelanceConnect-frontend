import "../css/testimonial.css";

const Testimonial = () => {
  return (
    <section className="testimonial" id="testimonial">
      <div className="header">
        <p>TESTIMONIALS</p>
        <h1>What our clients say about us.</h1>
      </div>
      <div className="testimonials__grid">
        <div className="card">
          <span>
            <i className="ri-double-quotes-l"></i>
          </span>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa quod
            sed vero autem? Unde quam deserunt inventore. Maxime voluptas
            voluptatibus tempora, impedit recusandae, nulla possimus reiciendis
            veritatis deserunt magni non.
          </p>
          <hr />
          <img src="./Images/pic-1.jpg" alt="user" />
          <p className="name">Allan Collins</p>
        </div>
        <div className="card">
          <span>
            <i className="ri-double-quotes-l"></i>
          </span>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi
            doloribus debitis perferendis aliquid magni placeat libero nobis
            recusandae commodi expedita enim dignissimos, fuga, nisi non
            consequatur molestias, ex quibusdam consectetur?
          </p>
          <hr />
          <img src="./Images/pic-2.jpeg" alt="user" />
          <p className="name">Clay Washington</p>
        </div>
        <div className="card">
          <span>
            <i className="ri-double-quotes-l"></i>
          </span>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Assumenda,
            quae! Id neque quo, aperiam facere similique veniam harum laudantium
            enim commodi soluta corporis doloremque expedita unde. Atque quidem
            iusto numquam quos expedita, porro fugit accusamus omnis?
          </p>
          <hr />
          <img src="./Images/pic-3.jpg" alt="user" />
          <p className="name">Tanya Grant</p>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;

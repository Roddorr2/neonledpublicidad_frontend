import React from 'react';
import Producto from './ProductoIndividual';
import styles from './productoStyles.module.css'
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { useRef } from "react";
import "swiper/css";
import "swiper/css/pagination";

const FilaProductos = React.memo(({ productos, isFirst = false }) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  return (
    <>

      <div className='sm:hidden'>
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          onBeforeInit={(swiper) => {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
          }}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          pagination={{
            clickable: true,
            bulletClass: "testimonials-bullet",
            bulletActiveClass: "testimonials-bullet-active",
          }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          loop
          spaceBetween={24}
          breakpoints={{
            0: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            1200: {
              slidesPerView: 3,
            },
          }}
          className="!pb-14">
          <div className={styles["producto-row"]}>

            {productos.map((producto, index) => (
              <SwiperSlide>
                <Producto
                  key={index}
                  imgSrcMobile={producto.imgSrcMobile}
                  imgSrc={producto.imgSrc}
                  altText={producto.altText}
                  title={producto.title}
                  description={producto.description}
                  route={producto.route}
                  isLcp={isFirst && index === 0}
                />
              </SwiperSlide>
            ))}




          </div>
        </Swiper>
      </div>

      <div className='hidden md:block'>
        <div className={styles["producto-row"]}>

          {productos.map((producto, index) => (
            <Producto
              key={index}
              imgSrcMobile={producto.imgSrcMobile}
              imgSrc={producto.imgSrc}
              altText={producto.altText}
              title={producto.title}
              description={producto.description}
              route={producto.route}
              isLcp={isFirst && index === 0}
            />
          ))}
        </div>

      </div>

      <style>{`
        .testimonials-bullet {
          width: 8px;
          height: 8px;
          border-radius: 9999px;
          background-color: #44b0f8;
          cursor: pointer;
          transition: all 0.3s ease;
          display: inline-block;
          margin: 0px 4px;
        }
        .testimonials-bullet-active {
          width: 24px;
          background-color: #fbbf24;
          box-shadow: 0 0 12px rgba(255, 184, 0, 0.6);
        }
        .testimonials-bullet:hover {
          background-color: #8b5cf6;
        }
      `}</style>

    </>



  );
});

export default FilaProductos;

import React, { ComponentType } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import ForecastItem from "./ForecastItem";
import { ReactComponent as ArrowRightIcon } from "../assets/arrow-right.svg";
import { Navigation } from "swiper";
import "swiper/css";
import { ForecastResponse } from "../types";

interface ForecastProps {
  data: ForecastResponse;
}

const Forecast: ComponentType<ForecastProps> = ({ data }) => {
  return (
    <div className="forecast">
      <button className="forecast__btn forecast__btn--prev">
        <ArrowRightIcon />
      </button>

      <Swiper
        modules={[Navigation]}
        slidesPerView="auto"
        spaceBetween={30}
        navigation={{
          prevEl: ".forecast__btn--prev",
          nextEl: ".forecast__btn--next",
        }}
      >
        {data.list.map((item) => (
          <SwiperSlide key={item.dt}>
            <ForecastItem data={item} />
          </SwiperSlide>
        ))}
      </Swiper>

      <button className="forecast__btn forecast__btn--next">
        <ArrowRightIcon />
      </button>
    </div>
  );
};

export default Forecast;
